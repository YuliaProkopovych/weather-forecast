import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, DataTable, Heading, Text,
} from 'grommet';

import WeatherIcon from './icons/WeatherIcon';
import WindDirectionIcon from './icons/WindDirectionIcon';

function DetailedForecast({ forecastRecord }) {
  const columns = [
    {
      property: 'time',
      header: 'Time',
      primary: true,
    },
    {
      property: 'weather',
      header: 'Weather',
      render: (record) => {
        const symbol = record.next_1_hours ? record.next_1_hours.symbol : record.next_6_hours.symbol;
        return <WeatherIcon path={`/icons/svg/${symbol}.svg`} />;
      },
    },
    {
      property: 'temperature',
      header: 'Temperature',
      align: 'center',
      render: (record) => (
        <Text color={record.weather.air_temperature > 0 ? 'aboveZero' : 'belowZero'}>
          {`${record.weather.air_temperature}°`}
        </Text>
      ),
    },
    {
      property: 'precipitations',
      header: <Text>Precip. mm</Text>,
      align: 'center',
      render: (record) => (
        record.next_1_hours ? record.next_1_hours.precipitations : record.next_6_hours.precipitations
      ),
    },
    {
      property: 'wind',
      header: <Text>Wind speed m/s</Text>,
      render: (record) => (
        <Box direction="row" justify="evenly">
          <Text>{ record.weather.wind_speed }</Text>
          <WindDirectionIcon angle={record.weather.wind_from_direction} />
        </Box>
      ),
    },
  ];

  return (
    <Box margin="20px">
      <Heading level="2">{forecastRecord.date}</Heading>
      <DataTable pad="small" columns={columns} data={forecastRecord.forecast} size="large" />
    </Box>
  );
}

DetailedForecast.propTypes = {
  forecastRecord: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default DetailedForecast;
