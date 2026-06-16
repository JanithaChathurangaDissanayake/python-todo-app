import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out!');
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">✓</span>
        <span className="brand-name">TodoFlow</span>
      </div>
      {user && (
        <div className="navbar-user">
          <div className="user-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <span className="user-name">{user.name}</span>
          <button className="btn-ghost btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}