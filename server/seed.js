import Database from "better-sqlite3";

const db = new Database("database.db");

db.exec(`CREATE TABLE IF NOT EXISTS board (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT
)`);

db.exec(`INSERT INTO board (username, message)
VALUES
('Test_User', 'Test_Message')
`);
