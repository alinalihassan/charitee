import { ConnectionOptions, connect} from "mongoose";
import insertCountries from "./data/insert_countries"
import insertOrganizations from "./data/insert_organizations"
import insertThemes from "./data/insert_themes";
import insertProjects from "./data/insert_projects";
import Listr from 'listr'
import { exit } from "process";

const initialData = async () => {
  const tasks = new Listr([
    {
        title: 'Inserting Countries',
        task: () => insertCountries()
    },
    {
        title: 'Inserting Themes',
        task: () => insertThemes()
    },
    {
        title: 'Inserting Organizations',
        task: () => insertOrganizations()
    },
    {
        title: 'Inserting Projects',
        task: () => insertProjects()
    },
  ]);
  
  await tasks.run().catch(err => {
    console.error(err);
  });
}

const initModels = async() => {
  require('../../backend/src/models/Country');
  require('../../backend/src/models/Organization');
  require('../../backend/src/models/Project');
  require('../../backend/src/models/Theme');
  require('../../backend/src/models/User')
}

const main = async () => {
  const mongoURI: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.DB_OPTIONS}`;
  const options: ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
  await connect(mongoURI, options);
  await initModels();
  await initialData();

  exit(0);
};

main()