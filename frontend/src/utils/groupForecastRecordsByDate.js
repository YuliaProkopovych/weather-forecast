import { DateTime } from "luxon";

const groupForecastRecordsByDate = ( forecast ) => {
  const weather = forecast.map( record => {
    const { time, ...rest } = record;
    return {
    date: DateTime.fromISO(time).toFormat('dd LLLL'),
    time: DateTime.fromISO(time).toFormat('T'),
    ...rest
    }
  });
    const w = weather.reduce((accumulator, forecastItem) => {
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

  w.pop();

  return w;

}

export default groupForecastRecordsByDate;
