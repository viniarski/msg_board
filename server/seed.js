import Database from "better-sqlite3";

const db = new Database("database.db");

db.exec(`CREATE TABLE IF NOT EXISTS board (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT,
    likes INTEGER DEFAULT 0
)`);

db.exec(`INSERT INTO board (username, message)
VALUES
('Jene Doe', 'If you want to know what Paroli means just hover over the logo!')
`);
