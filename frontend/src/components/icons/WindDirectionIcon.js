import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image } from 'grommet';
import styled from 'styled-components';

function WindDirectionIcon({ angle }) {
  const RotatedBox = styled(Box)`
  transform: rotate(${angle}deg);
`;

  return (
    <RotatedBox
      height="25px"
      width="25px"
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
};

export default WindDirectionIcon;
