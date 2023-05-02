class QualificationsRepository {
  //class is responsible for handling database queries related to qualifications
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async create(description) {
    const result = await this.dbConnection.executeQuery(
      "INSERT INTO qualifications SET ?",
      description
    );
    return result.insertId;
  }

  async update(id, description) {
    await this.dbConnection.executeQuery("UPDATE qualifications SET ? WHERE id= ?", [
      description,
      id,
    ]);
  }

  async delete(id) {
    await this.dbConnection.executeQuery(
      "DELETE FROM qualifications WHERE id = ?",
      [id]
    );
  }

  async getAll() {
    const qualifications = await this.dbConnection.executeQuery(
      "SELECT * FROM qualifications"
    );
    return qualifications;
  }

  async getById(id) {
    const qualification = await this.dbConnection.executeQuery(
      "SELECT * FROM qualifications where id = ?",
      id
    );
    return qualification[0];
  }
}

module.exports = {
  QualificationsRepository,
};
