// hooks/useEscuelas.ts
import { useState, useEffect } from 'react';
import config from '../config/config';

interface Escuela {
  _id: string;
  nombre: string;
  municipio: string;
  clave: string;
  tieneDirector: boolean;
}

interface UseEscuelasResult {
  escuelas: Escuela[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useEscuelas = (): UseEscuelasResult => {
  const [escuelas, setEscuelas] = useState<Escuela[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEscuelas = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token de autorización requerido');
        return;
      }

      const response = await fetch(
        `${config.backend.DB_HOST}/escuelas/disponibles`,
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
        setError(data.result || 'Error al obtener escuelas');
        return;
      }

      setEscuelas(data.result || []);
    } catch (error) {
      console.error('Error fetching escuelas:', error);
      setError('Error de red al obtener escuelas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEscuelas();
  }, []);

  return {
    escuelas,
    loading,
    error,
    refetch: fetchEscuelas,
  };
};