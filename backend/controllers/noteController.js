const Note = require('../models/Note');

// @desc    Get all notes for a user
// @route   GET /api/notes
const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ updatedAt: -1 });
  res.json(notes);
};

// @desc    Get single note
// @route   GET /api/notes/:id
const getNoteById = async (req, res) => {
    const note = await Note.findById(req.params.id);
  
    if (note && note.user.toString() === req.user._id.toString()) {
      res.json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
};

// @desc    Create a note
// @route   POST /api/notes
const createNote = async (req, res) => {
  const { title, content, isPublic } = req.body;
  const note = new Note({
    user: req.user._id,
    title: title || 'Untitled Note',
    content: content || '',
    isPublic,
  });
  const createdNote = await note.save();
  res.status(201).json(createdNote);
};

// @desc    Update a note
// @route   PUT /api/notes/:id
const updateNote = async (req, res) => {
    const { title, content, isPublic } = req.body;
    const note = await Note.findById(req.params.id);
  
    if (note && note.user.toString() === req.user._id.toString()) {
      note.title = title || note.title;
      note.content = content || note.content;
      note.isPublic = isPublic !== undefined ? isPublic : note.isPublic;
  
      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
const deleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
  
    if (note && note.user.toString() === req.user._id.toString()) {
      await note.deleteOne();
      res.json({ message: 'Note removed' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
};

module.exports = { getNotes, getNoteById, createNote, updateNote, deleteNote };