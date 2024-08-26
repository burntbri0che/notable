const Note = require("../models/note");

module.exports.getAll = async (req, res) => {
    userID = req.user.id;
    try {
        const notes = await Note.find({ user: userID });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch notes" });
    }
};

module.exports.create = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({
            title,
            content,
            user: req.user.id,
        });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: "Failed to create note" });
    }
};

module.exports.edit = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        if (req.user.id !== note.user.toString()) {
            return res.status(403).json({ error: "User not authorized" });
        }

        note.title = title || note.title;
        note.content = content || note.content;

        await note.save();
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ error: "Failed to update note" });
    }
};

module.exports.delete = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "User not authorized" });
        }

        await note.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete note" });
    }
};
