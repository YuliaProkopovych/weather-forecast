import groupForecastRecordsByDate from './groupForecastRecordsByDate';

const getForecast = async (location) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location }),
  };
  const response = await fetch('http://127.0.0.1:3000/forecast', requestOptions);

  const weather = await response.json();

  return groupForecastRecordsByDate(weather);
};

export default getForecast;
