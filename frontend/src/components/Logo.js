import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Heading,
  Grommet,
  Image,
  ResponsiveContext,
} from 'grommet';

import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const theme = deepMerge(grommet, {
  global: {
    font: {
      family: "'Calinastiya', Arial, sans-serif",
      face: `
        @font-face {
          font-family: "Calinastiya";
          src: url("/fonts/calinastiya/Calinastiya.ttf") format('truetype');
        }
      `,
    },
  },
});

function Logo() {
  const screenSize = useContext(ResponsiveContext);
  const navigate = useNavigate();
  return (
    <Box gridArea="logo" pad={screenSize !== 'small' && { right: 'medium' }}>
      <Box alignSelf="center" align="center" onClick={() => { navigate('/'); }} focusIndicator={false} pad={{ top: 'small' }}>
        <Grommet theme={theme} background="transparent">
          <Heading width="230px" level="2" size="80px" margin="none">Sunshower</Heading>
        </Grommet>
        <Box height="100px" width="230px" margin={{ top: '-30px' }}>
          <Image src="/drawing.svg" fit="cover" />
        </Box>
      </Box>
    </Box>
  );
}

export default Logo;
