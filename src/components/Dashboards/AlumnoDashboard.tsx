import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserDropdown from '../ui/UserDropdown';
import { BookOpen, Trophy, Calendar, MessageCircle, BarChart3 } from 'lucide-react';

interface AlumnoDashboardProps {
  onLogout: () => void;
}

const AlumnoDashboard: React.FC<AlumnoDashboardProps> = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Talentos</h1>
              </div>
              <div className="ml-6">
                <span className="text-sm text-gray-500">Panel del Estudiante</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <UserDropdown onLogout={onLogout} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">
              ¡Hola, {user?.nombre}! 👋
            </h2>
            <p className="text-blue-100">
              Bienvenido a tu panel de aprendizaje. Aquí podrás seguir tu progreso y acceder a tus actividades.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Cursos Activos
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">3</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Trophy className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Logros Obtenidos
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">12</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Progreso General
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">78%</dd>
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
                      Próxima Evaluación
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">2 días</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mis Cursos */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Mis Cursos</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { name: 'Matemáticas Avanzadas', progress: 85, color: 'blue' },
                      { name: 'Historia Universal', progress: 72, color: 'green' },
                      { name: 'Ciencias Naturales', progress: 90, color: 'purple' }
                    ].map((course, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">{course.name}</h4>
                          <span className="text-sm text-gray-500">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-${course.color}-600 h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
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
                      { action: 'Completaste el Quiz de Álgebra', time: 'Hace 2 horas', icon: Trophy },
                      { action: 'Entregaste la tarea de Historia', time: 'Hace 1 día', icon: BookOpen },
                      { action: 'Participaste en el foro de Ciencias', time: 'Hace 2 días', icon: MessageCircle }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <activity.icon className="h-5 w-5 text-gray-400 mr-3" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Próximas Tareas */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Próximas Tareas</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      { title: 'Ensayo de Literatura', due: 'Mañana', priority: 'high' },
                      { title: 'Ejercicios de Matemáticas', due: 'En 3 días', priority: 'medium' },
                      { title: 'Proyecto de Ciencias', due: 'En 1 semana', priority: 'low' }
                    ].map((task, index) => (
                      <div key={index} className="border-l-4 border-blue-400 bg-blue-50 p-3 rounded-r-lg">
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-600">{task.due}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Logros Recientes */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Logros Recientes</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      { badge: 'Maestro del Álgebra', date: 'Hoy' },
                      { badge: 'Participativo', date: 'Ayer' },
                      { badge: 'Racha de 7 días', date: 'Esta semana' }
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                        <Trophy className="h-6 w-6 text-yellow-500 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{achievement.badge}</p>
                          <p className="text-sm text-gray-500">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
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

export default AlumnoDashboard;