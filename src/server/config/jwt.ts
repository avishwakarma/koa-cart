import env from '../utility/env';

export default {
  PRIVATE_KEY: env('JWT_PRIVATE_KEY', ''),
  PUBLIC_KEY: env('JWT_PUBLIC_KEY', ''),
  EXPIRY: env('JWT_EXPIRY', '2h'),
  ISSUER: env('JWT_ISSUER', 'KoaCarr')
}