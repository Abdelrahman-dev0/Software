const { QueryExecutor } = require("../../db/queryExecutor");
const { DbConnection } = require("../../db/dbConnection");
const { QualificationsRepository } = require("./QualificationsRepository");

/* ==================================================================================================== */
/* 1- ( SRP ) QualificationsService is responsible for handling database queries related to qualifications */
/* 2- ( DIP ) QualificationsService class depends on an abstraction (QueryExecutor) 
rather than a concrete implementation of a database, which allows for use diffrent db as nedded */
/* ==================================================================================================== */

class QualificationsService {
  constructor(qualificationsRepository) {
    // dependency injection: the dbConnection instance is injected through the constructor,
    // rather than being created within the class
    //This allows the QualificationsService class to depend on an abstraction
    this.qualificationsRepository = qualificationsRepository;
  }

  async create(description) {
    return this.qualificationsRepository.create(description);
  }

  async update(id, description) {
    return this.qualificationsRepository.update(id, description);
  }

  async delete(id) {
    return this.qualificationsRepository.delete(id);
  }

  async getAll() {
    return this.qualificationsRepository.getAll();
  }

  async getById(id) {
    const qualification = await this.qualificationsRepository.getById(id);
    return qualification;
  }
}

module.exports = {
  QualificationsService,
};
