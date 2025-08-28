import React from 'react';
import { Users, Settings, BarChart3, LogOut, School, GraduationCap, TriangleAlert, ChartPie, UserPlus } from 'lucide-react';
import { useUser } from '../../utils/UserContext';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
    id: string;
    label: string;
    icon: React.ElementType;
}

interface SidebarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
    onSettings: () => void;
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    activeSection,
    onSectionChange,
    onSettings,
    isOpen,
    onClose
}) => {
    const { userData, clearUserData } = useUser();
    const [activeItem, setActiveItem] = React.useState(activeSection);
    const navigate = useNavigate();
    const menuItems: MenuItem[] = [
        { id: 'dashboard', label: 'Inicio', icon: BarChart3 },
        { id: 'schools', label: 'Escuelas', icon: School },
        { id: 'teachers', label: 'Profesores', icon: GraduationCap },
        { id: 'students', label: 'Estudiantes', icon: Users },
        { id: 'protocol', label: 'Protocolo de Riesgo', icon: TriangleAlert },
        { id: 'analytics', label: 'Analítica', icon: ChartPie },
        { id: 'register', label: 'Registro', icon: UserPlus }
    ];

    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId);
        onSectionChange?.(itemId);
        onClose();
    };

    const handleLogout = () => {
        clearUserData();
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const userName = userData?.nombre || 'Usuario';
    const userPosition = userData?.originalUserType || 'Sin asignar';
    const userImage =
        userData?.profileImage ||
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

    return (
        <>
            {/* Overlay para móviles */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed top-0 left-0 h-full bg-white shadow-lg w-64 z-50
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                    flex flex-col justify-between
                  `}
            >
                {/* Header con botón de cierre en móvil */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
                    <h2 className="text-xl font-bold">Panel</h2>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 rounded hover:bg-gray-200"
                    >
                        ✕
                    </button>
                </div>

                {/* Menú */}
                <div className='flex-1 overflow-y-auto'>
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100">
                            <img
                                src={userImage}
                                alt="Perfil"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                                {userName}
                            </h3>
                            <p className="text-xs text-gray-500 truncate">{userPosition}</p>
                        </div>
                    </div>

                    <div className="h-px bg-gray-200" />
                    <div className="px-6 py-4 space-y-2">
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = activeItem === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleItemClick(item.id)}
                                    className={`
                                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200
                                        ${isActive
                                            ? 'bg-lime-300 text-black font-medium shadow-sm'
                                            : 'bg-gray-50 shadow-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                        }
                                    `}
                                >
                                    <IconComponent
                                        className={`w-5 h-5 ${isActive ? 'text-black' : 'text-gray-500'}`}
                                    />
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="border-t border-gray-200 p-6 space-y-2">
                    <button
                        onClick={onSettings}
                        className="w-full flex items-center shadow-md shadow-black gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                        <Settings className="w-5 h-5 text-gray-500" />
                        <span className="text-sm">Configuración</span>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center shadow-md shadow-black gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm">Cerrar sesión</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
