import env from '../utility/env';

export default {
  HOST: env('DB_HOST', '127.0.0.1'),
  PORT: env('DB_PORT', 27017),
  USER: env('DB_USER', ''),
  PASSWORD: env('DB_PASSWORD', ''),
  NAME: env('DB_NAME', 'koa-cart'),
  REPLICA: env('DB_REPLICA', false)
}