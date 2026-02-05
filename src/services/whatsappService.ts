import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  WASocket,
  proto,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import { OllamaClient } from '../client';
import { ChatMessage } from '../types';
import { config } from '../config';

class WhatsAppService {
  private socket: WASocket | null = null;
  private readonly ollamaClient: OllamaClient;
  private conversationHistory: Map<string, ChatMessage[]> = new Map();

  constructor() {
    this.ollamaClient = new OllamaClient({ baseUrl: config.ollamaBaseUrl });
  }

  async connect(): Promise<void> {
    const { state, saveCreds } = await useMultiFileAuthState(config.whatsappAuthDir);

    this.socket = makeWASocket({
      auth: state,
      printQRInTerminal: true,
    });

    this.socket.ev.on('creds.update', saveCreds);

    this.socket.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === 'close') {
        const shouldReconnect =
          (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

        console.log('Connection closed. Reconnecting:', shouldReconnect);

        if (shouldReconnect) {
          this.connect();
        }
      } else if (connection === 'open') {
        console.log('WhatsApp connection established');
      }
    });

    this.socket.ev.on('messages.upsert', async ({ messages, type }) => {
      if (type !== 'notify') return;

      for (const msg of messages) {
        await this.handleMessage(msg);
      }
    });
  }

  private async handleMessage(msg: proto.IWebMessageInfo): Promise<void> {
    if (!msg.message || !msg.key || msg.key.fromMe) return;

    const remoteJid = msg.key.remoteJid;
    if (!remoteJid) return;

    const text = this.extractMessageText(msg);
    if (!text) return;

    console.log(`Message from ${remoteJid}: ${text}`);

    try {
      const response = await this.chat(remoteJid, text);
      await this.sendMessage(remoteJid, response);
    } catch (error) {
      console.error('Error processing message:', error);
      await this.sendMessage(remoteJid, 'Sorry, an error occurred processing your message.');
    }
  }

  private extractMessageText(msg: proto.IWebMessageInfo): string | null {
    const message = msg.message;
    if (!message) return null;

    return (
      message.conversation ||
      message.extendedTextMessage?.text ||
      null
    );
  }

  async chat(jid: string, message: string): Promise<string> {
    const history = this.conversationHistory.get(jid) || [];

    history.push({ role: 'user', content: message });

    const response = await this.ollamaClient.chat(config.defaultModel, history);

    history.push(response.message);
    this.conversationHistory.set(jid, history);

    return response.message.content;
  }

  async sendMessage(jid: string, text: string): Promise<void> {
    if (!this.socket) {
      throw new Error('WhatsApp not connected');
    }

    await this.socket.sendMessage(jid, { text });
    console.log(`Message sent to ${jid}: ${text.substring(0, 50)}...`);
  }

  clearHistory(jid: string): void {
    this.conversationHistory.delete(jid);
  }

  clearAllHistory(): void {
    this.conversationHistory.clear();
  }
}

export const whatsappService = new WhatsAppService();
