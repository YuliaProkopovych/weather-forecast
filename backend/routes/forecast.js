const { getCoordinatesByLocationName } = require('../utils/geocoder');
const getForecast = require('../utils/getForecast');

const getForecastOpts = {
  schema: {
    body: {
      type: 'object',
    },
    response: {
      // 200: { type: 'object' },
    },
  },
  handler: async (req, reply) => {
    try {
      let location = '';
      let coordinates;
      if (/[0-9]+,[0-9]+/.test(req.body.query)) {
        const [, lat, lon, ...rest ] = req.body.query.match(/[0-9]+,[0-9]+/);
        coordinates = { lat, lon };
      } else {
        location = req.body.query;
        coordinates = await getCoordinatesByLocationName(location);
      }

      const forecast = await getForecast(coordinates);

      reply.send({ location, coordinates, forecast });
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
