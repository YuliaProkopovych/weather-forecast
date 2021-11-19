const axios = require('axios');

const getCoordinatesByQuery = async (query) => {

  const res = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?limit=1&q=${query}&lang=en-US&apiKey=4SIwA2_PMQuFpVFrLJENdTsg6fZjhkgtHjvTu-xa6fc`);

  const coordinates = { lat: Math.round(res.data.items[0].position.lat * 100) / 100, lon: Math.round(res.data.items[0].position.lng * 100) / 100 };
  console.log(coordinates);
  return coordinates;
}

module.exports = { getCoordinatesByQuery };
