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


import Home from './pages/home';
import Search from './pages/search';
import Forecast from './pages/preview';

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
      <BackgroundBox style={{ minHeight: '100%' }} pad="medium">
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill="horizontal">
              <Router>
                <Box flex direction="row" wrap="true">
                  <Box flex={{ grow: 3, srink: 1 }}>
                    <Routes>
                      <Route exact path="/" element={<Home />} />
                      <Route path="/forecast/:location" element={<Forecast />} />
                      <Route path="/search/:location" element={<Search />} />
                    </Routes>
                  </Box>
                </Box>
              </Router>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </BackgroundBox>
    </Grommet>
  );
}

export default App;
