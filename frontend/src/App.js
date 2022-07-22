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

import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

import BackgroundBox from './components/background';

import SolarCalendar from './pages/solarCalendar';
import Home from './pages/home';
import Search from './pages/search';
import Forecast from './pages/forecast';
import Error from './pages/error';
import Footer from './components/footer';

const theme = deepMerge(grommet, {
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
  anchor: {
    color: 'textGray',
    fontWeight: 400,
  },
});

function App() {
  return (
    <Grommet theme={theme} full>
      <BackgroundBox style={{ minHeight: '100%' }} direction="column" align="stretch">
        <Box fill="horizontal" flex={{ grow: 1 }}>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/forecast/:location" element={<Forecast />} />
              <Route path="/search/:location" element={<Search />} />
              <Route path="/solar-calendar/:location" element={<SolarCalendar />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          </Router>
        </Box>
        <Footer />
      </BackgroundBox>
    </Grommet>
  );
}

export default App;
