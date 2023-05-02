const express = require("express");
const router = express.Router();
const dbConnection = require("../../db/dbConnection");
const admin = require("../../middleware/admin");
const authorize = require("../../middleware/authorize");
const { UserRequestRepository } = require("./UserRequestRepository");
const {
  GetAllUserRequestsController,
} = require("./GetAllUserRequestsController");
const {
  UpdateUserRequestController,
} = require("./UpdateUserRequestController");
const { ApplyForJobController } = require("./ApplyForJobController");

const userRequestRepository = new UserRequestRepository(dbConnection);

const getAllUserRequestsController = new GetAllUserRequestsController(
  userRequestRepository
);

const updateUserRequestController = new UpdateUserRequestController(
  userRequestRepository
);

const applyForJobController = new ApplyForJobController(userRequestRepository);

router.get(
  "/all",
  admin,
  getAllUserRequestsController.handleGetAllRequests.bind(
    getAllUserRequestsController
  )
);

router.put(
  "/update/:id",
  admin,
  updateUserRequestController.handleRequestUpdate.bind(
    updateUserRequestController
  )
);

router.post(
  "/apply/:id",
  authorize,
  applyForJobController.handleApplyForJob.bind(applyForJobController)
);

module.exports = router;
