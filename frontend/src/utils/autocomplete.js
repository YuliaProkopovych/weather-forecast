import axios from 'axios';
import formatLocations from './formatLocations';

const locationAutocomplete = async (query) => {
  const results = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&lang=en&limit=20&type=city&format=json&apiKey=69386fcf9d784091a2b4aa3b33b67113`);

  const locations = formatLocations(results.data.results);

  return locations;
};

export default locationAutocomplete;

//69386fcf9d784091a2b4aa3b33b67113
