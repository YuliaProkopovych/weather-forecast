import React from 'react';
import {
  Box, Text,
} from 'grommet';
import { DateTime } from 'luxon';

import WeatherIcon from '../components/icons/WeatherIcon';

const renderIcon = (icon) => icon && <WeatherIcon path={`/icons/svg/${icon}.svg`} />;

const nightWeather = {
  property: 'night',
  header: 'Night',
  render: ({ night }) => renderIcon(night),
  align: 'center',
};
const morningWeather = {
  property: 'morning',
  header: 'Morning',
  render: ({ morning }) => renderIcon(morning),
  align: 'center',
};
const afternoonWeather = {
  property: 'afternoon',
  header: 'Afternoon',
  render: ({ afternoon }) => renderIcon(afternoon),
  align: 'center',
};
const eveningWeather = {
  property: 'evening',
  header: 'Evening',
  render: ({ evening }) => renderIcon(evening),
  align: 'center',
};

const temperature = {
  property: 'temperature',
  header: 'Max/min temp.',
  render: (object) => (
    <Box flex direction="row">
      <Text color={object.maxT > 0 ? 'aboveZero' : 'belowZero'}>
        {object.maxT}
        °
      </Text>
      <Text>{' / '}</Text>
      <Text color={object.minT > 0 ? 'aboveZero' : 'belowZero'}>
        {object.minT}
        °
      </Text>
    </Box>
  ),
  align: 'center',
};

const wideColumns = [
  {
    property: 'date',
    header: '',
    primary: true,
    align: 'center',
  },
  nightWeather,
  morningWeather,
  afternoonWeather,
  eveningWeather,
  temperature,
  {
    property: 'precipitations',
    header: 'Precipitations',
    render: ({ precipitations }) => (precipitations ? (
      <Text color="precip">
        {precipitations}
        {' '}
        mm
      </Text>
    ) : ''),
    align: 'center',
  },
  {
    property: 'wind',
    header: 'Wind',
    render: ({ wind }) => (
      <Text>
        {wind}
        {' '}
        m/s
      </Text>
    ),
    align: 'center',
  },
];

const mediumColumns = [
  {
    property: 'date',
    header: '',
    primary: true,
    render: ({ date }) => DateTime.fromFormat(date, 'dd MMMM').toFormat('dd.MM'),
  },
  nightWeather,
  morningWeather,
  afternoonWeather,
  eveningWeather,
  temperature,
  {
    property: 'precipitations',
    header: 'Precip.',
    render: ({ precipitations }) => (precipitations ? (
      <Text color="precip">
        {precipitations}
        {' '}
        mm
      </Text>
    ) : ''),
    align: 'center',
  },
  {
    property: 'wind',
    header: 'Wind',
    render: ({ wind }) => (
      <Text>
        {wind}
        {' '}
        m/s
      </Text>
    ),
    align: 'center',
  },
];

export { wideColumns, mediumColumns };
