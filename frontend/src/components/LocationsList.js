import React from 'react';
import { Box, List, Heading } from 'grommet';

function LocationsList({ locations, onSelectLocation }) {
  return (
    <Box pad="medium">
      <Heading level="3">Search results</Heading>
      <List
        data={locations}
        onClickItem={(event) => {
          console.log(event.target.innerText);
          onSelectLocation(event.target.innerText);
        }}
      />
    </Box>
  );
}

export default LocationsList;
