const dbConnection = require("../db/dbConnection");

const admin = async (req, res, next) => {
  const { token } = req.headers;
  try {
    const results = await dbConnection.executeQuery(
      "SELECT * FROM users WHERE token = ? AND type = ?",
      [token, 1]
    );
    if (results.length > 0) {
      next();
    } else {
      res
        .status(403)
        .json({ msg: "You are not authorized to access this route!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = admin;
