class UserRequestRepository {
  constructor(queryExecutor) {
    this.queryExecutor = queryExecutor;
  }

  async getUserById(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const params = [id];
    const result = await this.queryExecutor.executeQuery(query, params);
    return result[0];
  }

  async getUserRequestByUserAndJobId(userId, jobId) {
    const query = `SELECT * FROM user_requests WHERE user_id = ? AND job_id = ?`;
    const params = [userId, jobId];
    const result = await this.queryExecutor.executeQuery(query, params);
    return result[0];
  }

  async createRequest(userId, jobId) {
    const query = `INSERT INTO user_requests (user_id, job_id, status, requested_time) VALUES (?, ?, ?, NOW())`;
    const params = [userId, jobId, "pending"];
    await this.queryExecutor.executeQuery(query, params);
  }

  async updateStatus(id, status) {
    const query = `UPDATE user_requests SET status = ? WHERE id = ?`;
    const params = [status, id];
    await this.queryExecutor.executeQuery(query, params);
  }

  async updateAllPendingRequestsToDeclined(jobId) {
    const job = await this.getJobById(jobId);
    if (job.max_candidate_number === 0) {
      const query = `UPDATE user_requests SET status = 'Declined' WHERE job_id = ? AND status = 'Pending'`;
      const params = [jobId];
      await this.queryExecutor.executeQuery(query, params);
    }
  }

  async decrementMaxCandidateNumber(jobId) {
    const query = `UPDATE jobs SET max_candidate_number = max_candidate_number - 1 WHERE id = ?`;
    const params = [jobId];
    await this.queryExecutor.executeQuery(query, params);
  }

  async getAllRequests() {
    const query = `SELECT * FROM user_requests`;
    const result = await this.queryExecutor.executeQuery(query);
    return result;
  }

  async getJobById(jobId) {
    const query = `SELECT * FROM jobs WHERE id = ?`;
    const params = [jobId];
    const result = await this.queryExecutor.executeQuery(query, params);
    return result[0];
  }

  async getRequestById(id) {
    const query = `SELECT * FROM user_requests WHERE id = ?`;
    const params = [id];
    const result = await this.queryExecutor.executeQuery(query, params);
    return result[0];
  }
}

module.exports = { UserRequestRepository };
