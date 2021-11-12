import React, { useState } from 'react';
import { Box, Button, Heading, Grommet } from 'grommet';
import { Location, Notification } from 'grommet-icons';

import SearchComponent from './components/searchComponent';
import WeatherComponent from './components/weatherComponent';

import getForecast from './utils/getForecast';

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

  const sendLocation = async (place) => {
    setLocation(place);
    console.log('still here');
     const f = await getForecast(place);
     console.log('before setting forecast');
    //  console.log(f);
     setForecast(f);
    //  console.log(f);
  }

  if(location) {

  }

  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level='3' margin='none'>SunnyRain</Heading>
          <Button icon={<Notification />} onClick={() => {}} />
        </AppBar>
        <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
          <Box flex align='start' justify='center'>
            <SearchComponent onSelectLocation={sendLocation}/>
            { forecast && <WeatherComponent weather={forecast} />}
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
