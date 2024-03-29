import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const PORT = "4000";
const app = express();

app.use(express.json());
app.use(cors());

const db = new Database("database.db")

// root route
app.get("/", function (req, res) {
  res.json("Root route!");
});

// get
app.get("/board", (req, res) => {
  try {
    if (req.query.id) {
      let message = db
        .prepare(`SELECT * FROM board WHERE id = ?`)
        .all(req.query.id);
      res.status(200).json(message);
      return;
    }
    let messages = db.prepare(`SELECT * FROM board`).all();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post
app.post("/board", (req, res) => {
  try {
    const username = req.body.username;
    const message = req.body.message;

    const newMessage = db
      .prepare(`INSERT INTO board (username, message) VALUES (?, ?)`)
      .run(username, message);
    res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.delete('/board/:id', (req, res) => {
  try {
      const id = req.params.id
      const deletedMessage = db.prepare(`DELETE FROM board WHERE id = ? `).run(id)
      res.status(200).json({recordDeleted: deletedMessage})
  } catch (err) {
      res.status(500).json({error: err})
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});


// put - likes!
app.put('/board/like/:id', (req, res) => {
  try {
    const id = req.params.id;
    const updatedLikes = db
      .prepare(`UPDATE board SET likes = likes + 1 WHERE id = ?`)
      .run(id).changes;
    res.status(200).json({ likes: updatedLikes });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
