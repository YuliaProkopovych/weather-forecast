import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, List, Heading } from 'grommet';

import autocomplete from '../utils/autocomplete';

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
    <Box pad="medium">
      <Heading level="3">Search results</Heading>
      <List
        data={locations}
        onClickItem={(event) => {
          navigate(`../../forecast/${encodeURIComponent(event.target.innerText)}`, { replace: true });
        }}
      />
    </Box>
  );
}

export default Search;
