// src/components/ui/UserDropdown.tsx
import { useState, useRef, useEffect } from 'react';
import { LogOut, Settings, ShieldUser, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RoleGuard from '../Security/RoleGuard';

interface UserDropdownProps {
    onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onLogout }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout();
        navigate('/');
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
                <User size={16} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <RoleGuard
                        allowedRoles={['admin']}
                    >
                        <button
                            className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 text-sm cursor-pointer rounded-t-lg"
                            onClick={() => navigate('/admin')}
                        >
                            <ShieldUser size={16} className="mr-3 text-gray-500" />
                            <span>Administración</span>
                        </button>
                    </RoleGuard>
                    <RoleGuard
                        allowedRoles={['student', 'sales']}
                    >
                        <button
                            className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 text-sm cursor-pointer rounded-t-lg"
                            onClick={() => navigate('/settings')}
                        >
                            <Settings size={16} className="mr-3 text-gray-500" />
                            <span>Configuración</span>
                        </button>
                    </RoleGuard>
                    <hr className="border-gray-100" />
                    <button
                        className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 text-sm cursor-pointer rounded-b-lg"
                        onClick={handleLogout}
                    >
                        <LogOut size={16} className="mr-3 text-gray-500" />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;