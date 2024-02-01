import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const PORT = "7070";
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

app.post("/messages", (req, res) => {
  try {
  const username = req.body.username;
  const message = req.body.message;

  const newMessage = db.prepare(`INSERT INTO messages (username, message) VALUES (?, ?)`).run(username, message)
  res.status(200).json(newMessage)
  } catch (err) {
    res.status(500).json({error : err})
  }
});
