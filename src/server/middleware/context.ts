/**
 * context
 *
 * middleware for session
 */

/**
 * Context
 * 
 * Context type
 */
import { Context } from 'apollo-server-core';

/**
 * responses, elapseTime from helper
 */
import { to } from '../utility/helper';

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
 * response
 * 
 * responee middleware for Koa
 * @param {object} context
 */
export default async (context: Context) => {
  const _context = {...context};

  if(!_context.ctx) {
    return _context;
  }

  const request = _context.ctx.request;

  if(request.headers.authorization && request.headers.authorization !== 'Bearer undefined' && request.headers.authorization !== 'Bearer '){
    const [error, payload] = await to(Session.verify(request.headers.authorization.replace('Bearer ', '')));

    if(error) {
      _context.error = error;
    } else if(payload && payload.user) {
      const token = await Session.set(payload.user);
      _context.session = {
        user: payload.user
      };
      _context._token = token;
    }
  }
  return _context;
};