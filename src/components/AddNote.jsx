import { useState } from "react";

const AddNote = ({ showData }) => {
  const [noteText, setNoteText] = useState("");

  const handleSaveNote = async (e) => {
    e.preventDefault();

    if (noteText.trim().length === 0) {
      alert("Please Add Something to Add Note");
      return;
    }
    try {
      await fetch(
        "https://note-project-efcd9-default-rtdb.firebaseio.com/note-project.json",
        {
          method: "POST",
          body: JSON.stringify(noteText),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showData();

      setNoteText("");
    } catch (error) {
      alert("Error saving note");
    }
  };

  return (
    <form className="nav-bar form-ctr" onSubmit={handleSaveNote}>
      <input
        type="text"
        placeholder="Enter Notes"
        className="input-ctr"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <button className="note-btn">Save Notes</button>
    </form>
  );
};

export default AddNote;
