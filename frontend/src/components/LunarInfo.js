import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Text,
} from 'grommet';

import { DateTime } from 'luxon';

import CustomIcon from './icons/CustomIcon';

function TimeText({ time, timezoneId }) {
  return (
    <Text size="15px">
      { DateTime.fromISO(time, { zone: timezoneId }).toFormat('H:mm')}
    </Text>
  );
}

TimeText.propTypes = {
  time: PropTypes.string.isRequired,
  timezoneId: PropTypes.string.isRequired,
};

function MoonRise({ time, timezoneId }) {
  return (
    <Box align="center">
      <Text size="16px">Moonrise</Text>
      <Box direction="row" align="end">
        <TimeText time={time} timezoneId={timezoneId} />
      </Box>
    </Box>
  );
}

MoonRise.propTypes = {
  time: PropTypes.string.isRequired,
  timezoneId: PropTypes.string.isRequired,
};

function MoonSet({ time, timezoneId }) {
  return (
    <Box align="center">
      <Text size="16px">Moonset</Text>
      <Box direction="row" align="end">
        <TimeText time={time} timezoneId={timezoneId} />
      </Box>
    </Box>
  );
}

MoonSet.propTypes = {
  time: PropTypes.string.isRequired,
  timezoneId: PropTypes.string.isRequired,
};

function LunarInfo({
  moonphase,
  moonrise,
  moonset,
  timezoneId,
}) {
  // 0-1 1-8 8-16 16-24 24-25
  // 25-26 26-33 33-41 41-49 49-50
  let rotate = false;
  let description = '';

  // 0..25: "waxing crescent"
  // 25..50: "waxing gibbous"
  // 50..75: "waning gibbous"
  // 75..100: "waning crescent"

  let icon;
  switch (true) {
    case (moonphase <= 1 || moonphase > 99):
      icon = 'newmoon';
      description = 'New moon';
      break;
    case (moonphase <= 8 || moonphase > 92):
      icon = '1to8';
      description = 'crescent';
      break;
    case (moonphase <= 16 || moonphase > 84):
      icon = '2to8';
      description = 'crescent';
      break;
    case (moonphase <= 24 || moonphase > 76):
      icon = '3to8';
      description = 'crescent';
      break;
    case (moonphase <= 26 || moonphase > 74):
      icon = '4to8';
      description = 'quarter';
      break;
    case (moonphase <= 33 || moonphase > 67):
      icon = '5to8';
      description = 'gibbous';
      break;
    case (moonphase <= 41 || moonphase > 59):
      icon = '6to8';
      description = 'gibbous';
      break;
    case (moonphase <= 49 || moonphase > 51):
      icon = '7to8';
      description = 'gibbous';
      break;
    case (moonphase <= 51):
      icon = 'fullmoon';
      description = 'full moon';
      break;
    default:
      icon = '';
  }

  if (moonphase > 50) {
    rotate = true;

    switch (description) {
      case ('crescent'):
        description = `waning ${description}`;
        break;
      case ('gibbous'):
        description = `waning ${description}`;
        break;
      case ('quarter'):
        description = 'third quarter';
        break;
      default: break;
    }
  } else {
    switch (description) {
      case ('crescent'):
        description = `waxing ${description}`;
        break;
      case ('gibbous'):
        description = `waxing ${description}`;
        break;
      case ('quarter'):
        description = 'first quarter';
        break;
      default: break;
    }
  }

  return (
    <Box fill="horizontal">
      <Box align="center" direction="row" justify="left" gap="large">
        <Box>
          <Text size="16px">Moon phase:</Text>
          <Text size="16px">{description}</Text>
        </Box>
        <CustomIcon style={{ transform: `rotate(${rotate ? 180 : 0}deg)` }} size="40px" path={`/icons/svg/${icon}.svg`} />
      </Box>
      { ((moonrise && moonset) && (
        DateTime.fromISO(moonrise, { zone: timezoneId }).startOf('hour') < DateTime.fromISO(moonset.time, { zone: timezoneId }).startOf('hour') ? (
          <Box direction="row" pad={{ top: 'medium' }} gap="large">
            <MoonRise time={moonrise} timezoneId={timezoneId} />
            <MoonSet time={moonset.time} timezoneId={timezoneId} />
          </Box>
        ) : (
          <Box direction="row" pad={{ top: 'medium' }} gap="large">
            <MoonSet time={moonset.time} timezoneId={timezoneId} />
            <MoonRise time={moonrise} timezoneId={timezoneId} />
          </Box>
        ))) || (
        <Box direction="row" pad={{ top: 'medium' }}>
          { moonset && <MoonSet time={moonset.time} timezoneId={timezoneId} /> }
          { moonrise && <MoonRise time={moonrise} timezoneId={timezoneId} /> }
        </Box>
      )}
    </Box>
  );
}

LunarInfo.propTypes = {
  moonphase: PropTypes.string.isRequired,
  moonrise: PropTypes.string.isRequired,
  moonset: PropTypes.string.isRequired,
  timezoneId: PropTypes.string.isRequired,
};

export { LunarInfo, TimeText };
