import got from 'got';
import { parseStringPromise } from 'xml2js'
import Organization from '../models/Organization'
import Theme from '../models/Theme';
import Country from '../models/Country';
import { IThemeDocument, ICountryDocument } from '../models/Documents';

const insertOrganizations = async () => {
    var { body } = await got.get(`https://api.globalgiving.org/api/public/orgservice/all/organizations/vetted/download?api_key=${process.env.GLOBALGIVING_KEY}`, {
        headers: {
            'content-type': 'json'
        }
    })
    let data_url = (await parseStringPromise(body, {
        explicitRoot: true,
        explicitArray: false,
    }))['download']['url'];

    let res = (await got.get(data_url)).body;
    let organizations = (await parseStringPromise(res, {
        explicitRoot: true,
        explicitArray: false,
    }))['organizations']['organization'];

    var all_themes: Array<IThemeDocument> = await Theme.find({}).exec();
    var all_countries: Array<ICountryDocument> = await Country.find({}).exec();

    for (var i = 0; i < organizations.length; i++) {
        var org = organizations[i];

        // Set themes
        var theme_objs = []
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
            } else {
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
        var country: ICountryDocument;
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
        new Organization(org_fields).save(function(err: Error) {});
    }

    console.log("Inserted Organizations");
}

export default insertOrganizations;