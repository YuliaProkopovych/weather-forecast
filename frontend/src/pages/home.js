import React, { useState, useEffect, useContext } from 'react';
import { Box, ResponsiveContext } from 'grommet';

import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import FavouriteLocationsList from '../components/FavouriteLocationsList';
import ResponsiveHeader from '../components/ResponsiveHeader';
import Logo from '../components/Logo';
import NearbyLocationsList from '../components/NearbyLocations';

function Home() {
  const [favouriteLocations, setFavouriteLocations] = useState([]);

  useEffect(() => {
    const favLocations = JSON.parse(localStorage.getItem('Favourite Locations'));
    if (favLocations) {
      setFavouriteLocations(favLocations);
    }
  }, []);

  const screenSize = useContext(ResponsiveContext);
  return (
    <>
      <ResponsiveHeader>
        <Header>
          <SearchForm />
        </Header>
        <Logo />
      </ResponsiveHeader>
      <Box>
        <NearbyLocationsList />
        {favouriteLocations.length !== 0 && <FavouriteLocationsList locations={favouriteLocations} />}
      </Box>
      {screenSize !== 'small' && <Box gridArea="sidebar">Sidebar</Box>}
    </>
  );
}

export default Home;
