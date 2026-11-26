const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../tasks.db');
const db = new Database(dbPath);

const createTableQuery = `
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
)`;

db.exec(createTableQuery);

console.log('✅ SQLite Database connected & tasks table ready!');

module.exports = db;
