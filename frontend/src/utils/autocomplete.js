import axios from 'axios';
import formatLocations from './formatLocations';

const locationAutocomplete = async (query) => {
  const results = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&lang=en&limit=20&type=city&format=json&apiKey=69386fcf9d784091a2b4aa3b33b67113`);
  //const results = await axios.get(`https://autocomplete.search.hereapi.com/v1/autocomplete?limit=20&lang=en-US&q=${query}&apiKey=4SIwA2_PMQuFpVFrLJENdTsg6fZjhkgtHjvTu-xa6fc`);

  const locations = formatLocations(results.data.results);

  return locations;
};

export default locationAutocomplete;

//69386fcf9d784091a2b4aa3b33b67113
