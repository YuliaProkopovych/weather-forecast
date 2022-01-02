import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box, Text, ResponsiveContext,
} from 'grommet';
import { FormNextLink } from 'grommet-icons';
import CustomIcon from './icons/CustomIcon';

function BackToWeatherLink({ location }) {
  const navigate = useNavigate();
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box
          direction="row"
          align="center"
          width={{ max: '450px' }}
          pad={size !== 'small' ? 'medium' : { top: 'medium' }}
          focusIndicator={false}
          onClick={() => {
            navigate(`../../solar-calendar/${encodeURIComponent(location)}`);
          }}
        >
          <CustomIcon flex={{ shrink: 0 }} size={size !== 'small' ? '40px' : '30px'} path="/icons/svg/calendar.svg" margin={{ right: '8px', left: '8px' }} />
          <Text color="textGray" size={size !== 'small' ? 'medium' : 'small'}>Open solar/lunar calendar for this place</Text>
          <Box margin={size === 'small' ? { left: '10px', right: '15px' } : '0px'}><FormNextLink /></Box>
        </Box>
      )}

    </ResponsiveContext.Consumer>
  );
}

BackToWeatherLink.propTypes = {
  location: PropTypes.string.isRequired,
};

export default BackToWeatherLink;
