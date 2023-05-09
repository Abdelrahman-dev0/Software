const mysql = require("mysql");
const { DbConnector } = require("./dbConnector");

/* 1- the LSP by substituting the abstract DbConnector class with a concrete MySqlConnector class */
/* 2- the Dependency Inversion Principle (DIP)
by depending on abstractions (DbConnector) rather than concrete implementations */
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
