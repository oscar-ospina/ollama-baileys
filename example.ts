import { OllamaClient, ChatMessage } from './src';

async function main() {
  // Crear cliente (usa localhost:11434 por defecto)
  const client = new OllamaClient();

  // Definir mensajes de la conversación
  const messages: ChatMessage[] = [
    {
      role: 'user',
      content: 'Hola, ¿cómo estás? Responde brevemente.',
    },
  ];

  console.log('Enviando mensaje a Ollama...');
  console.log('Usuario:', messages[0].content);
  console.log('---');

  try {
    // Enviar chat y obtener respuesta
    const response = await client.chat('qwen3:8b', messages);

    console.log('Respuesta del modelo:');
    console.log('Rol:', response.message.role);
    console.log('Contenido:', response.message.content);
  } catch (error) {
    console.error('Error:', error);
    console.log('\nAsegúrate de que Ollama esté corriendo en localhost:11434');
    console.log('y que el modelo "llama2" esté disponible.');
  }
}

main();
