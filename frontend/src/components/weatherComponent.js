import React from 'react';
import { Box, DataTable, Heading, Text } from 'grommet';

import { WeatherIcon, WindDirectionIcon } from "../components/icon";

const WeatherComponent = ({ forecastRecord }) => {
  console.log(forecastRecord);

  const columns = [
    {
      property: 'time',
      header: 'Time',
      primary: true,
    },
    {
      property: 'weather',
      header: 'Weather',
      render: ( record ) => {
        const symbol = record.next_1_hours ? record.next_1_hours.symbol : record.next_6_hours.symbol;
        return <WeatherIcon path={ `/icons/svg/${symbol}.svg` }/>
      }
    },
    {
      property: 'temperature',
      header: 'Temperature',
      align: 'center',
      render: ( record ) =>
        <Text color={record.weather.air_temperature > 0 ? '#9e0000' : '#0202a1'}>
          {`${record.weather.air_temperature}°`}
        </Text>
    },
    {
      property: 'precipitations',
      header: <Text>Precip. mm</Text>,
      align: 'center',
      render: ( record ) => record.next_1_hours ? record.next_1_hours.precipitations : record.next_6_hours.precipitations
    },
    {
      property: 'wind',
      header: <Text>Wind speed m/s</Text>,
      render: ( record ) =>
        <Box direction='row' justify='evenly'>
          <Text >{ record.weather.wind_speed }</Text>
          <WindDirectionIcon angle={ 180 + record.weather.wind_from_direction } />
        </Box>
    }
  ];

  return (
    <Box margin='20px'>
      <Heading level='2'>{forecastRecord.date}</Heading>
      <DataTable pad='small' columns={columns} data={forecastRecord.forecast} size="large"  />
    </Box>
  );
};

export default WeatherComponent;
