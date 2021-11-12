import React from 'react';
import { Box, DataTable, Meter, Text, Tip } from 'grommet';

const WeatherComponent = ({ weather }) => {
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
    },
    {
      property: 'precipations',
      header: <Text>Precip. mm</Text>,
    },
    {
      property: 'wind',
      header: <Text>Wind speed m/s</Text>,
    }
  ];

  return (
    <Box>

      <Box align="center" pad="large">

        <DataTable columns={columns} data={weather} step={10} />

      </Box>

    </Box>
  );
};

export default WeatherComponent;

// const amountFormatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD',
//   minimumFractionDigits: 2,
// });

// const columns1 = [
//   {
//     property: 'time',
//     header: <Text>Name with extra</Text>,
//     primary: true,
//   },
//   {
//     property: 'location',
//     header: 'Location',
//   },
//   {
//     property: 'date',
//     header: 'Date',
//     render: (datum) =>
//       datum.date && new Date(datum.date).toLocaleDateString('en-US'),
//     align: 'end',
//   },
//   {
//     property: 'percent',
//     header: 'Percent Complete',
//     render: ({ percent }) => (
//       <Box pad={{ vertical: 'xsmall' }}>
//         <Meter values={[{ value: percent }]} thickness="small" size="small" />
//       </Box>
//     ),
//   },
//   {
//     property: 'paid',
//     header: 'Paid',
//     render: (datum) => amountFormatter.format(datum.paid / 100),
//     align: 'end',
//   },
// ];

// const DATA = [
//   {
//     time: "Nov 11, 2021, 10:00 PM",
//   precipations: "",
//   temperature: 3.3,
//   weather: "entity.weather",
//   wind: 3.7
// },
//   {
//     precipations: "",
//     temperature: 2.8,
//     time: "Nov 11, 2021, 11:00 PM",
//     weather: "entity.weather",
//     wind: 3.5,
//   },
//   {
//     precipations: "",
// temperature: 6.8,
// time: "Nov 12, 2021, 12:00 PM",
// weather: "entity.weather",
// wind: 2.8
//   },
// ];
