import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Box,
  Text,
  Card,
  Heading,
  Grid,
  ResponsiveContext,
} from 'grommet';

import { DateTime } from 'luxon';
import _ from 'lodash';

import { getSunrise } from '../utils/getSunrise';
import Header from '../components/Header';
import { LunarInfo, TimeText } from '../components/LunarInfo';
import Location from '../components/Location';
import CustomIcon from '../components/icons/CustomIcon';
import DateRangeSelect from '../components/DateRangeSelect';
import ResponsiveHeader from '../components/ResponsiveHeader';
import Logo from '../components/Logo';

function SolarCalendar() {
  const params = useParams();
  const locationData = useLocation();
  const [data, setData] = useState({});
  const [locationName, setLocationName] = useState('');
  const [coordinates, setCoordinates] = useState({});
  const [startDate, setStartDate] = useState(params.startDate ? decodeURIComponent(params.startDate)
    : DateTime.now().toISO());
  const [endDate, setEndDate] = useState(params.endDate ? decodeURIComponent(params.endDate)
    : DateTime.now().plus({ days: 5 }).toISO());

  const [timezone, setTimezone] = useState({});

  useEffect(() => {
    async function getSolarData() {
      let dataObject = {};
      if (locationData.state) {
        setCoordinates(locationData.state);
        setLocationName(params.location);
        dataObject = await getSunrise(locationData.state, startDate, endDate);
      } else {
        const coords = { lat: params.location.split(',')[0], lon: params.location.split(',')[1] };
        setCoordinates(coords);
        dataObject = await getSunrise(coords, startDate, endDate);
      }
      setData(dataObject.solarData);
      setTimezone(dataObject.timezone);
    }
    getSolarData();
  }, [startDate, endDate]);

  const setNewDates = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };
  const screenSize = useContext(ResponsiveContext);
  return (
    <>
      <ResponsiveHeader>
        <Header>
          <Box direction="row" wrap align="center">
            <Location location={locationName} coordinates={coordinates} />
            <DateRangeSelect startDate={startDate} endDate={endDate} updateInterval={setNewDates} />
          </Box>
        </Header>
        <Logo />
      </ResponsiveHeader>
      <Box pad={screenSize !== 'small' ? 'medium' : 'small'}>
        <Grid columns="330px" gap="small">
          {data.length && data.map((item) => (
            <Box width={{ min: '330px' }}>
              <Card pad="medium" background="semitransparent-white">
                <Heading alignSelf="center" level="3">{(DateTime.fromISO(item.date)).toFormat('dd MMMM')}</Heading>
                { item.sunrise ? (
                  <Box direction="row" justify="between" gap="20px">
                    <Box align="center">
                      <Text size="16px">Sunrise</Text>
                      <Box direction="row" align="end">
                        <CustomIcon margin={{ right: '5px' }} path="/icons/svg/sunrise.svg" size="40px" />
                        <TimeText time={item.sunrise.time} timezoneId={timezone.timezoneId} />
                      </Box>
                    </Box>
                    <Box align="center">
                      <Text size="16px">Solar noon</Text>
                      <Box direction="row" align="end">
                        <CustomIcon margin={{ right: '5px' }} path="/icons/svg/sunnoon.svg" size="40px" />
                        <TimeText time={item.solarnoon.time} timezoneId={timezone.timezoneId} />
                      </Box>
                    </Box>
                    <Box align="center">
                      <Text size="16px">Sunset</Text>
                      <Box direction="row" align="end">
                        <CustomIcon margin={{ right: '5px' }} path="/icons/svg/sunset.svg" size="40px" />
                        <TimeText time={item.sunset.time} timezoneId={timezone.timezoneId} />
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
                  <LunarInfo moonphase={item.moonposition.phase} moonrise={item.moonrise.time} moonset={item.moonset} timezoneId={timezone.timezoneId} />
                </Box>
              </Card>
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default SolarCalendar;
