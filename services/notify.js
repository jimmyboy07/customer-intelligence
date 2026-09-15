const axios = require('axios');

async function sendSlackNotification({ customer, summary }) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;

  const text = `New customer onboarded: *${customer.name}* (${customer.email})\nSummary: ${summary}`;
  try {
    await axios.post(url, { text });
  } catch (err) {
    console.error('Slack notify failed', err.message);
  }
}

module.exports = { sendSlackNotification };
