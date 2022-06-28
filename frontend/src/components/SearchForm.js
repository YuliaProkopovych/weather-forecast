import React, { useCallback, useState, useContext } from 'react';
import {
  Box, Grommet, TextInput, Text, Form, FormField, Button, ResponsiveContext,
} from 'grommet';
import _ from 'lodash';

import { Search, StatusWarning } from 'grommet-icons';

import { useNavigate } from 'react-router-dom';
import locationAutocomplete from '../utils/autocomplete';

const customTheme = {
  textInput: {
    extend: () => `
    border: none;
    &:focus {
      box-shadow: none;
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
    error: {
      icon: <StatusWarning color="status-critical" />,
      container: {
        align: 'center',
        margin: {
          left: '10px',
        },
      },
      background: {
      },
    },
    border: {
      width: '0px',
      side: 'none',
      radius: '4px',
    },
  },
};

function CoordinateFormField({ validate, name, id }) {
  return (
      <FormField name={name} htmlFor={id} align="center" margin={{ bottom: '0px' }} validate={validate}>
        {/* <Box width={{ max: '120px' }}> */}
        <Box width={{ max: '180px' }}>
          <TextInput name={name} id={id} placeholder={id} />
        </Box>
      </FormField>
  );
}

function SearchForm() {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');

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
    navigate(`./forecast/${encodeURIComponent(value.latitude)},${encodeURIComponent(value.longitude)}`);
  };

  const validateSearchForm = (validationResults) => {
    console.log(validationResults);
  };

  const validateSelectField = (fieldValue, formValue) => {
    if (!fieldValue && (!formValue.longitude && !formValue.latitude)) {
      return <Box alignSelf="start"><Text>select location</Text></Box>;
    }
    return undefined;
  };

  const validateLatitude = (fieldValue, formValue) => {
    if (!fieldValue) {
      if (formValue.longitude) {
        return <Box><Text>enter latitude</Text></Box>;
      }
    } else if (fieldValue >= 90 || fieldValue <= -90 || !fieldValue.match(/^-?[0-9]{1,2}\.?(\.[0-9]{1,3})?$/)) {
      return <Box><Text>incorrect value</Text></Box>;
    }
    return undefined;
  };

  const validateLongitude = (fieldValue, formValue) => {
    if (!fieldValue) {
      if (formValue.latitude) {
        return <Box><Text>enter longitude</Text></Box>;
      }
    } else if (fieldValue >= 180 || fieldValue <= -180 || !fieldValue.match(/^-?[0-9]{1,3}\.?(\.[0-9]{1,3})?$/)) {
      return <Box><Text>incorrect value</Text></Box>;
    }
    return undefined;
  };

  const screenSize = useContext(ResponsiveContext);

  return (
    <Grommet theme={customTheme}>
      <Form onSubmit={searchByCoordinates} onValidate={validateSearchForm} validate="blur" direction="row">
        <Box direction={screenSize !== 'small' ? 'row' : 'column'} gap="10px" pad="medium" align="stretch">
          <Box direction="row" wrap gap="15px">
            {screenSize !== 'small' && (
            <Box direction="row" align="center" gap="10px">
              <Search />
              <Text>Select location</Text>
            </Box>
            )}
            <Box
              ref={boxRef}
              wrap
            >
              <FormField name="select" htmlFor="select" validate={validateSelectField} margin={{ bottom: '0px' }}>
                <TextInput
                  id="select"
                  name="select"
                  type="search"
                  icon={screenSize === 'small' && <Search />}
                  dropTarget={boxRef.current}
                  onChange={(event) => { setQuery(event.target.value); loadSuggestions(event.target.value); }}
                  value={query}
                  onSuggestionSelect={(event) => selectPlace(event.suggestion)}
                  placeholder={screenSize === 'small' ? 'Select location...' : 'e. g. London...'}
                  suggestions={suggestions}
                />
              </FormField>
            </Box>
          </Box>
          <Box direction="row" wrap align="center" gap="15px">
            {/* <Box alignSelf={screenSize === 'small' && 'start'}> */}
            <Box>
              <Text> or enter coordinates:</Text>
            </Box>
            <Box direction="row" flex="grow" alignSelf={screenSize === 'small' && 'stretch'} gap="15px" alignContent={screenSize === 'small' && 'evenly'}>
              <CoordinateFormField validate={validateLatitude} name="latitude" id="lat" label="Lat" />
              <CoordinateFormField validate={validateLongitude} name="longitude" id="lon" label="Lon" />
            </Box>
          </Box>
          <Button alignSelf="center" margin={screenSize === 'small' && { vertical: 'medium' }} type="submit" label="Search" />
        </Box>
      </Form>
    </Grommet>
  );
}

export default SearchForm;
