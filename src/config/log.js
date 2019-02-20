import env from '../utility/env';

export default {
  PATH: env('LOG_PAHT', ''),
  LEVEL: env('LOG_LEVEL', 'DEBUG'),
  FILE_NAME_FORMAT: env('LOG_FILE_NAME_FORMAT', 'YYY-MM-DD')
};