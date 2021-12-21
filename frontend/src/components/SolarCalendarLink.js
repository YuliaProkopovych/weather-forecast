import React from 'react';
import {
  Box, Text,
} from 'grommet';
import { FormNextLink } from 'grommet-icons';
import CustomIcon from './icons/CustomIcon';

function SolarCalendarLink() {
  return (
    <Box direction="row" align="center" width={{ max: '450px' }} pad="medium" onClick={() => {}}>
      <CustomIcon flex={{ shrink: 0 }} size="40px" path="/icons/svg/calendar.svg" margin={{ right: '10px' }} />
      <Text color="textGray">Open solar/lunar calendar for this place</Text>
      <FormNextLink />
    </Box>
  );
}

export default SolarCalendarLink;
