import React, { useCallback, useState, useContext } from 'react';
import {
  Box, Grommet, Keyboard, TextInput, Text, Form, FormField, Button, MaskedInput, ResponsiveContext,
} from 'grommet';
import _ from 'lodash';

import { Search } from 'grommet-icons';

import { useNavigate } from 'react-router-dom';
import locationAutocomplete from '../utils/autocomplete';

const customTheme = {
  textInput: {
    extend: () => `
    &:focus {
      box-shadow: 0 0 1px 0 #999;
    }
  `,
  },
  button: {
    border: {
      color: '#aaa',
      radius: '4px',
    },
    extend: `
      &:hover {
        box-shadow: none;
        background-color: #eee;
      }
      `,
  },
  formField: {
    border: 'none',
  },
};

function CoordinateFormField({ name, id }) {
  return (
    <FormField name={name} htmlFor={id} direction="row" align="center" margin={{ bottom: '0px' }}>
      <Box width={{ max: '80px' }}>
        {/* <MaskedInput
          mask={[
            {
              regexp: /^-?[0-9]{1,2}\.?(\.[0-9]{1,3})?$/,
            },
          ]}
          id={id}
          name={name}
          placeholder="00.000"
          focusIndicator={false}
        /> */}
        <TextInput name={name} id={id} placeholder={id} />
      </Box>
    </FormField>
  );
}

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

  const searchByCoordinates = ({ value }) => {
    console.log(value);
    navigate(`./forecast/lat:${encodeURIComponent(value.latitude)},lon:${encodeURIComponent(value.longtitude)}`);
  };

  const screenSize = useContext(ResponsiveContext);

  return (
    <Grommet theme={customTheme}>
      <Box direction={screenSize === 'small' ? 'column' : 'row'} align="center" wrap gap="10px">
        {screenSize !== 'small' && <Box><Text>Select location</Text></Box>}
        <Box direction="row">
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
                  placeholder={screenSize === 'small' ? 'Select location...' : 'Enter...'}
                  suggestions={suggestions}
                />
              </Box>
            </Box>
          </Keyboard>
        </Box>
        <Box pad={{ vertical: 'medium' }}>
          <Text>or enter coordinates:</Text>
        </Box>
        <Form onSubmit={searchByCoordinates}>
          <Box direction={screenSize === 'small' ? 'column' : 'row'} wrap gap="20px">
            <Box direction="row" gap="10px">
              <CoordinateFormField name="latitude" id="lat" label="Lat" />
              <CoordinateFormField name="longtitude" id="lon" label="Lon" />
            </Box>
            <Button margin={screenSize === 'small' && { vertical: 'medium' }} type="submit" label="Search" />
          </Box>
        </Form>
      </Box>
    </Grommet>
  );
}

export default SearchForm;
