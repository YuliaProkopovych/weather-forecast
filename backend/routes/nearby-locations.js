const geoip = require('geoip-lite');
const { getNearbyLocationsByCoordinates } = require('../utils/geocoder');

const getNearbyLocationsOpts = {
  schema: {
    querystring: {
      latitude: { type: 'string' },
      longitude: { type: 'string' },
    },
  },
  handler: async (req, reply) => {
    try {
      //const ipAddress = req.ip;
      const ipAddress = '188.230.87.110';
      const info = geoip.lookup(ipAddress);
      const coordinates = info.ll;
      const locationsList = await getNearbyLocationsByCoordinates(...coordinates);

      reply.send(locationsList);
    } catch (error) {
      console.error(error);
    }
  },
};

const nearbyLocationsRoute = (fastify, options, done) => {
  fastify.get('/nearby-locations', getNearbyLocationsOpts);
  done();
};

module.exports = nearbyLocationsRoute;
