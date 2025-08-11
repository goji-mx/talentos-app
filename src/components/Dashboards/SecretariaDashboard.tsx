import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserDropdown from '../ui/UserDropdown';
import DirectorManagement from '../Administration/DirectorManagement';
import { Users, FileText, Calendar, Phone, Mail, Clock, Bell, UserCheck, AlertCircle, Shield } from 'lucide-react';

interface SecretariaDashboardProps {
  onLogout: () => void;
}

const SecretariaDashboard: React.FC<SecretariaDashboardProps> = ({ onLogout }) => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'directores'>('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Talentos</h1>
              </div>
              <div className="ml-6">
                <span className="text-sm text-gray-500">Panel de Secretaría</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Navigation Pills */}
              <div className="flex items-center space-x-2 mr-4">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeSection === 'dashboard'
                      ? 'bg-pink-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 hover:shadow-md'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveSection('directores')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center transform hover:scale-105 ${
                    activeSection === 'directores'
                      ? 'bg-pink-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 hover:shadow-md'
                  }`}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Directores
                </button>
              </div>
              <Bell className="h-5 w-5 text-gray-400 cursor-pointer" />
              <UserDropdown onLogout={onLogout} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeSection === 'directores' ? (
            /* Director Management Section */
            <div className="animate-fadeIn">
              <DirectorManagement secretariaId={user?.userId} />
            </div>
          ) : (
            /* Dashboard Section */
            <div className="animate-fadeIn">
            <>
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg shadow-lg p-6 text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Buenos días, {user?.nombre} 👩‍💼
            </h2>
            <p className="text-pink-100">
              Centro de administración escolar. Gestiona estudiantes, comunicaciones y procesos administrativos.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button className="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50 transition-colors">
              <UserCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Registrar Estudiante</p>
            </button>
            <button className="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50 transition-colors">
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Generar Constancia</p>
            </button>
            <button className="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50 transition-colors">
              <Phone className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Contactar Padre</p>
            </button>
            <button className="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50 transition-colors">
              <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Programar Cita</p>
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
                      Estudiantes Activos
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">1,247</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Documentos Pendientes
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">15</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Phone className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Llamadas Hoy
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">23</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Citas Programadas
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">8</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tareas Pendientes */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Tareas Prioritarias</h3>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">5 urgentes</span>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { 
                        task: 'Procesar inscripciones nuevas', 
                        count: 12, 
                        deadline: 'Hoy 3:00 PM',
                        priority: 'high',
                        type: 'enrollment'
                      },
                      { 
                        task: 'Generar constancias de estudio', 
                        count: 8, 
                        deadline: 'Mañana',
                        priority: 'medium',
                        type: 'documents'
                      },
                      { 
                        task: 'Contactar padres - faltas', 
                        count: 5, 
                        deadline: 'Hoy 5:00 PM',
                        priority: 'high',
                        type: 'communication'
                      },
                      { 
                        task: 'Actualizar expedientes', 
                        count: 20, 
                        deadline: 'Esta semana',
                        priority: 'low',
                        type: 'records'
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            item.priority === 'high' ? 'bg-red-500' :
                            item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{item.task}</p>
                            <div className="flex items-center mt-1">
                              <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">{item.deadline}</span>
                            </div>
                          </div>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comunicaciones Recientes */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Comunicaciones del Día</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800">Ver todas</button>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { 
                        type: 'call', 
                        contact: 'Sra. María González', 
                        student: 'Ana González - 2° B',
                        reason: 'Consulta sobre calificaciones', 
                        time: '10:30 AM',
                        status: 'completed'
                      },
                      { 
                        type: 'email', 
                        contact: 'Prof. Carlos Ruiz', 
                        student: 'Solicitud de documentos',
                        reason: 'Constancia de estudios', 
                        time: '11:45 AM',
                        status: 'pending'
                      },
                      { 
                        type: 'meeting', 
                        contact: 'Sr. José Pérez', 
                        student: 'Luis Pérez - 3° A',
                        reason: 'Reunión disciplinaria', 
                        time: '2:00 PM',
                        status: 'scheduled'
                      }
                    ].map((comm, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 mr-3">
                          {comm.type === 'call' && <Phone className="h-5 w-5 text-green-600" />}
                          {comm.type === 'email' && <Mail className="h-5 w-5 text-blue-600" />}
                          {comm.type === 'meeting' && <Calendar className="h-5 w-5 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{comm.contact}</p>
                          <p className="text-sm text-gray-600">{comm.student}</p>
                          <p className="text-xs text-gray-500 mt-1">{comm.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{comm.time}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            comm.status === 'completed' ? 'bg-green-100 text-green-800' :
                            comm.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {comm.status === 'completed' ? 'Completado' :
                             comm.status === 'pending' ? 'Pendiente' : 'Programado'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Agenda del Día */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Agenda de Hoy</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      { 
                        time: '9:00 AM', 
                        event: 'Reunión directiva', 
                        type: 'meeting',
                        status: 'completed'
                      },
                      { 
                        time: '11:00 AM', 
                        event: 'Atención a padres', 
                        type: 'service',
                        status: 'current'
                      },
                      { 
                        time: '2:00 PM', 
                        event: 'Cita Sr. Pérez', 
                        type: 'appointment',
                        status: 'scheduled'
                      },
                      { 
                        time: '4:00 PM', 
                        event: 'Procesamiento documentos', 
                        type: 'admin',
                        status: 'scheduled'
                      }
                    ].map((item, index) => (
                      <div key={index} className={`p-3 rounded-lg border-l-4 ${
                        item.status === 'current' ? 'border-blue-400 bg-blue-50' :
                        item.status === 'completed' ? 'border-green-400 bg-green-50' :
                        'border-gray-300 bg-gray-50'
                      }`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{item.event}</p>
                            <p className="text-sm text-gray-600">{item.time}</p>
                          </div>
                          {item.status === 'current' && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Alertas y Notificaciones */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Alertas</h3>
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      { 
                        type: 'urgent', 
                        message: 'Expediente de Juan Martínez requiere documentos', 
                        time: '30 min'
                      },
                      { 
                        type: 'reminder', 
                        message: 'Recordatorio: Reunión con directora a las 3:00 PM', 
                        time: '2 horas'
                      },
                      { 
                        type: 'system', 
                        message: 'Sistema de calificaciones actualizado', 
                        time: '1 día'
                      }
                    ].map((alert, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        alert.type === 'urgent' ? 'bg-red-50 border border-red-200' :
                        alert.type === 'reminder' ? 'bg-yellow-50 border border-yellow-200' :
                        'bg-blue-50 border border-blue-200'
                      }`}>
                        <p className={`text-sm font-medium ${
                          alert.type === 'urgent' ? 'text-red-800' :
                          alert.type === 'reminder' ? 'text-yellow-800' :
                          'text-blue-800'
                        }`}>
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Hace {alert.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estadísticas Rápidas */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Resumen Semanal</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Estudiantes procesados</span>
                      <span className="text-sm font-semibold text-gray-900">142</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Documentos generados</span>
                      <span className="text-sm font-semibold text-gray-900">67</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Llamadas realizadas</span>
                      <span className="text-sm font-semibold text-gray-900">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Citas programadas</span>
                      <span className="text-sm font-semibold text-green-600">↗ 24</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SecretariaDashboard;