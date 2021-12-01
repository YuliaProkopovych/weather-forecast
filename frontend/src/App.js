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
      brand: '#1b4332',
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
      <BackgroundBox fill="true">
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
                <Box flex={{ grow: 1, srink: 1 }}>
                  Sidebar
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
