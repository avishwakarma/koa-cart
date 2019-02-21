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
  * privateKey
  * 
  * Private Key file for JWT sign method
  */
 const privateKey: string = readFileSync(config.jwt.PRIVATE_KEY, 'utf8');
 
 /**
  * publicKey
  * 
  * Public Key file for JWT verify method
  */
 const publicKey: string = readFileSync(config.jwt.PUBLIC_KEY, 'utf8');
 
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
    * verify
    * 
    * Validate token
    * @param {*} token 
    */
   async verify(token: string) {
     try {
       const payload = verify(token, publicKey, {
         algorithms: ["RS256"]
       });
       if (payload) {
        return payload;
       }
     } catch (err) {
       logger.error(err);
       
       throw {
         message: message.INVALID_TOKEN,
         name: 'Authorization Error'
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
       const payload = {
         user
       };
       return sign(payload, privateKey, {
         algorithm: "RS256",
         expiresIn: config.jwt.EXPIRY,
         issuer: config.jwt.ISSUER
       });
     } catch (err) {
       logger.error(err);
     }
   }
 }
 
 export default new Session();