const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const ai = require('../services/ai');
const notify = require('../services/notify');
const email = require('../services/email');

// Create a customer and run onboarding flow
router.post('/', async (req, res) => {
  try {
    const { name, email: customerEmail, notes } = req.body;
    if (!name || !customerEmail) return res.status(400).json({ error: 'name and email required' });

    // Create customer (Supabase)
    const customer = await Customer.createCustomer({ name, email: customerEmail, notes });

    // Generate AI summary
    const summary = await ai.generateSummary(customer);
    const updated = await Customer.updateSummary(customer.id, summary);

    // Notify internal team
    await notify.sendSlackNotification({ customer: updated, summary });

    // Send customer email
    await email.sendCustomerEmail({ to: customerEmail, name, summary });

    res.status(201).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error', details: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const c = await Customer.getCustomerById(req.params.id);
  if (!c) return res.status(404).json({ error: 'not_found' });
  res.json(c);
});

module.exports = router;
