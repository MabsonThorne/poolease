module.exports = {
  apps: [
    {
      name: 'poolease-backend',
      script: './backend/app.js',
      cwd: './',
      env: {
        NODE_ENV: 'development',
        PORT: 5002,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5002,
      },
    },
    {
      name: 'poolease-frontend',
      script: 'npx',
      args: 'react-scripts start',
      cwd: './',
      interpreter: 'none',
      env: {
        NODE_ENV: 'development',
        PORT: 3002,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
    }
  ],
};
