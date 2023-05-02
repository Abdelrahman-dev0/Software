const express = require("express");
const { param, query } = require("express-validator");
const SearchController = require("./SearchController");
const UserRepository = require("../Applicants/UserRepository");
const SearchRepository = require("./SearchRepository");
const SearchService = require("./SearchService");
const dbConnection = require("../../db/dbConnection");
const admin = require("../../middleware/admin");
const authorize = require("../../middleware/authorize");
const router = express.Router();

// Initialize the user and search repositories
const userRepository = new UserRepository(dbConnection);
const searchRepository = new SearchRepository(dbConnection);

// Initialize the search controller with the search service
const searchController = new SearchController(
  new SearchService(userRepository, searchRepository)
);

// Search route
router.get(
  "/:id",
  authorize,
  [
    param("id")
      .notEmpty()
      .withMessage("User ID is required")
      .isInt()
      .withMessage("User ID must be an integer"),
    query("search").notEmpty().withMessage("Search text is required"),
  ],
  searchController.search.bind(searchController)
);

// Search history route
router.get(
  "/history/:id",
  authorize,
  [
    param("id")
      .notEmpty()
      .withMessage("User ID is required")
      .isInt()
      .withMessage("User ID must be an integer"),
  ],
  async (req, res) => {
    try {
      const userId = req.params.id;
      const history = await searchRepository.getSearchHistory(userId);
      res.status(200).json({ history });
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: [{ msg: "Internal server error" }] });
    }
  }
);

module.exports = router;
