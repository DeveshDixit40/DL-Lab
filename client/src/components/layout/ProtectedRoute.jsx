import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  const location = useLocation();
  
  useEffect(() => {
    // Clear any old state that might be causing display issues
    const root = document.documentElement;
    root.style.backgroundColor = '';
    document.body.style.backgroundColor = '';
  }, []);
  
  if (!adminToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  return children;
};

export default ProtectedRoute;