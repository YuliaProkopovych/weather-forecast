import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image } from 'grommet';

function WeatherIcon({ path }) {
  return (
    <Box height="50px" width="50px">
      <Image
        fit="cover"
        src={path}
      />
    </Box>
  );
}

WeatherIcon.propTypes = {
  path: PropTypes.string.isRequired,
};

export default WeatherIcon;
