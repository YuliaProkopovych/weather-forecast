//import axios from "axios";
import { DateTime } from "luxon";

const getForecast = async (location) => {
  console.log('getting forecast');
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location: location })
  };
  const response = await fetch('http://127.0.0.1:3000/forecast', requestOptions);

  const weather = await response.json();
  console.log('weather not formatted', weather);
  const formattedWeather = weather.map(entity => {
    return { time: DateTime.fromISO(entity.time).toFormat('ff'),
    weather: 'entity.weather',
    temperature: entity.weather.air_temperature,
    precipations: '',
    wind: entity.weather.wind_speed
    }
  });
  console.log(formattedWeather);

  return formattedWeather;
}

// const formatForecast = (forecast) => {

//   const formatted = forecast.map(entity => {
//     return { time: DateTime.fromISO(entity.time).toFormat('ff'),
//     weather: 'entity.weather',
//     temperature: entity.weather.air_temperature,
//     precipations: '',
//     wind: entity.weather.wind_speed
//     }
//   });
//   console.log(formatted);
//   return formatted;

// }

export default getForecast;
