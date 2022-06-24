const getNearbyLocationsList = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const url = `http://127.0.0.1:3000/nearby-locations`;
  const response = await fetch(url, requestOptions);
  const locationsList = await response.json();

  return locationsList;
};

export default getNearbyLocationsList;
