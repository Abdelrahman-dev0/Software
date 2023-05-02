const express = require("express");
const { body } = require("express-validator");
const JobController = require("./JobController");
const JobService = require("./JobService");
const JobRepository = require("./JobRepository");
const db = require("../../db/dbConnection");

const jobRepository = new JobRepository(db);
const jobService = new JobService(jobRepository);
const jobController = new JobController(jobService);

const router = express.Router();

router.post(
  "/create",
  [
    body("position").notEmpty().withMessage("Position is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("offer").isNumeric().withMessage("Offer must be a number"),
    body("max_candidate_number")
      .isNumeric()
      .withMessage("Max candidate number must be a number"),
    body("qualifications")
      .isArray({ min: 1 })
      .withMessage("At least one qualification is required"),
  ],
  jobController.create
);

router.put(
  "/update/:id",
  [
    body("position").notEmpty().withMessage("Position is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("offer").isNumeric().withMessage("Offer must be a number"),
    body("max_candidate_number")
      .isNumeric()
      .withMessage("Max candidate number must be a number"),
    body("qualifications")
      .isArray({ min: 1 })
      .withMessage("At least one qualification is required"),
  ],
  jobController.update
);

router.delete("/delete/:id", jobController.delete);

router.get("/all", jobController.getAll);

module.exports = router;
