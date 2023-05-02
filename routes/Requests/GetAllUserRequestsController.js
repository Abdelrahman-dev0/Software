class GetAllUserRequestsController {
  constructor(userRequestRepository) {
    this.userRequestRepository = userRequestRepository;
  }

  async handleGetAllRequests(req, res) {
    try {
      const allRequests = await this.userRequestRepository.getAllRequests();

      if (allRequests.length === 0) {
        return res.status(404).json({ message: "No requests found" });
      }

      res
        .status(200)
        .json(
          allRequests.map((request) => ({ ...request, requestId: request.id }))
        );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = { GetAllUserRequestsController };
