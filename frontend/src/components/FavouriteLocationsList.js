import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {
  Grommet,
  Box,
  List,
  Heading,
} from 'grommet';

import FavouriteLocationItem from './FavouriteLocationItem';

const theme = {
  list: {
    item: {
      pad: { horizontal: 'small' },
      background: ['rgba(255,255,255,0.6)', 'light-2'],
      border: false,
      default: {},
      extend: `&:hover{
        background: #fff;
      }`,
    },
  },
};

function FavouriteLocationsList({ locations }) {
  const navigate = useNavigate();

  const redirectToForecast = (location) => {
    navigate(`../../forecast/${encodeURIComponent(location)}`);
  };

  return (
    <Grommet theme={theme} background={{ color: 'transparent' }}>
      <Box pad="medium">
        <Heading level="3">Pinned locations</Heading>
        <Box>
          <List
            data={locations}
            onClickItem={(event) => {
              redirectToForecast(event.item);
            }}
          >
            {(datum) => (
              <FavouriteLocationItem location={datum} />
            )}
          </List>
        </Box>
      </Box>
    </Grommet>
  );
}

FavouriteLocationsList.propTypes = {
  locations: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default FavouriteLocationsList;