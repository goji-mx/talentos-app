// hooks/useDirectors.ts
import { useState, useEffect } from 'react';
import config from '../config/config';

interface Director {
  id: string;
  nombre: string;
  correo: string;
  telefono: string;
  curp: string;
  escuela: {
    _id: string;
    nombre: string;
    municipio: string;
  } | null;
  fechaRegistro: string;
  activo: boolean;
}

interface UseDirectorsResult {
  directors: Director[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useDirectors = (secretariaId?: string): UseDirectorsResult => {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDirectors = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token de autorización requerido');
        return;
      }

      // If secretariaId is not provided, get it from the token
      const response = await fetch(
        `${config.backend.DB_HOST}/secretaria/${secretariaId || 'current'}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error al obtener directores');
        return;
      }

      // Handle the correct response structure
      if (data.success && data.data && data.data.directores) {
        setDirectors(data.data.directores);
      } else {
        setDirectors([]);
      }
    } catch (error) {
      console.error('Error fetching directors:', error);
      setError('Error de red al obtener directores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectors();
  }, [secretariaId]);

  return {
    directors,
    loading,
    error,
    refetch: fetchDirectors,
  };
};