"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    active: {
        type: Boolean,
        required: true
    },
    activities: {
        type: String
    },
    additionalDocumentation: {
        type: String
    },
    approvedDate: {
        type: Date
    },
    country: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Country"
    },
    countries: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Country"
        }],
    dateOfMostRecentReport: {
        type: Date
    },
    donationOptions: [{
            amount: {
                type: Number,
            },
            description: {
                type: String
            }
        }],
    funding: {
        type: Number
    },
    goal: {
        type: Number
    },
    // imageGallerySize;
    // image;
    longTermImpact: {
        type: String
    },
    modifiedDate: {
        type: Date
    },
    need: {
        type: String
    },
    notice: {
        type: String
    },
    numberOfDonations: {
        type: Number
    },
    numberOfReports: {
        type: Number
    },
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Organization"
    },
    progressReportLink: {
        type: String
    },
    projectLink: {
        type: String
    },
    remaining: {
        type: Number
    },
    status: {
        type: String
    },
    summary: {
        type: String
    },
    themes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Theme"
        }],
    title: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    // videos: [{
    //   url: {
    //     type: String,
    //     required: true
    //   }
    // }]
});
projectSchema.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
const Project = mongoose_1.model("Project", projectSchema);
exports.default = Project;
//# sourceMappingURL=Project.js.map