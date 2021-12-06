import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
} from 'grommet';

import ThemedButtons from './SearchButton';

function Header({ children }) {
  return (
    <Box
      flex
      tag="header"
      direction="row"
      wrap="true"
      align="center"
      justify="between"
      pad={{ left: '20px', right: '20px' }}
      style={{ zIndex: '1' }}
      height={{ max: '100px' }}
      border={{ bottom: '1px' }}
    >
      <Box flex={{ grow: 5, srink: 1 }}>
        <Heading color="#010b11" level="2" margin="none">Sunshower</Heading>
      </Box>
      <Box flex={{ grow: 1, srink: 1 }}>
        <ThemedButtons />
      </Box>
      {children}
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
