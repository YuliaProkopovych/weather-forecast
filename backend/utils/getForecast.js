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
    record => {
      let formattedRecord = { time: record.time,
        weather: record.data.instant.details
      };

      if (record.data.next_6_hours) {
        formattedRecord.next_6_hours = {symbol: record.data.next_6_hours.summary.symbol_code, precipitations: record.data.next_6_hours.details.precipitation_amount}
      };

      if (record.data.next_1_hours) {
        formattedRecord.next_1_hours = {symbol: record.data.next_1_hours.summary.symbol_code, precipitations: record.data.next_1_hours.details.precipitation_amount}
      };

      return formattedRecord;
    }
  );

  return forecast;
}


module.exports = getForecastByCoordinates;
