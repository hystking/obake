# Node Web App Template

## Structure

Nginx => pm2 + Node application

## Provisioning

```sh
$ cd chef
$ bundle install
$ buncle exec knife solo bootstrap obake-prod
```

## Deployment

```sh
$ pm2 deploy ecosystem.config.js production setup
$ pm2 deploy ecosystem.config.js production
```
