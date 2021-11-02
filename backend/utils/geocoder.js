const axios = require('axios');

const getCoordinatesByQuery = async (query) => {

  const res = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?limit=1&q=${query}&apiKey=4SIwA2_PMQuFpVFrLJENdTsg6fZjhkgtHjvTu-xa6fc`);

  const coordinates = { lat: Math.round(res.data.items[0].position.lat * 100) / 100, lon: Math.round(res.data.items[0].position.lng * 100) / 100 };
  console.log(coordinates);
  return coordinates;
}

const locationAutocomplete = async (query) => {
  const results = await axios.get(`https://autocomplete.search.hereapi.com/v1/autocomplete?limit=10&types=area&q=${query}&apiKey=4SIwA2_PMQuFpVFrLJENdTsg6fZjhkgtHjvTu-xa6fc`);
  console.log(results.data);
  return results;
}

module.exports = { getCoordinatesByQuery, locationAutocomplete };
