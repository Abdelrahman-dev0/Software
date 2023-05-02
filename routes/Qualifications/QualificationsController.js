const { QualificationsService } = require("./QualificationsService");
const { check, validationResult, body } = require("express-validator");
/* ==================================================================================================== */
/* 1- ( SRP ) QualificationsController is responsible for handling HTTP requests related to qualifications */
/* 2- ( DIP ) The QualificationsController class depends on an abstraction ( QualificationsService ) */
/* ==================================================================================================== */

class QualificationsController {
  constructor(qualificationsService) {
    this.qualificationsService = qualificationsService;
  }

  create = async (req, res) => {
    try {
      // 1- VALIDATE THE REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- PREPARE QUALIFICATION OBJECT
      const qualification = {
        description: req.body.description,
      };

      // 3- INSERT QUALIFICATION RECORD INTO DB
      const newQualification = await this.qualificationsService.create(
        qualification
      );

      res.status(200).json({
        msg: "Qualification Created Successfully!",
        qualification: newQualification,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: "Internal server error" }] });
    }
  };

  update = async (req, res) => {
    try {
      // 1- VALIDATE THE REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF QUALIFICATION EXISTS OR NOT
      const qualification = await this.qualificationsService.getById(
        req.params.id
      );
      if (!qualification) {
        return res.status(404).json({ msg: "Qualification not found!" });
      }

      // 3- PREPARE QUALIFICATION OBJECT
      const qualificationObj = {
        description: req.body.description,
      };

      // 4- UPDATE QUALIFICATION OBJECT IN DB
      await this.qualificationsService.update(req.params.id, qualificationObj);

      res.status(200).json({
        msg: "Qualification updated successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: "Internal server error" }] });
    }
  };

  delete = async (req, res) => {
    try {
      // Check if qualification exists
      const qualification = await this.qualificationsService.getById(
        req.params.id
      );
      if (!qualification) {
        res.status(404).json({ msg: "Qualification not found!" });
        return;
      }

      // Delete qualification
      await this.qualificationsService.delete(req.params.id);

      // Send success response
      res.status(200).json({ msg: "Qualification deleted successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: "Internal server error" }] });
    }
  };

  getAll = async (req, res) => {
    try {
      const qualifications = await this.qualificationsService.getAll();
      res.status(200).json({ qualifications });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: "Internal server error" }] });
    }
  };
}

module.exports = { QualificationsController };
