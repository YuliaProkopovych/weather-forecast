import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  ResponsiveContext,
} from 'grommet';

import LocationComponent from './Location';
import CurrentConditions from './currentConditions';

function WeatherPreviewHeader({ location, currentConditions }) {
  return (
    <ResponsiveContext.Consumer>
      {(size) => (size !== 'small'
        ? (
          <Box direction="row" align="center" justify="around" wrap="true">
            <LocationComponent location={location} />
            <Box flex="2 1">
              {currentConditions && <Card pad="small" direction="column" background="semitransparent-white"><CurrentConditions conditions={currentConditions} /></Card>}
            </Box>
          </Box>
        ) : (
          <Card pad="small" direction="column" background="semitransparent-white">
            <LocationComponent location={location} />
            {currentConditions && <CurrentConditions conditions={currentConditions} />}
          </Card>
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
