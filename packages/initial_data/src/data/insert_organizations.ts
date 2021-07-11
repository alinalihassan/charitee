import got from 'got';
import {parseStringPromise} from 'xml2js';
import Organization from '../../../backend/src/models/Organization';
import Theme from '../../../backend/src/models/Theme';
import Country from '../../../backend/src/models/Country';
import {
  IThemeDocument,
  ICountryDocument,
} from '../../../backend/src/models/Documents';
import {CallbackError} from 'mongoose';
import {IOrganization} from '../../../backend/src/models/Interfaces';

const insertOrganizations = async () => {
  const {body} = await got.get(
    `https://api.globalgiving.org/api/public/orgservice/all/organizations/vetted/download?api_key=${process.env.GLOBALGIVING_KEY}`,
    {
      headers: {
        'content-type': 'json',
      },
    }
  );
  const data_url = (
    await parseStringPromise(body, {
      explicitRoot: true,
      explicitArray: false,
    })
  )['download']['url'];

  const res = (await got.get(data_url)).body;
  const organizations = (
    await parseStringPromise(res, {
      explicitRoot: true,
      explicitArray: false,
    })
  )['organizations']['organization'];

  const all_themes: Array<IThemeDocument> = await Theme.find({}).exec();
  const all_countries: Array<ICountryDocument> = await Country.find({}).exec();

  for (let i = 0; i < organizations.length; i++) {
    const org = organizations[i];

    // Set themes
    const theme_objs = [];
    if (org.themes != null && org.themes.theme != null) {
      if (org.themes.theme instanceof Array) {
        for (let j = 0; j < org.themes.theme.length; j++) {
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
    var country: ICountryDocument | undefined;
    for (let l = 0; l < all_countries.length; l++) {
      const db_country = all_countries[l];
      if (db_country.name == org.country) {
        country = db_country;
        break;
      }
    }
    if (country === undefined) {
      console.error(`Country not found ${org.country}`);
      return;
    }

    const org_fields = {
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
      provider: 'GlobalGiving',
      totalProjects: org.totalProjects,
      url: org.url,
      themes: theme_objs,
    };
    new Organization(org_fields).save(
      (err: CallbackError, doc: IOrganization) => {}
    );
  }
};

export default insertOrganizations;
