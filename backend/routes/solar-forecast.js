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

      const timezone = Object.keys(locationCache.getTimezone()).length !== 0
        ? locationCache.getTimezone() : (await getTimezoneByCoordinates(coordinates));

      const { offset } = timezone;
      let offsetString = `${Math.abs(Math.trunc(offset))}:${60 * (offset % 1)}`;

      if (Math.abs(offset) < 10) {
        offsetString = `0${offsetString}`;
      }
      if (offset % 1 === 0) {
        offsetString = `${offsetString}0`;
      }
      if (offset >= 0) {
        offsetString = `+${offsetString}`;
      } else {
        offsetString = `-${offsetString}`;
      }

      const solarData = await getSunriseByCoordinatesAndDate(coordinates, req.query.startDate, req.query.endDate, offsetString);

      reply.send({ solarData, coordinates, timezone });
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
