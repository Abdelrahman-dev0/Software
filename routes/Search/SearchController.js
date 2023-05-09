/* The SearchController class has a single responsibility of handling the search requests and responses. (SRP) /
/ SearchController class depends on an abstraction (searchService). /
/ The constructor takes a single parameter (searchService). (DI) */
const { formatDate } = require("../../Utils/utils");

class SearchController {
  constructor(searchService) {
    this.searchService = searchService;
  }

  async search(req, res) {
    try {
      const userId = req.params.id;
      const searchText = req.query.search;
      // 1- CHECK IF USER EXISTS OR NOT
      const user = await this.searchService.getUser(userId);

      if (!user) {
        res.status(404).json({ msg: "User not found !" });
        return;
      }

      // 2- SEARCH FOR JOBS
      const jobs = await this.searchService.searchJobs(searchText);

      // 3- SAVE SEARCH HISTORY
      if (searchText && jobs.length > 0) {
        const jobIds = jobs.map((job) => job.id);
        const currentTime = new Date();
        await this.searchService.saveSearchHistory(
          userId,
          jobIds,
          searchText,
          currentTime
        );
      }

      if (jobs.length === 0) {
        res.status(404).json({ msg: "No search results found" });
      } else {
        // Modify the jobs array to remove the qualifications_description field and add the qualifications field as an array of individual descriptions
        const modifiedJobs = jobs.map((job) => {
          const { qualifications_description, ...rest } = job;
          const qualifications = qualifications_description.split(",");
          return { ...rest, qualifications };
        });
        res.status(200).json({
          jobs: modifiedJobs,
          search: searchText,
          msg: "Search Completed Successfully !",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: [{ msg: "Internal server error" }] });
    }
  }
}

module.exports = SearchController;
