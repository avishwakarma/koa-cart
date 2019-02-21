import * as dotenv from 'dotenv';
import { readFileSync} from 'fs';
import { join } from 'path';

const __root = process.mainModule.paths[0].split('node_modules')[0].slice(0, -1);

const _env: any = dotenv.parse(readFileSync(join(__root, '../.env')));

const env = (_key: string, d: any): string => {
  if(!_env[_key]) {
    return d;
  }

  return _env[_key];
};

export default env;