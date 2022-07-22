import React, { useContext } from 'react';

import {
  Box,
  Text,
  ResponsiveContext,
} from 'grommet';

function Description() {
  const screenSize = useContext(ResponsiveContext);
  return (
    screenSize !== 'small'
      && (
      <Box grid-area="description" alignSelf={screenSize === 'medium' ? 'end' : 'start'} pad={screenSize === 'medium' ? { bottom: 'large' } : 'medium'}>
        <Text color="light">Weather forecast powered by Norwegian Meteorological Institute</Text>
      </Box>
      )
  );
}

export default Description;
