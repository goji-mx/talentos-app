import React, { useState } from 'react';
import { BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../hooks/useAuth';
import DirectorManagement from '../Administration/DirectorManagement';
import Sidebar from '../ui/SideBar';
import SchoolManagement from '../Secretaria/SchoolManagement'; // Ajusta la ruta según tu estructura
import { Users, Menu, GraduationCap, Building2, TriangleAlert, BarChart3, Trophy, TrendingDown, BookOpen, Activity, Clock } from 'lucide-react';

interface SecretariaDashboardProps {
  onLogout: () => void;
}

// Datos de ejemplo mejorados (los reemplazarías con datos de tu API)
const weeklyLoginData = [
  { day: 'LUN', logins: 280, activeUsers: 245 },
  { day: 'MAR', logins: 320, activeUsers: 290 },
  { day: 'MIE', logins: 250, activeUsers: 220 },
  { day: 'JUE', logins: 300, activeUsers: 275 },
  { day: 'VIE', logins: 350, activeUsers: 320 },
  { day: 'SAB', logins: 180, activeUsers: 160 },
  { day: 'DOM', logins: 120, activeUsers: 100 },
];

const PercentageRing = ({ percentage, size = 60 }: { percentage: number; size?: number }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-lime-300 transition-all duration-300 ease-in-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-900">{percentage}%</span>
      </div>
    </div>
  );
};

