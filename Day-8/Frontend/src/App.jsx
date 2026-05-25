import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [note, setNote] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editNote, setEditNote] = useState({
    _id: "",
    description: "",
  });

  // create note
  const handleCreateNote = (e) => {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        fetchNotes();

        title.value = "";
        description.value = "";
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // get notes
  async function fetchNotes() {
    try {
      const response = await axios.get("http://localhost:3000/api/notes");

      setNote(response.data.notes);
    } catch (error) {
      console.error(error);
    }
  }

  // delete
  const handleDeleteNote = (id) => {
    axios
      .delete(`http://localhost:3000/api/notes/${id}`)
      .then(() => {
        fetchNotes();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // open modal
  const openModal = (item) => {
    setEditNote({
      _id: item._id,
      description: item.description,
    });

    setIsModalOpen(true);
  };

  // patch update
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`http://localhost:3000/api/notes/${editNote._id}`, {
        description: editNote.description,
      })
      .then(() => {
        fetchNotes();
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div className="notes-container">
        {note.map((item) => (
          <div key={item._id} className="note">
            <div className="note-content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>

            <button
              className="delete-button"
              onClick={() => handleDeleteNote(item._id)}
            >
              Delete
            </button>

            <button className="update-button" onClick={() => openModal(item)}>
              Update
            </button>
          </div>
        ))}
      </div>

      {/* modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Update Description</h2>

            <form onSubmit={handleUpdateSubmit}>
              <textarea
                value={editNote.description}
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    description: e.target.value,
                  })
                }
                placeholder="Update description..."
              />

              <div className="modal-buttons">
                <button type="submit">Save</button>

                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* create note */}
      <form onSubmit={handleCreateNote} className="create-note-page">
        <div className="create-note-card">
          <h1>Create Note</h1>

          <input name="title" type="text" placeholder="Enter note title..." />

          <input
            name="description"
            type="text"
            placeholder="Write your description..."
          />

          <button type="submit">Create Note</button>
        </div>
      </form>
    </>
  );
}

export default App;
