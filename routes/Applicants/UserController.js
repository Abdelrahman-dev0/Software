/* 1- The UserController class has a single responsibility of handling the HTTP requests related to User entity. ( SRP ) */
/* 2- UserController class depends on an abstraction ( UserRepository ). */
/* 3- The constructor takes a single parameter ( UserRepository ). ( DI ) */

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  // CREATE APPLICANT [ Admin ]
  async createUser(req, res) {
    try {
      // 1- VALIDATION REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF EMAIL EXISTS
      const emailExists = await this.userRepository.checkEmailExists(
        req.body.email
      );
      if (emailExists) {
        return res.status(400).json({
          errors: [
            {
              msg: "email is already exists!",
            },
          ],
        });
      }

      // 3- PREPARE OBJECT USER TO ---> SAVE
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        phone: req.body.phone,
        token: crypto.randomBytes(16).toString("hex"),
        status: req.body.status,
      };

      // 4- INSERT USER INTO DB
      const user = await this.userRepository.createUser(userData);
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: "Internal Server Error" });
    }
  }

  // UPDATE APPLICANT [ Admin ]
  async updateUser(req, res) {
    try {
      // 1- VALIDATION REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //2- CHECK IF APPLICANT EXISTS OR NOT
      const user = await this.userRepository.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "Applicant not found !" });
      }

      //3- Prepare user object
      const userObj = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: await bcrypt.hash(req.body.password, 10),
      };

      //4- Update user object in db
      await this.userRepository.updateUser(req.params.id, userObj);
      res.status(200).json({
        msg: "Applicant Updated Successfully !",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ err: "Internal Server Error" });
    }
  }

  // DELETE APPLICANT [ Admin ]
  async deleteUser(req, res) {
    try {
      //1- CHECK IF APPLICANT  EXISTS OR NOT
      const user = await this.userRepository.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "Applicant not found !" });
      }

      //2- Delete user object in db
      await this.userRepository.deleteUser(req.params.id);
      res.status(200).json({
        msg: "Applicant Deleted Successfully !",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ err: "Internal Server Error" });
    }
  }

  // READ ALL APPLICANTS [ Admin ]
  async getAllUsers(req, res) {
    try {
      const users = await this.userRepository.getAllUsers();
      users.forEach((user) => {
        delete user.password;
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ err: "Internal Server Error" });
    }
  }

  // READ APPLICANT BY ID [ Admin ]
  async getUserById(req, res) {
    try {
      const user = await this.userRepository.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = UserController;
