import React from 'react';
import PropTypes from 'prop-types';

import {
  Grommet,
  Box,
  List,
  Heading,
} from 'grommet';

import FavouriteLocationItem from './LocationListItem';

const theme = {
  list: {
    item: {
      pad: { horizontal: 'small' },
      background: ['rgba(255,255,255,0.6)', 'light-2'],
      border: false,
      default: {},
      extend: `&:hover{
        background: #fff;
      }`,
    },
  },
};

function FavouriteLocationsList({ locations }) {
  return (
    <Box pad="medium" flex={{ grow: 1 }}>
      <Heading level="3">Saved locations</Heading>
      <Grommet theme={theme} background={{ color: 'transparent' }}>
        <Box>
          <List
            data={locations}
          >
            {(datum) => <FavouriteLocationItem location={datum.name} coordinatesString={datum.coordinates} />}
          </List>
        </Box>
      </Grommet>
    </Box>
  );
}

FavouriteLocationsList.propTypes = {
  locations: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default FavouriteLocationsList;
