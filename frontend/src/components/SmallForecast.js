import React from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import {
  Box, Image, Text, Card,
} from 'grommet';
import { LinkNext } from 'grommet-icons';
import styled from 'styled-components';

import WeatherIcon from './icons/WeatherIcon';

function SmallForecast({ forecast, onClickItem }) {
  const renderIcon = (icon) => icon && <WeatherIcon path={`/icons/svg/${icon}.svg`} />;
  const DetailsText = styled(Text)`
    font-size: 16px;
  `;
  const DayTimeText = styled(Text)`
    font-size: 14px;
    color: #666;
    `;

  return (
    <Box pad={{ horizontal: 'small', vertical: 'large' }} gap="20px">
      {forecast.map((record) => (
        <Card
          gap="20px"
          background="semitransparent-white"
          direction="column"
          pad={{ vertical: 'large', horizontal: 'medium' }}
        >
          <Box pad={{ horizontal: 'medium' }}>
            <Text>{DateTime.fromFormat(record.date, 'dd MMMM').toFormat('EEEE, d MMMM')}</Text>
          </Box>
          <Box direction="row" justify="between" width={{ max: '400px' }}>
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
              <DetailsText color={record.maxT > 0 ? 'aboveZero' : 'belowZero'}>
                {record.maxT}
                °
              </DetailsText>
              <DetailsText size="16px">{' / '}</DetailsText>
              <DetailsText color={record.minT > 0 ? 'aboveZero' : 'belowZero'}>
                {record.minT}
                °
              </DetailsText>
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
          <Box direction="row" justify="between" pad={{ top: 'large', horizontal: 'medium' }} width={{ max: '500px' }}>
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
          <Box pad={{ left: 'large', top: 'medium' }}>
            <Box
              direction="row"
              align="center"
              focusIndicator={false}
              onClick={() => {
                onClickItem(record);
              }}
            >
              <Text margin={{ right: '10px' }}>
                Open detailed forecast
              </Text>
              <LinkNext size="15px" />
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
}

SmallForecast.propTypes = {
  forecast: PropTypes.objectOf(PropTypes.array).isRequired,
  onClickItem: PropTypes.func.isRequired,
};

export default SmallForecast;
