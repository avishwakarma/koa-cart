/**
 * UUIDV1
 * 
 * UUID V1
 */
import * as UUIDV1 from 'uuid/v1';

/**
 * createHmac
 *
 * method createHmac from crypto
 */
import { createHmac, randomBytes } from 'crypto';

/**
 * existsSync
 * 
 * method to check synchronously if given path (file/folder) exists
 */
import { existsSync, readFileSync } from 'fs';

/**
 * join
 * 
 * join method from path
 */
import { join } from 'path';

/**
 * hash, compare
 * 
 * methods hash, compare from bnrcypt
 */
import {hash, compare} from 'bcrypt';

/**
 * config
 * 
 * application global config
 */
import config from '../config';

/**
 * elapseTime
 * 
 * elapsed time from start
 * 
 * @param {*} start 
 */
export const elapseTime = (start: any) => {
  const delta = Date.now() - start;
  return delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's';
};

/**
 * to
 * error handler for await
 * 
 * @uses const [error, data] = await to(Promise)
 * @param {*} promise 
 */
export const to = async (promise: Promise<any>): Promise<any> => {
  return promise.then(data => [null, data]).catch(err => [err, null]);
}


/**
 * randomHash
 * 
 * UUIDV1 hash
 */
export const randomHash = (): string => {
  return UUIDV1();
}

/**
 * uuid
 * 
 * Generate UUIDV1 for IDs
 */
export const uuid = (): string => {
  return UUIDV1();
}

/**
 * encrypt
 * 
 * @param {*} password 
 * 
 * sha512 HAMC string encryption
 */
export const encrypt = (password: string) => {
  const hash = createHmac('sha512', config.app.SCERET);
  hash.update(password);
  return hash.digest('hex');
};

/**
 * password
 * 
 * @param {*} pass 
 * 
 * password hashing
 */
export const password = (pass: string): Promise<string> => {
  return hash(pass, 10);
};

/**
 * validatePassword
 * 
 * @param {*} plainText
 * @param {*} password 
 * 
 * compare password hash with plain text
 */
export const validatePassword = (plainText: string, password: string): Promise<boolean> => {
  return compare(plainText, password);
};

/**
 * generateResetToken
 * 
 * Password reset token generation
 */
export const generateResetToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    randomBytes(64, (ex, buf) => {
      return resolve(buf.toString('hex'));
    });
  });
}

/**
 * validateJson
 * 
 * Utility method to validate jsonString
 * @param {1} jsonString 
 */
export const validateJson = (jsonString: any): any => {
  if(typeof jsonString !== 'string') {
    return false;
  }

  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * pathExists
 * 
 * Check if a path exists in file system
 * @param {*} path 
 */
export const pathExists = (path: string): boolean => {
  return existsSync(path);
}

/**
 * pluck
 * 
 * @param {*} data 
 * @param {*} key 
 */
export const pluck = (data: any, key: any): any => {
  const d: any = [];
  if(Array.isArray(data)) {
    data.forEach(da => {
      d.push(da[key]);
    })
  }else {
    d.push(data[key]);
  }

  return d;
}

export const getValues = (obj: any, keys: Array<string>): any => {
  const values: any = {};
  keys.forEach(key => {
    if(typeof obj[key] !== 'undefined') {
      values[key] = obj[key];
    }
  });

  return values;
}

export const getRootPath = (): string => {
  return process.mainModule.paths[0].split('node_modules')[0].slice(0, -1);
}

export const getTemplatePath = (): string => {
  const __root = getRootPath();
  let _path = join(__root, '../build/front');
  return _path;
}

export const getTemplate = (): string => {
  return readFileSync(`${getTemplatePath()}/index.html`, 'utf8');
}

export const validateEmail = (email: string): boolean => {
  const _email_reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return _email_reg.test(email);
}