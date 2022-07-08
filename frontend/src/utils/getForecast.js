import groupForecastRecordsByDate from './groupForecastRecordsByDate';

const getForecast = async (query) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  };
  const response = await fetch('http://127.0.0.1:3000/forecast', requestOptions);

  const data = await response.json();
  const {
    location, coordinates, forecast, offset, timezoneId,
  } = data;
  return {
    location, coordinates, offset, forecast: groupForecastRecordsByDate(forecast, timezoneId),
  };
};

export default getForecast;
