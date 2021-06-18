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
    const mongoURI: string = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?${process.env.MONGO_OPTIONS}`;
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
