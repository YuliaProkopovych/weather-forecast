import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Heading, Text, ResponsiveContext,
} from 'grommet';

import WeatherIcon from './icons/WeatherIcon';
import WindDirectionIcon from './icons/WindDirectionIcon';
import CustomIcon from './icons/CustomIcon';

function CurrentConditions({ conditions }) {
  const currentSymbol = conditions.forecast[0].next_1_hours.symbol;
  const currentTemperature = conditions.forecast[0].weather.air_temperature;
  const currentPrecipitations = conditions.forecast[0].next_1_hours.precipitations;
  const currentWind = conditions.forecast[0].weather.wind_speed;
  const currentWindDirection = conditions.forecast[0].weather.wind_from_direction;

  return (
    <ResponsiveContext.Consumer>
      {(size) => {
        const pad = size !== 'small' ? 'medium' : 'small';
        const weatherIconSize = size !== 'small' ? '35px' : '30px';
        return (
          <Box>
            <Box direction="row" align="center">
              <CustomIcon size="25px" margin={{ right: '10px', left: '10px' }} path="/icons/svg/clock.svg" />
              <Heading size="small" level="5">Current conditions</Heading>
            </Box>
            <Box direction="row" align="center" justify="evenly">
              {currentSymbol && <WeatherIcon path={`/icons/svg/${currentSymbol}.svg`} size="80px" />}

                <Box direction="row" pad={{horizontal: {pad}}} align="center">
                  <CustomIcon size={weatherIconSize} path="/icons/svg/thermometer2.svg" />
                  <Text size="16px" color={currentTemperature > 0 ? 'aboveZero' : 'belowZero'}>
                    {currentTemperature}
                    °
                  </Text>
                </Box>

                <Box direction="row" pad={{horizontal: {pad}}} align="center">
                  <CustomIcon size={weatherIconSize} path="/icons/svg/umbrella.svg" />
                  <Text color="precip" size="16px">
                    {`${currentPrecipitations} mm`}
                  </Text>
                </Box>


              <Box direction="row" pad={{'horizontal': {pad}}} align="center">
                  <WindDirectionIcon size={weatherIconSize} angle={currentWindDirection} />
                  <Text size="16px">
                    {`${currentWind} m/s`}
                  </Text>
                </Box>
            </Box>
          </Box>
        );
      } }
    </ResponsiveContext.Consumer>
  );
}

CurrentConditions.propTypes = {
  conditions: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default CurrentConditions;
