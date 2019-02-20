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
import dayjs from 'dayjs';

/**
 * config
 *
 * application config
 */
import config from '../config';

/**
 * log level DEBUG
 */
const DEBUG = 100;

/**
 * log level INFO
 */
const INFO = 200;

/**
 * log level WARNING
 */
const WARNING = 300;

/**
 * log level ERROR
 */
const ERROR = 400;

/**
 * log allowed map
 */
const _allowed_log_types = {
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
class Logger {
  /**
   * constructor
   *
   * @param {string} name
   */
  constructor() {
    this._level = config.log.LEVEL;

    return {
      error: this._log.bind(this, ERROR),
      debug: this._log.bind(this, DEBUG),
      warn: this._log.bind(this, WARNING),
      info: this._log.bind(this, INFO)
    };
  }

  /**
   * _path
   *
   * method to retrive logfile path
   */
  _path() {
    const date = new Date();
    return join(config.log.PATH, `${config.app.NAME}-${dayjs(date).format(config.log.FILE_NAME_FORMAT || 'YYYY-MM-DD')}.log`);
  }

  /**
    * 
    * @param {number} level 
    * @param {string} error 
    * @param {*} name 
    */
  _log(level, message){
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
  _write(data, cb) {
    return writeFile(this._path(), data.message + "\r\n", {
      flag: "a"
    }, function (err, res) {
      if(!err) cb();
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
  _format(level, message) {
    if (message.stack) message = message.stack;
    return `${this._date()} ${level}: ${message}`;
  }

  /**
   * _date
   *
   * date wrapper for log
   * @access private
   */
  _date() {
    const date = new Date();
    return `[${dayjs(date).format('YYYY-MM-DD-HH-mm-ss')}]`;
  }
}

export default new Logger();