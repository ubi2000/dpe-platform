const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//Registration
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" })
        }
        //check email
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ msg: "User already Exists" })

        //hash passowrd
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        //create user
        user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()
        res.status(201).json({ msg: "User registered Successfully" })


    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server error" })
    }

}


//login user

exports.loginUser = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" })
        }

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.json({
            token
        })

    }
    catch (error) {
        res.status(500).json({ msg: "Server Error" })
    }
}