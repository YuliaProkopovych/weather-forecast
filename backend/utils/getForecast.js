const axios = require('axios');

getForecastByCoordinates = async (coordinates) => {
  const response = await axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${coordinates.lat}&lon=${coordinates.lon}`,
    { headers: {'User-Agent': 'https://github.com/YuliaProkopovych/weather-forecast',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Accept': '*/*'}
    }
  );

  const forecast = response.data['properties'].timeseries.map(
    entity => { return { time: entity.time, weather: entity.data.instant.details }}
  );

  return forecast;
}


module.exports = getForecastByCoordinates;
