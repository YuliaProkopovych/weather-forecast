const { getCoordinatesByLocationName } = require('../utils/geocoder');
const { getSunriseByCoordinatesAndDate, getTimezoneByCoordinates } = require('../utils/getSunrise');
const locationCache = require('../utils/locationCache');

const getSolarForecastOpts = {
  schema: {
    querystring: {
      location: { type: 'string' },
      startDate: { type: 'string' },
      endDate: { type: 'string' },
    },
  },
  handler: async (req, reply) => {
    try {
      const coordinates = Object.keys(locationCache.getCoordinates()).length !== 0
        ? locationCache.getCoordinates() : await getCoordinatesByLocationName(req.query.location);

      let offset = locationCache.getTimezone().dstOffset !== undefined
        ? locationCache.getTimezone().dstOffset : (await getTimezoneByCoordinates(coordinates)).dstOffset;

      let offsetString = '';

      if (Math.abs(offset) <= 10) {
        offsetString = `0${Math.abs(offset)}:00`;
      }
      if (offset >= 0) {
        offsetString = `+${offsetString}`;
      } else {
        offset = `-${offsetString}`;
      }

      const solarData = await getSunriseByCoordinatesAndDate(coordinates, req.query.startDate, req.query.endDate, offsetString);

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
