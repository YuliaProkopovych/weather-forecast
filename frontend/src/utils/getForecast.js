import { DateTime } from "luxon";

import { MyIcon } from "../components/icon";

const getForecast = async (location) => {
  console.log('getting forecast');
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location: location })
  };
  const response = await fetch('http://127.0.0.1:3000/forecast', requestOptions);

  const weather = await response.json();
  const formattedWeather = weather.map(entity => {

    return { time: DateTime.fromISO(entity.time).toFormat('ff'),
    weather: <MyIcon path={ `/icons/svg/${entity.symbol}.svg` }/>,
    temperature: entity.weather.air_temperature,
    precipations: '',
    wind: entity.weather.wind_speed
    }
  });
  console.log(formattedWeather);

  return formattedWeather;
}

export default getForecast;
