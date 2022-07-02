import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Text, Heading, ResponsiveContext,
} from 'grommet';

import _ from 'lodash';
import CustomIcon from './icons/CustomIcon';

function Location({ location, coordinates }) {
  console.log('location coords', coordinates);
  const { latitude, longitude } = coordinates;

  const locationIsCoordinates = location === '';

  const mainLocation = locationIsCoordinates
    ? `${latitude}, ${longitude}`
    : location.split(', ')[0];

  const locationDetails = locationIsCoordinates
    ? 'Geographical point'
    : location.replace(`${mainLocation}, `, '');

  const [locationIsSaved, setLocationIsSaved] = useState(false);
  const loadSearchComponent = () => {};
  const saveLocation = () => {
    let favLocations = JSON.parse(localStorage.getItem('Favourite Locations'));
    if (favLocations) {
      if (favLocations.includes(coordinates.toString())) {
        setLocationIsSaved(false);
        _.remove(favLocations, (elem) => elem === coordinates.toString());
      } else {
        favLocations.push(coordinates.toString());
        setLocationIsSaved(true);
      }
    } else {
      favLocations = [coordinates.toString()];
    }
    localStorage.setItem('Favourite Locations', JSON.stringify(favLocations));
  };

  useEffect(() => {
    const favLocations = JSON.parse(localStorage.getItem('Favourite Locations'));
    if (favLocations) {
      if (favLocations.includes(coordinates.toString())) {
        setLocationIsSaved(true);
      }
    }
  });

  const screenSize = useContext(ResponsiveContext);
  return (
    <Box direction="row" flex="grow" width={{ max: '450px' }}>
      <Box direction="row" flex="grow">
        {screenSize !== 'small' ? (
          <CustomIcon size="60px" path="/icons/svg/map4.svg" onClick={loadSearchComponent} margin={{ right: '10px' }} focusIndicator={false} />
        ) : (
          <CustomIcon size="35px" path="/icons/svg/map4.svg" onClick={loadSearchComponent} margin={{ left: '8px', right: '8px' }} focusIndicator={false} />
        )}
        <Box direction="row" justify="between">
          <Box direction="column">
            <Box direction="row" align="center">
              <Heading size={screenSize} margin={{ bottom: 'small', top: '0px' }} level="3">
                {mainLocation}
              </Heading>
            </Box>
            <Text size="small">{locationDetails}</Text>
          </Box>
        </Box>
      </Box>
      <Box pad="small" flex="grow">
        <CustomIcon
          path={locationIsSaved ? '/icons/svg/push-pin-color.svg' : '/icons/svg/push-pin.svg'}
          size="22px"
          onClick={saveLocation}
          focusIndicator={false}
        />
      </Box>
    </Box>
  );
}

Location.propTypes = {
  location: PropTypes.string.isRequired,
  coordinates: PropTypes.array.isRequired,
};

export default Location;
