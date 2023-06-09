const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const UserController = require("./UserController");
const UserRepository = require("./UserRepository");
const dbConnection = require("../../db/dbConnection");
const admin = require("../../middleware/admin");
const authorized = require("../../middleware/authorize");
// Initialize the user controller and repository
const userRepository = new UserRepository(dbConnection);
const userController = new UserController(userRepository);

// Define routes for handling applicants
router.post(
  "/create",
  admin,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
    body("phone").notEmpty().withMessage("Phone number is required"),
  ],
  userController.createUser.bind(userController)
);

router.put(
  "/update/:id",
  admin,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
    body("phone").notEmpty().withMessage("Phone number is required"),
  ],
  userController.updateUser.bind(userController)
);

router.delete(
  "/delete/:id",
  admin,
  userController.deleteUser.bind(userController)
);

router.get("/all", admin, userController.getAllUsers.bind(userController));

router.get(
  "/user/:id",
  authorized,
  userController.getUserById.bind(userController)
);

module.exports = router;
