const locationCache = (function() {
  let timezone = '';
  let coordinates = {};

  const getTimezone = () => timezone;

  const setTimezone = (tz) => {
    timezone = tz;
  };

  const setCoordinates = (coords) => {
    coordinates = coords;
  };

  const getCoordinates = () => coordinates;
  return { getTimezone, setTimezone, getCoordinates, setCoordinates };
}());

module.exports = locationCache;
