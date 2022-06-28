import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Card,
} from 'grommet';
import Description from './decription';

function Header({ children, ...rest }) {
  return (
    <>
      <Description />
      <Box
        gridArea="header"
        tag="header"
        justify="start"
        pad="small"
        {...rest}
      >

        <Card pad="medium" background="semitransparent-white" width={{ max: '1000px' }}>
          {children}
        </Card>
      </Box>
    </>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

export default Header;
