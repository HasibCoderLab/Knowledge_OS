import { env, connectDatabase } from './config/index.js';
import app from './app.js';

async function bootstrap(): Promise<void> {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`\n🔥 KnowledgeOS API Server`);
    console.log(`   Environment: ${env.nodeEnv}`);
    console.log(`   Port: ${env.port}`);
    console.log(`   URL: http://localhost:${env.port}`);
    console.log(`   API: http://localhost:${env.port}/api/v1\n`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
