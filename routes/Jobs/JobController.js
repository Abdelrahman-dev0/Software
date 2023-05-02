/* 1- The JobController class has a single responsibility of  handling HTTP requests related to jobs. ( SRP ) */
/* 2- JobController class depends on an abstraction ( jobService ). */
/* 3- The constructor takes a single parameter ( jobService ). ( DI ) */

const { body, validationResult } = require("express-validator");

class JobController {
  constructor(jobService) {
    this.jobService = jobService;
  }

  create = async (req, res) => {
    try {
      // 1- VALIDATE THE REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- PREPARE JOB OBJECT
      const job = {
        position: req.body.position,
        description: req.body.description,
        offer: req.body.offer,
        max_candidate_number: req.body.max_candidate_number,
      };

      // 3- INSERT JOB RECORD INTO DB
      const jobId = await this.jobService.createJob(
        job,
        req.body.qualifications
      );

      res.status(200).json({
        msg: "Job Created Successfully!",
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

      // 2- CHECK IF JOB EXISTS OR NOT
      const job = await this.jobService.getJobById(req.params.id);

      if (!job) {
        return res.status(404).json({ msg: "Job not found!" });
      }

      // 3- PREPARE JOB OBJECT
      const jobObj = {
        position: req.body.position,
        description: req.body.description,
        offer: req.body.offer,
        max_candidate_number: req.body.max_candidate_number,
      };

      // 4- UPDATE JOB OBJECT IN DB
      await this.jobService.updateJob(job.id, jobObj, req.body.qualifications);

      res.status(200).json({
        msg: "Job updated successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: "Internal server error" }] });
    }
  };

  delete = async (req, res) => {
    try {
      //1- CHECK IF JOB EXISTS OR NOT
      const job = await this.jobService.getJobById(req.params.id);

      if (!job) {
        res.status(404).json({ msg: "Job not found!" });
        return;
      }

      //2- DELETE JOB OBJECT IN DB
      await this.jobService.deleteJob(job.id);

      res.status(200).json({
        msg: "Job deleted successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: "Internal server error" }] });
    }
  };

  getAll = async (req, res) => {
    try {
      const jobs = await this.jobService.getAllJobs();
      const jobsWithQualifications = jobs.reduce((acc, job) => {
        const existingJob = acc.find((j) => j.id === job.id);
        if (existingJob) {
          existingJob.qualifications.push(job.qualification);
        } else {
          acc.push({
            id: job.id,
            position: job.position,
            description: job.description,
            offer: job.offer,
            max_candidate_number: job.max_candidate_number,
            qualifications: job.qualification ? [job.qualification] : [],
          });
        }
        return acc;
      }, []);
      res.status(200).json({ jobs: jobsWithQualifications });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: "Internal server error" }] });
    }
  };
}

module.exports = JobController;
