require('dotenv').config();
const express = require('express');
const customers = require('./routes/customers');

const app = express();
app.use(express.json());

app.use('/customers', customers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
