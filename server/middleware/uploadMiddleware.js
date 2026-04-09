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
      const mime = allowedTypes.test(file.mimetype)

    if (ext && mime) {
        cb(null, true)
    }
    else {
        cb(new Error("Only Images are allowed"))
    }
}
const upload = multer({
    storage,
    fileFilter, limits: { fileSize: 10 * 1024 * 1024 }
})

module.exports = upload