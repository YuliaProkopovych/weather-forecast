import React, { useCallback, useState } from 'react';
import {
  Box, Grommet, Keyboard, TextInput,
} from 'grommet';
import _ from 'lodash';

import { Search } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';

import { useNavigate } from 'react-router-dom';
import locationAutocomplete from '../utils/autocomplete';

const customTheme = deepMerge(Grommet, {

  textInput: {
    extend: () => `
    &:focus {
      box-shadow: 0 0 1px 0 #999;
    }
  `,
  },
});

function SearchForm() {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState();

  const boxRef = React.useRef();
  const navigate = useNavigate();

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
    [],
  );

  const selectPlace = (value) => {
    navigate(`./forecast/${encodeURIComponent(value)}`);
  };

  return (
    <Grommet theme={customTheme}>
      <Box pad="medium">
        <Keyboard onEnter={() => navigate(`./search/${encodeURIComponent(query)}`)}>
          <Box
            direction="row"
            align="center"
            ref={boxRef}
            wrap
          >
            <Box>
              <TextInput
                type="search"
                icon={<Search />}
                dropTarget={boxRef.current}
                onChange={(event) => { setQuery(event.target.value); loadSuggestions(event.target.value); }}
                value={query}
                onSuggestionSelect={(event) => selectPlace(event.suggestion)}
                placeholder="Select location..."
                suggestions={suggestions}
              />
            </Box>
          </Box>
        </Keyboard>
      </Box>
    </Grommet>
  );
}

export default SearchForm;
