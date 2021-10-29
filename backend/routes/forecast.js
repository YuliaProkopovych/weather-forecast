const axios = require('axios');

const forecastRoute = (fastify, options, done) => {
  fastify.get('/forecast', getForecastOpts);
  done();
};

const getForecastOpts = {

  handler: async (req, reply) => {
    try {
      const response = await axios.get('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=51.5&lon=0',
        { headers: {'User-Agent': 'https://github.com/YuliaProkopovych/weather-forecast',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Accept': '*/*'}
        }
      );

      const forecast = response.data['properties'].timeseries.map(
        entity => { return { time: entity.time, weather: entity.data.instant.details }}
      );
      reply.send(forecast);
    }
    catch (error) {
      console.log(error);
    }

  },
};

module.exports = forecastRoute;
