/**
 * UUIDV1
 * 
 * UUID V1
 */
import UUIDV1 from 'uuid/v1';

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
import { existsSync } from 'fs';

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
export const elapseTime = start => {
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
export const to = async (promise) => {
  return promise.then(data => [null, data]).catch(err => [err, null]);
}


/**
 * randomHash
 * 
 * UUIDV1 hash
 */
export const randomHash = () => {
  return UUIDV1();
}

/**
 * uuid
 * 
 * Generate UUIDV1 for IDs
 */
export const uuid = () => {
  return UUIDV1();
}

/**
 * encrypt
 * 
 * @param {*} password 
 * 
 * sha512 HAMC string encryption
 */
export const encrypt = password => {
  const hash = createHmac('sha512', config.api.secret);
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
export const password = pass => {
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
export const validatePassword = (plainText, password) => {
  return compare(plainText, password);
};

/**
 * generateResetToken
 * 
 * Password reset token generation
 */
export const generateResetToken = () => {
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
export const validateJson = jsonString => {
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
export const pathExists = path => {
  return existsSync(path);
}

/**
 * pluck
 * 
 * @param {*} data 
 * @param {*} key 
 */
export const pluck = (data, key) => {
  const d = [];
  if(Array.isArray(data)) {
    data.forEach(da => {
      d.push(da[key]);
    })
  }else {
    d.push(data[key]);
  }

  return d;
}

export const getValues = (obj, keys) => {
  const values = {};
  keys.forEach(key => {
    if(typeof obj[key] !== 'undefined') {
      values[key] = obj[key];
    }
  });

  return values;
}