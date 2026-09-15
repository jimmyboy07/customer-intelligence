const axios = require('axios');

async function generateSummary(customer) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return 'AI key not configured; summary unavailable.';

  const prompt = `Write a concise (2-3 sentence) onboarding summary for this customer:\nName: ${customer.name}\nEmail: ${customer.email}\nNotes: ${customer.notes || ''}`;

  const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are an assistant that writes short onboarding summaries.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 150,
    temperature: 0.2
  }, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });

  const text = resp.data?.choices?.[0]?.message?.content?.trim();
  return text || '';
}

module.exports = { generateSummary };
