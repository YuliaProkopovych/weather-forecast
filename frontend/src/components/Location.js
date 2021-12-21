import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Text, Heading, ResponsiveContext, Tip,
} from 'grommet';

import _ from 'lodash';
import CustomIcon from './icons/CustomIcon';

function Location({ location }) {
  const mainLocation = location.split(', ')[0];
  const locationDetails = location.replace(`${mainLocation}, `, '');
  const [locationIsSaved, setLocationIsSaved] = useState(false);
  const loadSearchComponent = () => {};
  const saveLocation = () => {
    let favLocations = JSON.parse(localStorage.getItem('Favourite Locations'));
    console.log('local', favLocations);
    if (favLocations) {
      if (favLocations.includes(location)) {
        setLocationIsSaved(false);
        _.remove(favLocations, (elem) => elem === location);
      } else {
        favLocations.push(location);
        setLocationIsSaved(true);
      }
    } else {
      favLocations = [location];
    }
    console.log('local2', favLocations);
    localStorage.setItem('Favourite Locations', JSON.stringify(favLocations));
  };

  useEffect(() => {
    const favLocations = JSON.parse(localStorage.getItem('Favourite Locations'));
    if (favLocations) {
      if (favLocations.includes(location)) {
        setLocationIsSaved(true);
      }
    }
  });

  return (
    <Box direction="row" align="center">
      <ResponsiveContext.Consumer>
        {(size) => (
          size !== 'small' ? (
            <CustomIcon size="60px" path="/icons/svg/map4.svg" onClick={loadSearchComponent} margin={{ right: '10px' }} />
          ) : (
            <CustomIcon size="25px" path="/icons/svg/search.svg" onClick={loadSearchComponent} margin={{ left: '10px', right: '10px' }} />
          )
        )}
      </ResponsiveContext.Consumer>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box direction="row" align="center" justify="between" alignSelf="end" flex="grow">
            <Box direction="column">
              <Box direction="row" align="center">
                <Heading size={size} margin={{ bottom: '0px', top: '0px', right: '15px' }} level="3">
                  {mainLocation}
                </Heading>
                {size !== 'small' && (
                  <Tip content={locationIsSaved ? 'Unsave location' : 'Save location'}>
                    <CustomIcon path={locationIsSaved ? '/icons/svg/push-pin-color.svg' : '/icons/svg/push-pin.svg'} size="25px" onClick={saveLocation} />
                  </Tip>
                ) }
              </Box>
              <Text size="small">{locationDetails}</Text>
            </Box>
            {size === 'small' && <Box pad="medium"><CustomIcon path={locationIsSaved ? '/icons/svg/push-pin-color.svg' : '/icons/svg/push-pin.svg'} size="22px" /></Box> }
          </Box>
        )}

      </ResponsiveContext.Consumer>

    </Box>
  );
}

Location.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Location;
