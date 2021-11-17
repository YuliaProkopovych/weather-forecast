const axios = require('axios');

getForecastByCoordinates = async (coordinates) => {
  const response = await axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${coordinates.lat}&lon=${coordinates.lon}`,
    { headers: {'User-Agent': 'https://github.com/YuliaProkopovych/weather-forecast',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Accept': '*/*'}
    }
  );

  response.data['properties'].timeseries.map(item => {console.log(item.data)});

  const forecast = response.data['properties'].timeseries.map(
    entity => ({ time: entity.time, weather: entity.data.instant.details, symbol: entity.data.next_1_hours ? entity.data.next_1_hours.summary.symbol_code : entity.data.next_6_hours?.summary.symbol_code })
  );

  return forecast;
}


module.exports = getForecastByCoordinates;
