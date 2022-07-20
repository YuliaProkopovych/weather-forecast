module.exports = {
  apps: [{
    name: 'sunshower-client',
    script: 'src/index.js',

    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '300M',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],

  deploy: {
    production: {
      user: 'poohitan',
      host: '46.101.99.203',
      ref: 'origin/main',
      repo: 'git@github.com:YuliaProkopovych/weather-forecast.git',
      path: '/home/yulia/sunshower/weather-forecast',
      'post-deploy': 'cd frontend && npm install && npm run build && pm2 reload ecosystem.config.js --env production --update-env',
    },
  },
};
