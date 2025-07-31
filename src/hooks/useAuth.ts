// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { getUserFromToken, type DecodedToken } from '../utils/auth';

export const useAuth = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const userData = getUserFromToken();
      setUser(userData);
      setIsAuthenticated(!!userData);
      setLoading(false);
    };

    checkAuth();
    
    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = () => {
    const userData = getUserFromToken();
    setUser(userData);
    setIsAuthenticated(!!userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };
};