import React from 'react';

import {
  Box, Button, Grommet,
} from 'grommet';

const customTheme = {
  button: {
    border: {
      width: '2px',
      radius: '10px',
      color: '#444444',
    },
    maxWidth: '60px',

    extend: () => `

        &:hover {
          box-shadow: none;
        },

      `,

  },

};

function ThemedButtons() {
  return (
    <Grommet theme={customTheme}>
      <Box flex direction="row" justify="around">
        <Button
          label="Search"
          onClick={() => {}}
        />
        <Button
          label="Menu"
          onClick={() => {}}
        />
      </Box>
    </Grommet>
  );
}

export default ThemedButtons;
