import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserDropdown from '../ui/UserDropdown';
import { User, BookOpen, Calendar, MessageCircle, TrendingUp, Award, Clock, Bell } from 'lucide-react';

interface PadreDashboardProps {
  onLogout: () => void;
}

const PadreDashboard: React.FC<PadreDashboardProps> = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Talentos</h1>
              </div>
              <div className="ml-6">
                <span className="text-sm text-gray-500">Panel de Padre/Tutor</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-gray-400 cursor-pointer" />
              <UserDropdown onLogout={onLogout} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg p-6 text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Bienvenido, {user?.nombre} 👨‍👩‍👧‍👦
            </h2>
            <p className="text-green-100">
              Mantente al día con el progreso académico de tus hijos y comunícate con sus profesores.
            </p>
          </div>

          {/* Selector de Hijo */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <label className="text-sm font-medium text-gray-700">Seleccionar hijo:</label>
              </div>
              <select className="ml-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <option>María González - 3° Secundaria</option>
                <option>Juan González - 1° Secundaria</option>
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Materias
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">6</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Promedio General
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">8.7</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Asistencia
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">95%</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Logros del Mes
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">3</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Rendimiento Académico */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Rendimiento por Materia</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { subject: 'Matemáticas', grade: 9.2, trend: 'up', color: 'green' },
                      { subject: 'Español', grade: 8.5, trend: 'stable', color: 'blue' },
                      { subject: 'Historia', grade: 8.8, trend: 'up', color: 'green' },
                      { subject: 'Ciencias', grade: 7.9, trend: 'down', color: 'yellow' },
                      { subject: 'Inglés', grade: 9.0, trend: 'up', color: 'green' },
                      { subject: 'Educación Física', grade: 9.5, trend: 'stable', color: 'blue' }
                    ].map((subject, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full bg-${subject.color}-500 mr-3`}></div>
                          <span className="font-medium text-gray-900">{subject.subject}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-gray-900 mr-2">
                            {subject.grade}
                          </span>
                          <TrendingUp 
                            className={`h-4 w-4 ${
                              subject.trend === 'up' ? 'text-green-500' : 
                              subject.trend === 'down' ? 'text-red-500 rotate-180' : 'text-gray-400'
                            }`} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actividades Recientes */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Actividades Recientes</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      { 
                        action: 'Entregó proyecto de Ciencias Naturales', 
                        time: 'Hace 2 horas', 
                        grade: '9.0',
                        icon: BookOpen 
                      },
                      { 
                        action: 'Participó en clase de Matemáticas', 
                        time: 'Ayer', 
                        grade: null,
                        icon: MessageCircle 
                      },
                      { 
                        action: 'Examen de Historia completado', 
                        time: 'Hace 2 días', 
                        grade: '8.5',
                        icon: Award 
                      }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <activity.icon className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                        {activity.grade && (
                          <span className="text-sm font-semibold text-green-600">
                            {activity.grade}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Próximos Eventos */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Próximos Eventos</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      { event: 'Junta de Padres', date: 'Viernes 15', time: '4:00 PM' },
                      { event: 'Examen de Matemáticas', date: 'Lunes 18', time: '10:00 AM' },
                      { event: 'Festival de Ciencias', date: 'Miércoles 20', time: '9:00 AM' }
                    ].map((event, index) => (
                      <div key={index} className="border-l-4 border-green-400 bg-green-50 p-3 rounded-r-lg">
                        <p className="font-medium text-gray-900">{event.event}</p>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{event.date}</span>
                          <Clock className="h-4 w-4 ml-2 mr-1" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comunicación con Profesores */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Mensajes</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      { 
                        teacher: 'Prof. García (Matemáticas)', 
                        message: 'María ha mostrado gran mejora...', 
                        time: '2h',
                        unread: true 
                      },
                      { 
                        teacher: 'Prof. López (Historia)', 
                        message: 'Recordatorio: proyecto pendiente...', 
                        time: '1d',
                        unread: false 
                      },
                      { 
                        teacher: 'Director', 
                        message: 'Invitación a junta de padres...', 
                        time: '3d',
                        unread: false 
                      }
                    ].map((msg, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${msg.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${msg.unread ? 'text-blue-900' : 'text-gray-900'}`}>
                              {msg.teacher}
                            </p>
                            <p className="text-xs text-gray-600 mt-1 truncate">
                              {msg.message}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-800">
                    Ver todos los mensajes
                  </button>
                </div>
              </div>

              {/* Recomendaciones */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recomendaciones</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm font-medium text-yellow-800">
                        Reforzar Ciencias
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Considera dedicar más tiempo al estudio de esta materia.
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">
                        Excelente en Matemáticas
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        ¡Continúa con el gran trabajo! Considera actividades avanzadas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PadreDashboard;