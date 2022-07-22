import React from 'react';
import PropTypes from 'prop-types';

import {
  Grommet,
  Box,
  List,
  Text,
  Heading,
} from 'grommet';

import LocationListItem from './LocationListItem';

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

function LocationsList({ listHeader, locations, errorMessage }) {
  return (
    <Box pad="medium" flex={{ grow: 1 }}>
      <Heading level="3">{listHeader}</Heading>
      <Grommet theme={theme} background={{ color: 'transparent' }}>
        <Box>
          {locations.length === 0 ? (
            <Text>{errorMessage}</Text>
          ) : (
            <List
              data={locations}
            >
              {(datum) => {
                const coordinatesString = datum.coordinates.lat ? `${datum.coordinates.lat}, ${datum.coordinates.lon}` : datum.coordinates;
                return <LocationListItem location={datum.name} coordinatesString={coordinatesString} />;
              }}
            </List>
          )}
        </Box>
      </Grommet>
    </Box>
  );
}

LocationsList.propTypes = {
  locations: PropTypes.objectOf(PropTypes.array).isRequired,
  listHeader: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default LocationsList;
