import { useState } from 'react';
import axios from 'axios';
import config from '../config/config';

interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  userType: 'student' | 'admin' | 'seller';
  specialty?: string;
  university?: string;
  residencyHospital?: string;
  licenseNumber?: string;
  residency?: string;
  document?: string;
}

interface RegisterResponse {
  message: string;
}

export function useRegisterUser() {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<Error | null>(null);

  const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    setLoading(true);
    setError(null);

    try {
      const baseURL = config.backend.DB_HOST;
      const response = await axios.post<RegisterResponse>(
        `${baseURL}/users/register`,
        payload
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

  return { registerUser, loading, error };
}