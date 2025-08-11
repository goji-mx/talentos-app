// auth.ts
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
};

export interface DecodedToken {
  userId: string;
  userType: 'student' | 'admin' | 'sales';
  originalUserType?: 'secretaria' | 'director' | 'profesor' | 'padre' | 'alumno' | 'admin';
  nombre?: string;
  correo?: string;
  exp: number;
  iat?: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserFromToken = (): DecodedToken | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  const decoded = decodeToken(token);
  if (!decoded) return null;
  
  // Verificar si el token ha expirado
  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return null;
  }
  
  return decoded;
};

export const hasRole = (requiredRoles: string[]): boolean => {
  const user = getUserFromToken();
  if (!user) return false;
  return requiredRoles.includes(user.userType);
};

export const getDefaultRouteForRole = (userType: string, originalUserType?: string): string => {
  switch (userType) {
    case 'admin':
      // Diferentes rutas según el tipo original de admin
      if (originalUserType === 'secretaria') {
        return '/secretaria';
      }
      if (originalUserType === 'director') {
        return '/director';
      }
      return '/admin';
    case 'sales':
      // Para profesores
      return '/profesor';
    case 'student':
      // Diferentes rutas para estudiantes y padres
      if (originalUserType === 'padre') {
        return '/padre';
      }
      return '/alumno';
    default:
      return '/home';
  }
};
