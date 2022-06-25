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

const getTimezoneByCoordinates = async (coordinates) => {
  const { lat, lon } = coordinates;
  const url = `http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=sunnyrain`;
  let response = {};

  try {
    response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }

  return response.data.dstOffset;
};

module.exports = { getSunriseByCoordinatesAndDate, getTimezoneByCoordinates };
