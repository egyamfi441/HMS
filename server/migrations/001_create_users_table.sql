CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('Admin', 'Doctor', 'Nurse', 'Receptionist', 'Pharmacist', 'Patient')),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
