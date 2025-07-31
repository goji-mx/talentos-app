import React from 'react';
import { useAuth } from '../../hooks/useAuth';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles, 
  fallback = null 
}) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.userType)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RoleGuard;