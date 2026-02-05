# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TypeScript client library for Ollama with a web chat interface. Requires Node.js 18+ (uses native fetch).

## Commands

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript to dist/
npm start            # Run web server on http://localhost:3000
npm run example      # Run CLI example
```

## Architecture

### Core Client (`src/`)

- `types.ts` - TypeScript interfaces for Ollama API (ChatMessage, ChatRequest, ChatResponse)
- `client.ts` - `OllamaClient` class that wraps Ollama's `/api/chat` endpoint
- `index.ts` - Public exports

### Web Interface

- `server.ts` - Express server with `/api/chat` and `/api/clear` endpoints, maintains conversation history in memory
- `public/index.html` - Single-page chat UI

### Usage

```typescript
import { OllamaClient } from "./src";
const client = new OllamaClient({ baseUrl: "http://localhost:11434" });
const response = await client.chat("qwen3:8b", [
  { role: "user", content: "Hello" },
]);
```

## Requirements

- Ollama running on `localhost:11434`
- A model pulled (e.g., `ollama pull qwen3:8b`)

## Code Style

- All code and comments must be written in English
- Before committing any changes, update README.md to reflect the changes
