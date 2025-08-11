import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import UserDropdown from '../ui/UserDropdown';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  BarChart3, 
  AlertCircle,
  Target,
  DollarSign,
  UserCheck,
  Clock,
  Bell
} from 'lucide-react';

interface DirectorDashboardProps {
  onLogout: () => void;
}

const DirectorDashboard: React.FC<DirectorDashboardProps> = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Talentos</h1>
              </div>
              <div className="ml-6">
                <span className="text-sm text-gray-500">Panel de Dirección</span>
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
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-lg shadow-lg p-6 text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Bienvenido, Director {user?.nombre} 🎓
            </h2>
            <p className="text-indigo-100">
              Panel de control administrativo. Supervisa el rendimiento institucional, toma decisiones estratégicas y gestiona el personal.
            </p>
          </div>

          {/* Executive KPIs */}
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
                    <dd className="text-lg font-medium text-gray-900">1,247</dd>
                    <dd className="text-sm text-green-600">+12 este mes</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserCheck className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Personal Docente
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">87</dd>
                    <dd className="text-sm text-blue-600">95% asistencia</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Promedio Institucional
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">8.4</dd>
                    <dd className="text-sm text-green-600">+0.2 vs mes anterior</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Eficiencia Terminal
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">92%</dd>
                    <dd className="text-sm text-green-600">Meta: 90%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Rendimiento Académico por Grado */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Rendimiento por Grado</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800">Ver reporte completo</button>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { grade: '1° Secundaria', average: 8.6, students: 312, trend: 'up' },
                      { grade: '2° Secundaria', average: 8.2, students: 298, trend: 'stable' },
                      { grade: '3° Secundaria', average: 8.8, students: 285, trend: 'up' },
                      { grade: 'Preparatoria', average: 8.1, students: 352, trend: 'down' }
                    ].map((grade, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{grade.grade}</h4>
                            <p className="text-sm text-gray-600">{grade.students} estudiantes</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-gray-900 mr-2">
                            {grade.average}
                          </span>
                          <TrendingUp 
                            className={`h-4 w-4 ${
                              grade.trend === 'up' ? 'text-green-500' : 
                              grade.trend === 'down' ? 'text-red-500 rotate-180' : 'text-gray-400'
                            }`} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Asuntos Prioritarios */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Asuntos Prioritarios</h3>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">3 urgentes</span>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      {
                        title: 'Revisión presupuestal anual',
                        description: 'Análisis de gastos operativos y proyecciones 2025',
                        priority: 'high',
                        deadline: 'Viernes',
                        department: 'Administración'
                      },
                      {
                        title: 'Evaluación docente semestral',
                        description: 'Revisión de desempeño de 12 profesores',
                        priority: 'high',
                        deadline: 'Próxima semana',
                        department: 'Recursos Humanos'
                      },
                      {
                        title: 'Plan de mejora académica',
                        description: 'Estrategias para mejorar rendimiento en Matemáticas',
                        priority: 'medium',
                        deadline: 'Este mes',
                        department: 'Académico'
                      },
                      {
                        title: 'Renovación de convenios',
                        description: 'Convenio con empresas para prácticas profesionales',
                        priority: 'medium',
                        deadline: 'Mes próximo',
                        department: 'Vinculación'
                      }
                    ].map((issue, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <div className={`w-3 h-3 rounded-full mr-2 ${
                                issue.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                              }`}></div>
                              <h4 className="font-medium text-gray-900">{issue.title}</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">{issue.department}</span>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {issue.deadline}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Métricas Financieras */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Resumen Financiero</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Ingresos del Mes</p>
                      <p className="text-xl font-bold text-green-600">$2,450,000</p>
                      <p className="text-xs text-green-600">+5% vs mes anterior</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Gastos Operativos</p>
                      <p className="text-xl font-bold text-blue-600">$1,890,000</p>
                      <p className="text-xs text-blue-600">77% del presupuesto</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Utilidad Neta</p>
                      <p className="text-xl font-bold text-purple-600">$560,000</p>
                      <p className="text-xs text-purple-600">23% margen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Reuniones del Día */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Agenda Ejecutiva</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      {
                        time: '9:00 AM',
                        event: 'Consejo Técnico',
                        attendees: '8 directivos',
                        status: 'completed'
                      },
                      {
                        time: '11:00 AM',
                        event: 'Reunión con Padres',
                        attendees: 'Comité de padres',
                        status: 'current'
                      },
                      {
                        time: '2:00 PM',
                        event: 'Evaluación Docente',
                        attendees: 'Prof. García, RH',
                        status: 'scheduled'
                      },
                      {
                        time: '4:00 PM',
                        event: 'Revisión Presupuestal',
                        attendees: 'Contador, Tesorero',
                        status: 'scheduled'
                      }
                    ].map((meeting, index) => (
                      <div key={index} className={`p-3 rounded-lg border-l-4 ${
                        meeting.status === 'current' ? 'border-blue-400 bg-blue-50' :
                        meeting.status === 'completed' ? 'border-green-400 bg-green-50' :
                        'border-gray-300 bg-gray-50'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{meeting.event}</p>
                            <p className="text-sm text-gray-600">{meeting.attendees}</p>
                            <p className="text-xs text-gray-500 mt-1">{meeting.time}</p>
                          </div>
                          {meeting.status === 'current' && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notificaciones Importantes */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      {
                        type: 'urgent',
                        title: 'Solicitud de aumento presupuestal',
                        description: 'Departamento de Mantenimiento requiere fondos adicionales',
                        time: '1 hora',
                        from: 'Jefe de Mantenimiento'
                      },
                      {
                        type: 'important',
                        title: 'Propuesta plan académico',
                        description: 'Coordinación Académica presenta nueva propuesta curricular',
                        time: '3 horas',
                        from: 'Coord. Académica'
                      },
                      {
                        type: 'info',
                        title: 'Reporte de asistencia',
                        description: 'Reporte semanal de asistencia estudiantil disponible',
                        time: '1 día',
                        from: 'Sistema'
                      }
                    ].map((notification, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${
                        notification.type === 'urgent' ? 'bg-red-50 border-red-200' :
                        notification.type === 'important' ? 'bg-orange-50 border-orange-200' :
                        'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="flex justify-between items-start mb-1">
                          <h5 className={`font-medium text-sm ${
                            notification.type === 'urgent' ? 'text-red-800' :
                            notification.type === 'important' ? 'text-orange-800' :
                            'text-blue-800'
                          }`}>
                            {notification.title}
                          </h5>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{notification.description}</p>
                        <p className="text-xs text-gray-500">De: {notification.from}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Indicadores Clave */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Indicadores Institucionales</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Satisfacción estudiantil</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                        <span className="text-sm font-semibold text-green-600">87%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Retención estudiantil</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                        <span className="text-sm font-semibold text-blue-600">94%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Eficiencia docente</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                        </div>
                        <span className="text-sm font-semibold text-purple-600">91%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cumplimiento objetivos</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-orange-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                        </div>
                        <span className="text-sm font-semibold text-orange-600">89%</span>
                      </div>
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

export default DirectorDashboard;