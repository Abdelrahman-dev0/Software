/* 1- The JobRepository class has a single responsibility of interacting with the database to perform CRUD operations on the jobs. ( SRP ) */
/* 2- JobRepository class depends on an abstraction ( dbConnection ). */
/* 3- The constructor takes a single parameter ( dbConnection ). ( DI ) */

class JobRepository {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async createJob(job) {
    const result = await this.dbConnection.executeQuery(
      "INSERT INTO jobs SET ?",
      job
    );
    return result.insertId;
  }

  async updateJob(jobId, jobObj) {
    await this.dbConnection.executeQuery("UPDATE jobs SET ? WHERE id=?", [
      jobObj,
      jobId,
    ]);
  }

  async deleteJob(jobId) {
    await this.dbConnection.executeQuery("DELETE FROM jobs WHERE id=?", jobId);
  }

  async getJobById(jobId) {
    const result = await this.dbConnection.executeQuery(
      "SELECT * FROM jobs WHERE id=?",
      jobId
    );
    return result[0];
  }

  async getAllJobs() {
    const result = await this.dbConnection.executeQuery(
      "SELECT j.*, q.description AS qualification FROM jobs j LEFT JOIN job_qualifications jq ON j.id = jq.job_id LEFT JOIN qualifications q ON jq.qualification_id = q.id"
    );
    return result;
  }

  async insertJobQualifications(jobQualifications) {
    await this.dbConnection.executeQuery(
      "INSERT INTO job_qualifications (job_id, qualification_id) VALUES ?",
      [jobQualifications]
    );
  }

  async deleteJobQualifications(jobId) {
    await this.dbConnection.executeQuery(
      "DELETE FROM job_qualifications WHERE job_id=?",
      jobId
    );
  }
}

module.exports = JobRepository;
