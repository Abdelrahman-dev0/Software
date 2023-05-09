# Software

Software is a web application that helps applicants find jobs and allows admins to manage job postings, qualifications, and applicants. This project is built with Node.js, Express.js, and MySQL database. It follows SOLID principles, clean code rules, and uses dependency injection.

## Features

### Admin User

- Login/Logout
- Manage jobs (Create, Read, Update, Delete)
- Manage qualifications per job (Create, Read, Update, Delete)
- Manage applicants (Create, Read, Update, Delete)
- Accept or decline requests by the applicant (Create, Read, Update, Delete)
- Show the history of applicant requests for all jobs

### Applicant User

- Login/Logout
- Send a request to the admin with the required job
- Show a history of job searches related to his account only

## Technologies

- Backend: Node.js 🚀 and Express.js 🌐✨
- Database: MySQL 🐬

## Installation

1. Clone or download the repository
2. Install dependencies using `npm install`
3. Set up the MySQL database in the `dbConnection.js`
4. Start the server with `npm start`

## API Endpoints

### Authentication

- `POST /api/auth/login`: logs the user in and returns a token
- `POST /api/auth/register`: registers a new user

### Jobs

- `GET /api/jobs/all`: gets all jobs
- `POST /api/jobs`: creates a new job
- `GET /api/jobs/job/:id`: gets a job by ID
- `PUT /api/jobs/:id`: updates a job by ID
- `DELETE /api/jobs/:id`: deletes a job by ID

### Qualifications

- `GET /api/qualifications/all`: gets all qualifications
- `POST /api/qualifications`: creates a new qualification
- `GET /api/qualifications/:id`: gets a qualification by ID
- `PUT /api/qualifications/qualification/:id`: updates a qualification by ID
- `DELETE /api/qualifications/:id`: deletes a qualification by ID

### Applicants

- `GET /api/applicants/all`: gets all applicants
- `POST /api/applicants`: creates a new applicant
- `GET /api/applicants/applicant/:id`: gets an applicant by ID
- `PUT /api/applicants/:id`: updates an applicant by ID
- `DELETE /api/applicants/:id`: deletes an applicant by ID

### Requests

- `GET /api/requests/all`: gets all requests
- `POST /api/requests`: creates a new request
- `GET /api/requests/request/:id`: gets a request by ID
- `PUT /api/requests/:id`: updates a request by ID
- `DELETE /api/requests/:id`: deletes a request by ID

### Search

- `GET /api/search//:id?position=<position>&offer=<offer>&qualification=<qualification>`: searches for jobs based on the given parameters. Returns an array of job objects that match the search criteria.

### Search History

- `GET /api/search/history/:id`: gets the search history of the currently logged in applicant. Returns an array of search history objects that contain the search parameters and the timestamp of the search. 

© 2023 Software. All rights reserved.
