import * as express from "express";
import { jwtVerify } from 'jose/jwt/verify'
import { JWTVerifyResult } from "jose/webcrypto/types";
import { secretKey } from "../../util/config";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "jwt") {
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.headers["authorization"];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
      }
      jwtVerify(token, secretKey, {
        issuer: process.env.APP_NAME,
      })
      .then((res: JWTVerifyResult) => resolve(res.payload))
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  }
}