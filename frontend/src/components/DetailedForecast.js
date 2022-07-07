import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box, DataTable, Heading, Text, ResponsiveContext,
} from 'grommet';

import { Close } from 'grommet-icons';
import WeatherIcon from './icons/WeatherIcon';
import WindDirectionIcon from './icons/WindDirectionIcon';

function DetailedForecast({ forecastRecord, closeItself }) {
  const screenSize = useContext(ResponsiveContext);

  const columns = [
    {
      property: 'time',
      header: screenSize !== 'small' ? 'Time' : '',
      primary: true,
    },
    {
      property: 'weather',
      header: screenSize !== 'small' ? 'Weather' : '',
      render: (record) => {
        const symbol = record.next_1_hours ? record.next_1_hours.symbol : record.next_6_hours.symbol;
        return <WeatherIcon path={`/icons/svg/${symbol}.svg`} />;
      },
    },
    {
      property: 'temperature',
      header: screenSize !== 'small' ? 'Temperature' : <Text pad="small" size="small">Temp.</Text>,
      align: 'center',
      render: (record) => (
        <Text color={record.weather.air_temperature > 0 ? 'aboveZero' : 'belowZero'}>
          {`${record.weather.air_temperature}°`}
        </Text>
      ),
    },
    {
      property: 'precipitations',
      header: <Text size={screenSize === 'small' && 'small'}>Precip. mm</Text>,
      align: 'center',
      render: (record) => (
        <Text color="precip">{record.next_1_hours ? record.next_1_hours.precipitations : record.next_6_hours.precipitations}</Text>
      ),
    },
    {
      property: 'wind',
      header: <Text size={screenSize === 'small' && 'small'}>Wind speed m/s</Text>,
      render: (record) => (
        <Box direction="row" justify="evenly">
          <Text>{ record.weather.wind_speed }</Text>
          <WindDirectionIcon angle={record.weather.wind_from_direction} />
        </Box>
      ),
    },
  ];

  return (
    <Box pad="medium" gap="25px">
      <Box direction="row" justify="between" pad="small">
        <Heading level="2" margin="none">{forecastRecord.date}</Heading>
        <Box onClick={() => closeItself()} focusIndicator={false}>
          <Close />
        </Box>
      </Box>
      <Box overflow="scroll">
        <DataTable columns={columns} data={forecastRecord.forecast} />
      </Box>
    </Box>
  );
}

DetailedForecast.propTypes = {
  forecastRecord: PropTypes.objectOf(PropTypes.array).isRequired,
  closeItself: PropTypes.func.isRequired,
};

export default DetailedForecast;
