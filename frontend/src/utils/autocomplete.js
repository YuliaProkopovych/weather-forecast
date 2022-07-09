import axios from 'axios';

const locationAutocomplete = async (query) => {
  const results = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&lang=en&limit=10&type=city&format=json&apiKey=69386fcf9d784091a2b4aa3b33b67113`);
  //const results = await axios.get(`https://autocomplete.search.hereapi.com/v1/autocomplete?limit=20&lang=en-US&q=${query}&apiKey=4SIwA2_PMQuFpVFrLJENdTsg6fZjhkgtHjvTu-xa6fc`);

  const locations = results.data.results.map((item) => {
    const formattedItem = {
      name: `${item.city}, ${item.district}, ${item.state}, ${item.country}`,
      coordinates: { lat: item.lat, lon: item.lon },
    };
    console.log(formattedItem);
    return formattedItem;
  });
  return locations;
};

export default locationAutocomplete;

//69386fcf9d784091a2b4aa3b33b67113
