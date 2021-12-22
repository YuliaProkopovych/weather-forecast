import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box, Text,
} from 'grommet';
import { FormNextLink } from 'grommet-icons';
import CustomIcon from './icons/CustomIcon';

function SolarCalendarLink({ location }) {
  const navigate = useNavigate();
  return (
    <Box
      direction="row"
      align="center"
      width={{ max: '450px' }}
      pad="medium"
      onClick={() => {
        navigate(`../../solar-calendar/${encodeURIComponent(location)}`);
      }}
    >
      <CustomIcon flex={{ shrink: 0 }} size="40px" path="/icons/svg/calendar.svg" margin={{ right: '10px' }} />
      <Text color="textGray">Open solar/lunar calendar for this place</Text>
      <FormNextLink />
    </Box>
  );
}

SolarCalendarLink.propTypes = {
  location: PropTypes.string.isRequired,
};

export default SolarCalendarLink;
