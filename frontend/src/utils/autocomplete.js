import axios from 'axios';

const locationAutocomplete = async (query) => {
  console.log(query);
  const results = await axios.get(`https://autocomplete.search.hereapi.com/v1/autocomplete?limit=10&lang=en-US&q=${query}&apiKey=4SIwA2_PMQuFpVFrLJENdTsg6fZjhkgtHjvTu-xa6fc`);
  const locations = results.data.items.filter((place) => (place.resultType === 'locality')).map((item) => item.title);
  console.log(locations);
  return locations;
};

export default locationAutocomplete;
