import React from 'react';
import {
  Grommet,
  Box,
} from 'grommet';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import BackgroundBox from './components/background';

import SolarCalendar from './pages/solarCalendar';
import Home from './pages/home';
import Search from './pages/search';
import Forecast from './pages/forecast';

const theme = {
  global: {
    colors: {
      belowZero: '#0202a1',
      aboveZero: '#9e0000',
      precip: '#4287f5',
      textGray: '#444',
      textDeepGray: '#222',
      'semitransparent-white': 'rgba(255,255,255,0.7)',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

function App() {
  return (
    <Grommet theme={theme} full>
      <BackgroundBox style={{ minHeight: '100%' }}>
        <Box fill="horizontal">
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/forecast/:location" element={<Forecast />} />
              <Route path="/search/:location" element={<Search />} />
              <Route path="/solar-calendar/:location" element={<SolarCalendar />} />
            </Routes>
          </Router>
        </Box>
      </BackgroundBox>
    </Grommet>
  );
}

export default App;
