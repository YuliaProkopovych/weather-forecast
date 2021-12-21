import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, DataTable, Text, Layer, ResponsiveContext,
} from 'grommet';

import Header from '../components/Header';
import WeatherIcon from '../components/icons/WeatherIcon';
import DetailedForecast from '../components/DetailedForecast';
import SmallForecast from '../components/SmallForecast';
import WeatherPreviewHeader from '../components/WeatherPreviewHeader';
import getForecast from '../utils/getForecast';
import SolarCalendarLink from '../components/SolarCalendarLink';

function Forecast() {
  const params = useParams();
  const [show, setShow] = useState(false);

  const [clicked, setClicked] = useState({});
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
          <Text color={object.maxT > 0 ? 'aboveZero' : 'belowZero'}>
            {object.maxT}
            °
          </Text>
          <Text>{' / '}</Text>
          <Text color={object.minT > 0 ? 'aboveZero' : 'belowZero'}>
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
      render: () => { <Text>Open detailed forecast</Text>; },
    },
  ];

  return (
    <Box>
      <Header>
        <WeatherPreviewHeader location={params.location} currentConditions={rawForecast[0]} />
      </Header>
      <SolarCalendarLink />
      <ResponsiveContext.Consumer>
        {(size) => (
          size !== 'small' ? (
            <DataTable
              pad="medium"
              background="semitransparent-white"
              columns={columns}
              data={weather}
              step={rawForecast.length}
              onClickRow={(event) => {
                setShow(true);
                setClicked(event.datum);
              }}
              responsive="true"
            />
          ) : (
            <SmallForecast
              forecast={weather}
              onClickItem={(item) => {
                setShow(true);
                setClicked(item);
              }}
            />
          )
        )}
      </ResponsiveContext.Consumer>
      {show && (
      <Layer
        position="center"
        onEsc={() => setShow(false)}
        onClickOutside={() => setShow(false)}
      >
        <DetailedForecast
          forecastRecord={rawForecast.find((record) => record.date === clicked.date)}
          closeItself={() => setShow(false)}
        />
      </Layer>
      )}
    </Box>
  );
}

export default Forecast;
