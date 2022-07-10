import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Text,
} from 'grommet';

import CustomIcon from './icons/CustomIcon';

function FavouriteLocationItem({ location, coordinatesString }) {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const locationName = location ? location : 'Geographical point at ' + coordinatesString;
  const coordinates = { lat: coordinatesString.split(', ')[0], lon: coordinatesString.split(', ')[1] };
  console.log('coordinatesString.split(', ')[1]', coordinatesString.split(', ')[1]);

  const redirectToForecast = () => {
    if (location) {
      navigate(`../../forecast/${encodeURIComponent(location)}`, { state: coordinates });
    } else {
      navigate(`./forecast/${encodeURIComponent(coordinatesString)}`);
    }
  };

  return (
    <div onMouseOver={() => { setScale(1.1); }} onMouseLeave={() => { setScale(1); }} onClick={() => redirectToForecast(location.title)}> {/* eslint-disable-line */}
      <Box
        direction="row"
        gap="medium"
        align="center"
        onClick={(event) => {
          redirectToForecast();
        }}
      >
        <CustomIcon flex={{ shrink: 0 }} size="35px" path="/icons/svg/place.svg" style={{ transform: `scale(${scale})` }} />
        <Text weight="bold">{locationName}</Text>
      </Box>
    </div>
  );
}

FavouriteLocationItem.propTypes = {
  location: PropTypes.string.isRequired,
  coordinatesString: PropTypes.string.isRequired,
};

export default FavouriteLocationItem;
