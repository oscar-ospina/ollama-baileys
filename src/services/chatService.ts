import { OllamaClient } from '../client';
import { ChatMessage } from '../types';
import { config } from '../config';

class ChatService {
  private readonly client: OllamaClient;
  private messageHistory: ChatMessage[] = [];

  constructor() {
    this.client = new OllamaClient({ baseUrl: config.ollamaBaseUrl });
  }

  async chat(
    message: string,
    model: string = config.defaultModel
  ): Promise<{ response: string; model: string }> {
    this.messageHistory.push({ role: 'user', content: message });

    const response = await this.client.chat(model, this.messageHistory);

    this.messageHistory.push(response.message);

    return {
      response: response.message.content,
      model: response.model,
    };
  }

  clearHistory(): void {
    this.messageHistory = [];
  }
}

export const chatService = new ChatService();
