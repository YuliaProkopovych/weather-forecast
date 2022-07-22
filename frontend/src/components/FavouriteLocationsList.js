import React, { useState, useEffect } from 'react';
import LocationsList from './LocationsList';

function FavouriteLocationsList() {
  const [favouriteLocations, setFavouriteLocations] = useState([]);

  useEffect(() => {
    const favLocations = JSON.parse(localStorage.getItem('Favourite Locations'));
    if (favLocations) {
      setFavouriteLocations(favLocations);
    }
  }, []);
  return (
    <LocationsList errorMessage="You have no saved locations yet!" listHeader="Saved locations" locations={favouriteLocations} />
  );
}

export default FavouriteLocationsList;
