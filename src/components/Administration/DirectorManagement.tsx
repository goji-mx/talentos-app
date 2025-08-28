import React, { useEffect, useState } from 'react';
import { Search, Plus, Edit3, MapPin, Users, ChevronLeft, ChevronRight, X, Check, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useDirectors } from '../../hooks/useDirectors';
import { useCreateDirector } from '../../hooks/useCreateDirector';
import { useEscuelas } from '../../hooks/useEscuelas';
import { useAssignSchool } from '../../hooks/useAssignSchool';

interface Director {
  id: string;
  nombre: string;
  correo: string;
  telefono: string;
  curp: string;
  escuela: {
    _id: string;
    nombre: string;
    municipio: string;
  } | null;
  fechaRegistro: string;
  activo: boolean;
}

// interface Escuela {
//   _id: string;
//   nombre: string;
//   municipio: string;
//   clave: string;
//   tieneDirector: boolean;
// }

interface DirectorManagementProps {
  secretariaId?: string;
}

const DirectorManagement: React.FC<DirectorManagementProps> = ({ secretariaId }) => {
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  
  // Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);
  
  // Estados para animaciones de cierre
  const [isClosingCreateModal, setIsClosingCreateModal] = useState(false);
  const [isClosingAssignModal, setIsClosingAssignModal] = useState(false);

  // Estados de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [escuelaSearchTerm, setEscuelaSearchTerm] = useState('');

  // Estados del formulario
  const [newDirector, setNewDirector] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    curp: '',
    password: ''
  });

  // Remove notification state - now using toast

  // Hooks para API calls
  const { directors, loading: directorsLoading, error: directorsError, refetch: refetchDirectors } = useDirectors(secretariaId);
  const { createDirector, loading: createLoading, error: createError } = useCreateDirector();
  const { escuelas, loading: escuelasLoading } = useEscuelas();
  const { assignSchool, loading: assignLoading, error: assignError } = useAssignSchool();

  // Filter directors based on search term
  const filteredDirectors = directors.filter(director =>
    director.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    director.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (director.escuela?.nombre || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funciones de paginación
  const totalPages = Math.ceil(filteredDirectors.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentDirectors = filteredDirectors.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Funciones para animaciones de cierre
  const handleCloseCreateModal = () => {
    setIsClosingCreateModal(true);
    setTimeout(() => {
      setShowCreateModal(false);
      setIsClosingCreateModal(false);
      setNewDirector({ nombre: '', correo: '', telefono: '', curp: '', password: '' });
    }, 300); // Duration should match CSS animation
  };

  const handleCloseAssignModal = () => {
    setIsClosingAssignModal(true);
    setTimeout(() => {
      setShowAssignModal(false);
      setIsClosingAssignModal(false);
      setSelectedDirector(null);
      setEscuelaSearchTerm('');
    }, 300); // Duration should match CSS animation
  };

  useEffect(() => {
    console.log('Directors loaded:', directors);
  }, [directors]);

  // Funciones del formulario
  const handleCreateDirector = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show loading toast
    const toastId = toast.loading('Creando director...', {
      position: 'top-center',
      style: {
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#1D1D1F',
        fontWeight: '500',
        fontSize: '15px',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '12px 16px',
        maxWidth: '350px',
      },
    });
    
    const success = await createDirector(newDirector, secretariaId);
    // Dismiss loading toast
    toast.dismiss(toastId);
    
    if (success) {
      toast.success('Director creado exitosamente', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: 'rgba(255, 255, 255, 0.95)',
          color: '#1D1D1F',
          fontWeight: '500',
          fontSize: '15px',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '12px 16px',
          maxWidth: '350px',
        },
        icon: '✅',
        iconTheme: {
          primary: '#34D399',
          secondary: '#FFFFFF',
        },
      });
      handleCloseCreateModal();
      refetchDirectors(); // Refresh the list
    }
  };

  useEffect(() => {
    if (createError) {
      toast.error(createError, {
        duration: 5000,
        position: 'top-center',
        style: {
          background: 'rgba(255, 255, 255, 0.95)',
          color: '#1D1D1F',
          fontWeight: '500',
          fontSize: '15px',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 59, 48, 0.2)',
          padding: '12px 16px',
          maxWidth: '350px',
        },
        icon: '⚠️',
        iconTheme: {
          primary: '#FF3B30',
          secondary: '#FFFFFF',
        },
      });
    }
  }, [createError]);

  const handleAssignSchool = async (escuelaId: string) => {
    if (selectedDirector) {
      // Show loading toast
      const toastId = toast.loading('Asignando escuela...', {
        position: 'top-center',
        style: {
          background: 'rgba(255, 255, 255, 0.95)',
          color: '#1D1D1F',
          fontWeight: '500',
          fontSize: '15px',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '12px 16px',
          maxWidth: '350px',
        },
      });
      
      const success = await assignSchool(selectedDirector.id, escuelaId);
      
      // Dismiss loading toast
      toast.dismiss(toastId);
      
      if (success) {
        toast.success('Escuela asignada exitosamente', {
          duration: 4000,
          position: 'top-center',
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#1D1D1F',
            fontWeight: '500',
            fontSize: '15px',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '12px 16px',
            maxWidth: '350px',
          },
          icon: '✅',
          iconTheme: {
            primary: '#34D399',
            secondary: '#FFFFFF',
          },
        });
        handleCloseAssignModal();
        refetchDirectors(); // Refresh the list
      } else if (assignError) {
        toast.error(assignError, {
          duration: 5000,
          position: 'top-center',
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#1D1D1F',
            fontWeight: '500',
            fontSize: '15px',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 59, 48, 0.2)',
            padding: '12px 16px',
            maxWidth: '350px',
          },
          icon: '⚠️',
          iconTheme: {
            primary: '#FF3B30',
            secondary: '#FFFFFF',
          },
        });
      }
    }
  };

  const filteredEscuelas = escuelas.filter(escuela =>
    escuela.nombre.toLowerCase().includes(escuelaSearchTerm.toLowerCase()) ||
    escuela.municipio.toLowerCase().includes(escuelaSearchTerm.toLowerCase())
  );

  // Remove old notification useEffect - now using toast

  if (directorsLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Cargando directores...</span>
        </div>
      </div>
    );
  }

  if (directorsError) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-center text-red-600">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>Error: {directorsError}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Toaster for notifications */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          // Define default options
          className: '',
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#1D1D1F',
            fontSize: '15px',
            fontWeight: '500',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '12px 16px',
            maxWidth: '350px',
          },
          // Default options for specific types
          success: {
            duration: 4000,
            iconTheme: {
              primary: '#34D399',
              secondary: '#FFFFFF',
            },
          },
          error: {
            duration: 5000,
            style: {
              border: '1px solid rgba(255, 59, 48, 0.2)',
            },
            iconTheme: {
              primary: '#FF3B30',
              secondary: '#FFFFFF',
            },
          },
          loading: {
            style: {
              border: '1px solid rgba(0, 122, 255, 0.2)',
            },
          },
        }}
      />

      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Gestión de Directores</h2>
            <p className="text-sm text-gray-600 mt-1">
              Administra los directores asignados a tu secretaría
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Director
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar directores por nombre, email o escuela..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Directors Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Director
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Escuela Asignada
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentDirectors.map((director) => (
              <tr key={director.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{director.nombre}</div>
                      <div className="text-sm text-gray-500">{director.correo}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {director.escuela ? (
                    <div>
                      <div className="text-sm font-medium text-gray-900">{director.escuela.nombre}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {director.escuela.municipio}
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400 italic">Sin escuela asignada</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{director.telefono}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {new Date(director.fechaRegistro).toLocaleDateString('es-MX')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    director.activo 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {director.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedDirector(director);
                      setShowAssignModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center transition-all duration-200 hover:scale-105 transform"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    {director.escuela ? 'Cambiar' : 'Asignar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Mostrando {startIndex + 1} a {Math.min(endIndex, filteredDirectors.length)} de {filteredDirectors.length} directores
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200 hover:scale-105 transform"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                currentPage === page
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-sm'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200 hover:scale-105 transform"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Create Director Modal */}
      {showCreateModal && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm transition-all duration-300 ${
          isClosingCreateModal 
            ? 'animate-fadeOut' 
            : 'animate-fadeIn'
        }`}>
          <div className={`bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl transition-all duration-300 transform ${
            isClosingCreateModal 
              ? 'animate-slideOut scale-95 opacity-0' 
              : 'animate-slideIn scale-100 opacity-100'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Registrar Nuevo Director</h3>
              <button
                onClick={handleCloseCreateModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleCreateDirector} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={newDirector.nombre}
                  onChange={(e) => setNewDirector({...newDirector, nombre: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dr. María González Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CURP *
                </label>
                <input
                  type="text"
                  required
                  value={newDirector.curp}
                  onChange={(e) => setNewDirector({...newDirector, curp: e.target.value.toUpperCase()})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="CURP018123456HDFRRL09"
                  maxLength={18}
                  pattern="[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z]{2}"
                  title="Ingresa un CURP válido de 18 caracteres"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email institucional *
                </label>
                <input
                  type="email"
                  required
                  value={newDirector.correo}
                  onChange={(e) => setNewDirector({...newDirector, correo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="director@educacion.gob.mx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  required
                  value={newDirector.telefono}
                  onChange={(e) => {
                    // Only allow numbers
                    const value = e.target.value.replace(/\D/g, '');
                    setNewDirector({...newDirector, telefono: value});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2281234567"
                  maxLength={10}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Solo números, máximo 10 dígitos
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña temporal *
                </label>
                <input
                  type="password"
                  required
                  value={newDirector.password}
                  onChange={(e) => setNewDirector({...newDirector, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseCreateModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {createLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creando...
                    </>
                  ) : (
                    'Registrar Director'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign School Modal */}
      {showAssignModal && selectedDirector && (
        <div className={`fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-md transition-all duration-300 ${
          isClosingAssignModal 
            ? 'animate-fadeOut' 
            : 'animate-fadeIn'
        }`}>
          <div className={`bg-white rounded-lg p-6 w-full max-w-lg mx-4 shadow-2xl transition-all duration-300 transform ${
            isClosingAssignModal 
              ? 'animate-slideOut scale-95 opacity-0' 
              : 'animate-slideIn scale-100 opacity-100'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Asignar Escuela - {selectedDirector.nombre}
              </h3>
              <button
                onClick={handleCloseAssignModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Search Schools */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar escuela..."
                  value={escuelaSearchTerm}
                  onChange={(e) => setEscuelaSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Schools List */}
            <div className="max-h-64 overflow-y-auto space-y-2">
              {escuelasLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-gray-600">Cargando escuelas...</span>
                </div>
              ) : filteredEscuelas.map((escuela) => (
                <div
                  key={escuela._id}
                  className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
                  onClick={() => handleAssignSchool(escuela._id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{escuela.nombre}</h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{escuela.municipio}</span>
                        <span className="mx-2">•</span>
                        <span>Clave: {escuela.clave}</span>
                      </div>
                    </div>
                    <button 
                      className="text-blue-600 hover:text-blue-800 transition-all duration-200 hover:scale-110 transform disabled:opacity-50"
                      disabled={assignLoading}
                    >
                      {assignLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredEscuelas.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No se encontraron escuelas disponibles</p>
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCloseAssignModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectorManagement;