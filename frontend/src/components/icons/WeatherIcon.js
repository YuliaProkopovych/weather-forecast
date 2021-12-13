import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image } from 'grommet';

function WeatherIcon({ path, size }) {
  return (
    <Box height={size} width={size}>
      <Image
        fit="cover"
        src={path}
      />
    </Box>
  );
}

WeatherIcon.propTypes = {
  path: PropTypes.string.isRequired,
  size: PropTypes.string,
};

WeatherIcon.defaultProps = {
  size: '50px',
};

export default WeatherIcon;
