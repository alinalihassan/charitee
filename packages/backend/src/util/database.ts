import { ConnectionOptions, connect, mongo, connection} from "mongoose";
import insertCountries from "../data/insert_countries"
import insertOrganizations from "../data/insert_organizations"
import insertThemes from "../data/insert_themes";
import insertProjects from "../data/insert_projects";

const initialData = async () => {
  // insertCountries();
  // insertThemes();
  // insertOrganizations();
  // insertProjects();
}

const initModels = async() => {
  require('../models/Country');
  require('../models/Organization');
  require('../models/Project');
  require('../models/Theme');
  require('../models/User');
}

const connectDB = async () => {
  try {
    const mongoURI: string = `mongodb://${process.env.DB_USER}:${process.env.DBPASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?${process.env.DB_OPTIONS}`;
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(mongoURI, options);
    console.log("MongoDB Connected...");

    await initModels();
    console.log("Models Initialized");

    initialData();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
