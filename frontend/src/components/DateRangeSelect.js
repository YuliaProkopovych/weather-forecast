import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DateTime } from 'luxon';

import {
  DateInput, Grommet, ResponsiveContext, Box, Text, Heading,
} from 'grommet';

import CustomIcon from './icons/CustomIcon';

const theme = {
  text: {
    large: {
      size: '18px',
    },
  },
  button: {
    size: {
      large: {
        border: {
          radius: '1px',
        },
        pad: {
          vertical: '0px',
          horizontal: '0px',
        },
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

  const size = useContext(ResponsiveContext);

  return (
    <Box justify="center" pad={size !== 'small' ? '0px' : { top: 'large', horizontal: 'medium' }}>
      <Box>
        <Heading level="5" margin={{ top: '0px', bottom: 'medium' }}>Select time period:</Heading>
      </Box>
      <Grommet theme={theme} flex>
        <DateInput
          value={value}
          buttonProps={{
            pad: 'medium',
            size: 'large',
            label: `${DateTime.fromISO(value[0]).toFormat('d MMMM')} - ${DateTime.fromISO(value[1]).toFormat('d MMMM')}`,
            icon: <CustomIcon size="40px" path="/icons/svg/calendar7.svg" />,
          }}
          onChange={onChange}
        />
      </Grommet>
    </Box>
  );
}

DateRangeSelect.propTypes = {
  endDate: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  updateInterval: PropTypes.func.isRequired,
};

export default DateRangeSelect;
