"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const xml2js_1 = require("xml2js");
const Theme_1 = __importDefault(require("../models/Theme"));
const Country_1 = __importDefault(require("../models/Country"));
const Organization_1 = __importDefault(require("../models/Organization"));
const Project_1 = __importDefault(require("../models/Project"));
const insertProjects = async () => {
    console.log("Started Projects");
    var { body } = await got_1.default.get(`https://api.globalgiving.org/api/public/projectservice/all/projects/download.xml?api_key=${process.env.GLOBALGIVING_KEY}`);
    let data_url = (await xml2js_1.parseStringPromise(body, {
        explicitRoot: true,
        explicitArray: false,
    }))['download']['url'];
    let res = (await got_1.default.get(data_url)).body;
    let projects = (await xml2js_1.parseStringPromise(res, {
        explicitRoot: true,
        explicitArray: false,
    }))['projects']['project'];
    var all_themes = await Theme_1.default.find({}).exec();
    var all_countries = await Country_1.default.find({}).exec();
    var all_organizations = await Organization_1.default.find({}).exec();
    for (var p = 0; p < projects.length; p++) {
        var project = projects[p];
        try {
            // Set Theme Array
            var theme_objs = [];
            if (project.themes != null && project.themes.theme != null) {
                if (project.themes.theme instanceof Array) {
                    for (var j = 0; j < project.themes.theme.length; j++) {
                        var theme = project.themes.theme[j];
                        for (var k = 0; k < all_themes.length; k++) {
                            var db_theme = all_themes[k];
                            if (db_theme.id == theme.id) {
                                theme_objs.push(db_theme);
                                break;
                            }
                        }
                    }
                }
                else {
                    theme = project.themes.theme;
                    for (k = 0; k < all_themes.length; k++) {
                        db_theme = all_themes[k];
                        if (db_theme.id == theme.id) {
                            theme_objs.push(db_theme);
                            break;
                        }
                    }
                }
            }
            // Set Country Array
            var country_objs = [];
            if (project.countries != null && project.countries.country != null) {
                if (project.countries.country instanceof Array) {
                    for (j = 0; j < project.countries.country.length; j++) {
                        var country = project.countries.country[j];
                        for (k = 0; k < all_countries.length; k++) {
                            var db_country = all_countries[k];
                            if (db_country.name == country.name) {
                                country_objs.push(db_country);
                                break;
                            }
                        }
                    }
                }
                else {
                    country = project.countries.country;
                    for (k = 0; k < all_countries.length; k++) {
                        db_country = all_countries[k];
                        if (db_country.name == country.name) {
                            country_objs.push(db_country);
                            break;
                        }
                    }
                }
            }
            // Set Country
            var default_country;
            for (var l = 0; l < all_countries.length; l++) {
                db_country = all_countries[l];
                if (db_country.name == project.country) {
                    default_country = db_country;
                    break;
                }
            }
            // Set Organization
            var organization;
            for (var l = 0; l < all_organizations.length; l++) {
                var db_org = all_organizations[l];
                if (db_org.name == project.organization.name) {
                    organization = db_org;
                    break;
                }
            }
            // Fix Donation Options
            var donation_options = [];
            project.donationOptions.donationOption.forEach((option) => {
                donation_options.push({
                    amount: +option.amount,
                    description: option.description
                });
            });
            var proj_fields = {
                active: JSON.parse(project.active),
                activities: project.activities,
                additionalDocumentation: project.additionalDocumentation,
                approvedDate: new Date(project.approvedDate),
                country: default_country,
                countries: country_objs,
                dateOfMostRecentReport: new Date(project.dateOfMostRecentReport),
                donationOptions: donation_options,
                funding: +project.funding,
                goal: +project.goal,
                longTermImpact: project.longTermImpact,
                modifiedDate: new Date(project.modifiedDate),
                need: project.need,
                numberOfDonations: +project.numberOfDonations,
                numberOfReports: +project.numberOfReports,
                organization: organization,
                progressReportLink: project.progressReportLink,
                projectLink: project.projectLink,
                remaining: +project.remaining,
                status: project.status,
                summary: project.summary,
                themes: theme_objs,
                title: project.title,
                type: project.type,
                // videos: null
            };
            new Project_1.default(proj_fields).save(function (err) { });
        }
        catch (e) {
            console.error(e);
        }
    }
    console.log("Inserted Projects");
};
exports.default = insertProjects;
//# sourceMappingURL=insert_projects.js.map