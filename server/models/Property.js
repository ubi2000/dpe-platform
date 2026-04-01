const mongoose = require("mongoose")


const propertySchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ["pending", "analyzed"],
        default: "pending"
    },
    size: {
        type: Number,
        required: true,
        min: 1
    },
    constructionYear: {
        type: Number,
        required: true
    },
    propertyType: {
        type: String,
        enum: ["apartment", "house", "studio"],
        required: true
    }, address: {
        type: String,
        required: true
    },
    windowType: {
        type: String,
        enum: ["single", "double", "triple", "unknown"],
        default: "unknown"
    },
    heatingType: {
        type: String,
        required: true
    },
    predictedRating: {
        type: String,
        default: "Pending"
    },
    energyConsumption: {
        type: Number,
        default: null
    },
    co2Emission: {
        type: Number,
        default: null
    },
    recommendations: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);


