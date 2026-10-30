const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: [true, "username already taken"],
            required: true,
            lowercase: true,
            trim: true
        },

        email: {
            type: String,
            unique: [true, "account already exists with this email address"],
            required: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: [true, "Password is required."]
        },

        refreshToken: {
            type: String
        }
    },

    {
        timestamps: true
    }
);


userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};


userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const userModel =  mongoose.model("users", userSchema);

module.exports = userModel;