import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, DataTable, Text, Layer, Heading, Button,
} from 'grommet';
import { Location, Star } from 'grommet-icons';

import WeatherIcon from '../components/icons/WeatherIcon';
import DetailedForecast from '../components/DetailedForecast';
import getForecast from '../utils/getForecast';

function Forecast() {
  const params = useParams();
  const [show, setShow] = React.useState(false);
  console.log(params.location);

  const [clicked, setClicked] = React.useState({});
  const [rawForecast, setRawForecast] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    async function getWeatherForecast() {
      const weatherForecast = await getForecast(params.location);

      const formattedData = weatherForecast.map((record, index) => {
        const { date, forecast } = record;
        const symbols = {};
        const times = {
          dawn: '08:00',
          noon: '14:00',
          dusk: '20:00',
          midnight: '02:00',
        };
        const getSymbolByTimeInForecast = (time) => (forecast.find((item) => (item.time === time))).next_6_hours.symbol;

        if (index === 0) {
          if (forecast[0].time < times.dawn) {
            symbols.night = forecast[0].next_6_hours.symbol;
            symbols.morning = getSymbolByTimeInForecast(times.dawn);
            symbols.afternoon = getSymbolByTimeInForecast(times.noon);
            symbols.evening = getSymbolByTimeInForecast(times.dusk);
          } else if (forecast[0].time < times.noon) {
            symbols.morning = forecast[0].next_6_hours.symbol;
            symbols.afternoon = getSymbolByTimeInForecast(times.noon);
            symbols.evening = getSymbolByTimeInForecast(times.dusk);
          } else if (forecast[0].time < times.dusk) {
            symbols.afternoon = forecast[0].next_6_hours.symbol;
            symbols.evening = getSymbolByTimeInForecast(times.dusk);
          } else {
            symbols.evening = forecast[0].next_6_hours.symbol;
          }
        } else {
          symbols.night = getSymbolByTimeInForecast(times.midnight);
          symbols.morning = getSymbolByTimeInForecast(times.dawn);
          symbols.afternoon = getSymbolByTimeInForecast(times.noon);
          symbols.evening = getSymbolByTimeInForecast(times.dusk);
        }

        const maxT = forecast.reduce(
          (max, current) => (max > current.weather.air_temperature ? max : current.weather.air_temperature),
          forecast[0].weather.air_temperature,
        );
        const minT = forecast.reduce(
          (min, current) => (min < current.weather.air_temperature ? min : current.weather.air_temperature),
          forecast[0].weather.air_temperature,
        );

        const precip = Math.round(
          forecast.reduce(
            (sum, current) => (
              current.next_1_hours
                ? sum + current.next_1_hours.precipitations : sum + current.next_6_hours.precipitations
            ),
            0,
          ) * 100,
        ) / 100;

        const wind = Math.round(
          forecast.reduce((sum, current) => sum + current.weather.wind_speed, 0) / forecast.length,
        );
        return {
          date, minT, maxT, precipitations: precip, wind, ...symbols,
        };
      });
      setRawForecast(weatherForecast);
      setWeather(formattedData);
    }
    getWeatherForecast();
  }, []);

  const renderIcon = (icon) => icon && <WeatherIcon path={`/icons/svg/${icon}.svg`} />;

  const columns = [
    {
      property: 'date',
      header: '',
      primary: true,
    },
    {
      property: 'night',
      header: 'Night',
      render: ({ night }) => renderIcon(night),
    },
    {
      property: 'morning',
      header: 'Morning',
      render: ({ morning }) => renderIcon(morning),
    },
    {
      property: 'afternoon',
      header: 'Afternoon',
      render: ({ afternoon }) => renderIcon(afternoon),
    },
    {
      property: 'evening',
      header: 'Evening',
      render: ({ evening }) => renderIcon(evening),
    },
    {
      property: 'temperature',
      header: 'max/min temp.',
      render: (object) => (
        <Box flex direction="row">
          <Text color={object.maxT > 0 ? '#9e0000' : '#0202a1'}>
            {object.maxT}
            °
          </Text>
          <Text>{' / '}</Text>
          <Text color={object.minT > 0 ? '#9e0000' : '#0202a1'}>
            {object.minT}
            °
          </Text>
        </Box>
      ),
    },
    {
      property: 'precipitations',
      header: 'Precipitations',
      render: ({ precipitations }) => (precipitations ? (
        <Text>
          {precipitations}
          {' '}
          mm
        </Text>
      ) : ''),
    },
    {
      property: 'wind',
      header: 'Wind',
      render: ({ wind }) => (
        <Text>
          {wind}
          {' '}
          m/s
        </Text>
      ),
    },
    {
      property: 'open',
      header: '',
    },
  ];

  return (
    <Box>
      <Box pad="large" direction="row" align="center" justify="evenly">
        <Box direction="row" align="center">
          <Location size="70px" />
          <Box margin={{ left: '10px' }}>
            <Box direction="row" align="center">
              <Heading margin={{ bottom: '10px', top: '15px', right: '10px' }} level="2">
                {params.location.split(' ').pop()}
              </Heading>
              <Star size="35px" />
            </Box>
            <Text>{params.location}</Text>
          </Box>
        </Box>
        <Box direction="row" align="start">

          {/* <Button
            label="Search"
            color='teal'
            hoverIndicator='teal'
          /> */}
        </Box>
      </Box>
      <Box margin={{ left: '20px' }}>
        <DataTable
          pad="medium"
          columns={columns}
          data={weather}
          step={rawForecast.length}
          onClickRow={(event) => {
            setShow(true);
            setClicked(event.datum);
          }}
        />
        {show && (
        <Layer
          position="center"
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <DetailedForecast forecastRecord={rawForecast.find((record) => record.date === clicked.date)} />
        </Layer>
        )}
      </Box>
    </Box>
  );
}

export default Forecast;
