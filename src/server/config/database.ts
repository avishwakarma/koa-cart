import env from '../utility/env';

const database: {[index: string]: any} = {
  HOST: env('DB_HOST', '127.0.0.1'),
  PORT: env('DB_PORT', 27017),
  USER: env('DB_USER', ''),
  PASSWORD: env('DB_PASSWORD', ''),
  NAME: env('DB_NAME', 'koa-cart'),
  AUTH_SOURCE: env('DB_AUTH_SOURCE', 'admin'),
  REPLICA: env('DB_REPLICA', false)
};

database['URI'] = `mongodb://${database.HOST}/${database.NAME}`;

if(database.USER !== '') {
  database['URI'] = `mongodb://${database.USER}:${encodeURIComponent(database.PASSWORD)}@${database.HOST}:${database.PORT}/${database.NAME}?authSource=${database.AUTH_SOURCE}`;
}

export default database;