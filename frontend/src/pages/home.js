import React, { useState, useEffect } from 'react';
import { Box } from 'grommet';

import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import FavouriteLocationsList from '../components/FavouriteLocationsList';

function Home() {
  const [favouriteLocations, setFavouriteLocations] = useState([]);

  useEffect(() => {
    const favLocations = JSON.parse(localStorage.getItem('Favourite Locations'));
    if (favLocations) {
      setFavouriteLocations(favLocations);
    }
  }, []);

  return (
    <Box>
      <Header>
        <SearchForm />
      </Header>
      <Box>
        {favouriteLocations.length !== 0 && <FavouriteLocationsList locations={favouriteLocations} />}
      </Box>
    </Box>
  );
}

export default Home;
