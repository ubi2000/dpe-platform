const multer = require("multer")
const path = require("path")


//Storage Config

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

//filter

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase())

    if (ext) {
        cb(null, true)
    }
    else {
        cb(new Error("Only Images are allowed"))
    }
}
const upload = multer({
    storage,
    fileFilter
})

module.exports= upload