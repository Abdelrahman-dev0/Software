/* 1- The JobService class has a single responsibility of implementing business logic for jobs by interacting with jobRepository. ( SRP ) */
/* 2- JobService class depends on an abstraction ( dbConnection ). */
/* 3- The constructor takes a single parameter ( dbConnection ). ( DI ) */

class JobService {
  constructor(jobRepository) {
    this.jobRepository = jobRepository;
  }

  async createJob(job, qualifications) {
    const jobId = await this.jobRepository.createJob(job);

    const jobQualifications = qualifications.map((qualificationId) => {
      return [jobId, qualificationId];
    });

    await this.jobRepository.insertJobQualifications(jobQualifications);

    return jobId;
  }

  async updateJob(jobId, jobObj, qualifications) {
    await this.jobRepository.updateJob(jobId, jobObj);
    await this.jobRepository.deleteJobQualifications(jobId);

    const jobQualifications = qualifications.map((qualificationId) => {
      return [jobId, qualificationId];
    });

    await this.jobRepository.insertJobQualifications(jobQualifications);
  }

  async deleteJob(jobId) {
    await this.jobRepository.deleteJob(jobId);
  }

  async getJobById(jobId) {
    return await this.jobRepository.getJobById(jobId);
  }

  async getAllJobs() {
    return await this.jobRepository.getAllJobs();
  }
}

module.exports = JobService;
