import React, { useState, useEffect } from 'react';
import { Box } from 'grommet';

import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import FavouriteLocationsList from '../components/FavouriteLocationsList';
import ResponsiveGrid from '../components/ResponsiveGrid';
import Logo from '../components/Logo';

function Home() {
  const [favouriteLocations, setFavouriteLocations] = useState([]);

  useEffect(() => {
    const favLocations = JSON.parse(localStorage.getItem('Favourite Locations'));
    if (favLocations) {
      setFavouriteLocations(favLocations);
    }
  }, []);

  return (
    <ResponsiveGrid>
      <Header>
        <SearchForm />
      </Header>
      <Logo />
      <Box gridArea="main">
        {favouriteLocations.length !== 0 && <FavouriteLocationsList locations={favouriteLocations} />}
      </Box>
      <Box gridArea="sidebar">Sidebar</Box>
    </ResponsiveGrid>
  );
}

export default Home;
