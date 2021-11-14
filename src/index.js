import WebSocket from 'ws';
import https from 'https';

const fastify = require('fastify')();

const agent = new https.Agent({
  rejectUnauthorized: false,
  keepAlive: true,
});

const ws = new WebSocket('wss://192.168.2.4', { agent });

ws.on('open', function open() {
  console.log('opened');
});

fastify.get('/volume-up', async (request, reply) => {
  ws.send('{"event":"v+"}');
  return { ok: true };
});

fastify.get('/volume-down', async (request, reply) => {
  ws.send('{"event":"v-"}');
  return { ok: true };
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(8082, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
