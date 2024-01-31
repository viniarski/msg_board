import Database from "better-sqlite3";

const db = new Database("database.db");

db.exec(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT
)`);

db.exec(`
INSERT into messages (username, message)
VALUES
('Test_User', 'Test_Message')
`);
