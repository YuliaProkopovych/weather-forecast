import React, { useContext } from 'react';

import { Grid, ResponsiveContext } from 'grommet';

const columns = {
  small: ['auto'],
  medium: ['1/3', '2/3'],
  large: ['medium', 'auto'],
  xlarge: ['medium', 'auto'],
};

const rows = {
  small: ['auto', 'auto'],
  medium: ['auto', 'auto'],
  large: ['auto', 'auto'],
  xlarge: ['auto', 'auto'],
};

const fixedGridAreas = {
  small: [
    { name: 'logo', start: [0, 0], end: [0, 0] },
    { name: 'header', start: [0, 1], end: [0, 1] },
  ],
  medium: [
    { name: 'logo', start: [0, 0], end: [0, 0] },
    { name: 'description', start: [1, 0], end: [1, 0] },
    { name: 'header', start: [0, 1], end: [1, 1] },
  ],
  large: [
    { name: 'logo', start: [0, 0], end: [0, 1] },
    { name: 'description', start: [1, 0], end: [1, 0] },
    { name: 'header', start: [1, 1], end: [1, 1] },
  ],
  xlarge: [
    { name: 'logo', start: [0, 0], end: [0, 1] },
    { name: 'description', start: [1, 0], end: [1, 0] },
    { name: 'header', start: [1, 1], end: [1, 1] },
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
