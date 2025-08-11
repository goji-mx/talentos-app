// hooks/useLoginEmail.ts
import { useState } from 'react';
import config from '../config/config';

export const useLoginEmail = () => {
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const requestOtp = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(`${config.backend.DB_HOST}/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNotif({ message: data.result || 'Error al solicitar código.', type: 'error' });
        return false;
      }
      
      console.log('OTP request response:', data);
      setNotif({ message: 'Código enviado a tu correo electrónico.', type: 'success' });
      return true;
    } catch (error) {
      console.error('Error requesting OTP:', error);
      setNotif({ message: 'Error de red al solicitar código.', type: 'error' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { requestOtp, notif, setNotif, loading };
};