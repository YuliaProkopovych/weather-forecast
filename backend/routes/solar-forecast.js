const { getCoordinatesByLocationName } = require('../utils/geocoder');
const getSunrise = require('../utils/getSunrise');

const getSolarForecastOpts = {
  schema: {
    querystring: {
      location: { type: 'string' },
      startDate: { type: 'string' },
      endDate: { type: 'string' },
      offset: { type: 'string' },
    },
  },
  handler: async (req, reply) => {
    try {
      const coordinates = await getCoordinatesByLocationName(req.query.location);
      const solarData = await getSunrise(coordinates, req.query.startDate, req.query.endDate, req.query.offset);

      reply.send(solarData);
    } catch (error) {
      console.error(error);
    }
  },
};

const solarForecastRoute = (fastify, options, done) => {
  fastify.get('/solar-forecast', getSolarForecastOpts);
  done();
};

module.exports = solarForecastRoute;
