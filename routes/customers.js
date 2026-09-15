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

    const customer = Customer.createCustomer({ name, email: customerEmail, notes });

    // Generate AI summary
    const summary = await ai.generateSummary(customer);
    Customer.updateSummary(customer.id, summary);

    // Notify internal team
    await notify.sendSlackNotification({ customer, summary });

    // Send customer email
    await email.sendCustomerEmail({ to: customerEmail, name, summary });

    const updated = Customer.getCustomerById(customer.id);
    res.status(201).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

router.get('/:id', (req, res) => {
  const c = Customer.getCustomerById(req.params.id);
  if (!c) return res.status(404).json({ error: 'not_found' });
  res.json(c);
});

module.exports = router;
