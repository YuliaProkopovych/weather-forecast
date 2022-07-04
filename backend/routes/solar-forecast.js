const { getCoordinatesByLocationName } = require('../utils/geocoder');
const { getSunriseByCoordinatesAndDate } = require('../utils/getSunrise');
const locationCache = require('../utils/locationCache');

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
      const coordinates = Object.keys(locationCache.getCoordinates()).length !== 0
        ? locationCache.getCoordinates() : await getCoordinatesByLocationName(req.query.location);

      const solarData = await getSunriseByCoordinatesAndDate(coordinates, req.query.startDate, req.query.endDate, req.query.offset);

      reply.send({ solarData, coordinates });
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
