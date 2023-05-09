/* 1- This class has a single responsibility of handling user login requests. ( SRP ) */
/* 2- This class depends on ( UserRepository ) abstraction. ( DIP ) */
/* 3- The constructor takes a single parameter ( UserRepository ). ( DI ) */

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

class LoginController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async login(req, res) {
    try {
      // 1- VALIDATE REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF EMAIL EXISTS
      const user = await this.userRepository.findByEmail({
        email: req.body.email,
      });
      if (!user) {
        return res.status(404).json({
          errors: [
            {
              msg: "Email or password not found!",
            },
          ],
        });
      }

      // 3- COMPARE HASHED PASSWORD
      const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!checkPassword) {
        return res.status(401).json({
          error: "Email or password not found!",
        });
      }

      // 4- UPDATE USER STATUS TO "ACTIVE" [ 0 --> inactive, 1 --> active ]
      await this.userRepository.setStatus({ id: user.id, status: 1 });

      // 5- GET USER TOKEN FROM DATABASE
      const token = await this.userRepository.getToken({ id: user.id });

      // 6- RETURN UPDATED USER OBJECT WITH TOKEN
      const updatedUser = await this.userRepository.findById({ id: user.id });
      delete updatedUser.password;
      updatedUser.token = token;
      res.status(200).json({
        user: updatedUser,
        message: "Login successful",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = LoginController;
