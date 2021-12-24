require('dotenv').config();

const fastify = require('fastify')({ logger: true });

const PORT = process.env.PORT || 3000;

fastify.register(require('fastify-cors'), { origin: true, credentials: true });

fastify.register(require('./routes/forecast'));
fastify.register(require('./routes/solar-forecast'));

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (e) {
    fastify.log.error(e, 'Unable to start the server');
  }
};

start();
