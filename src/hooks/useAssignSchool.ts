// hooks/useAssignSchool.ts
import { useState } from 'react';
import config from '../config/config';

interface UseAssignSchoolResult {
  assignSchool: (directorId: string, escuelaId: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useAssignSchool = (): UseAssignSchoolResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assignSchool = async (directorId: string, escuelaId: string): Promise<boolean> => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token de autorización requerido');
        return false;
      }

      const response = await fetch(
        `${config.backend.DB_HOST}/${directorId}/escuela`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ escuelaId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.result || 'Error al asignar escuela');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error assigning school:', error);
      setError('Error de red al asignar escuela');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    assignSchool,
    loading,
    error,
  };
};