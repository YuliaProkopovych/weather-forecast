import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, DataTable, Heading, Text, ResponsiveContext, Grommet,
} from 'grommet';

import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

import { Close } from 'grommet-icons';
import WeatherIcon from './icons/WeatherIcon';
import WindDirectionIcon from './icons/WindDirectionIcon';

function DetailedForecast({ forecastRecord, closeItself }) {
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
        <Text color="precip">{record.next_1_hours ? record.next_1_hours.precipitations : record.next_6_hours.precipitations}</Text>
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

  const smallColumns = [
    {
      property: 'time',
      header: '',

      render: (record) => (<Box pad="medium"><Text>{record.time}</Text></Box>),
      plain: true,
    },
    {
      property: 'weather',
      primary: true,
      header: '',
      render: (record) => {
        const symbol = record.next_1_hours ? record.next_1_hours.symbol : record.next_6_hours.symbol;
        return <WeatherIcon path={`/icons/svg/${symbol}.svg`} />;
      },
      plain: true,
    },
    {
      property: 'temperature',
      header: <Text pad="small" size="small">Temp.</Text>,
      align: 'center',
      render: (record) => (
        <Text color={record.weather.air_temperature > 0 ? 'aboveZero' : 'belowZero'}>
          {`${record.weather.air_temperature}°`}
        </Text>
      ),
      plain: true,
    },
    {
      property: 'precipitations',
      header: <Text size="small">Precip. mm</Text>,
      align: 'center',
      render: (record) => (
        <Text color="precip">{record.next_1_hours ? record.next_1_hours.precipitations : record.next_6_hours.precipitations}</Text>
      ),
      plain: true,
    },
    {
      property: 'wind',
      header: <Text size="small">Wind speed m/s</Text>,
      render: (record) => (
        <Box direction="row" justify="evenly" align="center">
          <Text>{ record.weather.wind_speed }</Text>
          <WindDirectionIcon size="20px" angle={record.weather.wind_from_direction} />
        </Box>
      ),
      plain: true,
    },
  ];

  return (
    <Box margin="medium" overflow="scroll">
      <Box direction="row" justify="between">
        <Heading level="2">{forecastRecord.date}</Heading>
        <Box margin={{ top: 'medium', right: 'medium' }}>
          <Close onClick={() => closeItself()} />
        </Box>
      </Box>
      <Box flex={false}>
        <ResponsiveContext.Consumer>
          {(size) => (
            <DataTable columns={size !== 'small' ? columns : smallColumns} data={forecastRecord.forecast} />
          )}
        </ResponsiveContext.Consumer>
      </Box>
    </Box>
  );
}

DetailedForecast.propTypes = {
  forecastRecord: PropTypes.objectOf(PropTypes.array).isRequired,
  closeItself: PropTypes.func.isRequired,
};

export default DetailedForecast;
