# ollama-baileys

TypeScript client library for Ollama with web chat interface and WhatsApp bot integration.

Last updated: 2026-02-04

## Requirements

- Node.js 24+
- Ollama running on `localhost:11434`
- A model pulled (e.g., `ollama pull qwen3:8b`)

## Installation

```bash
npm install
```

## Usage

### WhatsApp Bot

Start the WhatsApp bot:

```bash
npm run whatsapp
```

On first run, scan the QR code with your WhatsApp app to authenticate. Credentials are saved in `auth_info/` directory for future sessions.

Once connected, any message received will be processed by Ollama and the response will be sent back automatically.

### Web Interface

Start the web server:

```bash
npm start
```

Open http://localhost:3000 in your browser.

### Programmatic Usage

```typescript
import { OllamaClient } from "./src";

const client = new OllamaClient();
const response = await client.chat("qwen3:8b", [
  { role: "user", content: "Hello" },
]);

console.log(response.message.content);
```

### CLI Example

```bash
npm run example
```

## Configuration

Environment variables:

| Variable            | Default                  | Description                        |
| ------------------- | ------------------------ | ---------------------------------- |
| `PORT`              | `3000`                   | Web server port                    |
| `OLLAMA_BASE_URL`   | `http://localhost:11434` | Ollama API URL                     |
| `DEFAULT_MODEL`     | `qwen3:8b`               | Default model for chat             |
| `WHATSAPP_AUTH_DIR` | `auth_info`              | Directory for WhatsApp credentials |

## API Endpoints

- `POST /api/chat` - Send a message and get a response
- `POST /api/clear` - Clear conversation history

## Build

```bash
npm run build
```
