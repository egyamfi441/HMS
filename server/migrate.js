const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./hms.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the HMS SQLite database for migration.');
});

const runMigration = () => {
  try {
    console.log('Reading migration file...');
    const sqlScript = fs.readFileSync('./migrations/001_create_users_table.sql', 'utf8');

    console.log('Executing migration script...');
    db.exec(sqlScript, (err) => {
      if (err) {
        console.error('Error during migration:', err.message);
      } else {
        console.log('Migration completed successfully.');
      }
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Closed the database connection.');
      });
    });
  } catch (err) {
    console.error('Error reading migration file:', err);
    db.close();
  }
};

runMigration();
