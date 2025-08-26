import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getUserFromToken } from '../utils/auth';

interface UserData {
  id?: string;
  nombre: string;
  email: string;
  userType: string;
  originalUserType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  updateUserData: (updates: Partial<UserData>) => void;
  isLoading: boolean;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener los datos del usuario desde el token
  const loadUserData = () => {
    try {
      const tokenUserData = getUserFromToken();
      if (tokenUserData) {
        const mappedUserData: UserData = {
          nombre: tokenUserData.nombre || '',
          email: tokenUserData.correo || '',
          userType: tokenUserData.userType || '',
          originalUserType: tokenUserData.originalUserType || ''
        };
        setUserData(mappedUserData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Cargar datos al inicializar el contexto
  useEffect(() => {
    loadUserData();
  }, []);

  // Función para actualizar parcialmente los datos del usuario
  const updateUserData = (updates: Partial<UserData>) => {
    setUserData(prevData => 
      prevData ? { ...prevData, ...updates } : null
    );
  };

  // Función para limpiar los datos del usuario (logout)
  const clearUserData = () => {
    setUserData(null);
  };

  const value: UserContextType = {
    userData,
    setUserData,
    updateUserData,
    isLoading,
    clearUserData
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto de usuario
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;