import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import NotePage from './pages/NotePage';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css'; 

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
              </Route>
              <Route path="/note/:id" element={<PrivateRoute />}>
                <Route path="/note/:id" element={<NotePage />} />
              </Route>
            </Routes>
          </main>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;