import { whatsappService } from './services/whatsappService';

async function main() {
  console.log('Starting WhatsApp bot...');
  console.log('Scan the QR code with your WhatsApp app to connect.\n');

  await whatsappService.connect();
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
