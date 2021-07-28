import got from 'got';
import {parseStringPromise} from 'xml2js';
import {
  ICountryDocument,
  IThemeDocument,
  IOrganizationDocument,
} from '../../../backend/src/models/Documents';
import Theme from '../../../backend/src/models/Theme';
import Country from '../../../backend/src/models/Country';
import Organization from '../../../backend/src/models/Organization';
import Project from '../../../backend/src/models/Project';
import {IImage, IProject} from '../../../backend/src/models/Interfaces';
import {CallbackError} from 'mongoose';

const insertProjects = async () => {
  const {body} = await got.get(
    `https://api.globalgiving.org/api/public/projectservice/all/projects/download.xml?api_key=${process.env.GLOBALGIVING_KEY}`
  );
  const data_url = (
    await parseStringPromise(body, {
      explicitRoot: true,
      explicitArray: false,
    })
  )['download']['url'];

  const res = (await got.get(data_url)).body;
  const projects: Array<Object> = (
    await parseStringPromise(res, {
      explicitRoot: true,
      explicitArray: false,
    })
  )['projects']['project'];

  const all_themes: Array<IThemeDocument> = await Theme.find({}).exec();
  const all_countries: Array<ICountryDocument> = await Country.find({}).exec();
  const all_organizations: Array<IOrganizationDocument> =
    await Organization.find({}).exec();

  for (let p = 0; p < projects.length; p++) {
    const project: any = projects[p];
    try {
      // Set Theme Array
      const theme_objs: Array<IThemeDocument> = [];
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
        } else {
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
      const country_objs: Array<ICountryDocument> = [];
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
        } else {
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
      var default_country: ICountryDocument | undefined;
      for (var l = 0; l < all_countries.length; l++) {
        db_country = all_countries[l];
        if (db_country.name == project.country) {
          default_country = db_country;
          break;
        }
      }
      if (default_country === undefined) {
        console.error(`Country not found ${project.country}`);
        return;
      }

      // Set Organization
      if (project.organization === undefined) {
        console.error(
          `Organization doesn't exist for project ${project.title}`
        );
        continue;
      }

      var organization: IOrganizationDocument | undefined;
      for (var l = 0; l < all_organizations.length; l++) {
        const db_org = all_organizations[l];
        if (db_org.name == project.organization.name) {
          organization = db_org;
          break;
        }
      }
      if (organization === undefined) {
        console.error(`Organization not found ${project.organization.name}`);
        continue;
      }

      // Fix Donation Options
      if (project.donationOptions === undefined) {
        console.error(
          `Donation Options don't exist for project ${project.title}`
        );
        continue;
      }
      const donation_options: Array<any> = [];
      project.donationOptions.donationOption.forEach((option: any) => {
        donation_options.push({
          amount: +option.amount,
          description: option.description,
        });
      });

      // Images
      const project_images: Array<IImage> = [];
      const images_body: any = (
        await got.get(
          `https://api.globalgiving.org/api/public/projectservice/projects/${project.id}/imagegallery?api_key=${process.env.GLOBALGIVING_KEY}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        )
      ).body;

      const images = JSON.parse(images_body)['images']['image'];

      for (var l = 0; l < images.length; l++) {
        const entry = images[l];
        project_images.push({
          title: entry.title,
          url: entry['imagelink'][entry['imagelink'].length - 1]['url'],
        });
      }

      const proj_fields: any = {
        active: JSON.parse(project.active),
        activities: project.activities,
        additionalDocumentation: project.additionalDocumentation,
        approvedDate: new Date(project.approvedDate),
        country: default_country,
        countries: country_objs,
        dateOfMostRecentReport:
          project.dateOfMostRecentReport != null
            ? new Date(project.dateOfMostRecentReport)
            : null,
        donationOptions: donation_options,
        funding: +project.funding,
        goal: +project.goal,
        images: project_images,
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
        videos: project.video != null ? project.videos : [],
      };
      new Project(proj_fields).save((err: CallbackError, doc: IProject) => {
        // console.error(err)
      });
    } catch (e) {
      console.error(e);
    }
  }
};

export default insertProjects;
