const express = require("express");
const { check, validationResult, body } = require("express-validator");
const { QualificationsController } = require("./QualificationsController");
const { QualificationsService } = require("./QualificationsService");
const { QualificationsRepository } = require("./QualificationsRepository");
const dbConnection = require("../../db/dbConnection");
const admin = require("../../middleware/admin");

const router = express.Router();
const qualificationsService = new QualificationsService(
  new QualificationsRepository(dbConnection)
);

const qualificationsController = new QualificationsController(
  qualificationsService
);

router.post(
  "/create",
  admin,
  [body("description").notEmpty().withMessage("Description is required")],
  qualificationsController.create
);

router.put(
  "/update/:id",
  admin,
  [body("description").notEmpty().withMessage("Description is required")],
  qualificationsController.update
);

router.delete("/delete/:id", admin, qualificationsController.delete);

router.get("/all", admin, qualificationsController.getAll);

router.get("/qualification/:id", admin, qualificationsController.getbyid);

module.exports = router;
