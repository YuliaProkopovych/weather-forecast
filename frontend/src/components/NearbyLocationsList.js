import React, { useState, useEffect } from 'react';

import getNearbyLocationsList from '../utils/getNearbyLocationsList';
import LocationsList from './LocationsList';
import formatLocations from '../utils/formatLocations';

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
    <LocationsList listHeader="Places nearby" locations={nearbyLocations} />
  );
}

export default NearbyLocationsList;
