import Nav from "./components/Nav";
import ShowNote from "./components/ShowNote";
import AddNote from "./components/AddNote";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNote] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mistake, setMistake] = useState(null);

  useEffect(() => {
    showData();
  }, []);

  const showData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://note-project-efcd9-default-rtdb.firebaseio.com/note-project.json"
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const notes = await response.json();

      const modifiedNote = [];

      for (const key in notes) {
        modifiedNote.push({
          id: key,
          data: notes[key],
        });
      }

      setNote(modifiedNote);
    } catch (err) {
      setMistake(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Nav notes={notes} />
      {loading && !mistake && (
        <h1 style={{ textAlign: "center" }}>Getting Notes</h1>
      )}
      {mistake && !loading && (
        <h1 style={{ textAlign: "center" }}>{mistake}</h1>
      )}
      {!loading && !mistake && (
        <>
          <AddNote showData={showData} />
          {notes.map((note) => (
            <ShowNote
              key={note.id}
              note={note}
              showData={showData}
              notes={notes}
            />
          ))}
        </>
      )}

      {notes.length === 0 && !mistake && !loading && (
        <h1 style={{ textAlign: "center" }}>Welcome my friend</h1>
      )}
    </>
  );
}

export default App;
