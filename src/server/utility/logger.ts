/**
 * Logger
 *
 * default logger utility for all applications
 */

/**
 * join
 *
 * join method from default node module path
 */
import { join } from 'path';

/**
 * writeFile
 * 
 * writeFile from fs module
 */
import { writeFile } from 'fs';

/**
 * dayjs
 *
 * Nodejs Date utility
 * @url https://www.npmjs.com/package/dayjs
 */
import * as dayjs from 'dayjs';

/**
 * config
 *
 * application config
 */
import config from '../config';

import { IndexStringSignature } from '../../types';

/**
 * log level DEBUG
 */
const DEBUG: string = 'DEBUG';

/**
 * log level INFO
 */
const INFO: string = 'INFO';

/**
 * log level WARNING
 */
const WARNING: string = 'WARNING';

/**
 * log level ERROR
 */
const ERROR: string = 'ERROR';

/**
 * log allowed map
 */
const _allowed_log_types: any = {
  'DEBUG': [DEBUG, INFO, WARNING, ERROR],
  'INFO': [INFO, WARNING, ERROR],
  'WARNING': [WARNING, ERROR],
  'ERROR': [ERROR]
}

/**
 * Logger
 *
 * Logger utlity class
 */
class Logger implements IndexStringSignature {
  [index: string]: any;

  private _level: string;
  /**
   * constructor
   *
   * @param {string} name
   */
  constructor() {
    this._level = config.log.LEVEL;
  }

  /**
   * error
   * to generate error logs
   * @param message any
   */
  error(message: any) {
    return this._log(ERROR, message);
  }

  /**
   * debug
   * 
   * to generate debug logs
   * @param message any
   */
  debug(message: any) {
    return this._log(DEBUG, message);
  }

  /**
   * warn
   * 
   * to generate warning logs
   * @param message any
   */
  warn(message: any) {
    return this._log(DEBUG, message);
  }

  /**
   * info
   * 
   * to generate info logs
   * @param message any
   */
  info(message: any) {
    return this._log(INFO, message);
  }

  /**
   * _path
   *
   * method to retrive logfile path
   */
  private _path() {
    const date = new Date();
    return join(config.log.PATH, `${config.app.NAME}-${dayjs(date).format(config.log.FILE_NAME_FORMAT || 'YYYY-MM-DD')}.log`);
  }

  /**
   * 
   * @param {string} level 
   * @param {string} error 
   */
  private _log(level: string, message: string){
    if(_allowed_log_types[this._level].indexOf(level) === -1) {
      return;
    }

    this._write({
      message: this._format(level, message)
    }, () => {});
  }

  /**
   * _write
   * 
   * method to write logs into log file
   * @access private
   * @param {string} data 
   * @param {function} cb 
   */
  private _write(data: any, cb: Function) {
    return writeFile(this._path(), data.message + "\r\n", {
      flag: "a"
    }, (err: NodeJS.ErrnoException) => {
      if(err) {
        cb();
      }
    });
  }

  /**
   * _format
   *
   * format log
   * @access private
   * @param {number} level
   * @param {string} message
   * @param {string} name
   */
  private _format(level: string, message: any): string {
    if (message.stack) {
      message = message.stack;
    }
    return `${this._date()} ${level}: ${message}`;
  }

  /**
   * _date
   *
   * date wrapper for log
   * @access private
   */
  private _date(): string {
    const date = new Date();
    return `[${dayjs(date).format('YYYY-MM-DD-HH-mm-ss')}]`;
  }
}

export default new Logger();