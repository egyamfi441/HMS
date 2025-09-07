const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
require('dotenv').config();
const db = require('./db'); // Import the db connection

const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const billingRoutes = require('./routes/billing');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use modular routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/billing', billingRoutes);

const paymentRoutes = require('./routes/payments');
app.use('/api/payments', paymentRoutes);

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
      process.env.JWT_SECRET || 'your-super-secret-key-that-should-be-long-and-random',
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
