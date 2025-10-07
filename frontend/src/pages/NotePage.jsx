import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';
import { FaTrash, FaSave } from 'react-icons/fa';

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [note, setNote] = useState({ title: '', content: ''});

  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };

  useEffect(() => {
    if (id !== 'new') {
      const fetchNote = async () => {
        const { data } = await axios.get(`/api/notes/${id}`, config);
        setNote(data);
      };
      fetchNote();
    }
  }, [id, authToken]);

  const handleSave = async () => {
    if (id === 'new') {
      await axios.post(`/api/notes/`, note, config);
    } else {
      await axios.put(`/api/notes/${id}`, note, config);
    }
    navigate('/');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`/api/notes/${id}`, config);
      navigate('/');
    }
  };

  return (
    <div className="container note-page-container">
      <div className="note-editor-column">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <input
            type="text"
            placeholder="Note Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            className="note-title-input"
          />
          <div className="note-actions">
            <button onClick={handleSave} title="Save Note"><FaSave size={22} color="green" /></button>
            {id !== 'new' && <button onClick={handleDelete} title="Delete Note"><FaTrash size={20} color="red" /></button>}
          </div>
        </div>
        <textarea
          placeholder="Start writing... (Markdown supported)"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          className="note-textarea"
        />
      </div>

      <div className="note-preview">
        <ReactMarkdown>{note.content || "## Preview"}</ReactMarkdown>
      </div>
    </div>
  );
};

export default NotePage;