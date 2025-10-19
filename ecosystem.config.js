module.exports = {
  apps: [
    {
      name: 'france-departements-next',
      script: 'npm',
      args: 'run start:next',
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/next-error.log',
      out_file: './logs/next-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
    {
      name: 'france-departements-socket',
      script: 'npm',
      args: 'run start:socket',
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/socket-error.log',
      out_file: './logs/socket-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};

