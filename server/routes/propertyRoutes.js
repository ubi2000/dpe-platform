const express =require("express")
const router= express.Router()

const{ createProperty, getProperties}= require("../controllers/propertyController")
const authMiddleware= require("../middleware/authMiddleware")

router.post("/",authMiddleware,createProperty)
router.get("/",authMiddleware,getProperties)

module.exports=router