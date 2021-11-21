import React from 'react';
import { Box, DataTable, Text } from 'grommet';
import { DateTime } from "luxon";

import { WeatherIcon, WindDirectionIcon } from "../components/icon";


const WeatherComponent = ({ weather }) => {

  const formattedWeather = weather.map(record => {
    const tempColor = record.weather.air_temperature > 0 ? '#9e0000' : '#0202a1';
    let formattedRecord = {
      date: DateTime.fromISO(record.time).toFormat('dd LLLL'),
      temperature: <Text color={tempColor}>{`${record.weather.air_temperature}°`}</Text>,
      wind: (
        <Box direction='row' justify='evenly'>
          <Text margin={{right: '10px'}}>{ record.weather.wind_speed }</Text>
          <WindDirectionIcon angle={ 180 + record.weather.wind_from_direction } />
        </Box>
      )
    };
    if (record.next_1_hours) {
      formattedRecord.time = DateTime.fromISO(record.time).toFormat('T');
      formattedRecord.weather = <WeatherIcon path={ `/icons/svg/${record.next_1_hours.symbol}.svg` }/>;
      formattedRecord.precipitations = record.next_1_hours.precipitations;
    } else if (record.next_6_hours) {
      formattedRecord.time = DateTime.fromISO(record.time).toFormat('T') + '-' + DateTime.fromISO(record.time).plus({ hours: 6 }).toFormat('T');
      formattedRecord.weather = <WeatherIcon path={ `/icons/svg/${record.next_6_hours.symbol}.svg` }/>;
      formattedRecord.precipitations = record.next_6_hours.precipitations;
    }
    return formattedRecord;
  });

  const w = formattedWeather.reduce((accumulator, forecastItem) => {
    const lastDay = accumulator[accumulator.length - 1];
    const { date, ...rest } = forecastItem;

    if (lastDay?.date === forecastItem.date) {
      lastDay.forecast.push(rest);

      return accumulator;
    }

    return [
      ...accumulator,
      {
        date,
        forecast: [
          rest,
        ],
      },
    ];
  }, []);

  const columns = [
    {
      property: 'time',
      header: 'Time',
      primary: true,
    },
    {
      property: 'weather',
      header: 'Weather',
    },
    {
      property: 'temperature',
      header: 'Temperature',
      align: 'center',
    },
    {
      property: 'precipitations',
      header: <Text>Precip. mm</Text>,
      align: 'center',
    },
    {
      property: 'wind',
      header: <Text>Wind speed m/s</Text>,
    }
  ];

  return (
    <Box margin={{left: '20px'}}>
      <DataTable pad='medium' columns={columns} data={w} step={w.length} />
    </Box>
  );
};

export default WeatherComponent;
