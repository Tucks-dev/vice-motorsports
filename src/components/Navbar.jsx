import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link to="/" className="font-bold text-lg">Vice Motorsports</Link>
        <Link to="/catalog" className="hover:underline">Catalog</Link>
      </div>

      <div className="flex items-center space-x-4">
        {!user && (
          <Link to="/login" className="hover:underline">Employee Login</Link>
        )}

        {user && (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
