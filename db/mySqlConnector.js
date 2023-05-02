const mysql = require("mysql");
const { DbConnector } = require("./dbConnector");

class MySqlConnector extends DbConnector {
  constructor(config) {
    super();
    this.config = config;
  }

  connect() {
    return mysql.createConnection(this.config);
  }
}

module.exports = { MySqlConnector };
