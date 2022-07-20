const environment = process.env.NODE_ENV;

if (!environment) {
  throw new Error('Provide NODE_ENV');
}

const shared = {
  port: 7302,
};

const config = {
  development: {
    apiURL: 'http://localhost:7402',
  },
  production: {
    apiURL: 'http://api.sunshower.poohitan.com',

    server: {
      host: '46.101.99.203',
      username: 'yulia',
      folder: '~/poohitan.com/cinema/front-end',
    },

    repository: 'git@github.com/YuliaProkopovych/weather-forecast.git',
  },
};

module.exports = {
  ...shared,
  ...config[environment],
};
