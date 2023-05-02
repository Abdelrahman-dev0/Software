// ================ INIYIALIZE EXPRESS APP ================ //
const express = require("express");
const app = express();

// ================ GLOBAL MIDDLEWARE ================ //
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED
app.use(express.static("public"));
const cors = require("cors");
app.use(cors()); // ALLOW HTTP REQUESTS LOCAL HOSTS

// ================ REQUIRED MODULE ================ //
const auth = require("./routes/Auth/auth");
const qualifications = require("./routes/Qualifications/qualifications");
const requests = require("./routes/Requests/requests");
const applicant = require("./routes/Applicants/Applicants");
const jobs = require("./routes/Jobs/Jobs");
const search = require("./routes/Search/Search");

// ================ RUN THE APP ================ //
app.listen(4000, "localhost", () => {
  console.log("Server is Running on Port 4000");
});

// ================ API ROUTES [ END POINTS ] ================ //
app.use("/auth", auth);
app.use("/qualifications", qualifications);
app.use("/requests", requests);
app.use("/applicants", applicant);
app.use("/jobs", jobs);
app.use("/search", search);
