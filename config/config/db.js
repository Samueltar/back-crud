const Database = require('better-sqlite3');
const path = require('path')

const dbPath = path.join(-dirname, '../tasks.db');
const db = new Database(dbPath);

const createTableQuery = `
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
)`;

db.exec(createTableQuery);

console.log('Database initialized and tasks table created (if not exists)');

module.exports = db;