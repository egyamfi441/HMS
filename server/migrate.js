const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./hms.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the HMS SQLite database for migration.');
});

const runMigrations = () => {
  const migrationsDir = path.join(__dirname, 'migrations');
  fs.readdir(migrationsDir, (err, files) => {
    if (err) {
      return console.error('Could not list the directory.', err);
    }

    files.sort().forEach(file => {
      if (path.extname(file) === '.sql') {
        const sqlScript = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        db.exec(sqlScript, (err) => {
          if (err) {
            console.error(`Error executing migration ${file}:`, err.message);
          } else {
            console.log(`Successfully executed migration ${file}.`);
          }
        });
      }
    });

    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed the database connection.');
    });
  });
};

runMigrations();
