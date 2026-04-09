const express = require("express")
const router = express.Router()
const { getReport } = require("../controllers/propertyController")

const { createProperty, getProperties } = require("../controllers/propertyController")
const { uploadImages } = require("../controllers/propertyController")
const authMiddleware = require("../middleware/authMiddleware")
const uploadMiddlware = require("../middleware/uploadMiddleware")
const { analyzeProperty } = require("../controllers/propertyController")
const { updateProperty, deleteProperty } = require("../controllers/propertyController")




router.post("/", authMiddleware, createProperty)
router.get("/", authMiddleware, getProperties)
router.put("/:id", authMiddleware, updateProperty)
router.delete("/:id", authMiddleware, deleteProperty)
router.post("/:id/upload", authMiddleware, uploadMiddlware.array("images", 5), uploadImages)
router.post("/:id/analyze", authMiddleware, analyzeProperty)
router.get("/:id/report", authMiddleware, getReport)


module.exports = router