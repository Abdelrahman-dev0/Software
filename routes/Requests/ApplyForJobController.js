class ApplyForJobController {
  constructor(userRequestRepository) {
    this.userRequestRepository = userRequestRepository;
  }

  async handleApplyForJob(req, res) {
    try {
      const userId = req.params.id;
      const jobId = req.body.job_id;

      // Check if user exists
      const user = await this.userRequestRepository.getUserById(userId);
      if (!user) {
        res.status(404).json({ msg: "User not found!" });
        return;
      }

      // Check if job exists and has available slots
      const job = await this.userRequestRepository.getJobById(jobId);
      if (!job || job.max_candidate_number <= 0) {
        res.status(404).json({
          msg: "Job not found or maximum number of candidates has been reached!",
        });
        return;
      }

      // Check if user has already applied for this job
      const existingRequest =
        await this.userRequestRepository.getUserRequestByUserAndJobId(
          userId,
          jobId
        );
      if (existingRequest) {
        res.status(400).json({ msg: "You have already applied for this job!" });
        return;
      }

      // Insert job request into user_requests table with 'pending' status and request time
      await this.userRequestRepository.createRequest(userId, jobId);

      // Update job max candidate number and update all pending requests to declined if max candidate number is reached
      await this.userRequestRepository.decrementMaxCandidateNumber(jobId);
      await this.userRequestRepository.updateAllPendingRequestsToDeclined(
        jobId
      );

      res.status(200).json({ msg: "Job request sent successfully!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errors: [{ msg: "Internal server error" }] });
    }
  }
}

module.exports = { ApplyForJobController };
