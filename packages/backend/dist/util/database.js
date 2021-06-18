"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const initialData = async () => {
    // insertCountries();
    // insertThemes();
    // insertOrganizations();
    // insertProjects();
};
const initModels = async () => {
    require('../models/Country');
    require('../models/Organization');
    require('../models/Project');
    require('../models/Theme');
    require('../models/User');
};
const connectDB = async () => {
    try {
        const mongoURI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?${process.env.MONGO_OPTIONS}`;
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        };
        await mongoose_1.connect(mongoURI, options);
        console.log("MongoDB Connected...");
        await initModels();
        console.log("Models Initialized");
        initialData();
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=database.js.map