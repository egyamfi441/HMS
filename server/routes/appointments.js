const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all appointments
router.get('/', (req, res) => {
  const sql = "SELECT * FROM appointments";
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

// GET a single appointment by id
router.get('/:id', (req, res) => {
  const sql = "SELECT * FROM appointments WHERE id = ?";
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
      res.status(404).json({ message: "Appointment not found" });
    }
  });
});

// POST a new appointment
router.post('/', (req, res) => {
  const { patient_id, doctor_id, appointment_date, reason, status } = req.body;
  if (!patient_id || !doctor_id || !appointment_date || !status) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const sql = 'INSERT INTO appointments (patient_id, doctor_id, appointment_date, reason, status) VALUES (?,?,?,?,?)';
  const params = [patient_id, doctor_id, appointment_date, reason, status];
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

// PUT (update) an appointment
router.put('/:id', (req, res) => {
    const { patient_id, doctor_id, appointment_date, reason, status } = req.body;
    const sql = `UPDATE appointments set
                 patient_id = COALESCE(?,patient_id),
                 doctor_id = COALESCE(?,doctor_id),
                 appointment_date = COALESCE(?,appointment_date),
                 reason = COALESCE(?,reason),
                 status = COALESCE(?,status)
                 WHERE id = ?`;
    const params = [patient_id, doctor_id, appointment_date, reason, status, req.params.id];
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

// DELETE an appointment
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM appointments WHERE id = ?';
    db.run(sql, req.params.id, function(err, result) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "deleted", changes: this.changes });
    });
});

module.exports = router;
