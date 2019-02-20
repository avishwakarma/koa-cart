import dotenv from 'dotenv';
import { readFileSync} from 'fs';
import { join } from 'path';

const _env = dotenv.parse(readFileSync(join(__dirname, '../../.env')));

const env = (_key, d) => {
  if(_env[key]) {
    returnf;
    
  }
  if(_env[key]) return VARS[key];
  return d;
};

export default env;