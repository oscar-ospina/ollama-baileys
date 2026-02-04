# ollama-baileys

TypeScript client library for Ollama with a web chat interface.

## Requirements

- Node.js 24+
- Ollama running on `localhost:11434`
- A model pulled (e.g., `ollama pull qwen3:14b`)

## Installation

```bash
npm install
```

## Usage

### Web Interface

Start the server:

```bash
npm start
```

Open http://localhost:3000 in your browser.

### Programmatic Usage

```typescript
import { OllamaClient } from './src';

const client = new OllamaClient();
const response = await client.chat('qwen3:14b', [
  { role: 'user', content: 'Hello' }
]);

console.log(response.message.content);
```

### CLI Example

```bash
npm run example
```

## API Endpoints

- `POST /api/chat` - Send a message and get a response
- `POST /api/clear` - Clear conversation history

## Build

```bash
npm run build
```
