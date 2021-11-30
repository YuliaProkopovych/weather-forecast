const axios = require('axios');

const getCoordinatesByLocationName = async (query) => {
  const queryparams = new URLSearchParams({
    limit: 1,
    q: query,
    lang: 'en-US',
    apiKey: process.env.HERE_API_KEY,
  });
  const res = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?${queryparams.toString()}`);

  const coordinates = {
    lat: Math.round(res.data.items[0].position.lat * 100) / 100,
    lon: Math.round(res.data.items[0].position.lng * 100) / 100,
  };

  return coordinates;
};

module.exports = { getCoordinatesByLocationName };
