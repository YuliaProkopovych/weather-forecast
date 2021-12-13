import React from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import {
  Box, Image, Text, Card,
} from 'grommet';
import styled from 'styled-components';

import WeatherIcon from './icons/WeatherIcon';

function SmallForecast({ forecast }) {
  const renderIcon = (icon) => icon && <WeatherIcon path={`/icons/svg/${icon}.svg`} />;
  const DetailsText = styled(Text)`
    font-size: 16px;
  `;
  const DayTimeText = styled(Text)`
    font-size: 14px;
    color: #666;
    `;

  return (
    <Box>
      {forecast.map((record) => (
        <Card background="semitransparent-white" direction="column" pad={{ vertical: 'large' }} margin={{ top: '20px' }}>
          <Box pad={{ horizontal: 'medium' }}>
            <Text>{DateTime.fromFormat(record.date, 'dd MMMM').toFormat('EEEE, d MMMM')}</Text>
          </Box>
          <Box direction="row" justify="between" pad="medium">
            <Box direction="row" align="end">
              <Box
                height="35px"
                width="35px"
              >
                <Image
                  fit="cover"
                  src="/icons/svg/thermometer2.svg"
                />
              </Box>
              <Text size="16px" color={record.maxT > 0 ? 'aboveZero' : 'belowZero'}>
                {record.maxT}
                °
              </Text>
              <Text size="16px">{' / '}</Text>
              <Text size="16px" color={record.minT > 0 ? 'aboveZero' : 'belowZero'}>
                {record.minT}
                °
              </Text>
            </Box>
            <Box direction="row" align="end">
              <Box
                height="35px"
                width="35px"
              >
                <Image
                  fit="cover"
                  src="/icons/svg/umbrella.svg"
                />
              </Box>
              <DetailsText color="precip">
                {`${record.precipitations} mm`}
              </DetailsText>
            </Box>
            <Box direction="row" align="end">
              <Box
                height="35px"
                width="35px"
              >
                <Image
                  fit="cover"
                  src="/icons/svg/wind2.svg"
                />
              </Box>
              <DetailsText>
                {`${record.wind} m/s`}
              </DetailsText>
            </Box>
          </Box>
          <Box direction="row" justify="between" pad={{ horizontal: 'medium', top: 'large' }}>
            <Box direction="column" align="center">
              <DayTimeText>night</DayTimeText>
              {renderIcon(record.night)}
            </Box>
            <Box direction="column" align="center">
              <DayTimeText>morning</DayTimeText>
              {renderIcon(record.morning)}
            </Box>
            <Box direction="column" align="center">
              <DayTimeText>afternoon</DayTimeText>
              {renderIcon(record.afternoon)}
            </Box>
            <Box direction="column" align="center">
              <DayTimeText>evening</DayTimeText>
              {renderIcon(record.evening)}
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
}

SmallForecast.propTypes = {
  forecast: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default SmallForecast;
