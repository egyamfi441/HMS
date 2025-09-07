const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all billing invoices
router.get('/', (req, res) => {
  const sql = "SELECT * FROM billing_invoices";
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

// GET a single billing invoice by id
router.get('/:id', (req, res) => {
  const sql = "SELECT * FROM billing_invoices WHERE id = ?";
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
      res.status(404).json({ message: "Invoice not found" });
    }
  });
});

// POST a new billing invoice
router.post('/', (req, res) => {
  const { patient_id, amount, status, due_date } = req.body;
  if (!patient_id || !amount || !status) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const sql = 'INSERT INTO billing_invoices (patient_id, amount, status, due_date) VALUES (?,?,?,?)';
  const params = [patient_id, amount, status, due_date];
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

// PUT (update) a billing invoice
router.put('/:id', (req, res) => {
    const { patient_id, amount, status, due_date } = req.body;
    const sql = `UPDATE billing_invoices set
                 patient_id = COALESCE(?,patient_id),
                 amount = COALESCE(?,amount),
                 status = COALESCE(?,status),
                 due_date = COALESCE(?,due_date)
                 WHERE id = ?`;
    const params = [patient_id, amount, status, due_date, req.params.id];
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

// DELETE a billing invoice
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM billing_invoices WHERE id = ?';
    db.run(sql, req.params.id, function(err, result) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "deleted", changes: this.changes });
    });
});

module.exports = router;
