import React from 'react';
import { Box, DataTable, Text, Layer } from 'grommet';
import { WeatherIcon } from "./icon";
import WeatherComponent from './weatherComponent';

const WeatherPreviewComponent = ({ data }) => {
  const [show, setShow] = React.useState(false);

  const [clicked, setClicked] = React.useState({});

  const formattedData = data.map( ( record, index ) => {
    const { date, forecast } = record;
    let symbols = {};
    const times = {
      dawn : '08:00',
      noon : '14:00',
      dusk : '20:00',
      midnight : '02:00'
    };
    const getSymbolByTimeInForecast = ( time ) => (forecast.find(item => (item.time === time))).next_6_hours.symbol;

    if (index === 0 ) {
      if ( forecast[0].time < times.dawn ) {
        symbols.night = forecast[0].next_6_hours.symbol;
        symbols.morning = getSymbolByTimeInForecast(times.dawn);
        symbols.afternoon = getSymbolByTimeInForecast(times.noon);
        symbols.evening = getSymbolByTimeInForecast(times.dusk);
      } else if ( forecast[0].time < times.noon ) {
        symbols.morning = forecast[0].next_6_hours.symbol;
        symbols.afternoon = getSymbolByTimeInForecast(times.noon);
        symbols.evening = getSymbolByTimeInForecast(times.dusk);
      } else if ( forecast[0].time < times.dusk ){
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
      ( max, current ) => ( max > current.weather.air_temperature ? max : current.weather.air_temperature ),
      forecast[0].weather.air_temperature
    );
    const minT = forecast.reduce(
      ( min, current ) => ( min < current.weather.air_temperature ? min : current.weather.air_temperature ),
      forecast[0].weather.air_temperature
    );

    const precip = Math.round(
      forecast.reduce(
      ( sum, current ) => current.next_1_hours ? sum + current.next_1_hours.precipitations : sum + current.next_6_hours.precipitations,
      0
    ) * 100 ) / 100;

    const wind = Math.round(
      forecast.reduce(( sum, current ) => sum + current.weather.wind_speed, 0) / forecast.length
    );

    return { date: date, minT: minT, maxT: maxT, precipitations: precip, wind: wind, ...symbols };
  });

  const renderIcon = ( icon ) => icon && <WeatherIcon path={ `/icons/svg/${icon}.svg` }/>;

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
      render: (object) =>
      <Box flex direction='row'>
        <Text color={object.maxT > 0 ? '#9e0000' : '#0202a1'}>{object.maxT}°</Text>
        <Text>{' / '}</Text>
        <Text color={object.minT > 0 ? '#9e0000' : '#0202a1'}>{object.minT}°</Text>
      </Box>,
    },
    {
      property: 'precipitations',
      header: 'Precipitations',
      render: ({ precipitations }) => precipitations ? <Text>{precipitations} mm</Text> : ''
    },
    {
      property: 'wind',
      header: 'Wind',
      render: ({ wind }) => <Text>{wind} m/s</Text>
    },
    {
      property: 'open',
      header: '',
    }
  ];

  return (
    <Box margin={{left: '20px'}}>
      <DataTable
        pad='medium'
        columns={columns}
        data={formattedData}
        step={data.length}
        onClickRow={(event) => {
          setShow(true);
          setClicked(event.datum);
        }}/>
        {show && (
          <Layer
            position="center"
            onEsc={() => setShow(false)}
            onClickOutside={() => setShow(false)}
          >
            <WeatherComponent forecastRecord={data.find( record => record.date === clicked.date)} />
       </Layer>)}
    </Box>
  );
};

export default WeatherPreviewComponent;
