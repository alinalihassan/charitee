"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const Theme_1 = __importDefault(require("../models/Theme"));
const Country_1 = __importDefault(require("../models/Country"));
const Organization_1 = __importDefault(require("../models/Organization"));
const http_status_codes_1 = require("http-status-codes");
class OrganizationService {
    async get(page = 0, themeId = null, countryCode = null) {
        let query = {};
        const theme = await Theme_1.default.findOne({ id: themeId }).exec();
        const country = await Country_1.default.findOne({ countryCode: countryCode }).exec();
        if (theme != null) {
            query.themes = theme._id;
        }
        if (country != null) {
            query.address.country = country._id;
        }
        const organizations = await Organization_1.default.find(query)
            .populate('themes')
            .populate('address.country')
            .limit(10).skip(page).exec();
        const count = await Organization_1.default.countDocuments(query);
        const nextPage = organizations.length == 10 ? page + 10 : null;
        return { status: http_status_codes_1.StatusCodes.OK, count: count, nextPage: nextPage, data: organizations };
    }
    async getById(id) {
        let organization = Organization_1.default.findById(id)
            .populate('themes')
            .populate('address.country')
            .exec();
        if (organization) {
            return { status: http_status_codes_1.StatusCodes.OK, data: organization };
        }
        return { status: http_status_codes_1.StatusCodes.NOT_FOUND, data: null };
    }
}
exports.OrganizationService = OrganizationService;
//# sourceMappingURL=organizationService.js.map