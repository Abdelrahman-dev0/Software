/* The SearchRepository class has a single responsibility of handling the database interactions for the search functionality. (SRP) */
/* SearchRepository class depends on an abstraction (queryExecutor). */
/* The constructor takes a single parameter (queryExecutor). (DI) */

class SearchRepository {
  constructor(queryExecutor) {
    this.queryExecutor = queryExecutor;
  }

  async getUser(userId) {
    const user = await this.queryExecutor.executeQuery(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );
    return user[0];
  }

  async searchJobs(searchText) {
    const jobs = await this.queryExecutor.executeQuery(
      `SELECT j.*, GROUP_CONCAT(q.description) AS qualifications_description
        FROM jobs j 
        JOIN job_qualifications jq ON j.id = jq.job_id
        JOIN qualifications q ON jq.qualification_id = q.id
        WHERE j.position LIKE ?
        OR j.offer LIKE ?
        OR CAST(j.max_candidate_number AS CHAR) LIKE ?
        GROUP BY j.id`,
      [`%${searchText}%`, `%${searchText}%`, `%${searchText}%`]
    );
    return jobs;
  }

  async saveSearchHistory(userId, jobIds, searchText, searchTime) {
    const searchHistory = {
      user_id: userId,
      job_id: jobIds.join(","),
      search_text: searchText,
      search_time: searchTime,
    };
    await this.queryExecutor.executeQuery(
      "INSERT INTO user_search_history SET ?",
      searchHistory
    );
  }

  async getSearchHistory(userId) {
    const searchHistory = await this.queryExecutor.executeQuery(
      `SELECT search_text, search_time
        FROM user_search_history
        WHERE user_id = ?
        ORDER BY search_time DESC`,
      [userId]
    );
    return searchHistory;
  }
}

module.exports = SearchRepository;
