import React from 'react';
import {
  Grommet,
  Box,
  ResponsiveContext,
} from 'grommet';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import BackgroundBox from './components/background';

import Header from './components/Header';
import Home from './pages/home';
import Search from './pages/search';
import Forecast from './pages/preview';

const theme = {
  global: {
    colors: {
      belowZero: '#0202a1',
      aboveZero: '#9e0000',
      precip: '#4287f5',
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
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill="horizontal">
              <Header />
              <Box flex direction="row" wrap="true">
                <Box flex={{ grow: 3, srink: 1 }}>
                  <Router>
                    <Routes>
                      <Route exact path="/" element={<Home />} />
                      <Route path="/forecast/:location" element={<Forecast />} />
                      <Route path="/search/:location" element={<Search />} />
                    </Routes>
                  </Router>
                </Box>
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </BackgroundBox>
    </Grommet>
  );
}

export default App;
