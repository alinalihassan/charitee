"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const Theme_1 = __importDefault(require("../models/Theme"));
const Country_1 = __importDefault(require("../models/Country"));
const Project_1 = __importDefault(require("../models/Project"));
const http_status_codes_1 = require("http-status-codes");
class ProjectService {
    async get(page = 0, themeId = null, countryCode = null) {
        let query = {};
        const theme = await Theme_1.default.findOne({ id: themeId }).exec();
        const country = await Country_1.default.findOne({ countryCode: countryCode }).exec();
        if (theme != null) {
            query.themes = theme._id;
        }
        if (country != null) {
            query.countries = country._id;
        }
        const projects = await Project_1.default.find(query)
            .populate('themes')
            .populate('countries')
            .limit(10).skip(page).exec();
        const count = await Project_1.default.countDocuments(query);
        const nextPage = projects.length == 10 ? page + 10 : null;
        return { status: http_status_codes_1.StatusCodes.OK, count: count, nextPage: nextPage, data: projects };
    }
    async getById(id) {
        let project = Project_1.default.findById(id)
            .populate('themes')
            .populate('countries')
            .exec();
        if (project) {
            return { status: http_status_codes_1.StatusCodes.OK, data: project };
        }
        return { status: http_status_codes_1.StatusCodes.BAD_REQUEST, data: null };
    }
}
exports.ProjectService = ProjectService;
//# sourceMappingURL=projectService.js.map