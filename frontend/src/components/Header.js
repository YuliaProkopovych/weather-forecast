import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Text,
  ResponsiveContext,
  Card,
} from 'grommet';

function Header({ children, ...rest }) {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      gridArea="header"
      tag="header"
      justify="start"
      pad={{ top: 'large', right: 'medium', left: 'medium' }}
      {...rest}
    >
      <Box margin={{ bottom: 'large' }}>
        <Text color="textGray">Weather forecast powered by Norwegian Meteorological Institute</Text>
      </Box>
      <Card pad="medium" background="semitransparent-white">
        {children}
      </Card>
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
