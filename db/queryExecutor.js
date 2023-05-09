/* the LSP and the ISP by defining an interface (QueryExecutor) 
that can be implemented by multiple concrete classes */
class QueryExecutor {
  executeQuery(query, params) {
    throw new Error("executeQuery method not implemented");
  }
}

module.exports = {
  QueryExecutor,
};
