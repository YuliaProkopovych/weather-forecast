import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {
  Grommet,
  Box,
  List,
  Heading,
  Tip,
  Text,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

import CustomIcon from './icons/CustomIcon';

const theme = deepMerge(grommet, {
  background: { color: 'transparent' },
  list: {
    item: {
      pad: { horizontal: 'medium', vertical: 'xsmall' },
      background: ['white', 'light-2'],
      border: false,
    },
  },
});

function FavouriteLocationsList({ locations }) {
  const navigate = useNavigate();

  const redirectToForecast = (location) => {
    navigate(`../../forecast/${encodeURIComponent(location)}`, { replace: true });
  };

  return (
    <Grommet theme={theme} background={{ color: 'transparent' }}>
      <Box pad="large">
        <Heading level="3">Favourite locations</Heading>
        <List
          data={locations}
          onClickItem={(event) => {
            redirectToForecast(event.item);
          }}
        >
          {(datum) => (
            <Tip content="see forecast" dropProps={{ align: { left: 'right' } }}>
              <Box direction="row" gap="medium" align="center">
                <CustomIcon size="35px" path="/icons/svg/place.svg" />
                <Text weight="bold">{datum}</Text>
              </Box>
            </Tip>
          )}
        </List>
      </Box>
    </Grommet>
  );
}

FavouriteLocationsList.propTypes = {
  locations: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default FavouriteLocationsList;
