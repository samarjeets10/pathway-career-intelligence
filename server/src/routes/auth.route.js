const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const verifyJWT = require("../middlewares/auth.middleware");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);


/**
 * @route POST /api/auth/login
 * @description User Login with email and password
 * @access Public
 */
authRouter.post('/login', authController.loginUserController);


/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add token in the blacklist
 * @access Public
 */
authRouter.post('/logout', verifyJWT, authController.logoutUserController);


authRouter.post('/refresh-token', authController.refreshAccessToken);


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user detailes
 * @access Private
 */
authRouter.get('/get-me', verifyJWT,authController.getMeController);


module.exports = authRouter;