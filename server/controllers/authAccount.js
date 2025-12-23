const User = require("../models/client")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const client = require("../models/client")


exports.register = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        const existUser = await User.findOne({ email })
        if (existUser)
            return res.status(400).json({ message: "user already exist" })
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const userr = await User.create({
            fullName,
            email,
            password: hashedPassword
        })
        res.status(201).json({ message: "user registred" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const exstUser = await User.findOne({ email })
        if (!exstUser)
            return res.status(400).json({ message: "invalid crendentials" })

        //compare
        const isMatch = await bcrypt.compare(password, exstUser.password) //true

        if (!isMatch)
            return res.status(400).json({ message: "invalid pass or email " })

        const token = jwt.sign(
            { id: exstUser._id },
            aqwzsxedc12,
            { expiresIn: "1d" }
        )

        res.json({
            token,
            exstUser: {
                id: exstUser._id,
                fullName: exstUser.fullName,
                email: exstUser.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


