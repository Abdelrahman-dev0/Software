const express = require("express");
const { check, validationResult, body } = require("express-validator");
const { QualificationsController } = require("./QualificationsController");
const { QualificationsService } = require("./QualificationsService");
const { QualificationsRepository } = require("./QualificationsRepository");
const dbConnection = require("../../db/dbConnection");

const router = express.Router();
const qualificationsService = new QualificationsService(
  new QualificationsRepository(dbConnection)
);

const qualificationsController = new QualificationsController(
  qualificationsService
);

router.post(
  "/create",
  [body("description").notEmpty().withMessage("Description is required")],
  qualificationsController.create
);

router.put(
  "/update/:id",
  [body("description").notEmpty().withMessage("Description is required")],
  qualificationsController.update
);

router.delete("/delete/:id", qualificationsController.delete);

router.get("/all", qualificationsController.getAll);

module.exports = router;
