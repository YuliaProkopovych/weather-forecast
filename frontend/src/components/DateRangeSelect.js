import React from 'react';
import PropTypes from 'prop-types';

import { DateTime } from 'luxon';

import {
  DateInput, Grommet,
} from 'grommet';

import CustomIcon from './icons/CustomIcon';

const theme = {
  button: {
    size: {
      large: {
        border: {
          radius: '1px',
        },
        // pad: {
        //   vertical: '0px',
        //   horizontal: '0px',
        // },
      },
    },
    border: {
      width: '0px',
      color: '#333',
    },
    extend: `&:hover {
      box-shadow: none;
    }`,
  },
  calendar: {
    day: {
      extend: ({ isSelected }) => `
        background-color: ${isSelected ? '#333' : undefined}`,
    },
  },
};

function DateRangeSelect({ startDate, endDate, updateInterval }) {
  const [value, setValue] = React.useState([
    startDate,
    endDate,
  ]);
  const onChange = (event) => {
    const nextValue = event.value;
    setValue(nextValue);
    updateInterval(nextValue[0], nextValue[1]);
  };

  DateRangeSelect.parameters = {
    chromatic: { disable: true },
  };

  return (
    <Grommet theme={theme}>
      <DateInput
        value={value}
        buttonProps={{
          pad: 'medium',
          size: 'large',
          label: `${DateTime.fromISO(value[0]).toFormat('d MMM')} - ${DateTime.fromISO(value[1]).toFormat('d MMM')}`,
          icon: <CustomIcon size="40px" path="/icons/svg/calendar7.svg" />,
        }}
        onChange={onChange}
      />
    </Grommet>
  );
}

DateRangeSelect.propTypes = {
  endDate: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  updateInterval: PropTypes.func.isRequired,
};

export default DateRangeSelect;
