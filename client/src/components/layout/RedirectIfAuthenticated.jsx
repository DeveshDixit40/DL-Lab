import { Navigate } from 'react-router-dom';

/**
 * Component that redirects to admin dashboard if user is already authenticated
 */
const RedirectIfAuthenticated = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  
  if (adminToken) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return children;
};

export default RedirectIfAuthenticated;
