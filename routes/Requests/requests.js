const express = require("express");
const router = express.Router();
const dbConnection = require("../../db/dbConnection");
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
  getAllUserRequestsController.handleGetAllRequests.bind(
    getAllUserRequestsController
  )
);

router.put(
  "/update/:id",
  updateUserRequestController.handleRequestUpdate.bind(
    updateUserRequestController
  )
);

router.post(
  "/apply/:id",
  applyForJobController.handleApplyForJob.bind(applyForJobController)
);

module.exports = router;