// Componente mejorado para la gráfica semanal usando Recharts
const WeeklyLoginChart = () => {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={weeklyLoginData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <Bar dataKey="logins" fill="#3B82F6" radius={[2, 2, 0, 0]} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white p-2 border rounded shadow-lg">
                  <p className="font-medium text-sm">{`${label}: ${payload[0].value} inicios`}</p>
                </div>
              );
            }
            return null;
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Componente mejorado para talentos
const TopTalents = () => {
  const talents = [
    { name: 'Matemáticas', icon: '📊', count: 245 },
    { name: 'Ciencias', icon: '🧪', count: 198 },
    { name: 'Arte', icon: '🎨', count: 167 },
    { name: 'Deportes', icon: '⚽', count: 134 },
    { name: 'Música', icon: '🎵', count: 89 },
  ];

  const maxCount = Math.max(...talents.map(t => t.count));

  return (
    <div className="space-y-4">
      {talents.map((talent, index) => (
        <div key={index} className="flex items-center gap-3">
          <span className="text-lg">{talent.icon}</span>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-900">{talent.name}</span>
              <span className="text-xs text-gray-600">{talent.count}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(talent.count / maxCount) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SecretariaDashboard: React.FC<SecretariaDashboardProps> = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-gray-100 via-white to-purple-50">
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-3 lg:hidden fixed top-4 left-4 z-50 bg-white rounded-full shadow"
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onSettings={() => console.log('Abrir configuración')}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 ">
        {/* Main Content */}
        <main className="mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {activeSection === 'schools' ? (
              /* School Management Section */
              <div className="animate-fadeIn">
                <SchoolManagement secretariaId={user?.userId} />
              </div>
            ) : activeSection === 'directores' ? (
              /* Director Management Section */
              <div className="animate-fadeIn">
                <DirectorManagement secretariaId={user?.userId} />
              </div>
            ) : (
              /* Dashboard Section */
              <div className="animate-fadeIn space-y-8">
                {/* Tarjetas de estadísticas principales */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <button className="bg-cyan-100 border rounded-lg shadow-md shadow-black p-6 hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <div className="flex items-center gap-4 w-full p-6">
                      <Users className="h-8 w-8 flex-shrink-0" />
                      <div className="flex flex-col items-start">
                        <span className="text-xl font-bold text-gray-900">1,230</span>
                        <p className="text-xs font-medium text-gray-600">Total de alumnos</p>
                      </div>
                    </div>
                  </button>

                  <button className="bg-red-300 border rounded-lg shadow-md shadow-black p-6 hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <div className="flex items-center gap-4 w-full p-6">
                      <GraduationCap className="h-8 w-8 flex-shrink-0" />
                      <div className="flex flex-col items-start">
                        <span className="text-xl font-bold text-gray-900">45</span>
                        <p className="text-xs font-medium text-gray-600">Total de profesores</p>
                      </div>
                    </div>
                  </button>

                  <button className="bg-lime-300 border rounded-lg shadow-md shadow-black p-6 hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <div className="flex items-center gap-4 w-full p-6">
                      <Building2 className="h-8 w-8 flex-shrink-0" />
                      <div className="flex flex-col items-start">
                        <span className="text-xl font-bold text-gray-900">3</span>
                        <p className="text-xs font-medium text-gray-600">Total de escuelas</p>
                      </div>
                    </div>
                  </button>

                  <button className="bg-pink-300 border rounded-lg shadow-md shadow-black p-6 hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 p-6">
                      <PercentageRing percentage={80} />
                      <p className="text-xs font-medium text-gray-600 text-center">Bienestar emocional</p>
                    </div>
                  </button>

                  <button className="bg-amber-100 border rounded-lg shadow-md shadow-black p-6 hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <div className="flex items-center gap-4 w-full p-6">
                      <TriangleAlert className="h-8 w-8 flex-shrink-0" />
                      <div className="flex flex-col items-start">
                        <span className="text-xl font-bold text-gray-900">3</span>
                        <p className="text-xs font-medium text-gray-600">Alumnos en riesgo</p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Gráficas principales mejoradas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-md shadow-black p-6 border">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                      <h3 className="text-lg font-bold text-gray-900">Inicios de sesión por semana</h3>
                    </div>
                    <WeeklyLoginChart />
                  </div>

                  <div className="bg-white rounded-lg shadow-md shadow-black p-6 border">
                    <div className="flex items-center gap-3 mb-4">
                      <Trophy className="h-6 w-6 text-yellow-600" />
                      <h3 className="text-lg font-bold text-gray-900">Top Talentos en tu institución</h3>
                    </div>
                    <TopTalents />
                  </div>
                </div>

                {/* Tarjetas de estadísticas secundarias */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <button className="bg-white border rounded-lg shadow-md shadow-black p-6 hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <div className="flex items-center gap-4 w-full p-4">
                      <Users className="h-8 w-8 flex-shrink-0" />
                      <div className="flex flex-col items-start">
                        <p className="text-xs font-medium text-gray-600">Cuentas creadas</p>
                        <span className="text-xl font-bold text-gray-900">1,230</span>
                      </div>
                    </div>
                  </button>

                  <button className="bg-white border rounded-lg shadow-md shadow-black p-6 hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <div className="flex items-center gap-4 w-full p-4">
                      <TrendingDown className="h-8 w-8 flex-shrink-0" />
                      <div className="flex flex-col items-start">
                        <p className="text-xs font-medium text-gray-600">Inicios de sesión</p>
                        <span className="text-xl font-bold text-gray-900">3,280</span>
                      </div>
                    </div>
                  </button>

                  <button className="bg-white border rounded-lg shadow-md shadow-black p-6 hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <div className="flex items-center gap-4 w-full p-4">
                      <BookOpen className="h-8 w-8 flex-shrink-0" />
                      <div className="flex flex-col items-start">
                        <p className="text-xs font-medium text-gray-600">Talentos identificados</p>
                        <span className="text-xl font-bold text-gray-900">1000</span>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Tarjetas de MÖVA */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                  <button className="bg-white border rounded-lg shadow-md shadow-black p-6 hover:bg-gray-50 transition-colors">
                    <h5 className='flex-shrink-0 flex'>Interacciones con MÖVA</h5>
                    <div className=' flex items-center justify-center'>
                      <div className="flex items-center gap-4 w-full p-4">
                        <Activity className="h-8 w-8 flex-shrink-0" />
                        <div className="flex flex-col items-start">
                          <p className="text-xs font-medium text-gray-600">Promedio con mejora</p>
                          <span className="text-xl font-bold text-gray-900">200</span>
                        </div>
                      </div>
                    </div>
                  </button>

                  <button className="bg-white border rounded-lg shadow-md shadow-black p-6 hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <div className="flex items-center gap-4 w-full p-4">
                      <Clock className="h-8 w-8 flex-shrink-0" />
                      <div className="flex flex-col items-start">
                        <p className="text-xs font-medium text-gray-600">Tiempo promedio dentro de MÖVA</p>
                        <span className="text-xl font-bold text-gray-900">45 min</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SecretariaDashboard;