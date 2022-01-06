import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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

function Header({ children, ...rest }) {
  const navigate = useNavigate();
  const size = useContext(ResponsiveContext);
  return (
    <Box
      tag="header"
      direction="row"
      wrap="true"
      align="center"
      justify="start"
      pad={size !== 'small' ? 'medium' : '0px'}
      style={{ zIndex: '1' }}
      {...rest}
    >
      <Box flex={{ grow: 1, shrink: 1 }}>
        <Box alignSelf="center" align="center" onClick={() => { navigate('/'); }} focusIndicator={false}>
          <Grommet theme={theme} background="transparent">
            <Heading width="230px" level="2" size="80px" margin="none">Sunshower</Heading>
          </Grommet>
          <Box height="100px" width="230px" margin={{ top: '-30px' }}>
            <Image src="/drawing.svg" fit="cover" />
          </Box>
        </Box>
      </Box>
      <Box flex={{ grow: 4, shrink: 1 }}>
        {children}
      </Box>
    </Box>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

export default Header;
