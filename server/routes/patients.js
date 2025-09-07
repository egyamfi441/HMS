const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all patients
router.get('/', (req, res) => {
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

// GET a single patient by id
router.get('/:id', (req, res) => {
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

// POST a new patient
router.post('/', (req, res) => {
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

// PUT (update) a patient
router.put('/:id', (req, res) => {
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

// DELETE a patient
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM patients WHERE id = ?';
  db.run(sql, req.params.id, function(err, result) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
});

module.exports = router;
