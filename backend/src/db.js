// backend/src/db.js
const path = require('path');
const Database = require('better-sqlite3');

const DB_FILE = process.env.DB_FILE || path.join(__dirname, '..', 'data.db');
const db = new Database(DB_FILE);

const initSql = `
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  variant TEXT,
  payload TEXT,
  validation_errors TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;
db.exec(initSql);

function insertSubmission({ variant = 'unknown', payload = {}, validation_errors = null }) {
  const stmt = db.prepare(
    'INSERT INTO submissions (variant, payload, validation_errors) VALUES (?, ?, ?)'
  );
  const info = stmt.run(variant, JSON.stringify(payload), JSON.stringify(validation_errors));
  return info.lastInsertRowid;
}

function getMetrics() {
  const rows = db.prepare(`
    SELECT
      variant,
      SUM(CASE WHEN validation_errors IS NULL OR validation_errors = 'null' THEN 1 ELSE 0 END) as success_count,
      SUM(CASE WHEN validation_errors IS NOT NULL AND validation_errors != 'null' THEN 1 ELSE 0 END) as error_count,
      COUNT(*) as total
    FROM submissions
    GROUP BY variant
  `).all();
  return rows;
}

module.exports = { insertSubmission, getMetrics };
