require('dotenv').config();

const fastify = require('fastify')({ logger: true });

const PORT = 7402;

fastify.register(require('fastify-cors'), { origin: ['http://localhost:3000', 'http://192.168.0.104:3000'], credentials: true });

fastify.register(require('./routes/forecast'));
fastify.register(require('./routes/solar-forecast'));
fastify.register(require('./routes/nearby-locations'));

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (e) {
    fastify.log.error(e, 'Unable to start the server');
  }
};

start();
