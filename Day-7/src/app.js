const express = require("express");
const NotesModel = require("./models/note.model");
const app = express();
app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  const notes = await NotesModel.create({
    title,
    description,
  });

  res.status(201).json({
    notes,
    message: "note created",
  });
});

app.get("/notes", async (req, res) => {
  const notes = await NotesModel.find();
  res.status(200).json({
    notes,
    message: "note fetch",
  });
});
app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  res.status(204).json({
    message: "note detele",
  });
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;
  res.status(200).json({
    message: "note updated",
  });
});

module.exports = app;
