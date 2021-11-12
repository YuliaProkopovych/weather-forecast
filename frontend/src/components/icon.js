import React from 'react';
import { Box, Image } from 'grommet';

export const MyIcon = ({ path }) => {
  console.log(path);
  return (
  <Box height="50px" width="50px">
    <Image
      fit="cover"
      src={ path }
    />
  </Box>);
};
