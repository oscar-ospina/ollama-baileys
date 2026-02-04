/**
 * Rol del mensaje en la conversación
 */
export type MessageRole = 'system' | 'user' | 'assistant';

/**
 * Mensaje de chat con rol y contenido
 */
export interface ChatMessage {
  role: MessageRole;
  content: string;
}

/**
 * Petición al endpoint /api/chat de Ollama
 */
export interface ChatRequest {
  model: string;
  messages: ChatMessage[];
  stream?: boolean;
}

/**
 * Respuesta del endpoint /api/chat de Ollama
 */
export interface ChatResponse {
  model: string;
  created_at: string;
  message: ChatMessage;
  done: boolean;
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

/**
 * Opciones de configuración del cliente
 */
export interface OllamaClientOptions {
  baseUrl?: string;
}
