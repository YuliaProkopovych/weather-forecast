import React, { useState, useEffect } from 'react';

import {
  Grommet,
  Box,
  List,
  Heading,
} from 'grommet';

import LocationListItem from './LocationListItem';
import getNearbyLocationsList from '../utils/getNearbyLocationsList';
import formatLocations from '../utils/formatLocations';

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

function NearbyLocationsList() {
  const [nearbyLocations, setNearbyLocations] = useState([]);

  useEffect(() => {
    async function getNearbyLocations() {
      const rawLocations = await getNearbyLocationsList();
      const locations = formatLocations(rawLocations);

      setNearbyLocations(locations);
    }
    getNearbyLocations();
  }, []);

  return (
    <Box pad="medium" flex={{ grow: 1 }}>
      <Heading level="3">Places nearby</Heading>
      <Grommet theme={theme} background={{ color: 'transparent' }}>
        <Box>
          <List
            data={nearbyLocations}
          >
            {(datum) => (
              <LocationListItem location={datum.name} coordinatesString={`${datum.coordinates.lat}, ${datum.coordinates.lon}`} />
            )}
          </List>
        </Box>
      </Grommet>
    </Box>
  );
}

export default NearbyLocationsList;
