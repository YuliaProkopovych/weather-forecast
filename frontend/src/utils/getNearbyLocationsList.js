const getNearbyLocationsList = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const url = `http://localhost:7402/nearby-locations`;
  const response = await fetch(url, requestOptions);
  const locationsList = await response.json();

  return locationsList;
};

export default getNearbyLocationsList;
