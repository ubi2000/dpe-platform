const Property = require("../models/Property")
const { analyzeProperty } = require("../services/aiService")
const { generateReport } = require("../services/reportService")
//const { getReport } = require("../controllers/authController")



//register Property
exports.createProperty = async (req, res) => {
    try {
        const { title, size, constructionYear, heatingType, address, propertyType } = req.body
        const property = new Property({
            user: req.user,
            title,
            size,
            constructionYear,
            heatingType,
            address,
            propertyType
        })
        await property.save()
        res.status(201).json(property)

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

//Get Property

exports.getProperties = async (req, res) => {
    try {
        const properties = await Property.find({ user: req.user })
        res.json(properties)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}


//image upload

exports.uploadImages = async (req, res) => {
    try {

        const property = await Property.findById(req.params.id)
        if (!property) {
            return res.status(400).json({ msg: "No Property Found" })
        }

        const imagePaths = req.files.map(file => file.path)
        property.images.push(...imagePaths)
        await property.save()
        res.json(property)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Upload failed" });
    }
}

//Analyze Prop
exports.analyzeProperty = async (req, res) => {
    try {

        const property = await Property.findById(req.params.id)
        if (!property) {
            return res.status(404).json({ msg: "property not found" })
        }
        const result = analyzeProperty(property)

        property.predictedRating = result.rating
        property.energyConsumption = result.energyConsumption;
        property.co2Emission = result.co2Emission;
        property.recommendation = result.recommendation;
        property.status = "analyzed";

        await property.save()
        res.json(property)
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Analysis Failed" })
    }
}


//Genetae report

exports.getReport = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        if (!property) {
            return res.status(404).json({ msg: "Property not found" })

        }
        if (property.status !== "analyzed") {
            return res.status(400).json({ msg: "Analyze Property first" })

        }
        const report = generateReport(property)
        res.json({ report })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "report generation failed" })
    }
}