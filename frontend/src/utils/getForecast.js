import { DateTime } from "luxon";

import { WeatherIcon, WindDirectionIcon } from "../components/icon";
import { Box, Text } from 'grommet';

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
    weather: <WeatherIcon path={ `/icons/svg/${entity.symbol}.svg` }/>,
    temperature: entity.weather.air_temperature,
    precipations: '',
    wind: <Box direction='row' justify='evenly'>
        <Text margin={{right: '10px'}}>{ entity.weather.wind_speed }</Text>
        <WindDirectionIcon angle={ 180 + entity.weather.wind_from_direction } />
      </Box>
    }
  });
  console.log(formattedWeather);

  return formattedWeather;
}

export default getForecast;
