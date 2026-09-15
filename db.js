const Database = require('better-sqlite3');
const db = new Database(process.env.DB_FILE || 'data.db');

// simple migration
db.prepare(`CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  notes TEXT,
  summary TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`).run();

module.exports = db;
