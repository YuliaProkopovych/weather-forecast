import React, { useCallback } from 'react';
import { Box, Button, Grommet, Keyboard, Text, TextInput } from 'grommet';
import locationAutocomplete from '../utils/autocomplete';
import _ from 'lodash';


const SearchComponent = ({ onSelectLocation }) => {

  const [selectedPlace, setSelectedPlace] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  const [query, setQuery] = React.useState('');

  const boxRef = React.useRef();

  const loadSuggestions = useCallback(
    _.debounce(async (value) => {
      if (!value) {
        return;
      }

      try {
        const newSuggestions = await locationAutocomplete(value);
        setSuggestions(newSuggestions);
      } catch (error) {
        console.error(error);
      }
    }, 500),
  []);

  const selectPlace = (value) => {
    setSelectedPlace(value);
    setQuery(value);
    onSelectLocation(value);
    console.log("place selected");
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
        <Box flex style={{ minWidth: '500px' }}>
          <TextInput
            type="search"
            plain
            dropTarget={boxRef.current}
            onChange={event => { setQuery(event.target.value); loadSuggestions(event.target.value) }}
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
