class UpdateUserRequestController {
  constructor(userRequestRepository) {
    this.userRequestRepository = userRequestRepository;
  }

  async handleRequestUpdate(req, res) {
    try {
      const requestId = req.params.id;
      const userRequest = await this.userRequestRepository.getRequestById(
        requestId
      );

      if (!userRequest) {
        res.status(404).json({ msg: "User request not found!" });
        return;
      }

      if (req.body.status === "Accepted" || req.body.status === "Declined") {
        if (req.body.status === userRequest.status) {
          res.status(400).json({
            msg: "User request status is already " + req.body.status + "!",
          });
          return;
        }

        if (req.body.status === "Accepted") {
          const job = await this.userRequestRepository.getJobById(
            userRequest.job_id
          );
          if (job && job.max_candidate_number === 0) {
            res.status(400).json({
              msg: "Maximum number of candidates has already been reached for this job. Cannot accept more requests!",
            });
            return;
          }
        }

        await this.userRequestRepository.updateStatus(
          requestId,
          req.body.status
        );

        if (req.body.status === "Accepted") {
          const job = await this.userRequestRepository.getJobById(
            userRequest.job_id
          );
          if (job && job.max_candidate_number > 0) {
            await this.userRequestRepository.decrementMaxCandidateNumber(
              job.id
            );

            const updatedJob = await this.userRequestRepository.getJobById(
              job.id
            );
            if (updatedJob && updatedJob.max_candidate_number === 0) {
              await this.userRequestRepository.updateAllPendingRequestsToDeclined(
                job.id
              );
              res.status(200).json({
                msg: "Maximum number of candidates has been reached for this job. All pending requests have been declined.",
              });
              return;
            }
          } else {
            await this.userRequestRepository.updateAllPendingRequestsToDeclined(
              userRequest.job_id
            );
            res.status(200).json({
              msg: "Maximum number of candidates has been reached for this job. All pending requests have been declined.",
            });
            return;
          }
        }

        res.status(200).json({
          msg: "User request status updated successfully!",
        });
      } else {
        res.status(400).json({ msg: "Invalid status value!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: [{ msg: "Internal server error" }] });
    }
  }
}

module.exports = { UpdateUserRequestController };
