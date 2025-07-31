// src/hooks/useEditUser.ts
import { useState } from 'react';
import axios from 'axios';
import config from '../config/config';

interface EditPayload {
  id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  userType?: 'student' | 'admin' | 'seller';
  specialty?: string;
  university?: string;
  residencyHospital?: string;
  licenseNumber?: string;
  residency?: string;
  document?: string;
  allowAccess?: boolean;
}

interface EditResponse {
  message: string;
}

export function useEditUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const token = localStorage.getItem('token')
  const editUser = async (payload: EditPayload): Promise<EditResponse> => {
    setLoading(true);
    setError(null);

    try {
      const baseURL = config.backend.DB_HOST;
      const { id, ...body } = payload;
      const response = await axios.put<EditResponse>(
        `${baseURL}/users/${id}`,
        body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      return response.data;
    } catch (err) {
      const parsed = err instanceof Error ? err : new Error(String(err));
      setError(parsed);
      throw parsed;
    } finally {
      setLoading(false);
    }
  };

  return { editUser, loading, error };
}