import React, { useState, useEffect } from 'react';

import {
  Grommet,
  Box,
  List,
  Heading,
} from 'grommet';

import LocationListItem from './LocationListItem';
import getNearbyLocationsList from '../utils/getNearbyLocationsList';

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
      const locations = await getNearbyLocationsList();

      setNearbyLocations(locations);
      console.log(locations);
    }
    getNearbyLocations();
  }, []);

  return (
    <Grommet theme={theme} background={{ color: 'transparent' }}>
      <Box pad="medium">
        <Heading level="3">Places nearby</Heading>
        <Box>
          <List
            data={nearbyLocations.map((item) => ({ title: `${item.name}, ${item.region}, ${item.country}`, coordinates: [item.latitude, item.longitude] }))}
          >
            {(datum) => (
              <LocationListItem location={datum} />
            )}
          </List>
        </Box>
      </Box>
    </Grommet>
  );
}

export default NearbyLocationsList;
