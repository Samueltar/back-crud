const Database = require('better-sqlite3');
const path = require('path')

const dbPath = path.join(__dirname, '../tasks.db');
const db = new Database(dbPath);

const createTableQuery = `
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
)`;

db.exec(createTableQuery);

console.log('Database initialized and tasks table created (if not exists)');

const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)`;

db.exec(createUsersTableQuery);

module.exports = db;