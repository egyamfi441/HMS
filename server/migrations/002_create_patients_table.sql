CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    gender TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    email TEXT UNIQUE,
    patient_type TEXT NOT NULL CHECK(patient_type IN ('inpatient', 'outpatient')),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
