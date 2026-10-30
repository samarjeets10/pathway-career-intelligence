const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const tokenBlacklistModel = require('../models/blacklist.model');
const apiError = require('../utils/apiError');

async function verifyToken(req, res, next) {

    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized request."
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })


    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "token is Invalid"
        })
    }


    try {

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await userModel.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new apiError(401, "Invalid access token!");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new apiError(401, error?.message || "Invalid access token!")
    }

}

module.exports = verifyToken;