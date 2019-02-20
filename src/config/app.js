import env from '../utility/env';

const app = {
  ENV: env('ENV', 'development'),
  NAME: env('NAME', 'KoaCart'),
  VERSION: env('VERSION', '1.0.0'),
  PROTOCAOL: env('PROTOCOL', 'http'),
  HOST: env('HOST', '0.0.0.0'),
  PORT: env('PORT', 4000)
};

app.APP_URL = `${app.PROTOCAOL}://${app.HOST}:${app.PORT}/`;

export default app;