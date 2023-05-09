/* 1- This class has a single responsibility of handling user-related database operations. ( SRP ) */
/* 2- This class depends on an abstraction ( dbConnection object ). ( DIP ) */
/* 3- The constructor takes a single parameter ( dbConnection ). ( DI ) */

class UserRepository {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async create({ userData }) {
    try {
      const results = await this.dbConnection.executeQuery(
        "INSERT INTO users(name, email, password, phone, token) VALUES (?, ?, ?, ?, ?)",
        [
          // object destructuring {}
          userData.name,
          userData.email,
          userData.password,
          userData.phone,
          userData.token,
        ]
      );

      const userId = results.insertId;
      const createdUser = await this.findById({ id: userId });
      return createdUser;
    } catch (error) {
      console.error(`Failed to create user: ${error}`);
      throw new Error(`Failed to create user`);
    }
  }

  async findById({ id }) {
    const results = await this.dbConnection.executeQuery(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return results[0];
  }

  async findByEmail({ email }) {
    const results = await this.dbConnection.executeQuery(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return results[0];
  }

  async setStatus({ id, status }) {
    try {
      const results = await this.dbConnection.executeQuery(
        "UPDATE users SET status = ? WHERE id = ?",
        [status, id]
      );
      return results;
    } catch (error) {
      console.error(`Failed to update status for user ${id}: ${error}`);
      throw new Error(`Failed to update status for user ${id}`);
    }
  }

  async getToken({ id }) {
    const results = await this.dbConnection.executeQuery(
      "SELECT token FROM users WHERE id = ?",
      [id]
    );
    return results[0]?.token;
  }

  async findByToken({ token }) {
    const results = await this.dbConnection.executeQuery(
      "SELECT * FROM users WHERE token = ?",
      [token]
    );
    return results[0];
  }
}

module.exports = UserRepository;
