/* 1- This class has a single responsibility of handling user logout requests. ( SRP ) */
/* 2- This class depends on ( UserRepository ) abstraction. ( DIP ) */
/* 3- The constructor takes a single parameter ( UserRepository ). ( DI ) */

class LogoutController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async logout(req, res) {
    try {
      const user = await this.userRepository.findByToken({
        token: req.headers.token,
      });
      if (!user) {
        return res.status(400).json({ message: "Invalid token" });
      }

      await this.userRepository.setStatus({ id: user.id, status: 0 });

      const updatedUser = await this.userRepository.findById({ id: user.id });
      delete updatedUser.password;
      res.status(200).json({ user: updatedUser, message: "Logout successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = LogoutController;
