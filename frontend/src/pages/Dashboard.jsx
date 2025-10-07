import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import NoteItem from '../components/NoteItem'; 

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotes = async () => {
      const config = { headers: { Authorization: `Bearer ${authToken}` } };
      const { data } = await axios.get('/api/notes', config);
      setNotes(data);
    };
    fetchNotes();
  }, [authToken]);

  const filteredNotes = notes.filter(note =>
    (note.title && note.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>My Notes</h1>
        <Link to="/note/new" className="form-btn" style={{width: 'auto', padding: '0.75rem 1.5rem'}}>New Note</Link>
      </div>

      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="notes-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => <NoteItem key={note._id} note={note} />)
        ) : (
          <p>No notes found. Create one!</p>
        )}
      </div>
    </div>
  );
};


export default Dashboard;