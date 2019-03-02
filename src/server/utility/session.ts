/**
 * session
 * 
 * Session utility using JWT
 */

 /**
  * sign, verify
  * 
  * sign and verify from jsonwebtoken module
  * Read more https://www.npmjs.com/package/jsonwebtoken
  */
 import { sign, verify } from 'jsonwebtoken';

 /**
  * readFileSync
  * 
  * readFileSync from fs module
  */
 import { readFileSync } from 'fs';
 
 /**
  * config
  * 
  * Global application config
  */
 import config from '../config';
 
 /**
  * message
  * 
  * Application message
  */
 import { message } from '../../constant';
 
 /**
  * logger
  * 
  * Global application logger
  */
 import logger from './logger';
 
 /**
  * Session
  * 
  * Session utility class
  */
 class Session {
   /**
    * publicKey
    * 
    * Public Key file for JWT verify method
    */
   //private _public_key: string = readFileSync(config.jwt.PUBLIC_KEY, 'utf8');

   /**
    * privateKey
    * 
    * Private Key file for JWT sign method
    */
   private _private_key: string = readFileSync(config.jwt.PRIVATE_KEY, 'utf8');
   /**
    * verify
    * 
    * Validate token
    * @param {*} token 
    */
   async verify(token: string) {
     try {
       const payload = verify(token, this._private_key, {
         algorithms: ["RS256"]
       });
       if (payload) {
        return payload;
       }

       return false;
     } catch (error) {
       logger.error(error);
       
       throw {
         message: message.INVALID_TOKEN,
         name: 'INVALID_TOKEN'
       };
     }
   }
 
   /**
    * set
    * 
    * Generate token using paylod
    * @param {*} user 
    */
   async set(user: any) {
     try {
       return sign({
         user
       }, this._private_key, {
         algorithm: "RS256",
         expiresIn: config.jwt.EXPIRY,
         issuer: config.jwt.ISSUER
       });
     } catch (error) {
       logger.error(error);
     }
   }
 }
 
 export default new Session();