// NoteContainer.js
import { useEffect, useState, useRef } from "react";
import ListeNotes from "./ListeNotes";
import ModifierNote from "./Modifier-Note";

function NoteContainer() {
  const [notes, setNotes] = useState(null);
  const [error, setError] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  const sideRef = useRef(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sideRef.current && !sideRef.current.contains(event.target)) {
        handleDeselectNote();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  async function fetchNotes() {
    try {
      const response = await fetch("http://localhost:4000/notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("An error occurred while fetching notes.");
    }
  }

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setNewNoteTitle(note.title);
    setNewNoteContent(note.content);
  };

  const handleUpdateNote = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/notes/${selectedNote.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newNoteTitle,
            content: newNoteContent,
          }),
        }
      );

      if (response.ok) {
        fetchNotes();
      } else {
        console.error("Error updating note:", response.statusText);
        setError("An error occurred while updating the note.");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      setError("An error occurred while updating the note.");
    }
  };

  const handleAddNote = async () => {
    try {
      const response = await fetch("http://localhost:4000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newNoteTitle,
          content: newNoteContent,
        }),
      });

      if (response.ok) {
        const newNote = await response.json();
        setNotes((prevNotes) => [newNote, ...prevNotes]);
        setNewNoteTitle("");
        setNewNoteContent("");
        setSelectedNote(null);
      } else {
        console.error("Error adding note:", response.statusText);
        setError("An error occurred while adding the note.");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      setError("An error occurred while adding the note.");
    }
  };

  const handleDeselectNote = () => {
    setSelectedNote(null);
    setNewNoteTitle("");
    setNewNoteContent("");
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/notes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchNotes();
        if (selectedNote && selectedNote.id === id) {
          handleDeselectNote();
        }
      } else {
        console.error("Error deleting note:", response.statusText);
        setError("An error occurred while deleting the note.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("An error occurred while deleting the note.");
    }
  };

  return (
    <>
      <aside className="Side" ref={sideRef}>
        {error ? (
          <div>{error}</div>
        ) : (
          <>
            <ModifierNote
              selectedNote={selectedNote}
              newNoteTitle={newNoteTitle}
              newNoteContent={newNoteContent}
              handleAddNote={handleAddNote}
              handleUpdateNote={handleUpdateNote}
              handleDeselectNote={handleDeselectNote}
              setNewNoteTitle={setNewNoteTitle}
              setNewNoteContent={setNewNoteContent}
            />
            <ListeNotes
              notes={notes}
              selectedNote={selectedNote}
              handleNoteClick={handleNoteClick}
              handleDeleteNote={handleDeleteNote}
            />
          </>
        )}
      </aside>
      <main className="Main">
        {selectedNote && (
          <div>
            <h2>{selectedNote.title}</h2>
            <p>{selectedNote.content}</p>
          </div>
        )}
      </main>
    </>
  );
}

export default NoteContainer;
