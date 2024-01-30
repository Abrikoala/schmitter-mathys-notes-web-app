import React from "react";

function ListeNotes({ notes, selectedNote, handleNoteClick, handleDeleteNote }) {
  return (
    <div>
      {notes !== null
        ? notes.map((note) => (
            <div
              key={note.id}
              className={`Note-container ${
                selectedNote && selectedNote.id === note.id ? "active" : ""
              }`}
            >
              <div onClick={() => handleNoteClick(note)} className="Note-link">
                {note.title}
                <button className="Button-delete-note" onClick={() => handleDeleteNote(note.id)}>
                  &#128465;
                </button>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default ListeNotes;
