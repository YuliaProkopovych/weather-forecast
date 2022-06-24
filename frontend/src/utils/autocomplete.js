import axios from 'axios';

const locationAutocomplete = async (query) => {
  const results = await axios.get(`https://autocomplete.search.hereapi.com/v1/autocomplete?limit=20&lang=en-US&q=${query}&apiKey=4SIwA2_PMQuFpVFrLJENdTsg6fZjhkgtHjvTu-xa6fc`);
  const locations = results.data.items.filter((place) => (
    place.resultType === 'locality' || (place.resultType === 'administrativeArea' && (place.administrativeAreaType !== 'country' || place.administrativeAreaType !== 'county'))
  )).map((item) => { console.log(item); return item.address.label; });
  return locations;
};

export default locationAutocomplete;
