const { DbConnection } = require("./db");
const { MySqlQueryExecutor } = require("./mySqlQueryExecutor");
const { MySqlConnector } = require("./mySqlConnector");

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "employment-db",
  port: "3306",
};

const connector = new MySqlConnector(config);
const connection = connector.connect();
console.log("Database connection successful");

const queryExecutor = new MySqlQueryExecutor(connection);

const dbConnection = new DbConnection(connector, queryExecutor);

module.exports = dbConnection;
