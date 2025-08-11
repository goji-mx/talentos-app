import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserDropdown from '../ui/UserDropdown';
import { Users, BookOpen, MessageCircle, TrendingUp, Clock, Bell, FileText, BarChart3, Award } from 'lucide-react';

interface ProfesorDashboardProps {
  onLogout: () => void;
}

const ProfesorDashboard: React.FC<ProfesorDashboardProps> = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Talentos</h1>
              </div>
              <div className="ml-6">
                <span className="text-sm text-gray-500">Panel del Profesor</span>
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
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Bienvenido, Profesor {user?.nombre} 👨‍🏫
            </h2>
            <p className="text-purple-100">
              Gestiona tus clases, evalúa el progreso de tus estudiantes y mantente conectado con tu comunidad educativa.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <button className="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50 transition-colors">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Crear Tarea</p>
            </button>
            <button className="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50 transition-colors">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Calificar</p>
            </button>
            <button className="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50 transition-colors">
              <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Mensajes</p>
            </button>
            <button className="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50 transition-colors">
              <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Reportes</p>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Estudiantes
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">156</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Grupos Activos
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">8</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Tareas Pendientes
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">23</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Promedio General
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">8.4</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mis Grupos */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Mis Grupos</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800">Ver todos</button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        name: '3° A - Matemáticas', 
                        students: 28, 
                        average: 8.6, 
                        nextClass: 'Hoy 10:00 AM',
                        color: 'blue'
                      },
                      { 
                        name: '3° B - Matemáticas', 
                        students: 25, 
                        average: 8.2, 
                        nextClass: 'Hoy 2:00 PM',
                        color: 'green'
                      },
                      { 
                        name: '2° A - Álgebra', 
                        students: 30, 
                        average: 7.8, 
                        nextClass: 'Mañana 9:00 AM',
                        color: 'purple'
                      },
                      { 
                        name: '1° C - Aritmética', 
                        students: 32, 
                        average: 8.9, 
                        nextClass: 'Mañana 11:00 AM',
                        color: 'orange'
                      }
                    ].map((group, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-900">{group.name}</h4>
                          <div className={`w-3 h-3 rounded-full bg-${group.color}-500`}></div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Estudiantes:</span>
                            <span className="font-medium">{group.students}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Promedio:</span>
                            <span className="font-medium">{group.average}</span>
                          </div>
                          <div className="flex items-center text-xs mt-3">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{group.nextClass}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tareas Recientes */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Tareas por Revisar</h3>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">23 pendientes</span>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { 
                        title: 'Ejercicios de Ecuaciones Cuadráticas', 
                        group: '3° A', 
                        submitted: 25, 
                        total: 28, 
                        dueDate: 'Hace 2 días',
                        priority: 'high'
                      },
                      { 
                        title: 'Problemas de Geometría', 
                        group: '2° A', 
                        submitted: 28, 
                        total: 30, 
                        dueDate: 'Ayer',
                        priority: 'medium'
                      },
                      { 
                        title: 'Quiz de Fracciones', 
                        group: '1° C', 
                        submitted: 30, 
                        total: 32, 
                        dueDate: 'Hoy',
                        priority: 'low'
                      }
                    ].map((task, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{task.title}</h5>
                            <p className="text-sm text-gray-600 mt-1">{task.group}</p>
                            <div className="flex items-center mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${(task.submitted / task.total) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 whitespace-nowrap">
                                {task.submitted}/{task.total}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 text-right">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.priority === 'high' ? 'bg-red-100 text-red-800' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {task.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Calendario de Clases */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Horario de Hoy</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      { time: '08:00 - 09:30', class: '1° C - Aritmética', room: 'Aula 205' },
                      { time: '10:00 - 11:30', class: '3° A - Matemáticas', room: 'Aula 301', current: true },
                      { time: '14:00 - 15:30', class: '3° B - Matemáticas', room: 'Aula 301' },
                      { time: '16:00 - 17:30', class: '2° A - Álgebra', room: 'Aula 205' }
                    ].map((schedule, index) => (
                      <div key={index} className={`p-3 rounded-lg border-l-4 ${
                        schedule.current ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{schedule.class}</p>
                            <p className="text-sm text-gray-600">{schedule.room}</p>
                          </div>
                          <span className="text-sm text-gray-500">{schedule.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mensajes Recientes */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Mensajes</h3>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">2 nuevos</span>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      { 
                        sender: 'Sra. García (Madre)', 
                        subject: 'Consulta sobre tareas de María', 
                        time: '10:30 AM',
                        unread: true 
                      },
                      { 
                        sender: 'Director Académico', 
                        subject: 'Reunión departamental', 
                        time: 'Ayer',
                        unread: true 
                      },
                      { 
                        sender: 'Prof. López', 
                        subject: 'Coordinación de exámenes', 
                        time: '2 días',
                        unread: false 
                      }
                    ].map((message, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        message.unread ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              message.unread ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {message.sender}
                            </p>
                            <p className="text-xs text-gray-600 mt-1 truncate">
                              {message.subject}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estadísticas Rápidas */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Esta Semana</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tareas calificadas</span>
                      <span className="text-sm font-semibold text-gray-900">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Horas de clase</span>
                      <span className="text-sm font-semibold text-gray-900">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Estudiantes contactados</span>
                      <span className="text-sm font-semibold text-gray-900">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Promedio de grupo</span>
                      <span className="text-sm font-semibold text-green-600">↗ 8.4</span>
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

export default ProfesorDashboard;