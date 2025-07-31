// src/hooks/useRegisterStudent.ts
import { useState } from 'react';
import axios from 'axios';
import type { Student } from '../types/Student';
import config from '../config/config';

interface RegisterResponse {
  success: boolean;
  message: string;
}

export const useRegisterStudent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const register = async (studentData: Partial<Student>): Promise<RegisterResponse> => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${config.backend.DB_HOST}/register`, studentData); // Ajusta la URL según tu ruta real

      return {
        success: true,
        message: res.data.message || 'Registro exitoso',
      };
    } catch (err: any) {
      const message =
        err?.response?.data?.message || 'Error al registrar al estudiante';
      setError(message);
      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
  };
};