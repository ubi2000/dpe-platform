const Property = require("../models/Property")


//register Property
exports.createProperty = async (req, res) => {
    try {
        const { title, size, constructionYear, heatingType } = req.body
        const property = new Property({
            user: req.user,
            title,
            size,
            constructionYear,
            heatingType
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