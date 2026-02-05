import app from './src/app';
import { config } from './src/config';

const server = app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});

const gracefulShutdown = (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
