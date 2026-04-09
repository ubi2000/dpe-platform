const Property = require("../models/Property")
const { analyzeProperty } = require("../services/aiService")
const { generateReport } = require("../services/reportService")
//const { getReport } = require("../controllers/authController")



//register Property
exports.createProperty = async (req, res) => {
    try {
        const { title, size, constructionYear, heatingType, address, propertyType } = req.body
        if (!title || !size || !constructionYear) {
            return res.status(400).json({ msg: "Missing fields" });
        }
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


//Update property

exports.updateProperty = async (req, res) => {
    try {

        const property = await Property.findById(req.params.id)
        if (!property) {
            return res.status(400).json({ msg: " Property Not Found" })

        }
        if (property.user.toString() !== req.user) {
            return res.status(403).json({ msg: 'Unauthorized' })
        }
        const { title, size, constructionYear, heatingType, address, propertyType, windowType } = req.body
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id, { title, size, constructionYear, heatingType, address, propertyType, windowType },
            { new: true }
        )
        res.json(updatedProperty)
    }

    catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Update Failed" })
    }
}
//Delete property
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        if (!property) {
            return res.status(404).json({ msg: "Property not found" })
        }
        if (property.user.toString() !== req.user) {
            return res.status(403).json({ msg: " Unathorized" })
        }
        await Property.findByIdAndDelete(req.params.id)

        res.json({ msg: "property successfully deleted" })


    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Delete Failed" })
    }
}

//image upload

exports.uploadImages = async (req, res) => {
    try {

        const property = await Property.findById(req.params.id)
        if (!property) {
            return res.status(400).json({ msg: "No Property Found" })
        }
        if (property.user.toString() !== req.user) {
            return res.status(403).json({ msg: " Unathorized" })
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
        const result = await analyzeProperty(property)

        property.predictedRating = result.rating
        property.energyConsumption = result.energyConsumption;
        property.co2Emission = result.co2Emission;
        property.recommendations = result.recommendations;
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
        const report = await generateReport(property)
        res.json({ report })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "report generation failed" })
    }
}