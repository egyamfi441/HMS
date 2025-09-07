-- Billing & Invoicing
CREATE TABLE IF NOT EXISTS billing_invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('paid', 'unpaid', 'pending')),
    due_date TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients (id)
);

-- Inpatient (IPD) Management
CREATE TABLE IF NOT EXISTS ipd_admissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    admission_date TEXT NOT NULL,
    discharge_date TEXT,
    bed_number TEXT,
    reason TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients (id)
);

-- Pharmacy Management
CREATE TABLE IF NOT EXISTS pharmacy_inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    expiry_date TEXT,
    supplier TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Laboratory Information System (LIS)
CREATE TABLE IF NOT EXISTS lab_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    test_name TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('ordered', 'completed', 'canceled')),
    results TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients (id),
    FOREIGN KEY (doctor_id) REFERENCES doctors (id)
);

-- HR Management
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    phone TEXT,
    email TEXT UNIQUE,
    salary REAL,
    hire_date TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
