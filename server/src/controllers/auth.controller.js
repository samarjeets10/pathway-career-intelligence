const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tokenBlacklistModel = require("../models/blacklist.model");
const apiError = require('../utils/apiError');
const apiResponse = require('../utils/apiResponse');

const generateAccessAndRefreshToken = async (userId) => {
    try {

        const user = await userModel.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    } catch (error) {
        console.log("Token generation error :", error);

        if (error instanceof apiError) {
            throw error;
        }

        throw new apiError(500, "Something went wrong while generating the access and refresh tokens.");
    }
}

/**
 * @name registerUserController
 * @description Register a new user, expects username, email, and password in the body.
 * @access Public
 */
async function registerUserController(req, res) {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
       throw new apiError(400, "All fields are required.");
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ {username},  {email} ],
    })

    if (isUserAlreadyExists) {
        // user exists with the username :
        if (isUserAlreadyExists.username === username.toLowerCase()) {
            throw new apiError(409, "User with this username already exists.");
        }

        if (isUserAlreadyExists.email === email.toLowerCase()) {
            throw new apiError(409, "account with this email is already exists.")
        }
    };

    const user = await userModel.create({
        username: username.toLowerCase(),
        email, 
        password
    });

    const createdUser = await userModel.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new apiError(500, "Something went wrong while creating the user!");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const registeredUser = await userModel.findById(user._id).select("-password -refreshToken");

    const options =  {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    };

    res.status(201).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new apiResponse(200,
            {
                user: registeredUser, accessToken, refreshToken
            },
            "User registered successfully."
        )
    )

};


/**
 * @name loginUserController
 * @description login a user, expected email and password in the request body
 * @access Public
 */

async function loginUserController(req, res) {

    const { email, password } = req.body;

    if (!email) {
        throw new apiError(400, "email is required.");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        throw new apiError(404, "User does not exista with this credentials!");
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new apiError(400, "Invalid password credentials");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedinUser = await userModel.findById(user._id).select("-password -refreshToken");

    const options =  {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    };

    res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new apiResponse(200,
            {
                user: loggedinUser, accessToken, refreshToken
            },
            "User logged in SuccessFully."
        )
    )
};


/**
 * @name logoutUserController
 * @description clear token from user cookie and add token in the blacklist
 * @access Public
 */

async function logoutUserController(req,res) {
    
    await userModel.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },

        {
            new: true
        }
    );

    const options =  {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    };

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
        new apiResponse(200, {}, "User logged out successfully.")
    );

}


/**
 * @name getMeController
 * @description get the current loggrd in user detailes.
 * @access Private
 */
async function getMeController(req, res) {

    const user = await userModel.findById(user._id).select("-password -refreshToken");

    if (!user) {
        throw new apiError(404, "User not found.");
    }

    return res.status(200).json(200, user, "Current user fetched successfully.");
}


const refreshAccessToken = async (req, res) => {

    try {

        const incomingrefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

        if (!incomingrefreshToken) {
            throw new apiError(401, "Refresh token is required.")
        };

        const decodedToken = jwt.verify(incomingrefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await userModel.findById(decodedToken?._id);

        if (!user) {
            throw new apiError(401, "Invalid refresh token.");
        }

        if (incomingrefreshToken !== user.refreshToken) {
            throw new apiError(401, "Rferesh Token is expired, invalid or already used!");
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

        const options =  {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/"
        };

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new apiResponse(
                200,
                { accessToken, refreshToken: newRefreshToken },
                "Access and refresh tokens generated successfully."
            ));

    } catch (error) {

        console.log("Refresh Tokem Error:", error);

        if (error instanceof apiError) {
            throw error;
        }

        throw new apiError(401, "Invalid or expired token.");
    }
}



module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
    refreshAccessToken
}