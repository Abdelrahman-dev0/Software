/* 1- This class has a single responsibility of handling user registration requests. ( SRP ) */
/* 2- This class depends on ( UserRepository ) abstraction. ( DIP ) */
/* 3- The constructor takes a single parameter ( UserRepository ). ( DI ) */

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class RegisterController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const checkEmailExists = await this.userRepository.findByEmail({
        email: req.body.email,
      });
      if (checkEmailExists) {
        return res.status(400).json({ error: "Email is already registered" });
      }

      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        phone: req.body.phone,
        token: crypto.randomBytes(16).toString("hex"),
      };

      const user = await this.userRepository.create({ userData });
      delete user.password;

      res.status(201).json({
        user: user,
        message: "User created successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = RegisterController;
