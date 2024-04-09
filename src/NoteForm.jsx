import React, { useState, useEffect } from 'react';
import './App.css';

function NoteForm() {
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotesList(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notesList));
  }, [notesList]);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const addNote = () => {
    if (note.trim() !== '') {
      if (editIndex !== null) {
        const updatedNotes = [...notesList];
        updatedNotes[editIndex] = note;
        setNotesList(updatedNotes);
        setEditIndex(null);
      } else {
        setNotesList([...notesList, note]);
      }
      setNote('');
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notesList];
    updatedNotes.splice(index, 1);
    setNotesList(updatedNotes);
  };

  const editNote = (index) => {
    setNote(notesList[index]);
    setEditIndex(index);
  };

  return (
    <div className="NoteForm">
      <header className="NoteForm-header">
        <hr />
        <h2>Přidej si poznámku!</h2>
        <p>Do této aplikace si můžeš přidat poznámku a zpětně se na ni podívat.</p>
        <br />
        <p>Poznámka</p>
        <input type="text" id="noteForm" value={note} onChange={handleNoteChange} />
        <button type="button" className="btn btn-primary" onClick={addNote}>
          {editIndex !== null ? 'Upravit' : 'Přidat poznámku'}
        </button>
        <div className="notes-list">
          <br></br><hr></hr>
          <h3>Všechny poznámky:</h3>
          <ul>
            {notesList.map((item, index) => (
              <p key={index}>
                {item}
                <br></br>
                <button onClick={() => deleteNote(index)}>Odstranit</button>
                <button onClick={() => editNote(index)}>Upravit</button>
              </p>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default NoteForm;
