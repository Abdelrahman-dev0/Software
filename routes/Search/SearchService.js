/* The SearchService class has a single responsibility of handling the business logic for the search functionality. (SRP) /
/ SearchService class depends on abstractions (userRepository and searchRepository). /
/ The constructor takes two parameters (userRepository and searchRepository). (DI) */

class SearchService {
  constructor(userRepository, searchRepository) {
    this.userRepository = userRepository;
    this.searchRepository = searchRepository;
  }

  async getUser(userId) {
    const user = await this.userRepository.getUserById(userId);
    return user;
  }

  async searchJobs(searchText) {
    const jobs = await this.searchRepository.searchJobs(searchText);
    return jobs;
  }

  async saveSearchHistory(userId, jobIds, searchText, searchTime) {
    await this.searchRepository.saveSearchHistory(
      userId,
      jobIds,
      searchText,
      searchTime
    );
  }

  async getSearchHistory(userId) {
    const searchHistory = await this.searchRepository.getSearchHistory(userId);
    const formattedSearchHistory = searchHistory.map((history) => ({
      search_text: history.search_text,
      search_time: formatDate(history.search_time),
    }));
    return formattedSearchHistory;
  }
}

module.exports = SearchService;
