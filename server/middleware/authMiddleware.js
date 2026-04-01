const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization")

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "No token, authorization denied" })
        }

        const cleanToken = token.slice(7)
        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET)

        req.user = decoded.id
        next()

    } catch (error) {
        res.status(401).json({ msg: "Invalid token" })
    }
}

// const authMiddleware = (req, res, next) => {
//   try {
//     const token = req.header("Authorization");

//     if (!token) {
//       return res.status(401).json({ msg: "No token, authorization denied" });
//     }

//     // remove "Bearer "
//     const cleanToken = token.startsWith("Bearer ")
    
//       ? token.slice(7)
//       : token;

//     const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);

//     req.user = decoded;

//     next();
//   } catch (error) {
//     res.status(401).json({ msg: "Invalid token" });
//   }
// };

module.exports = authMiddleware;