const axios = require('axios');
const luxon = require('luxon');

const getSunriseByCoordinatesAndDate = async (coordinates, startDate, endDate, offset) => {
  const end = luxon.DateTime.fromFormat(endDate, 'yyyy-MM-dd');
  const start = luxon.DateTime.fromFormat(startDate, 'yyyy-MM-dd');
  const interval = (end.diff(start, 'days')).days + 1;

  const start1 = new Date();
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
  console.log('Sunrise request took:', new Date() - start1, 'ms');

  const response = await request;
  const data = response.data.location.time;
  data.pop();

  return data;
};

const getTimezoneByCoordinates = async (coordinates) => {
  const { lat, lon } = coordinates;
  const url = `https://www.timeapi.io/api/TimeZone/coordinate?latitude=${lat}&longitude=${lon}`;
  let response = {};

  try {
    const start = new Date();
    response = await axios.get(url);
    console.log('Timezone request took:', new Date() - start, 'ms');
  } catch (err) {
    console.log(err);
  }

  const currentOffset = parseFloat(response.data.currentUtcOffset.seconds) / 3600;

  return { offset: currentOffset, timezoneId: response.data.timeZone };
};

module.exports = { getSunriseByCoordinatesAndDate, getTimezoneByCoordinates };
