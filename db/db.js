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
