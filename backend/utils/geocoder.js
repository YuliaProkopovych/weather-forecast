const axios = require('axios');

// const getCoordinatesByLocationName = async (query) => {
//   const queryparams = new URLSearchParams({
//     limit: 1,
//     q: query,
//     lang: 'en-US',
//     apiKey: process.env.HERE_API_KEY,
//   });

//   const start = new Date();
//   const res = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?${queryparams.toString()}`);
//   console.log('Geocoder request took:', new Date() - start, 'ms');
//   const coordinates = {
//     lat: Math.round(res.data.items[0].position.lat * 100) / 100,
//     lon: Math.round(res.data.items[0].position.lng * 100) / 100,
//   };

//   const res1 = await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${res.data.items[0].position.lat},${res.data.items[0].position.lng}&limit=50&lang=en-US&apiKey=${process.env.HERE_API_KEY}&types=city`);
//   console.log(res1.data.items);
//   return coordinates;
// };

const getNearbyLocationsByCoordinates = async (lat, lon) => {
  let latitudePlus = '';
  let longitudePlus = '';
  if (lat > 0) {
    latitudePlus = '+';
  }
  if (lon > 0) {
    longitudePlus = '+';
  }
  const options = {
    method: 'GET',
    url: `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latitudePlus}${lat}${longitudePlus}${lon}/nearbyCities`,
    params: { radius: '100', minPopulation: 50000, limit: 5 },
    headers: {
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      'x-rapidapi-key': 'fac2d7680fmshbbc35ebd3a07c03p10a358jsn7ae4816ea4bd',
    },
  };

  const res = await axios.request(options);

  const { data } = res;
  const locations = data.data.map((item) => {
    const {
      latitude, longitude,
    } = item;
    return axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=city&lang=en&limit=1&format=json&apiKey=69386fcf9d784091a2b4aa3b33b67113`);
  });
  const results = (await Promise.allSettled(locations)).map((result) => result.value.data.results[0]);

  return results;
};

module.exports = { getNearbyLocationsByCoordinates };
