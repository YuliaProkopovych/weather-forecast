const formatLocations = (locations) => {
  const formattedLocations = locations.map((item) => {
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
  return formattedLocations;
};

export default formatLocations;
