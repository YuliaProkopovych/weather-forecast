import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image } from 'grommet';

function CustomIcon({ path, size, ...rest }) {
  return (
    <Box height={size} width={size} {...rest}>
      <Image
        fit="cover"
        src={path}
      />
    </Box>
  );
}

CustomIcon.propTypes = {
  path: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default CustomIcon;
