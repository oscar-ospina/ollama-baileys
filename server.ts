import express from 'express';
import path from 'path';
import { OllamaClient, ChatMessage } from './src';

const app = express();
const client = new OllamaClient();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Historial de mensajes por sesión (simple, en memoria)
let messageHistory: ChatMessage[] = [];

app.post('/api/chat', async (req, res) => {
  try {
    const { message, model = 'qwen3:14b' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Agregar mensaje del usuario al historial
    messageHistory.push({ role: 'user', content: message });

    // Enviar al modelo
    const response = await client.chat(model, messageHistory);

    // Agregar respuesta al historial
    messageHistory.push(response.message);

    res.json({
      response: response.message.content,
      model: response.model,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: String(error) });
  }
});

// Limpiar historial
app.post('/api/clear', (_req, res) => {
  messageHistory = [];
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
