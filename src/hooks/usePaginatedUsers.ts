// src/hooks/usePaginatedUsers.tsx
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { User } from '../types/user';
import config from '../config/config';

interface PaginatedResponse {
  status: string;
  result: {
    users: User[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}

/**
 * Hook para obtener usuarios paginados, con búsqueda y ordenación.
 *
 * @param initialPage    página inicial (por defecto 1)
 * @param limit          número de elementos por página (por defecto 10)
 * @param initialSearch  texto de búsqueda inicial (por defecto "")
 * @param initialSortField    campo por el que ordenar (por defecto "fullName")
 * @param initialSortDirection  "asc" o "desc" (por defecto "asc")
 */
export function usePaginatedUsers(
  initialPage: number = 1,
  limit: number = 10,
  initialSearch: string = '',
  initialSortField: string = 'fullName',
  initialSortDirection: 'asc' | 'desc' = 'asc'
) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [sortField, setSortField] = useState<string>(initialSortField);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);
  const token = localStorage.getItem('token')

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const baseURL = `${config.backend.DB_HOST}`;
      // Construir query params: page, limit, search, sortField, sortDirection
      const params = new URLSearchParams();
      params.append('page', String(currentPage));
      params.append('limit', String(limit));
      if (searchTerm.trim() !== '') {
        params.append('search', searchTerm.trim());
      }
      params.append('sortField', sortField);
      params.append('sortDirection', sortDirection);
      const response = await axios.get<PaginatedResponse>(
        `${baseURL}/users?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      const { users: fetched, totalPages: tp } = response.data.result;
      setUsers(fetched);
      setTotalPages(tp);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, searchTerm, sortField, sortDirection]);

  // Cuando cambie cualquiera de estos valores, recargamos
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    totalPages,
    currentPage,
    setPage: setCurrentPage,
    searchTerm,
    setSearchTerm,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    refetch: fetchUsers,
  };
}