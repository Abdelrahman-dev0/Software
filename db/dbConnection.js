const { DbConnection } = require("./db");
const { MySqlQueryExecutor } = require("./mySqlQueryExecutor");
const { MySqlConnector } = require("./mySqlConnector");

/* creates an instance of a DbConnection
Open-Closed Principle (OCP) by allowing new types of database connectors
and query executors to be added without modifying existing code */
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
