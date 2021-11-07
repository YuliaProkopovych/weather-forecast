import React from 'react';
import axios from 'axios';
import { FormClose } from 'grommet-icons';
import { Box, Button, Grommet, Keyboard, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import locationAutocomplete from '../utils/autocomplete';


const SearchComponent = () => {

  const [selectedPlace, setSelectedPlace] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  const [query, setQuery] = React.useState('');

  const boxRef = React.useRef();

  const loadSuggestions = async (event) => {

    setQuery(event.target.value);
    console.log(query);

    const newSuggestions = await locationAutocomplete(event.target.value);
    setSuggestions(newSuggestions);
    console.log(suggestions);
  };

  const selectPlace = (value) => {
    setSelectedPlace(value);
    setQuery(value);
  };



  return (
//on enter
    <Keyboard>
      <Box
        direction="row"
        align="center"

        border="all"
        ref={boxRef}
        wrap
      >
        <Box flex style={{ minWidth: '120px' }}>
          <TextInput
            type="search"
            plain
            dropTarget={boxRef.current}
            onChange={e => loadSuggestions(e)}
            value={query}
            onSuggestionSelect={(event) => selectPlace(event.suggestion)}
            placeholder="Search for aliases..."
            suggestions={suggestions}
          />
        </Box>
      </Box>
    </Keyboard>
  );
};

export default SearchComponent;
