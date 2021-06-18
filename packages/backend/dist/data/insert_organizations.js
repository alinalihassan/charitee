"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const xml2js_1 = require("xml2js");
const Organization_1 = __importDefault(require("../models/Organization"));
const Theme_1 = __importDefault(require("../models/Theme"));
const Country_1 = __importDefault(require("../models/Country"));
const insertOrganizations = async () => {
    var { body } = await got_1.default.get(`https://api.globalgiving.org/api/public/orgservice/all/organizations/vetted/download?api_key=${process.env.GLOBALGIVING_KEY}`, {
        headers: {
            'content-type': 'json'
        }
    });
    let data_url = (await xml2js_1.parseStringPromise(body, {
        explicitRoot: true,
        explicitArray: false,
    }))['download']['url'];
    let res = (await got_1.default.get(data_url)).body;
    let organizations = (await xml2js_1.parseStringPromise(res, {
        explicitRoot: true,
        explicitArray: false,
    }))['organizations']['organization'];
    var all_themes = await Theme_1.default.find({}).exec();
    var all_countries = await Country_1.default.find({}).exec();
    for (var i = 0; i < organizations.length; i++) {
        var org = organizations[i];
        // Set themes
        var theme_objs = [];
        if (org.themes != null && org.themes.theme != null) {
            if (org.themes.theme instanceof Array) {
                for (var j = 0; j < org.themes.theme.length; j++) {
                    var theme = org.themes.theme[j];
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
                theme = org.themes.theme;
                for (k = 0; k < all_themes.length; k++) {
                    db_theme = all_themes[k];
                    if (db_theme.id == theme.id) {
                        theme_objs.push(db_theme);
                        break;
                    }
                }
            }
        }
        // Set Country
        var country;
        for (var l = 0; l < all_countries.length; l++) {
            var db_country = all_countries[l];
            if (db_country.name == org.country) {
                country = db_country;
                break;
            }
        }
        var org_fields = {
            activeProjects: org.activeProjects,
            address: {
                addressLine1: org.addressLine1,
                addressLine2: org.addressLine2,
                postcode: org.postal,
                city: org.city,
                state: org.state,
                country: country,
            },
            ein: org.ein,
            logoUrl: org.logoUrl,
            mission: org.mission,
            name: org.name,
            provider: "GlobalGiving",
            totalProjects: org.totalProjects,
            url: org.url,
            themes: theme_objs
        };
        new Organization_1.default(org_fields).save(function (err) { });
    }
    console.log("Inserted Organizations");
};
exports.default = insertOrganizations;
//# sourceMappingURL=insert_organizations.js.map