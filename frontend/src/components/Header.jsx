import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">NoteKeeper</Link>
        <nav className="header-nav">
          {user && <span>Hello, {user.name}</span>}
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>
          {user && (
            <button onClick={logoutUser} title="Logout" className="logout-btn">
              <FaSignOutAlt size={20} />
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;