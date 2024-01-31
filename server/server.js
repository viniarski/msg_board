import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const PORT = "7070";
const app = express();

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
