const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * @name registerUserController
 * @description Register a new user, expects username, email, and password in the body.
 * @access Public
 */
async function registerUserController(req, res) {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email, and password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ {username},  {email} ],
    })

    if (isUserAlreadyExists) {

        // user exists with the username :
        if (isUserAlreadyExists.username === username) {
            return res.status(400).json({
                message: "Account already exists with this username"
            })
        };

        if (isUserAlreadyExists.email === email) {
            return res.status(400).json({
                message: "Account already exists with this email address"
            })
        };

        
    };

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email, 
        password: hash
    });

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET, {expiresIn: "1d"});


    res.cookie("token", token);

    res.status(201).json({
        message: "User Registered Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

};


/**
 * @name loginUserController
 * @description login a user, expected email and password in the request body
 * @access Public
 */

async function loginUserController(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    res.cookie("token", token);

    res.status(200).json({
        message: "User Logged in Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}


module.exports = {
    registerUserController,
    loginUserController,
}