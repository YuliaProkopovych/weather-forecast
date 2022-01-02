const axios = require('axios');
const luxon = require('luxon');

const getSunriseByCoordinatesAndDate = async (coordinates, startDate, endDate, offset) => {
  const end = luxon.DateTime.fromFormat(endDate, 'yyyy-MM-dd');
  const start = luxon.DateTime.fromFormat(startDate, 'yyyy-MM-dd');
  const interval = (end.diff(start, 'days')).days + 1;

  const request = axios.get(
    `https://api.met.no/weatherapi/sunrise/2.0/.json?lat=${coordinates.lat}&lon=${coordinates.lon}&date=${startDate}&offset=${offset}&days=${interval}`,
    {
      headers: {
        'User-Agent': 'https://github.com/YuliaProkopovych/weather-forecast',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        Accept: '*/*',
      },
    },
  );

  const response = await request;
  const data = response.data.location.time;
  data.pop();

  return data;
};

module.exports = getSunriseByCoordinatesAndDate;
