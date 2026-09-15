# Customer Intelligence — Onboarding MVP

This is a minimal Node.js + Express app that accepts customer signups, generates an AI summary, notifies the internal team via Slack, and emails the customer.

Quick start

1. Copy .env.example to .env and fill values.
2. npm install
3. npm start

API

- POST /customers
  - body: { name, email, notes }
  - returns: created customer record including AI `summary`

- GET /customers/:id

Environment variables (.env)

- OPENAI_API_KEY - OpenAI API key (or compatible)
- SLACK_WEBHOOK_URL - Slack incoming webhook URL (optional)
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS - for sending customer emails (optional)
- EMAIL_FROM - From address for outgoing emails

Notes

- This is a simple MVP. For production, add authentication, input validation, retry logic, background jobs for AI/email/notifications, and use a managed DB.
