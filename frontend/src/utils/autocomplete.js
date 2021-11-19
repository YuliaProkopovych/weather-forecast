import axios from "axios";

const locationAutocomplete = async (query) => {
  const results = await axios.get(`https://autocomplete.search.hereapi.com/v1/autocomplete?limit=20&lang=en-US&q=${query}&apiKey=4SIwA2_PMQuFpVFrLJENdTsg6fZjhkgtHjvTu-xa6fc`);
  const locations = results.data.items.filter(place => {
    //console.log(place.resultType, place?.localityType, place?.administrativeAreaType);
    return (place.resultType === 'locality' && place.localityType === 'city') || (place.resultType === 'locality' && place.localityType === 'district')
  }).map(item => item.title);
  return locations;
}

export default locationAutocomplete;
