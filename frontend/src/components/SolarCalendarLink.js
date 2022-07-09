import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box, Text, ResponsiveContext,
} from 'grommet';
import { FormNextLink } from 'grommet-icons';
import CustomIcon from './icons/CustomIcon';

function SolarCalendarLink({ locationName, coordinates }) {
  const navigate = useNavigate();
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box
          pad={size !== 'small' ? 'small' : 'medium'}
          direction="row"
          align="center"
          width={{ max: '450px' }}
          focusIndicator={false}
          onClick={() => {
            if (locationName) {
              navigate(`../../solar-calendar/${encodeURIComponent(locationName)}`, { state: coordinates });
            } else {
              navigate(`../../solar-calendar/${encodeURIComponent(coordinates.lat)},${encodeURIComponent(coordinates.lon)}`);
            }
          }}
        >
          <CustomIcon flex={{ shrink: 0 }} size={size !== 'small' ? '40px' : '30px'} path="/icons/svg/calendar.svg" margin={{ right: '8px', left: '8px' }} />
          <Text color="textGray" size="medium">Open solar/lunar calendar</Text>
          <Box margin={size === 'small' ? { left: '10px', right: '15px' } : '0px'}><FormNextLink /></Box>
        </Box>
      )}

    </ResponsiveContext.Consumer>
  );
}

SolarCalendarLink.propTypes = {
  locationName: PropTypes.string.isRequired,
  coordinates: PropTypes.object.isRequired,
};

export default SolarCalendarLink;
