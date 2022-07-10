import axios from 'axios';

const locationAutocomplete = async (query) => {
  const results = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&lang=en&limit=20&type=city&format=json&apiKey=69386fcf9d784091a2b4aa3b33b67113`);
  //const results = await axios.get(`https://autocomplete.search.hereapi.com/v1/autocomplete?limit=20&lang=en-US&q=${query}&apiKey=4SIwA2_PMQuFpVFrLJENdTsg6fZjhkgtHjvTu-xa6fc`);

  const locations = results.data.results.map((item) => {
    let name = item.city;
    if (item.district) {
      name = `${name}, ${item.district}`;
    }
    if (item.county) {
      name = `${name}, ${item.county}`;
    }
    if (item.state) {
      name = `${name}, ${item.state}`;
    }
    if (item.country) {
      name = `${name}, ${item.country}`;
    }
    const formattedItem = {
      name,
      coordinates: { lat: item.lat, lon: item.lon },
    };
    return formattedItem;
  }).filter((item, index, self) => index === self.findIndex((el) => (
    el.name === item.name
  )));
  return locations;
};

export default locationAutocomplete;

//69386fcf9d784091a2b4aa3b33b67113
