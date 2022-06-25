import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Text,
} from 'grommet';

import CustomIcon from './icons/CustomIcon';

function FavouriteLocationItem({ location }) {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  console.log(location);

  const redirectToForecast = (locationName) => {
    navigate(`../../forecast/${encodeURIComponent(locationName)}`);
  };

  return (
    <div onMouseOver={() => { setScale(1.1); }} onMouseLeave={() => { setScale(1); }} onClick={() => redirectToForecast(location.title)}> {/* eslint-disable-line */}
      <Box
        direction="row"
        gap="medium"
        align="center"
        onClick={(event) => {
          redirectToForecast(event.item);
        }}
      >
        <CustomIcon flex={{ shrink: 0 }} size="35px" path="/icons/svg/place.svg" style={{ transform: `scale(${scale})` }} />
        <Text weight="bold">{location.title}</Text>
      </Box>
    </div>
  );
}

FavouriteLocationItem.propTypes = {
  location: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default FavouriteLocationItem;