import {
  ChatMessage,
  ChatRequest,
  ChatResponse,
  OllamaClientOptions,
} from './types';

/**
 * Cliente para interactuar con la API de Ollama
 */
export class OllamaClient {
  private readonly baseUrl: string;

  /**
   * Crea una nueva instancia del cliente de Ollama
   * @param options - Opciones de configuración
   */
  constructor(options: OllamaClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? 'http://localhost:11434';
  }

  /**
   * Envía mensajes al modelo y obtiene una respuesta
   * @param model - Nombre del modelo a usar (ej: 'llama2', 'mistral')
   * @param messages - Array de mensajes de la conversación
   * @returns Respuesta del modelo
   */
  async chat(model: string, messages: ChatMessage[]): Promise<ChatResponse> {
    const request: ChatRequest = {
      model,
      messages,
      stream: false,
    };

    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
    }

    return response.json() as Promise<ChatResponse>;
  }
}
