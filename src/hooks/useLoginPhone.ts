// hooks/useLoginPhone.ts
import { useState } from 'react';
import config from '../config/config';

export const useLoginPhone = () => {
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const requestOtp = async (phone: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(`${config.backend.DB_HOST}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNotif({ message: data.message || 'Error al solicitar código.', type: 'error' });
        return false;
      }
      console.log(data)
      setNotif({ message: 'Código enviado.', type: 'success' });
      return true;
    } catch (error) {
      setNotif({ message: 'Error de red al solicitar código.', type: 'error' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { requestOtp, notif, setNotif, loading };
};