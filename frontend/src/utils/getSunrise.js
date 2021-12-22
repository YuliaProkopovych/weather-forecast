const getSunrise = async (location, date, offset) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location, date, offset }),
  };
  const response = await fetch('http://127.0.0.1:3000/solarForecast', requestOptions);

  const solarData = await response.json();
  console.log('solar', solarData);

  return solarData;
};

export default getSunrise;
