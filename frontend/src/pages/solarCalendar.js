import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Text,
  Card,
  Heading,
} from 'grommet';

import { DateTime, Duration } from 'luxon';
import _ from 'lodash';

import getSunrise from '../utils/getSunrise';
import Header from '../components/Header';
import Location from '../components/Location';
import CustomIcon from '../components/icons/CustomIcon';

function TimeText({ time }) {
  return (
    <Text size="15px">
      { DateTime.fromISO(time).toFormat('hh:mm')}
    </Text>
  );
}

function MoonPhase({ value }) {
  // 0-1 1-8 8-16 16-24 24-25
  // 25-26 26-33 33-41 41-49 49-50
  let rotate = false;
  if (value > 50) {
    rotate = true;
  }
  let icon;
  switch (true) {
    case (value <= 1 || value > 99):
      icon = 'newmoon';
      break;
    case (value <= 8 || value > 92):
      icon = '1to8';
      break;
    case (value <= 16 || value > 84):
      icon = '2to8';
      break;
    case (value <= 24 || value > 76):
      icon = '3to8';
      break;
    case (value <= 26 || value > 74):
      icon = '4to8';
      break;
    case (value <= 33 || value > 67):
      icon = '5to8';
      break;
    case (value <= 41 || value > 59):
      icon = '6to8';
      break;
    case (value <= 49 || value > 51):
      icon = '7to8';
      break;
    case (value <= 51):
      icon = 'fullmoon';
      break;
    default:
      icon = '';
  }

  return (
    <Box>
      <Text>Moon phase</Text>
      <CustomIcon style={{ transform: `rotate(${rotate ? 180 : 0}deg)` }} size="40px" path={`/icons/svg/${icon}.svg`} />
    </Box>
  );
}

function SolarCalendar() {
  const params = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    async function getSolarData() {
      const place = decodeURIComponent(params.location);
      const offsetInMinutes = DateTime.now().offset;
      const offset = Duration.fromObject({ minutes: offsetInMinutes }).toFormat('hh:mm');
      const solarData = await getSunrise(place, DateTime.now().toFormat('yyyy-MM-dd'), `+${offset}`);
      setData(solarData);
    }
    getSolarData();
  }, []);

  return (
    <Box>
      <Header>
        <Location location={params.location} />
      </Header>
      <Box pad="medium" direction="row" wrap="true" justify="evenly" alignContent="start">
        {data.length && data.map((item) => (
          <Box pad="small" width={{ min: '330px' }}>
            <Card pad="medium" background="semitransparent-white">
              <Heading alignSelf="center" level="3">{(DateTime.fromISO(item.date)).toFormat('dd MMMM')}</Heading>
              <Box direction="row" justify="between" gap="20px">
                <Box align="center">
                  <Text size="16px">Sunrise</Text>
                  <Box direction="row" align="end">
                    <CustomIcon margin={{ right: '5px' }} path="/icons/svg/sunrise.svg" size="40px" />
                    <TimeText time={item.sunrise.time} />
                  </Box>
                </Box>
                <Box align="center">
                  <Text size="16px">Solar noon</Text>
                  <Box direction="row" align="end">
                    <CustomIcon margin={{ right: '5px' }} path="/icons/svg/sunnoon.svg" size="40px" />
                    <TimeText time={item.solarnoon.time} />
                  </Box>
                </Box>
                <Box align="center">
                  <Text size="16px">Sunset</Text>
                  <Box direction="row" align="end">
                    <CustomIcon margin={{ right: '5px' }} path="/icons/svg/sunset.svg" size="40px" />
                    <TimeText time={item.sunset.time} />
                  </Box>
                </Box>
              </Box>
              <Box align="start" pad={{ top: '15px' }}>
                <Box direction="row" align="end">
                  <Text size="small">Max sun elevation</Text>
                  <CustomIcon margin={{ left: '10px', bottom: '3px', right: '3px' }} size="20px" path="/icons/svg/angle.svg" />
                  <Text size="16px">{`${_.round((item.solarnoon.elevation), 1)}°`}</Text>
                </Box>
              </Box>
              <Box>
                <Text>Moon phase</Text>
                <Text>{item.moonphase.value}</Text>
                <MoonPhase value={item.moonphase.value} />
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SolarCalendar;
