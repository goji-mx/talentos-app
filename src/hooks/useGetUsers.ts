// src/hooks/useUsers.tsx
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { User } from '../types/user';
import config from '../config/config';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const token = localStorage.getItem('token');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const baseURL = `${config.backend.DB_HOST}`;
      // Ahora esperamos el formato exacto: { status: string; result: { users: User[] } }
      const response = await axios.get<{
        status: string;
        result: { users: User[] };
      }>(`${baseURL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Extraemos correctamente el arreglo anidado:
      const payload = response.data.result.users;
      setUsers(Array.isArray(payload) ? payload : []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
}