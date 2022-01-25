import React, { useContext } from 'react';

import { Grid, ResponsiveContext } from 'grommet';

const columns = {
  small: ['auto'],
  medium: ['auto', 'small'],
  large: ['medium', 'auto', 'medium'],
  xlarge: ['medium', 'auto', 'medium'],
};

const rows = {
  small: ['auto', 'auto', 'auto'],
  medium: ['auto', 'auto'],
  large: ['auto', 'auto'],
  xlarge: ['auto', 'auto'],
};

const fixedGridAreas = {
  small: [
    { name: 'logo', start: [0, 0], end: [0, 0] },
    { name: 'header', start: [0, 1], end: [0, 1] },
    { name: 'main', start: [0, 2], end: [0, 2] },
  ],
  medium: [
    { name: 'header', start: [1, 0], end: [1, 0] },
    { name: 'logo', start: [0, 0], end: [0, 0] },
    { name: 'main', start: [0, 1], end: [1, 1] },
  ],
  large: [
    { name: 'logo', start: [0, 0], end: [0, 0] },
    { name: 'header', start: [1, 0], end: [2, 0] },
    { name: 'main', start: [0, 1], end: [1, 1] },
    { name: 'sidebar', start: [2, 1], end: [2, 1] },
  ],
  xlarge: [
    { name: 'logo', start: [0, 0], end: [0, 0] },
    { name: 'header', start: [1, 0], end: [2, 0] },
    { name: 'main', start: [0, 1], end: [1, 1] },
    { name: 'sidebar', start: [2, 1], end: [2, 1] },
  ],
};

function ResponsiveGrid({
  children,
  ...props
}) {
  const size = useContext(ResponsiveContext);
  let columnsVal = columns;
  if (columns) {
    if (columns[size]) {
      columnsVal = columns[size];
    }
  }

  let rowsVal = rows;
  if (rows) {
    if (rows[size]) {
      rowsVal = rows[size];
    }
  }

  let areasVal = fixedGridAreas;
  if (fixedGridAreas && !Array.isArray(fixedGridAreas)) areasVal = fixedGridAreas[size];

  return (
    <Grid
      {...props}
      areas={!areasVal ? undefined : areasVal}
      rows={!rowsVal ? size : rowsVal}
      columns={!columnsVal ? size : columnsVal}
    >
      {children}
    </Grid>
  );
}

export default ResponsiveGrid;
