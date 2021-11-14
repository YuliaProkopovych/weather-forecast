import React from 'react';
import { Box, Image } from 'grommet';
import styled from 'styled-components';

export const WeatherIcon = ({ path }) => {
  return (
  <Box height='50px' width='50px'>
    <Image
      fit="cover"
      src={ path }
    />
  </Box>);
};



export const WindDirectionIcon = ({ angle }) => {
  const RotatedBox = styled(Box)`
  transform: rotate(${angle}deg);
`;

  return (
      <RotatedBox
      height='25px' width='25px'>
        <Image
          fit="cover"
          src={ `/icons/svg/wind.svg` }
        />
      </RotatedBox>
  );
}
