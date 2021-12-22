import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, List, Heading } from 'grommet';

import autocomplete from '../utils/autocomplete';
import Header from '../components/Header';

function Search() {
  const params = useParams();
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function getSuggestions() {
      const place = decodeURIComponent(params.location);
      const places = await autocomplete(place);

      setLocations(places);
    }
    getSuggestions();
  }, []);

  return (
    <Box>
      <Header />
      <Box pad="medium">
        <Heading level="3">Search results</Heading>
        <List
          data={locations}
          onClickItem={(event) => {
            navigate(`../../forecast/${encodeURIComponent(event.target.innerText)}`);
          }}
        />
      </Box>
    </Box>
  );
}

export default Search;
