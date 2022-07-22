import React from 'react';
import { Box, Heading, Text } from 'grommet';
import CustomIcon from '../components/icons/CustomIcon';

function Error() {
  return (
    <Box align="center">
      <Box direction="row" align="center" pad="large" gap="medium">
        <CustomIcon size="100px" path="/icons/svg/error.svg" />
        <Box gap="medium">
          <Heading level="2" margin="0px">Page not found</Heading>
          <Text>We&apos;re sorry, we couldn&apos;t find the page you requested.</Text>
        </Box>
      </Box>
    </Box>
  );
}

export default Error;
