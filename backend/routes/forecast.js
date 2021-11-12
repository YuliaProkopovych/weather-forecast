const axios = require('axios');

const { getCoordinatesByQuery, locationAutocomplete } = require('../utils/geocoder');
const getForecast = require('../utils/getForecast');

const forecastRoute = (fastify, options, done) => {
  fastify.post('/forecast', getForecastOpts);
  done();
};

const getForecastOpts = {
  schema: {
    body: {
    type: 'object',
    required: ['location'],
  },
  response: {
    200: { type: 'array'},
  },
},
    handler: async (req, reply) => {
    try {
      console.log(req.body.location);
      const coordinates = await getCoordinatesByQuery(req.body.location);


      const forecast = await getForecast(coordinates);
      reply.send(forecast);
    }
    catch (error) {
      console.log(error);
    }


  },
};

module.exports = forecastRoute;
