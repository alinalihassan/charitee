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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const csv = __importStar(require("fast-csv"));
const Country_1 = __importDefault(require("../models/Country"));
async function insertCountries() {
    fs.createReadStream(path.resolve(__dirname, '../../data/', 'countries.csv'))
        .pipe(csv.parse({ headers: true }))
        .pipe(csv.format({ headers: true }))
        // Using the transform function from the formatting stream
        .transform((row, next) => {
        new Country_1.default({
            name: row.Name,
            countryCode: row.Code
        }).save(function (err) { });
        next();
    })
        .pipe(process.stdout)
        .on('end', () => {
        process.exit();
    });
    console.log("Inserted Countries");
}
exports.default = insertCountries;
//# sourceMappingURL=insert_countries.js.map