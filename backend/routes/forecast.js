const axios = require('axios');

const { getCoordinatesByQuery, locationAutocomplete } = require('../utils/geocoder');
const getForecast = require('../utils/getForecast');

const forecastRoute = (fastify, options, done) => {
  fastify.post('/forecast', getForecastOpts);
  done();
};
//write schema??
const getForecastOpts = {
  handler: async (req, reply) => {
    try {

      const coordinates = await getCoordinatesByQuery(req.location);
      console.log(coordinates);

      const forecast = await getForecast(coordinates);
      reply.send(forecast);
    }
    catch (error) {
      console.log(error);
    }


  },
};

module.exports = forecastRoute;
