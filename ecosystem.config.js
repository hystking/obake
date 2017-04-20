module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'API',
      script    : 'index.js',
      env: {},
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'app',
      host : 'obake-vagrant',
      ref  : 'origin/develop',
      repo : 'git@github.com:hystking/obake.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.json --env production'
    }
  }
};
