/* 1- SThe router sets up the routes for the different controllers and binds them to the methods. ( SRP ) */
/* 2- The router depends on ( UserRepository ) abstraction. ( DIP ) */
/* 3- The router takes a single parameter ( UserRepository ). ( DI ) */

const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const dbConnection = require("../../db/dbConnection");
const UserRepository = require("./UserRepository");
const LoginController = require("./LoginController");
const LogoutController = require("./LogoutController");
const RegisterController = require("./RegisterController");
const authorize = require("../../middleware/authorize");
const userRepository = new UserRepository(dbConnection);

const loginController = new LoginController(userRepository);
router.post(
  "/login",
  authorize,
  [check("email").isEmail(), check("password").notEmpty()],
  loginController.login.bind(loginController)
);

const logoutController = new LogoutController(userRepository);
router.post(
  "/logout",
  authorize,
  logoutController.logout.bind(logoutController)
);

const registerController = new RegisterController(userRepository);
router.post(
  "/register",
  [
    check("name").notEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
    check("phone").notEmpty(),
  ],
  registerController.register.bind(registerController)
);

module.exports = router;
