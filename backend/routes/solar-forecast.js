const { getCoordinatesByLocationName } = require('../utils/geocoder');
const getSunrise = require('../utils/getSunrise');

const getSolarForecastOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['location', 'date', 'offset'],
    },
    // response: {
    //   200: { type: 'object' },
    // },
  },
  handler: async (req, reply) => {
    try {
      const coordinates = await getCoordinatesByLocationName(req.body.location);
      console.log(coordinates, req.body.date, req.body.offset);
      const solarData = await getSunrise(coordinates, req.body.date, req.body.offset);

      reply.send(solarData);
    } catch (error) {
      console.error(error);
    }
  },
};

const solarForecastRoute = (fastify, options, done) => {
  fastify.post('/solar-forecast', getSolarForecastOpts);
  done();
};

module.exports = solarForecastRoute;
