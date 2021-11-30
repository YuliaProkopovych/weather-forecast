const axios = require('axios');

const getSunriseByCoordinatesAndDate = async (coordinates, date) => {
  console.log(date);
  const day = date.split('T')[0];

  const response = await axios.get(
    `https://api.met.no/weatherapi/sunrise/2.0/.json?lat=${coordinates.lat}&lon=${coordinates.lon}&date=${day}&offset=-05:00&days=10`,
    {
      headers: {
        'User-Agent': 'https://github.com/YuliaProkopovych/weather-forecast',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        Accept: '*/*',
      },
    },
  );

  console.log(response.data.location.time);

  return 'forecast';
};

module.exports = getSunriseByCoordinatesAndDate;
