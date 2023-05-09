/* Single Responsibility Principle (SRP) by separating the concerns of connecting to a database 
and executing queries.
Dependency Inversion Principle (DIP) by depending on abstractions (connector and queryExecutor)
rather than concrete implementations */

class DbConnection {
  constructor(connector, queryExecutor) {
    this.connector = connector;
    this.queryExecutor = queryExecutor;
    this.connection = this.connector.connect();
  }

  async executeQuery(sql, args) {
    return this.queryExecutor.executeQuery(sql, args);
  }
}

module.exports = {
  DbConnection,
};
