const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./hms.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the HMS SQLite database for seeding.');
});

const seedData = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  db.serialize(() => {
    console.log('Starting to seed data...');

    // Seed Users
    db.run(`INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`, ['admin', hashedPassword, 'admin@hms.com', 'Admin']);
    db.run(`INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`, ['johndoe', hashedPassword, 'johndoe@hms.com', 'Doctor']);
    db.run(`INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`, ['alicesmith', hashedPassword, 'alicesmith@hms.com', 'Patient']);
    console.log('Users seeded.');

    // Seed Patients
    db.run(`INSERT INTO patients (name, date_of_birth, gender, address, phone, email, patient_type) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['Alice Smith', '1990-05-15', 'Female', '123 Main St, Anytown', '555-1234', 'alice@example.com', 'outpatient']);
    db.run(`INSERT INTO patients (name, date_of_birth, gender, address, phone, email, patient_type) VALUES (?, ?, ?, ?, ?, ?, ?)`, ['Bob Johnson', '1985-08-20', 'Male', '456 Oak Ave, Anytown', '555-5678', 'bob@example.com', 'inpatient']);
    console.log('Patients seeded.');

    // Seed Doctors
    db.run(`INSERT INTO doctors (name, specialization, phone, email, user_id) VALUES (?, ?, ?, ?, ?)`, ['Dr. John Doe', 'Cardiology', '555-1111', 'johndoe@hms.com', 2]);
    db.run(`INSERT INTO doctors (name, specialization, phone, email) VALUES (?, ?, ?, ?)`, ['Dr. Jane Smith', 'Neurology', '555-2222', 'janesmith@hms.com']);
    console.log('Doctors seeded.');

    // Seed Appointments
    db.run(`INSERT INTO appointments (patient_id, doctor_id, appointment_date, reason, status) VALUES (?, ?, ?, ?, ?)`, [1, 1, '2024-10-26 10:00:00', 'Annual Checkup', 'scheduled']);
    db.run(`INSERT INTO appointments (patient_id, doctor_id, appointment_date, reason, status) VALUES (?, ?, ?, ?, ?)`, [2, 2, '2024-10-27 14:00:00', 'Headache', 'scheduled']);
    console.log('Appointments seeded.');

    // Seed Billing Invoices
    db.run(`INSERT INTO billing_invoices (patient_id, amount, status, due_date) VALUES (?, ?, ?, ?)`, [1, 150.00, 'unpaid', '2024-11-10']);
    db.run(`INSERT INTO billing_invoices (patient_id, amount, status, due_date) VALUES (?, ?, ?, ?)`, [2, 500.00, 'paid', '2024-10-20']);
    console.log('Billing invoices seeded.');

    // Seed Employees
    db.run(`INSERT INTO employees (user_id, name, role, phone, email, salary, hire_date) VALUES (?, ?, ?, ?, ?, ?, ?)`, [2, 'Dr. John Doe', 'Doctor', '555-1111', 'johndoe@hms.com', 120000, '2022-01-15']);
    db.run(`INSERT INTO employees (name, role, phone, email, salary, hire_date) VALUES (?, ?, ?, ?, ?, ?)`, ['Nurse Carol', 'Nurse', '555-3333', 'carol@hms.com', 60000, '2023-03-01'], (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Employees seeded.');
        console.log('Data seeding completed.');

        // Close the database connection here
        db.close((err) => {
          if (err) {
            console.error(err.message);
          }
          console.log('Closed the database connection after seeding.');
        });
    });
  });
};

seedData();
