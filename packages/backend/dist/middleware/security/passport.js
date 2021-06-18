"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = void 0;
const verify_1 = require("jose/jwt/verify");
const config_1 = require("../../util/config");
function expressAuthentication(request, securityName, scopes) {
    if (securityName === "jwt") {
        const token = request.body.token ||
            request.headers["x-access-token"] ||
            request.headers["authorization"];
        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error("No token provided"));
            }
            verify_1.jwtVerify(token, config_1.secretKey, {
                issuer: process.env.APP_NAME,
            })
                .then((res) => resolve(res.payload))
                .catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }
}
exports.expressAuthentication = expressAuthentication;
//# sourceMappingURL=passport.js.map