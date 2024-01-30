import React from "react";

function ModifierNote({
  selectedNote,
  newNoteTitle,
  newNoteContent,
  handleAddNote,
  handleUpdateNote,
  handleDeselectNote,
  setNewNoteTitle,
  setNewNoteContent,
}) {
  return (
    <div className="Ajout-De-Note">
      <h3>{selectedNote ? "Modifier" : "Ajouter"} une note</h3>
      <label htmlFor="title">Titre:</label>
      <input
        type="text"
        id="title"
        value={newNoteTitle}
        onChange={(e) => setNewNoteTitle(e.target.value)}
      />
      <label htmlFor="content">Contenu:</label>
      <textarea
        id="content"
        value={newNoteContent}
        onChange={(e) => setNewNoteContent(e.target.value)}
      />
      {selectedNote ? (
        <>
          <button className="Button-create-note" onClick={handleUpdateNote}>
            &#10003;
          </button>
        </>
      ) : (
        <button className="Button-create-note" onClick={handleAddNote}>
          {selectedNote ? "&#10003;" : "+"}
        </button>
      )}
    </div>
  );
}

export default ModifierNote;
