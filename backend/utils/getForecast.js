const axios = require('axios');

async function getForecastByCoordinates(coordinates) {
  const params = new URLSearchParams({
    ...coordinates,
  });
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?${params.toString()}`;

  const response = await axios.get(
    url,
    {
      headers: {
        'User-Agent': 'https://github.com/YuliaProkopovych/weather-forecast',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        Accept: '*/*',
      },
    },
  );

  const forecast = response.data.properties.timeseries.map((record) => {
    const formattedRecord = {
      time: record.time,
      weather: record.data.instant.details,
    };

    const next6Hours = record.data.next_6_hours;
    const nextHour = record.data.next_1_hours;

    if (next6Hours) {
      formattedRecord.next_6_hours = {
        symbol: next6Hours.summary.symbol_code,
        precipitations: next6Hours.details.precipitation_amount,
      };
    }

    if (nextHour) {
      formattedRecord.next_1_hours = {
        symbol: nextHour.summary.symbol_code,
        precipitations: nextHour.details.precipitation_amount,
      };
    }

    return formattedRecord;
  });

  return forecast;
}

module.exports = getForecastByCoordinates;
