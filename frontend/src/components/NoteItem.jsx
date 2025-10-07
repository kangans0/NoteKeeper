import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const NoteItem = ({ note }) => {
  const getContentPreview = (content) => {
    if (!content) return "No content...";
    const firstLine = content.split('\n')[0];
    return firstLine.length > 100 ? firstLine.substring(0, 100) + '...' : firstLine;
  };

  return (
    <Link to={`/note/${note._id}`} className="note-item">
      <h3>{note.title || 'Untitled'}</h3>
      <p className="note-item-content">{getContentPreview(note.content)}</p>
      <p className="note-item-date">
        Updated: {format(new Date(note.updatedAt), 'PPp')}
      </p>
    </Link>
  );
};

export default NoteItem;