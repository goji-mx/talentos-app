// hooks/useCreateDirector.ts
import { useState } from 'react';
import config from '../config/config';

interface CreateDirectorData {
  nombre: string;
  correo: string;
  telefono: string;
  curp: string;
  password?: string;
}

interface UseCreateDirectorResult {
  createDirector: (directorData: CreateDirectorData, secretariaId?: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useCreateDirector = (): UseCreateDirectorResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDirector = async (directorData: CreateDirectorData, secretariaId?: string): Promise<boolean> => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token de autorización requerido');
        return false;
      }

      // Prepare the data to send
      const dataToSend = {
        ...directorData,
        userType: 'director', // Ensure the user type is set
      };

      const response = await fetch(
        `${config.backend.DB_HOST}/secretaria/${secretariaId || 'current'}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle the backend error response format
        setError(data.message || data.result || 'Error al crear director');
        return false;
      }

      // Check if the response indicates success
      if (data.success === false) {
        setError(data.message || 'Error al crear director');
        return false;
      }

      return true;
    } catch (error) {
      // console.error('Error creating director:', error);
      setError('Error de red al crear director');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createDirector,
    loading,
    error,
  };
};