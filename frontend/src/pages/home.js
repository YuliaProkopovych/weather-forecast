import React, { useState } from 'react';
import { Box } from 'grommet';

import SearchForm from '../components/SearchForm';

function Home() {
  const [location, setLocation] = useState('');

  return (
    <Box>
      <SearchForm
        location={location}
      />
    </Box>
  );
}

export default Home;
