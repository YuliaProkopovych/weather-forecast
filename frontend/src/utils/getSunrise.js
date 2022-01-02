import { DateTime, Duration } from 'luxon';

const getSunrise = async (location, firstDate, lastDate) => {
  const startDate = DateTime.fromISO(firstDate).toFormat('yyyy-MM-dd');
  const endDate = DateTime.fromISO(lastDate).toFormat('yyyy-MM-dd');
  const offsetInMinutes = DateTime.now().offset;
  let offset = Duration.fromObject({ minutes: offsetInMinutes }).toFormat('hh:mm');
  if (offset[0] !== '-') {
    offset = `+${offset}`;
  }

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const url = `http://127.0.0.1:3000/solar-forecast?location=${location}&startDate=${startDate}&endDate=${endDate}&offset=${offset}`
  const response = await fetch(url, requestOptions);

  const solarData = await response.json();


  return solarData;
};

export default getSunrise;
