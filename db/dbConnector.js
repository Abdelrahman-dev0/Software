/* creating a base class with interface that can work with multiple types of databases  */
class DbConnector {
  connect() {
    throw new Error("connect method not implemented");
  }
}

module.exports = {
  DbConnector,
};
