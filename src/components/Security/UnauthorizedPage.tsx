import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoBack = () => {
    // Redirigir según el rol del usuario
    switch (user?.userType) {
      case 'admin':
        navigate('/admin');
        break;
      case 'sales':
        navigate('/dashboard');
        break;
      case 'student':
      default:
        navigate('/home');
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Acceso Denegado
        </h1>
        <p className="text-gray-600 mb-6">
          No tienes permisos para acceder a esta página.
        </p>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;