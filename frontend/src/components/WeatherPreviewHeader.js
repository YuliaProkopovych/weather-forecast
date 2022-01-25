import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  ResponsiveContext,
} from 'grommet';

import LocationComponent from './Location';
import CurrentConditions from './CurrentConditions';
import SolarCalendarLink from './SolarCalendarLink';

function WeatherPreviewHeader({ location, currentConditions }) {
  return (
    <ResponsiveContext.Consumer>
      {(size) => (size !== 'small'
        ? (
          <Box direction="row" align="center" justify="around" wrap="true">
            <Box flex="2 1">
              <Card pad="small" direction="row" background="semitransparent-white">
                <LocationComponent location={location} />
                {currentConditions && <CurrentConditions conditions={currentConditions} />}
              </Card>
            </Box>
          </Box>
        ) : (
          <Box pad="medium" direction="column">
            <LocationComponent location={location} />
            <SolarCalendarLink location={location} />
            {currentConditions && <CurrentConditions conditions={currentConditions} />}
          </Box>
        )
      )}
    </ResponsiveContext.Consumer>
  );
}

WeatherPreviewHeader.propTypes = {
  location: PropTypes.string.isRequired,
  currentConditions: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default WeatherPreviewHeader;
