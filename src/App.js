import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]); // State for notes
  const [isFormOpen, setIsFormOpen] = useState(false); // State for form visibility
  const [editingNote, setEditingNote] = useState(null); // State for edit mode
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch notes on component mount and whenever searchQuery changes
  useEffect(() => {
    fetchNotes();
  });

  // Fetch notes from the server
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/notes", {
        params: searchQuery ? { search: searchQuery } : {},
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a new note
  const handleAddNote = async (note) => {
    try {
      const response = await axios.post("http://localhost:5000/notes", note);
      setNotes([response.data, ...notes]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Edit an existing note
  const handleEditNote = async (updatedNote) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/notes/${updatedNote._id}`,
        updatedNote
      );
      setNotes(
        notes.map((note) =>
          note._id === updatedNote._id ? response.data : note
        )
      );
      setIsFormOpen(false);
      setEditingNote(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Delete a note
  const handleDeleteNote = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${_id}`);
      setNotes(notes.filter((note) => note._id !== _id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Open the form for adding a new note
  const openAddForm = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };

  // Open the form for editing an existing note
  const openEditForm = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  // Handle search bar input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="App">
      <h1>Personal Notes Manager</h1>
  
      {/* Search Bar and Add Note Button */}
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search by title or category"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <button className="add-note-button" onClick={openAddForm}>
          +
        </button>
      </div>
  
      {/* Conditional Rendering for Notes or 'No Results' Message */}
      {notes.length > 0 ? (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note._id} className="note-card">
              <h2>{note.title}</h2>
              <p className="note-description">{note.description}</p>
              <p>
                <strong>Category:</strong> {note.category}
              </p>
              <div className="note-actions">
                <button onClick={() => openEditForm(note)}>Edit</button>
                <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results-message">
          No results are matching your search.
        </div>
      )}
  
      {/* Note Form */}
      {isFormOpen && (
        <NoteForm
          onAddNote={handleAddNote}
          onEditNote={handleEditNote}
          editingNote={editingNote}
          closeForm={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;