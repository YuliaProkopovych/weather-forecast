import React from 'react';
import { Box, DataTable, Text } from 'grommet';
import { WeatherIcon, WindDirectionIcon } from "../components/icon";

const WeatherPreviewComponent = ({ data }) => {

  const formattedData = data.map( ( record, index ) => {
    const { date, forecast } = record;
    let symbols = {};

    if (index === 0 ) {
      if ( forecast[0].time < '08:00' ) {
        symbols.night = forecast[0].next_6_hours.symbol;
        symbols.morning = (forecast.find(item => (item.time === '08:00'))).next_6_hours.symbol;
        symbols.afternoon = (forecast.find(item => (item.time === '14:00'))).next_6_hours.symbol;
        symbols.evening = (forecast.find(item => (item.time === '20:00'))).next_6_hours.symbol;
      } else if ( forecast[0].time < '14:00' ) {
        symbols.morning = forecast[0].next_6_hours.symbol;
        symbols.afternoon = (forecast.find(item => (item.time === '14:00'))).next_6_hours.symbol;
        symbols.evening = (forecast.find(item => (item.time === '20:00'))).next_6_hours.symbol;
      } else if ( forecast[0].time < '20:00' ){
        symbols.afternoon = forecast[0].next_6_hours.symbol;
        symbols.evening = (forecast.find(item => (item.time === '20:00'))).next_6_hours.symbol;
      } else {
        symbols.evening = forecast[0].next_6_hours.symbol;
      }
    } else {
      symbols.night = (forecast.find(item => (item.time === '02:00'))).next_6_hours.symbol;
      symbols.morning = (forecast.find(item => (item.time === '08:00'))).next_6_hours.symbol;
      symbols.afternoon = (forecast.find(item => (item.time === '14:00'))).next_6_hours.symbol;
      symbols.evening = (forecast.find(item => (item.time === '20:00'))).next_6_hours.symbol;
    }

    const maxT = forecast.reduce(
      ( max, current ) => ( max > current.weather.air_temperature ? max : current.weather.air_temperature ),
      forecast[0].weather.air_temperature
    );
    const minT = forecast.reduce(
      ( min, current ) => ( min < current.weather.air_temperature ? min : current.weather.air_temperature ),
      forecast[0].weather.air_temperature
    );

    const precip = Math.round(
      forecast.reduce(
      ( sum, current ) => current.next_1_hours ? sum + current.next_1_hours.precipitations : sum + current.next_6_hours.precipitations,
      0
    ) * 100 ) / 100;

    const wind = Math.round(
      forecast.reduce(( sum, current ) => sum + current.weather.wind_speed, 0) / forecast.length
    );

    return { date: date, minT: minT, maxT: maxT, precipitations: precip, wind: wind, ...symbols };
  });

  const columns = [
    {
      property: 'date',
      header: '',
      primary: true,
    },
    {
      property: 'night',
      header: 'Night',
      render: ({ night }) => night && <WeatherIcon path={ `/icons/svg/${night}.svg` }/>,
    },
    {
      property: 'morning',
      header: 'Morning',
      render: ({ morning }) => morning && <WeatherIcon path={ `/icons/svg/${morning}.svg` }/>,
    },
    {
      property: 'afternoon',
      header: 'Afternoon',
      render: ({ afternoon }) => afternoon && <WeatherIcon path={ `/icons/svg/${afternoon}.svg` }/>,
    },
    {
      property: 'evening',
      header: 'Evening',
      render: ({ evening }) => evening && <WeatherIcon path={ `/icons/svg/${evening}.svg` }/>,
    },
    {
      property: 'temperature',
      header: 'max/min temp.',
      render: (object) =>
      <Box flex direction='row'>
        <Text color={object.maxT > 0 ? '#9e0000' : '#0202a1'}>{object.maxT}°</Text>
        <Text> / </Text>
        <Text color={object.minT > 0 ? '#9e0000' : '#0202a1'}>{object.minT}°</Text>
      </Box>,
    },
    {
      property: 'precipitations',
      header: 'Precipitations',
      render: ({ precipitations }) => precipitations && <Text>{precipitations} mm</Text>
    },
    {
      property: 'wind',
      header: 'Wind',
      render: ({ wind }) => <Text>{wind} m/s</Text>
    },
    {
      property: 'open',
      header: '',
    }
  ];

  return (
    <Box margin={{left: '20px'}}>
      <DataTable pad='medium' columns={columns} data={formattedData} step={data.length} />
    </Box>
  );
};

export default WeatherPreviewComponent;
