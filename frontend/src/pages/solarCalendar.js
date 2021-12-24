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
import LunarInfo from '../components/LunarInfo';
import Location from '../components/Location';
import CustomIcon from '../components/icons/CustomIcon';

function TimeText({ time }) {
  return (
    <Text size="15px">
      { DateTime.fromISO(time).toFormat('H:mm')}
    </Text>
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
      <Box pad="medium" direction="row" wrap="true" justify="left" alignContent="start">
        {data.length && data.map((item) => (
          <Box pad="small" width={{ min: '330px' }}>
            <Card pad="medium" background="semitransparent-white">
              <Heading alignSelf="center" level="3">{(DateTime.fromISO(item.date)).toFormat('dd MMMM')}</Heading>
              { item.sunrise ? (
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
              ) : (
                <Box direction="row" align="center">
                  <Text size="16px">{item.solarnoon.elevation > 0 ? 'Polar day' : 'Polar night'}</Text>
                  <CustomIcon margin={{ left: '10px' }} path="/icons/svg/clearsky_polartwilight.svg" size="40px" />
                </Box>
              ) }
              <Box align="start" pad={{ top: '15px' }}>
                <Box direction="row" align="end">
                  <Text size="small">Max sun elevation</Text>
                  <CustomIcon margin={{ left: '10px', bottom: '3px', right: '3px' }} size="20px" path="/icons/svg/angle.svg" />
                  <Text size="16px">{`${_.round((item.solarnoon.elevation), 1)}°`}</Text>
                </Box>
              </Box>
              <Box direction="row" pad={{ top: 'medium' }} align="end" justify="between">
                <LunarInfo moonphase={item.moonphase.value} moonrise={item.moonrise} moonset={item.moonset} />
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SolarCalendar;
