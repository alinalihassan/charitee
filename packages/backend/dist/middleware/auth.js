"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const verify_1 = require("jose/jwt/verify");
const config_1 = require("../util/config");
async function default_1(req, res, next) {
    // Get token from header
    const token = req.header("x-auth-token");
    // Check if no token
    if (!token) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ msg: "No token, authorization denied" });
    }
    // Verify token
    try {
        const { payload, protectedHeader } = await verify_1.jwtVerify(token, config_1.secretKey, {
            issuer: process.env.APP_NAME,
        });
        req.userId = payload.userId;
        next();
    }
    catch (err) {
        res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ msg: "Token is not valid" });
    }
}
exports.default = default_1;
//# sourceMappingURL=auth.js.map