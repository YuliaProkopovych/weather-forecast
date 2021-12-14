import React, { useState, useEffect } from 'react';
import { Box, List } from 'grommet';

import SearchForm from '../components/SearchForm';
import FavouriteLocationsList from '../components/FavouriteLocationsList';

function Home() {
  const [location, setLocation] = useState('');
  const [favouriteLocations, setFavouriteLocations] = useState([]);

  useEffect(() => {
    const favLocations = JSON.parse(localStorage.getItem('Favourite Locations'));
    if (favLocations) {
      setFavouriteLocations(favLocations);
    }
  });

  return (
    <Box>
      <SearchForm
        location={location}
      />
      <Box>
        {favouriteLocations.length !== 0 && <FavouriteLocationsList locations={favouriteLocations} />}
      </Box>
    </Box>
  );
}

export default Home;
