import React, { useState } from 'react';
import { Box } from 'grommet';

import _ from 'lodash';
import SearchForm from '../components/SearchForm';
import LocationsListComponent from '../components/LocationsList';

import getForecast from '../utils/getForecast';
import locationAutocomplete from '../utils/autocomplete';

function Home() {
  console.log('home');
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState(null);
  const [locationList, setLocationList] = useState([]);

  const sendLocation = async (place) => {
    setLocation(place);
    const weatherForecast = await getForecast(place);
    setForecast(weatherForecast);
    setLocationList([]);
  };

  const showSuggestionComponent = async (query) => {
    const locations = await locationAutocomplete(query);
    setLocationList(locations);
  };

  return (
    <Box>
      <SearchForm
        location={location}
        onSelectLocation={sendLocation}
        showSuggestionComponent={showSuggestionComponent}
      />
      {/* {(locationList.length !== 0)
      && <LocationsListComponent locations={locationList} onSelectLocation={sendLocation} />} */}
    </Box>
  );
}

export default Home;
