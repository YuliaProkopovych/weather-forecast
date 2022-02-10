const { getCoordinatesByLocationName } = require('../utils/geocoder');
const getForecast = require('../utils/getForecast');

const getForecastOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['location'],
    },
    response: {
      200: { type: 'array' },
    },
  },
  handler: async (req, reply) => {
    try {
      let coordinates;
      if (!/lat=.+\&lon=.+/.test(req.body.location)) {
        coordinates = await getCoordinatesByLocationName(req.body.location);
      } else {
        const [, lat, lon, ...rest ] = req.body.location.match(/lat=(.+)\&lon=(.+)/);
        coordinates = { lat, lon };
      }

      const forecast = await getForecast(coordinates);

      reply.send(forecast);
    } catch (error) {
      console.error(error);
    }
  },
};

const forecastRoute = (fastify, options, done) => {
  fastify.post('/forecast', getForecastOpts);
  done();
};

module.exports = forecastRoute;
