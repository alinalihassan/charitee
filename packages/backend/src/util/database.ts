import {ConnectionOptions, connect} from 'mongoose';

const initModels = async () => {
  require('../models/Country');
  require('../models/Organization');
  require('../models/Project');
  require('../models/Theme');
  require('../models/User');
};

const connectDB = async () => {
  const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.DB_OPTIONS}`;
  const options: ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
  await connect(mongoURI, options);
  console.log('MongoDB Connected...');

  await initModels();
  console.log('Models Initialized');
};

export default connectDB;
