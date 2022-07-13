import React, { useState, useEffect } from 'react';
import LocationsList from './LocationsList';

function FavouriteLocationsList() {
  const [favouriteLocations, setFavouriteLocations] = useState([]);

  useEffect(() => {
    const favLocations = JSON.parse(localStorage.getItem('Favourite Locations'));
    if (favLocations) {
      setFavouriteLocations(favLocations);
      console.log(favLocations);
    }
  }, []);
  return (
    <LocationsList listHeader="Saved locations" locations={favouriteLocations} />
  );
}

export default FavouriteLocationsList;
