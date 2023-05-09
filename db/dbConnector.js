/* creating a base class with interface that can work with multiple types of databases  */
/* SOLID */
/* Liskov Substitution Principle (LSP) and the Interface Segregation Principle (ISP)
by defining an interface (DbConnector) that can be implemented by multiple concrete classes */
class DbConnector {
  connect() {
    throw new Error("connect method not implemented");
  }
}

module.exports = {
  DbConnector,
};
