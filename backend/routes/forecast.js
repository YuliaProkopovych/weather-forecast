const axios = require('axios');

const forecastRoute = (fastify, options, done) => {
  fastify.get('/forecast', getForecastOpts);
  done();
};

const getForecastOpts = {
  handler: async (req, reply) => {
    try {
      // const { city } = req.query;

      // const coordinates = await getCoordinatesByCity(city);

      // const weather = await fetchWeather(coordinates);

      // reply.send(weather);


      const city = 'Lviv';

      const res = await axios.get(`https://nominatim.openstreetmap.org/search?q=${city}&format=json`);

      const coordinates = { lat: Math.round(res.data[0].lat * 100) / 100, lon: Math.round(res.data[1].lon * 100) / 100 };
      console.log(coordinates);

      const response = await axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${coordinates.lat}&lon=${coordinates.lat}`,
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
