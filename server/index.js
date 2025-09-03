const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('./db'); // Import the db connection

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Patient Routes
app.get('/api/patients', (req, res) => {
  const sql = "SELECT * FROM patients";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows
    });
  });
});

app.get('/api/patients/:id', (req, res) => {
  const sql = "SELECT * FROM patients WHERE id = ?";
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json({
        message: "success",
        data: row
      });
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  });
});

app.post('/api/patients', (req, res) => {
  const { name, date_of_birth, gender, address, phone, email, patient_type } = req.body;
  if (!name || !date_of_birth || !gender || !patient_type) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const sql = 'INSERT INTO patients (name, date_of_birth, gender, address, phone, email, patient_type) VALUES (?,?,?,?,?,?,?)';
  const params = [name, date_of_birth, gender, address, phone, email, patient_type];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      message: "success",
      data: { id: this.lastID, ...req.body }
    });
  });
});

app.put('/api/patients/:id', (req, res) => {
  const { name, date_of_birth, gender, address, phone, email, patient_type } = req.body;
  const sql = `UPDATE patients set
               name = COALESCE(?,name),
               date_of_birth = COALESCE(?,date_of_birth),
               gender = COALESCE(?,gender),
               address = COALESCE(?,address),
               phone = COALESCE(?,phone),
               email = COALESCE(?,email),
               patient_type = COALESCE(?,patient_type)
               WHERE id = ?`;
  const params = [name, date_of_birth, gender, address, phone, email, patient_type, req.params.id];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: req.body,
      changes: this.changes
    });
  });
});

app.delete('/api/patients/:id', (req, res) => {
  const sql = 'DELETE FROM patients WHERE id = ?';
  db.run(sql, req.params.id, function(err, result) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
});


// Register a new user
app.post('/api/register', async (req, res) => {
  const { username, password, email, role } = req.body;

  if (!username || !password || !email || !role) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const sql = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
  db.run(sql, [username, hashedPassword, email, role], function(err) {
    if (err) {
      return res.status(400).json({ msg: 'Failed to register user', error: err.message });
    }
    res.status(201).json({ msg: 'User registered successfully', userId: this.lastID });
  });
});

// Login a user
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ msg: 'Server error', error: err.message });
    }
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      'your-super-secret-key-that-should-be-long-and-random',
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  });
});


app.get('/', (req, res) => {
  res.send('Hello from Hospital Management System!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});
