"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(error, detail = undefined, ...args) {
        super(...args);
        this.response = { status: error.status, message: error.message, detail: detail };
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=Error.js.map