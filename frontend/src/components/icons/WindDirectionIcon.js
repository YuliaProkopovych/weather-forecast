import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image } from 'grommet';
import styled from 'styled-components';

function WindDirectionIcon({ angle, size }) {
  const RotatedBox = styled(Box)`
  transform: rotate(${180 + angle}deg);
`;

  return (
    <RotatedBox
      height={size}
      width={size}
    >
      <Image
        fit="cover"
        src="/icons/svg/wind.svg"
      />
    </RotatedBox>
  );
}

WindDirectionIcon.propTypes = {
  angle: PropTypes.number.isRequired,
  size: PropTypes.string,
};

WindDirectionIcon.defaultProps = {
  size: '25px',
};

export default WindDirectionIcon;
