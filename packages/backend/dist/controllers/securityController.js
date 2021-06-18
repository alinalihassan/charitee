"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const verify_1 = require("jose/jwt/verify");
const sign_1 = require("jose/jwt/sign");
const tsoa_1 = require("tsoa");
const Error_1 = require("../models/Error");
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../util/config");
let AuthenticationController = class AuthenticationController extends tsoa_1.Controller {
    async test(request) {
        return "Success";
    }
    async register(userParams) {
        this.setStatus(201);
        let email = userParams.email;
        let password = userParams.password;
        let user = await User_1.default.findOne({ email }).exec();
        if (user) {
            throw new Error_1.CustomError({
                status: http_status_codes_1.StatusCodes.CONFLICT,
                message: "User already exists"
            });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashed = await bcryptjs_1.default.hash(password, salt);
        const userFields = {
            email,
            password: hashed
        };
        user = new User_1.default(userFields);
        await user.save();
        const payload = {
            userId: user.id,
        };
        const token = await new sign_1.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuer(process.env.APP_NAME)
            .setExpirationTime('1h')
            .sign(config_1.secretKey);
        config_1.emailService.send_email(email, "Confirm Email", "activation", {
            URL: process.env.SERVER_HOST + "/api/auth/confirm-email?token=" + token,
        });
        return { status: http_status_codes_1.StatusCodes.OK, data: token };
    }
    async login(userParams) {
        let email = userParams.email;
        let password = userParams.password;
        let user = await User_1.default.findOne({ email }).exec();
        if (!user) {
            throw new Error_1.CustomError({
                status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                message: "Invalid Credentials"
            });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error_1.CustomError({
                status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                message: "Invalid Credentials"
            });
        }
        const payload = {
            userId: user.id
        };
        const token = await new sign_1.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuer(process.env.APP_NAME)
            .setExpirationTime('1w')
            .sign(config_1.secretKey);
        return { status: http_status_codes_1.StatusCodes.OK, data: token };
    }
    async confirmEmail(token) {
        // Check if no token
        if (!token) {
            throw new Error_1.CustomError({
                status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                message: "No token, unable to verify email"
            });
        }
        // Verify token
        let userId;
        try {
            const { payload, protectedHeader } = await verify_1.jwtVerify(token, config_1.secretKey, {
                issuer: process.env.APP_NAME,
            });
            console.log(payload);
            console.log(protectedHeader);
            userId = payload.userId;
        }
        catch (err) {
            throw new Error_1.CustomError({
                status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                message: "Invalid Token"
            });
        }
        // TODO: Return a template to confirm
        const user = await User_1.default.findById(userId).select("-password").exec();
        user.isVerified = true;
        await user.save();
        return { status: http_status_codes_1.StatusCodes.OK, message: "Email successfully confirmed" };
    }
};
__decorate([
    tsoa_1.Security("jwt"),
    tsoa_1.Get("Test"),
    __param(0, tsoa_1.Request())
], AuthenticationController.prototype, "test", null);
__decorate([
    tsoa_1.SuccessResponse("201", "Created"),
    tsoa_1.Response(409, 'User already exists'),
    tsoa_1.Post("register"),
    __param(0, tsoa_1.Body())
], AuthenticationController.prototype, "register", null);
__decorate([
    tsoa_1.Response(401, 'Invalid Credentials'),
    tsoa_1.Post("login"),
    __param(0, tsoa_1.Body())
], AuthenticationController.prototype, "login", null);
__decorate([
    tsoa_1.Response(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No token, unable to verify email'),
    tsoa_1.Response(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid Token'),
    tsoa_1.Get("confirm-email"),
    __param(0, tsoa_1.Query())
], AuthenticationController.prototype, "confirmEmail", null);
AuthenticationController = __decorate([
    tsoa_1.Route("auth")
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=securityController.js.map