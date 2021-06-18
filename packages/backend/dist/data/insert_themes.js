"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const Theme_1 = __importDefault(require("../models/Theme"));
const insertThemes = async () => {
    var { body } = await got_1.default.get(`https://api.globalgiving.org/api/public/projectservice/themes?api_key=${process.env.GLOBALGIVING_KEY}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    var themes = JSON.parse(body)["themes"]["theme"];
    Theme_1.default.bulkWrite(themes.map((theme) => ({
        updateOne: {
            filter: { id: theme.id },
            update: { $set: theme },
            upsert: true
        }
    })));
    console.log("Inserted Themes");
};
exports.default = insertThemes;
//# sourceMappingURL=insert_themes.js.map