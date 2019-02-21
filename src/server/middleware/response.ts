/**
 * response
 *
 * middleware for tracking responses
 */

/**
 * Context
 * 
 * Koa context type
 */
import { Context } from 'koa';

/**
 * config
 * 
 * Global app config
 */
import config from '../config';

/**
 * responses, elapseTime from helper
 */
import { elapseTime } from '../utility/helper';

/**
 * response
 * 
 * Responses constant
 */
import { responses } from '../../constant';

/**
 * logger
 * 
 * Gloabal application logger
 */
import logger from '../utility/logger';

/**
 * session
 * 
 * Application session manager
 */
import Session from '../utility/session';

/**
 * logRequest
 *
 * method to log request
 * @param {date} start
 * @param {object} ctx
 */
const logRequest = (start: Date, ctx: Context) => {
  /**
   * done
   *
   * method to bind on request finish and close
   * @param {event} event
   */
  const done = (event: string) => {
    res.removeListener('finish', onFinish);
    res.removeListener('close', onClose);

    const resp: any = responses[ctx.status];

    if (!resp) {
      return;
    }

    if (config.log.LEVEL.toLowerCase() === 'error' && resp.type.toLowerCase() !== 'error') {
      return;
    }

    let _log_method = 'info';

    if (resp.type.toLowerCase() === 'error') {
      _log_method = 'error';
    }

    const upstream =
      resp.type == 'error' ? 'xxx' : event === 'close' ? '-x-' : '-->';
    
    logger[_log_method](
      `${upstream} ${ctx.method} ${ctx.originalUrl} ${ctx.status} ${elapseTime(
        start
      )} ${resp.message}`
    );
  };

  const res = ctx.res;

  const onFinish = done.bind(null, 'finish');

  const onClose = done.bind(null, 'finish');

  res.once('finish', onFinish);
  res.once('close', onClose);
};

/**
 * response
 * 
 * responee middleware for Koa
 * @param {object} ctx
 * @param {function} next
 */
export default async (ctx: Context, next: Function) => {
  try {
    const start = new Date();
    await next();
    
    logRequest(start, ctx);

  } catch (err) {
    logger.error(err.message);
    throw new Error(err);
  }
};