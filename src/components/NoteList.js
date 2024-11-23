import React from "react";

function NoteList({ notes, onEdit, onDelete }) {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note._id} className="note-item">
          <h2>{note.title}</h2>
          <p>{note.description}</p>
          <p><strong>Category:</strong> {note.category}</p>
          <div className="note-actions">
            <button onClick={() => onEdit(note)}>Edit</button>
            <button onClick={() => onDelete(note._id)}>Delete</button> {/* Pass _id */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;