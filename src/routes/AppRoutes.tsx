import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from '../components/WelcomePage'
import Login from '../components/Login';
import Register from '../components/Register';
import Administration from '../components/Administration/Administration';
import UserManagement from '../components/Administration/UserManagement';
import UnauthorizedPage from '../components/Security/UnauthorizedPage';
import ProtectedRoute from '../components/Security/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import { getDefaultRouteForRole } from '../utils/auth';

// Importar los nuevos dashboards específicos
import AlumnoDashboard from '../components/Dashboards/AlumnoDashboard';
import PadreDashboard from '../components/Dashboards/PadreDashboard';
import ProfesorDashboard from '../components/Dashboards/ProfesorDashboard';
import SecretariaDashboard from '../components/Dashboards/SecretariaDashboard';
import DirectorDashboard from '../components/Dashboards/DirectorDashboard';
import OnboardingScreen from '../components/Onboarding/OnboardingPage';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user, login, logout } = useAuth();

  // Componente para redirigir según el rol
  const RoleBasedRedirect = () => {
    if (!user) return <Navigate to="/login" replace />;
    const defaultRoute = getDefaultRouteForRole(user.userType, user.originalUserType);
    return <Navigate to={defaultRoute} replace />;
  };

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route
        path="/login"
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
      <Route path="/onboarding" element={<OnboardingScreen onComplete={() => { console.log("Completado"); }} />} />
      
      
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

      {/* Rutas específicas por tipo de usuario */}
      
      {/* Ruta para Secretaria */}
      <Route
        path="/secretaria"
        element={
          <ProtectedRoute 
            allowedRoles={['admin']} 
            fallbackRoute="/unauthorized"
          >
            <SecretariaDashboard onLogout={logout} />
          </ProtectedRoute>
        }
      />

      {/* Ruta para Director */}
      <Route
        path="/director"
        element={
          <ProtectedRoute 
            allowedRoles={['admin']} 
            fallbackRoute="/unauthorized"
          >
            <DirectorDashboard onLogout={logout} />
          </ProtectedRoute>
        }
      />

      {/* Ruta para Profesor */}
      <Route
        path="/profesor"
        element={
          <ProtectedRoute 
            allowedRoles={['sales', 'admin']} 
            fallbackRoute="/unauthorized"
          >
            <ProfesorDashboard onLogout={logout} />
          </ProtectedRoute>
        }
      />

      {/* Ruta para Padre */}
      <Route
        path="/padre"
        element={
          <ProtectedRoute 
            allowedRoles={['student', 'admin']} 
            fallbackRoute="/unauthorized"
          >
            <PadreDashboard onLogout={logout} />
          </ProtectedRoute>
        }
      />

      {/* Ruta para Alumno */}
      <Route
        path="/alumno"
        element={
          <ProtectedRoute 
            allowedRoles={['student', 'admin']} 
            fallbackRoute="/unauthorized"
          >
            <AlumnoDashboard onLogout={logout} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;