export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  defaultModel: process.env.DEFAULT_MODEL || 'qwen3:14b',
};
