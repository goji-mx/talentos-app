// hooks/useVerifyOtp.ts
import { useState } from 'react';
import config from '../config/config';

export const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const verifyOtp = async (phone: string, otp: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(`${config.backend.DB_HOST}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNotif({ message: data.message || 'OTP incorrecto.', type: 'error' });
        return false;
      }

      localStorage.setItem('token', data.token);
      setNotif({ message: 'Inicio de sesión exitoso.', type: 'success' });
      return true;
    } catch (error) {
      setNotif({ message: 'Error de red al verificar código.', type: 'error' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, notif, setNotif, loading };
};