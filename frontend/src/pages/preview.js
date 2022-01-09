import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, DataTable, Layer, ResponsiveContext,
} from 'grommet';

import Header from '../components/Header';
import { wideColumns, mediumColumns } from '../utils/weatherTableColumns';
import DetailedForecast from '../components/DetailedForecast';
import SmallForecast from '../components/SmallForecast';
import WeatherPreviewHeader from '../components/WeatherPreviewHeader';
import LocationComponent from '../components/Location';
import CurrentConditions from '../components/CurrentConditions';
import getForecast from '../utils/getForecast';
import SolarCalendarLink from '../components/SolarCalendarLink';
import ResponsiveGrid from '../components/ResponsiveGrid';
import Logo from '../components/Logo';

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

  const size = useContext(ResponsiveContext);
  return (
    <ResponsiveGrid>
      <Header gridArea="header">
        <Box direction="row" gap="xlarge" wrap>
          <LocationComponent location={params.location} />
          {rawForecast[0] && <CurrentConditions conditions={rawForecast[0]} />}
        </Box>
        <SolarCalendarLink location={params.location} />
      </Header>
      <Logo />
      {size !== 'small' ? (
        <Box pad="medium">
          <DataTable
            pad="medium"
            background="semitransparent-white"
            columns={size !== 'medium' ? wideColumns : mediumColumns}
            data={weather}
            step={rawForecast.length}
            onClickRow={(event) => {
              setShow(true);
              setClicked(event.datum);
            }}
            responsive="true"
          />
        </Box>
      ) : (
        <SmallForecast
          forecast={weather}
          onClickItem={(item) => {
            setShow(true);
            setClicked(item);
          }}
        />
      )}
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
    </ResponsiveGrid>
  );
}

export default Forecast;
