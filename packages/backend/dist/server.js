"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("./util/database"));
const routes_1 = require("./routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const Error_1 = require("./models/Error");
const helmet_1 = __importDefault(require("helmet"));
const app = express_1.default();
// Connect to MongoDB
database_1.default();
// Generate SwaggerUI Docs
const docs = swagger_ui_express_1.default.generateHTML(Promise.resolve().then(() => __importStar(require("./swagger.json"))));
// Express configuration
app.set("port", process.env.SERVER_PORT || 4000);
app.use(helmet_1.default({
    contentSecurityPolicy: false
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend', 'build')));
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../frontend', 'build', 'index.html'));
});
app.use("/docs", swagger_ui_express_1.default.serve, async (_req, res) => res.send(swagger_ui_express_1.default.generateHTML(await Promise.resolve().then(() => __importStar(require("./swagger.json"))))));
routes_1.RegisterRoutes(app);
app.use(function errorHandler(err, req, res, next) {
    if (err instanceof Error_1.CustomError) {
        return res.status(err.response.status).json(err.response);
    }
    else if (err instanceof Error) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
    next();
});
const port = app.get("port");
const server = app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
exports.default = server;
//# sourceMappingURL=server.js.map