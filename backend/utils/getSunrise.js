const axios = require('axios');
const luxon = require('luxon');

const getSunriseByCoordinatesAndDate = async (coordinates, date, offset) => {
  const requests = [];

  for (let i = 0; i < 7; i += 1) {
    const nextDate = (new luxon.DateTime(date).plus({ days: i })).toFormat('yyyy-MM-dd');

    const request = axios.get(
      `https://api.met.no/weatherapi/sunrise/2.0/.json?lat=${coordinates.lat}&lon=${coordinates.lon}&date=${nextDate}&offset=${offset}`,
      {
        headers: {
          'User-Agent': 'https://github.com/YuliaProkopovych/weather-forecast',
          'Accept-Encoding': 'gzip, deflate, br',
          Connection: 'keep-alive',
          Accept: '*/*',
        },
      },
    );
    requests.push(request);
  }
  const res = await axios.all(requests);

  return res.map((item) => item.data.location.time[0]);
};

module.exports = getSunriseByCoordinatesAndDate;
