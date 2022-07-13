import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import autocomplete from '../utils/autocomplete';
import ResponsiveHeader from '../components/ResponsiveHeader';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import Logo from '../components/Logo';
import LocationsList from '../components/LocationsList';

function Search() {
  const params = useParams();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function getSuggestions() {
      const place = decodeURIComponent(params.location);
      const places = await autocomplete(place);

      setLocations(places);
    }
    getSuggestions();
  }, []);

  return (
    <>
      <ResponsiveHeader>
        <Header>
          <SearchForm />
        </Header>
        <Logo />
      </ResponsiveHeader>
      <LocationsList listHeader={`Search results for "${params.location}"`} locations={locations} />
    </>
  );
}

export default Search;
