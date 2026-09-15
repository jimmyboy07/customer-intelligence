const db = require('../db');

function createCustomer({ name, email, notes }) {
  const stmt = db.prepare('INSERT INTO customers (name, email, notes) VALUES (?,?,?)');
  const info = stmt.run(name, email, notes);
  return getCustomerById(info.lastInsertRowid);
}

function getCustomerById(id) {
  const stmt = db.prepare('SELECT * FROM customers WHERE id = ?');
  return stmt.get(id);
}

function updateSummary(id, summary) {
  const stmt = db.prepare('UPDATE customers SET summary = ? WHERE id = ?');
  stmt.run(summary, id);
  return getCustomerById(id);
}

module.exports = { createCustomer, getCustomerById, updateSummary };
