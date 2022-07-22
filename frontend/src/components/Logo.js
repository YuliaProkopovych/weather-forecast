import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Image,
  ResponsiveContext,
} from 'grommet';

function Logo() {
  const screenSize = useContext(ResponsiveContext);
  const navigate = useNavigate();
  return (
    <Box gridArea="logo" pad={screenSize !== 'small' && { right: 'medium' }} align="center" justify="center">
      <Box width="225px" height={{ max: '143px' }} onClick={() => { navigate('/'); }} focusIndicator={false}>
        <Image src="/final.svg" fit="cover" />
      </Box>
    </Box>
  );
}

export default Logo;
