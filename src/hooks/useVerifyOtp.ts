// hooks/useVerifyOtp.ts
import { useState } from 'react';
import config from '../config/config';

export const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(`${config.backend.DB_HOST}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setNotif({ message: data.result || 'OTP incorrecto.', type: 'error' });
        return false;
      }

      // Guardar token JWT en localStorage
      if (data.result && data.result.token) {
        localStorage.setItem('token', data.result.token);
      }
      setNotif({ message: 'Inicio de sesión exitoso.', type: 'success' });
      return true;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setNotif({ message: 'Error de red al verificar código.', type: 'error' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, notif, setNotif, loading };
};