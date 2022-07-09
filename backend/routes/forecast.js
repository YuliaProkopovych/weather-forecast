const { getTimezoneByCoordinates } = require('../utils/getSunrise');
const getForecast = require('../utils/getForecast');
const locationCache = require('../utils/locationCache');

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
      //let location = '';
      // let coordinates;
      // if (/[0-9]+,[0-9]+/.test(req.body.query)) {
      //   const [, lat, lon, ...rest] = req.body.query.match(/[0-9]+,[0-9]+/);
      //   coordinates = { lat, lon };
      // } else {
      //   console.log(req.body.query);
      //   //location = req.body.query;
      //   coordinates = req.body.query;
      // }

      const coordinates = req.body.query;

      const forecast = await getForecast(coordinates);
      const timezone = await getTimezoneByCoordinates(coordinates);

      locationCache.setTimezone(timezone);
      locationCache.setCoordinates(coordinates);

      reply.send({
        coordinates, forecast, ...timezone,
      });
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
