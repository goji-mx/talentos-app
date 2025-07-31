// src/hooks/useUpdateAccess.ts
import { useState } from 'react';
import axios from 'axios';
import config from '../config/config';

interface UpdateAccessPayload {
  userId: string;
  allowAccess: boolean;
}

interface UpdateAccessResponse {
  message: string;
}

export function useUpdateAccess() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const token = localStorage.getItem('token')
  const updateAccess = async (payload: UpdateAccessPayload): Promise<UpdateAccessResponse> => {
    setLoading(true);
    setError(null);

    try {
      const baseURL = config.backend.DB_HOST;
      const response = await axios.post<UpdateAccessResponse>(
        `${baseURL}/users/updateAccess`,
        payload,
        {
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

  return { updateAccess, loading, error };
}