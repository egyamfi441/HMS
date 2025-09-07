const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all doctors
router.get('/', (req, res) => {
  const sql = "SELECT * FROM doctors";
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

// GET a single doctor by id
router.get('/:id', (req, res) => {
  const sql = "SELECT * FROM doctors WHERE id = ?";
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
      res.status(404).json({ message: "Doctor not found" });
    }
  });
});

// POST a new doctor
router.post('/', (req, res) => {
  const { name, specialization, phone, email, user_id } = req.body;
  if (!name) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const sql = 'INSERT INTO doctors (name, specialization, phone, email, user_id) VALUES (?,?,?,?,?)';
  const params = [name, specialization, phone, email, user_id];
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

// PUT (update) a doctor
router.put('/:id', (req, res) => {
    const { name, specialization, phone, email, user_id } = req.body;
    const sql = `UPDATE doctors set
                 name = COALESCE(?,name),
                 specialization = COALESCE(?,specialization),
                 phone = COALESCE(?,phone),
                 email = COALESCE(?,email),
                 user_id = COALESCE(?,user_id)
                 WHERE id = ?`;
    const params = [name, specialization, phone, email, user_id, req.params.id];
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

// DELETE a doctor
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM doctors WHERE id = ?';
    db.run(sql, req.params.id, function(err, result) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "deleted", changes: this.changes });
    });
});

module.exports = router;
