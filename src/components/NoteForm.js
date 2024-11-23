import React, { useState, useEffect } from "react";
import "./NoteForm.css";

function NoteForm({ onAddNote, onEditNote, editingNote, closeForm }) {
  // State for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Others");

  // Pre-fill the form fields when editing a note
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
      setCategory(editingNote.category);
    } else {
      resetForm();
    }
  }, [editingNote]);

  // Reset the form fields
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Others");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const noteData = {
      title,
      description,
      category,
    };

    if (editingNote) {
      // Call the edit note function if editing
      onEditNote({
        ...editingNote,
        ...noteData, // Update the note with new data
      });
    } else {
      // Call the add note function if adding a new note
      onAddNote(noteData);
    }

    resetForm();
    closeForm(); // Close the form after submission
  };

  return (
    <div className="form-popup">
      <form className="note-form" onSubmit={handleSubmit}>
        <h2>{editingNote ? "Edit Note" : "Add Note"}</h2>

        {/* Title Field */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description Field */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Category Dropdown */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Others">Others</option>
        </select>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit">
            {editingNote ? "Update Note" : "Add Note"}
          </button>
          <button type="button" onClick={closeForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;