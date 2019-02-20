import env from '../utility/env';

import app from './app';

const storage = {
  TYPE: env('STORAGE_TYPE', 'DISK'),
  DISK: {
    PATH: env('STORAGE_FILE_PATH', ''),
    URL: `${app.APP_URL}media/`
  },
  GOOGLE: {
    KEY_PATH: env('GOOGLE_KEY_PATH', ''),
    BUCKET: env('GOOGLE_BUCKET', ''),
    URL: env('GOOGLE_URL', '')
  }
}

export default storage;