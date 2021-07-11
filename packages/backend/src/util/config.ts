import {createSecretKey} from 'crypto';

export const secretKey = createSecretKey(
  Buffer.from(process.env.JWT_SECRET, 'base64')
);
