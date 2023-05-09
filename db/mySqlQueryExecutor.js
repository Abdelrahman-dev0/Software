const { QueryExecutor } = require("./queryExecutor");

class MySqlQueryExecutor extends QueryExecutor {
  constructor(connection) {
    super();
    this.connection = connection;
  }

  /*  the LSP by substituting the abstract QueryExecutor class with a concrete MySqlQueryExecutor class */
  executeQuery(query, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = { MySqlQueryExecutor };
