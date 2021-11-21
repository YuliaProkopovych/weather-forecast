import React, { useState } from 'react';
import { Box, Button, Heading, Text, Grommet } from 'grommet';
import { Location, Notification } from 'grommet-icons';

import SearchComponent from './components/searchComponent';
import WeatherComponent from './components/weatherComponent';
import WeatherPreviewComponent from './components/preview';

import getForecast from './utils/getForecast';

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

  const sendLocation = async (place) => {
    setLocation(place);
     const weatherForecast = await getForecast(place);
     setForecast(weatherForecast);
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
            <SearchComponent onSelectLocation={sendLocation}/>
            {forecast && <WeatherPreviewComponent data={forecast}/>}
            {/* { forecast && _.map(forecast, (item) => (
                    <Box>
                      <Box margin={{left: '30px'}}><Heading level='3'>{item.date}</Heading></Box>
                      <WeatherComponent weather={item.forecast}/>
                    </Box>
                  ))
  } */}
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
