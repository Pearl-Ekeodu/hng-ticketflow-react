import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './Button';
import './Navbar.css';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <div className="navbar-logo">
            <span>🎫</span>
          </div>
          <span className="navbar-brand-name">TicketFlow</span>
        </div>

        <div className="navbar-links">
          <button
            onClick={() => navigate('/')}
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </button>

          {isAuthenticated && (
            <>
              <button
                onClick={() => navigate('/dashboard')}
                className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/tickets')}
                className={`navbar-link ${isActive('/tickets') ? 'active' : ''}`}
              >
                Tickets
              </button>
              <Button variant="danger" size="sm" onClick={handleLogout}>
                <span>Logout</span>
              </Button>
            </>
          )}

                      {!isAuthenticated && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => navigate('/?auth=login')}
                        >
                          Login
                        </Button>
                      )}
        </div>
      </div>
    </nav>
  );
}

