# Hospital Management System (HMS)

A hospital management system built with Node.js and a SQL database.
Built by Emmanuel Gyamfi as a self-directed project.

## Status
Back end and database: working.
Front end: partially built.

## What works
- Database schema and migrations (see /server/migrations)
- Seed data for testing (server/seed.js)
- Back-end routes for [patients, appointments, staff: keep only what works]

## Still in progress
- [e.g. parts of the front end, login, role-based access]

## Tech stack
Node.js, Express, [your database, e.g. MySQL / PostgreSQL / SQLite], SQL

## Database design
Tables: [patients, appointments, staff, ...]
- Each table has a primary key.
- Foreign keys link [appointments to patients and staff].
- [Describe access levels for staff roles, only if implemented.]

## How to run locally
1. Clone the repo and open the /server folder
2. Run: npm install
3. Create a .env file with your database details (not included in the repo)
4. Run: node migrate.js
5. Run: node seed.js
6. Run: node index.js

## Security notes
- Secrets are stored in a .env file and are not committed.
- [Add anything real, e.g. password hashing, input validation.]
