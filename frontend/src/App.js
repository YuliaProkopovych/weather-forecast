import React, { useState } from 'react';
import { Box, Button, Heading, Text, Grommet } from 'grommet';
import { Location, Notification } from 'grommet-icons';

import SearchComponent from './components/searchComponent';
import WeatherPreviewComponent from './components/preview';
import LocationsListComponent from './components/listOfLocations';

import getForecast from './utils/getForecast';
import locationAutocomplete from './utils/autocomplete';

import _ from 'lodash';

const theme = {
  global: {
     colors: {
         brand: '#1b4332',
       },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const AppBar = (props) => (
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: '1' }}
      {...props}
    />
  );

function App() {

  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState(null);
  const [locationList, setLocationList] = useState([]);
  console.log('app', location);

  const sendLocation = async (place) => {
    setLocation(place);
    const weatherForecast = await getForecast(place);
    setForecast(weatherForecast);
    setLocationList([]);
  }

  const showSuggestionComponent = async (query) => {
    const locations = await locationAutocomplete(query);
    setLocationList(locations);
  }

  return (
    <Grommet theme={theme} full>
      <Box>
        <AppBar>
          <Heading level='3' margin='none'>SunnyRain</Heading>
          <Button icon={<Notification />} onClick={() => {}} />
        </AppBar>
        <Box direction='row' flex>
          <Box flex align='start' direction='column'>
            <SearchComponent location={location} onSelectLocation={sendLocation} showSuggestionComponent={showSuggestionComponent}/>
            {(locationList.length !== 0) && <LocationsListComponent locations={locationList} onSelectLocation={sendLocation} />}
            {forecast && <WeatherPreviewComponent data={forecast}/>}
          </Box>
          <Box
            width='medium'
            background='light-2'
            elevation='small'
            align='center'
            justify='center'
          >
            sidebar
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
