import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Tip,
  Text,
} from 'grommet';

import CustomIcon from './icons/CustomIcon';

function FavouriteLocationItem({ location }) {
  const [scale, setScale] = useState(1);

  return (
    <div onMouseOver={() => { setScale(1.1); }} onMouseLeave={() => { setScale(1); }}> {/* eslint-disable-line */}
      <Tip content="see forecast" dropProps={{ align: { left: 'right' } }}>
        <Box direction="row" gap="medium" align="center">
          <CustomIcon flex={{ shrink: 0 }} size="35px" path="/icons/svg/place.svg" style={{ transform: `scale(${scale})` }} />
          <Text weight="bold">{location}</Text>
        </Box>
      </Tip>
    </div>
  );
}

FavouriteLocationItem.propTypes = {
  location: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default FavouriteLocationItem;
