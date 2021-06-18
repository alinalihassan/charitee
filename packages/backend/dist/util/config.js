"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretKey = exports.emailService = void 0;
const crypto_1 = require("crypto");
const email_1 = __importDefault(require("./email"));
exports.emailService = new email_1.default();
exports.secretKey = crypto_1.createSecretKey(Buffer.from(process.env.JWT_SECRET, 'base64'));
//# sourceMappingURL=config.js.map