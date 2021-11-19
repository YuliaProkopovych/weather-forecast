import React from 'react';
import { Box, DataTable, Text } from 'grommet';

const WeatherComponent = ({ weather }) => {
  const columns = [
    {
      property: 'time',
      header: 'Time',
      primary: true,
    },
    {
      property: 'weather',
      header: 'Weather',
    },
    {
      property: 'temperature',
      header: 'Temperature',
      align: 'center',
    },
    {
      property: 'precipitations',
      header: <Text>Precip. mm</Text>,
      align: 'center',
    },
    {
      property: 'wind',
      header: <Text>Wind speed m/s</Text>,
    }
  ];

  return (
    <Box margin={{left: '20px'}}>
      <DataTable pad='medium' columns={columns} data={weather} step={weather.length} />
    </Box>
  );
};

export default WeatherComponent;