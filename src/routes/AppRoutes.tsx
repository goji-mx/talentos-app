import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashborad';
import Home from '../components/Home';
import Administration from '../components/Administration/Administration';
import UserManagement from '../components/Administration/UserManagement';
import UnauthorizedPage from '../components/Security/UnauthorizedPage';
import ProtectedRoute from '../components/Security/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import { getDefaultRouteForRole } from '../utils/auth';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user, login, logout } = useAuth();

  // Componente para redirigir según el rol
  const RoleBasedRedirect = () => {
    if (!user) return <Navigate to="/" replace />;
    const defaultRoute = getDefaultRouteForRole(user.userType);
    return <Navigate to={defaultRoute} replace />;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <RoleBasedRedirect />
          ) : (
            <Login onLogin={login} />
          )
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      
      {/* Rutas para estudiantes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <Home onLogout={logout} />
          </ProtectedRoute>
        }
      />
      
      {/* Rutas para ventas */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute 
            allowedRoles={['sales', 'admin']} 
            fallbackRoute="/unauthorized"
          >
            <Dashboard onLogout={logout} />
          </ProtectedRoute>
        }
      />
      
      {/* Rutas solo para administradores */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute 
            allowedRoles={['admin']} 
            fallbackRoute="/unauthorized"
          >
            <Administration onLogout={logout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute 
            allowedRoles={['admin']} 
            fallbackRoute="/unauthorized"
          >
            <UserManagement onLogout={logout} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;