import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
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
      box-shadow: 0px 0px 2px 2px #000000;
      border-radius: 0px;
    }
  `,
  },
});

function SearchForm({ location }) {
  const [suggestions, setSuggestions] = React.useState([]);
  const [query, setQuery] = React.useState(location);

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
    navigate(`./forecast/${encodeURIComponent(value)}`, { replace: true });
  };

  return (
    <Grommet theme={customTheme}>
      <Box pad="medium">

        <Keyboard onEnter={() => navigate(`./search/${encodeURIComponent(query)}`, { replace: true })}>
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
                icon={<Search />}
                plain
                dropTarget={boxRef.current}
                onChange={(event) => { setQuery(event.target.value); loadSuggestions(event.target.value); }}
                value={location || query}
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

SearchForm.propTypes = {
  location: PropTypes.string,
};

SearchForm.defaultProps = {
  location: '',
};

export default SearchForm;
