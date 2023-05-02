/* 1- The UserRepository class has a single responsibility of handling the database interactions for the User entity. ( SRP ) */
/* 2- UserRepository class depends on an abstraction ( queryExecutor ). */
/* 3- The constructor takes a single parameter ( queryExecutor ). ( DI ) */

class UserRepository {
  constructor(queryExecutor) {
    this.queryExecutor = queryExecutor;
  }

  async createUser(userData) {
    const result = await this.queryExecutor.executeQuery(
      "insert into users set ?",
      userData
    );
    const user = { ...userData, id: result.insertId };
    return user;
  }

  async checkEmailExists(email) {
    const result = await this.queryExecutor.executeQuery(
      "select * from users where email = ?",
      [email]
    );
    return result.length > 0;
  }

  async getUserById(id) {
    const result = await this.queryExecutor.executeQuery(
      "select * from users where id = ? AND type = 0",
      [id]
    );
    return result[0];
  }

  async updateUser(id, userObj) {
    await this.queryExecutor.executeQuery("update users set ? where id = ?", [
      userObj,
      id,
    ]);
  }

  async deleteUser(id) {
    await this.queryExecutor.executeQuery("delete from users where id = ?", [
      id,
    ]);
  }

  async getAllUsers() {
    const result = await this.queryExecutor.executeQuery(
      "select * from users where type = 0"
    );
    return result;
  }
}

module.exports = UserRepository;
