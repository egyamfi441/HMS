const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PDFDocument = require('pdfkit');
const db = require('../db');

router.post('/checkout', async (req, res) => {
  const { amount, currency, source, description } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Hospital Services',
            },
            unit_amount: amount * 100, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/dashboard/payment-success',
      cancel_url: 'http://localhost:3000/dashboard/payment-cancel',
    });

    res.json({ id: session.id });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: 'An error occurred during checkout.' });
  }
});

router.get('/receipt/:id/pdf', (req, res) => {
    const { id } = req.params;

    // In a real app, you'd fetch transaction details from the database
    // For now, we'll use some mock data
    const transaction = {
        id: id,
        date: new Date().toLocaleDateString(),
        amount: '150.00',
        patient: 'Alice Smith',
        service: 'Annual Checkup'
    };

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=receipt-${id}.pdf`);

    doc.pipe(res);

    doc.fontSize(25).text('Hospital Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Transaction ID: ${transaction.id}`);
    doc.text(`Date: ${transaction.date}`);
    doc.text(`Patient: ${transaction.patient}`);
    doc.text(`Service: ${transaction.service}`);
    doc.moveDown();
    doc.fontSize(16).text(`Amount Paid: $${transaction.amount}`);

    doc.end();
});

module.exports = router;
