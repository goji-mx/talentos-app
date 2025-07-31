// src/components/UserManagement.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  ChevronUp,
  ChevronDown,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { gsap } from 'gsap';
import Breadcrumb from '../ui/BreadCrum';
import { usePaginatedUsers } from '../../hooks/usePaginatedUsers';
import NewUserModal from './NewUserModal'; // Importar el nuevo modal
import { useRegisterUser } from '../../hooks/useRegisterUser';
import Notification from '../ui/Notificaciont';
import { useUpdateAccess } from '../../hooks/useUpdateAccess';
import EditUserModal from './EditUserModal';
import { useEditUser } from '../../hooks/useEditUser';

// Tipo para cada fila de la tabla
interface TableUser {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  userType: string;
  access: boolean;
  authType: string;
  emailVerified: boolean;
}

interface UserManagementProps {
  onLogout: () => void;
}

// Tipo para los datos del formulario del modal
interface UserFormData {
  _id: string;
  specialty?: string | undefined;
  university?: string | undefined;
  residencyHospital?: string | undefined;
  licenseNumber?: string | undefined;
  residency?: string | undefined;
  document?: string | undefined;
  fullName: string;
  email: string;
  phone: string;
  userType: 'student' | 'admin' | 'seller';
  studentId?: string;
  grade?: string;
  department?: string;
  position?: string;
  salesRegion?: string;
  commissionRate?: string;
  customSpecialty?: string;
  customHospital?: string;
  acceptPrivacyPolicy: boolean;
}

const UserManagement: React.FC<UserManagementProps> = ({ onLogout }) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [notif, setNotif] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    visible: false,
    message: '',
    type: 'info',
  });
  // State para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState<UserFormData | null>(null);

  // State to control what data is actually displayed
  const [displayedUsers, setDisplayedUsers] = useState<TableUser[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  // Usamos el hook para registrar usuarios
  const { registerUser } = useRegisterUser();
  const { updateAccess } = useUpdateAccess();
  const { editUser } = useEditUser();

  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info'
  ) => {
    setNotif({ visible: true, message, type });
  };
  const handleCloseNotification = () => {
    setNotif(prev => ({ ...prev, visible: false }));
  };

  // 1) Usamos el hook con búsqueda y orden en backend:
  const {
    users: apiUsers,
    loading,
    error,
    totalPages,
    currentPage,
    setPage,
    searchTerm,
    setSearchTerm,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    refetch
  } = usePaginatedUsers(1, 10, '', 'fullName', 'asc');

  // 2) Animaciones GSAP en montaje
  useEffect(() => {
    gsap.set([headerRef.current, tableRef.current], {
      opacity: 0,
      y: 30
    });

    gsap.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out"
    });

    gsap.to(tableRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.1,
      delay: 0.2,
      ease: "power2.out"
    });
  }, []);

  // 2.5) Debounce search term
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
      setPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [localSearchTerm, setSearchTerm, setPage]);

  // 3) Transformamos apiUsers a TableUser[]
  const users: TableUser[] = apiUsers.map(user => ({
    _id: user._id || '',
    fullName: user.fullName || '',
    email: user.email || '',
    phone: user.phone || '',
    userType:
      user.userType === 'admin' ? 'Administrador' :
        user.userType === 'student' ? 'Estudiante' :
          user.userType === 'seller' ? 'Ventas' :
            (user.userType || ''),
    access: user.allowAccess !== undefined ? user.allowAccess : false,
    authType: user.authType || '',
    emailVerified: user.emailVerified !== undefined ? user.emailVerified : false
  }));

  // 4) Enhanced data change handler with height animation
  useEffect(() => {
    if (loading) return;

    // On first load, set data immediately without animation
    if (isFirstLoad) {
      setDisplayedUsers(users);
      setIsFirstLoad(false);
      return;
    }

    // Check if data actually changed
    const hasDataChanged = JSON.stringify(users) !== JSON.stringify(displayedUsers);

    if (hasDataChanged && !isAnimating && tableBodyRef.current && tableContainerRef.current) {
      setIsAnimating(true);

      const rows = tableBodyRef.current.querySelectorAll('tr');
      const tableContainer = tableContainerRef.current;

      // IMMEDIATELY lock the current height to prevent any jumping
      const currentHeight = tableContainer.offsetHeight;
      gsap.set(tableContainer, { height: currentHeight, overflow: 'hidden' });

      if (rows.length > 0) {
        // Kill any existing animations first
        gsap.killTweensOf([rows, tableContainer]);

        // First: exit animation with OLD data
        gsap.to(rows, {
          opacity: 0,
          x: -20,
          duration: 0.2,
          ease: "power2.in",
          stagger: 0.01,
          onComplete: () => {
            // Create a temporary container to measure new height without affecting layout
            const tempContainer = tableContainer.cloneNode(true) as HTMLElement;
            tempContainer.style.position = 'absolute';
            tempContainer.style.top = '-9999px';
            tempContainer.style.height = 'auto';
            tempContainer.style.visibility = 'hidden';
            document.body.appendChild(tempContainer);

            // Update displayed data AFTER exit animation completes
            setDisplayedUsers(users);

            // Use requestAnimationFrame to ensure DOM is updated
            requestAnimationFrame(() => {
              // Update the temp container with new content
              const newTableBody = tableBodyRef.current;
              if (newTableBody && tempContainer) {
                const tempTableBody = tempContainer.querySelector('tbody');
                if (tempTableBody) {
                  tempTableBody.innerHTML = newTableBody.innerHTML;
                }

                // Get the natural height from temp container
                const newHeight = tempContainer.offsetHeight;

                // Remove temp container
                document.body.removeChild(tempContainer);

                // Animate height change smoothly
                gsap.to(tableContainer, {
                  height: newHeight,
                  duration: 0.4,
                  ease: "power2.inOut",
                  onComplete: () => {
                    // Reset height and overflow after animation
                    gsap.set(tableContainer, { height: 'auto', overflow: 'visible' });
                  }
                });

                // Handle new rows animation
                const newRows = tableBodyRef.current?.querySelectorAll('tr');
                if (newRows && newRows.length > 0) {
                  // Kill any existing animations on new rows
                  gsap.killTweensOf(newRows);

                  // Set initial state for new rows
                  gsap.set(newRows, { opacity: 0, x: 20 });

                  // Entry animation with NEW data (slight delay to sync with height animation)
                  gsap.to(newRows, {
                    opacity: 1,
                    x: 0,
                    duration: 0.2,
                    delay: 0.1,
                    ease: "power2.out",
                    stagger: 0.03,
                    onComplete: () => {
                      setIsAnimating(false);
                    }
                  });
                } else {
                  setIsAnimating(false);
                }
              } else {
                // Fallback if temp container method fails
                gsap.set(tableContainer, { height: 'auto', overflow: 'visible' });
                setIsAnimating(false);
              }
            });
          }
        });
      } else {
        // No existing rows case
        setDisplayedUsers(users);

        requestAnimationFrame(() => {
          if (tableContainerRef.current) {
            // Calculate new height after React updates
            const newHeight = tableContainer.scrollHeight;

            // Animate to new height
            gsap.to(tableContainer, {
              height: newHeight,
              duration: 0.3,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(tableContainer, { height: 'auto', overflow: 'visible' });

                // Animate in new rows
                const newRows = tableBodyRef.current?.querySelectorAll('tr');
                if (newRows && newRows.length > 0) {
                  gsap.set(newRows, { opacity: 0, x: 20 });
                  gsap.to(newRows, {
                    opacity: 1,
                    x: 0,
                    duration: 0.2,
                    ease: "power2.out",
                    stagger: 0.03
                  });
                }
                setIsAnimating(false);
              }
            });
          } else {
            setIsAnimating(false);
          }
        });
      }
    } else if (!hasDataChanged && displayedUsers.length === 0) {
      // Handle case where we have data but displayedUsers is empty

      // setDisplayedUsers(users);
    }
  }, [users, loading, isAnimating, displayedUsers, isFirstLoad]);

  // 5) Animación para paginación
  useEffect(() => {
    if (paginationRef.current && !loading) {
      gsap.fromTo(
        paginationRef.current,
        { opacity: 0.5, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [currentPage, totalPages, loading]);

  // 6) Manejar clic en encabezado para ordenar con animación
  const handleSort = (field: keyof TableUser) => {
    if (isAnimating) return; // Prevenir clicks durante animación

    // Animación del header de ordenamiento
    const headerElement = document.querySelector(`th[data-sort="${field}"]`);
    if (headerElement) {
      gsap.to(headerElement, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }

    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setPage(1);
  };

  // 7) Icono de orden con animación
  const SortIcon = ({ field }: { field: keyof TableUser }) => {
    if (sortField !== field) return null;

    const IconComponent = sortDirection === 'asc' ? ChevronUp : ChevronDown;

    return (
      <IconComponent
        className="w-4 h-4 ml-1 transition-transform duration-200 ease-out"
        style={{
          animation: 'sortIconBounce 0.3s ease-out'
        }}
      />
    );
  };

  // 8) Toggle de acceso con animación
  const toggleAccess = async (userId: string) => {
    if (isAnimating) return;

    const toggleElement = document.querySelector(`input[data-user-id="${userId}"]`);
    if (toggleElement) {
      gsap.to(toggleElement.parentElement, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
    // setDisplayedUsers(prev =>
    //   prev.map(u =>
    //     u._id === userId ? { ...u, access: !u.access } : u
    //   )
    // );

    // Llamada al backend para persistir el cambio
    const newAccess = !displayedUsers.find(u => u._id === userId)?.access;
    await updateAccess({ userId, allowAccess: newAccess })
      .then(() => {
        showNotification('Acceso actualizado correctamente', 'success');
        refetch(); // Refrescar datos después de actualizar
      })
      .catch(() => {
        showNotification(`Error actualizando acceso, intente nuevamente`, 'error');
      });

  };

  // 9) Editar usuario con animación
  const handleEditUser = (userId: string) => {
    if (isAnimating) return;

    const editButton = document.querySelector(`button[data-edit-user="${userId}"]`);
    if (editButton) {
      gsap.to(editButton, {
        rotation: 360,
        duration: 0.5,
        ease: "power2.out"
      });
    }
    const userToEdit = apiUsers.find(u => u._id === userId);
    if (!userToEdit) return;

    // ②: Mapear a UserFormData
    const mappedData: UserFormData = {
      _id: userToEdit._id ? userToEdit._id  : '',
      fullName: userToEdit.fullName ? userToEdit.fullName : '',
      email: userToEdit.email ? userToEdit.email : '',
      phone: userToEdit.phone || '',
      userType: userToEdit.userType as 'student' | 'admin' | 'seller',
      specialty: userToEdit.specialty || '',
      customSpecialty: '',
      university: userToEdit.university || '',
      residencyHospital: userToEdit.residencyHospital || '',
      customHospital: '',
      licenseNumber: userToEdit.licenseNumber || '',
      residency: userToEdit.residency || '',
      document: userToEdit.document || '',
      acceptPrivacyPolicy: true
    };
    setSelectedUserData(mappedData);
    setIsEditModalOpen(true);
  };

  // 10) Manejar apertura del modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 11) Manejar cierre del modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 12) Manejar envío del formulario del modal
  const handleCreateUser = async (userData: UserFormData) => {
    try {
      await registerUser({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        userType: userData.userType,
        specialty: userData.specialty,
        university: userData.university,
        residencyHospital: userData.residencyHospital,
        licenseNumber: userData.licenseNumber,
        residency: userData.residency,
        document: userData.document
      });
      // 2) Mostrar mensaje de éxito
      showNotification('Operación exitosa', 'success');

      refetch();

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      // Aquí podrías mostrar notificación de error usando registerError
      const message = error instanceof Error ? error.message : 'Error desconocido';
      showNotification(`Error al registrar usuario: ${message}`, 'error');
    }
  };

  // 13) Manejar cambio de página con animación
  const handlePageChange = (newPage: number) => {
    if (isAnimating || newPage === currentPage) return;

    // Animación del botón de página
    const pageButton = document.querySelector(`button[data-page="${newPage}"]`);
    if (pageButton) {
      gsap.to(pageButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }

    setPage(newPage);
  };

  // 14) Renderizado de paginación con animaciones
  const renderPagination = () => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div
        ref={paginationRef}
        className="bg-white px-6 py-4 border-t border-gray-200 flex justify-center items-center space-x-2"
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isAnimating}
          className={`
            px-3 py-1 rounded transition-all duration-200 transform hover:scale-105
            ${currentPage === 1 || isAnimating
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md'}
          `}
        >
          Anterior
        </button>

        {pages.map(pageNum => (
          <button
            key={pageNum}
            data-page={pageNum}
            onClick={() => handlePageChange(pageNum)}
            disabled={isAnimating}
            className={`
              w-8 h-8 rounded flex items-center justify-center text-sm font-medium
              transition-all duration-200 transform hover:scale-110
              ${pageNum === currentPage
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              ${isAnimating ? 'cursor-not-allowed opacity-70' : ''}
            `}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isAnimating}
          className={`
            px-3 py-1 rounded transition-all duration-200 transform hover:scale-105
            ${currentPage === totalPages || isAnimating
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md'}
          `}
        >
          Siguiente
        </button>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen">
      {/* Header con Breadcrumb (sticky) */}
      <div className='sticky top-0 z-50 bg-white border-b border-gray-200 px-6'>
        <Breadcrumb
          items={[
            { label: 'Administración', path: '/admin' },
            { label: 'Gestión de usuarios', path: '/admin/users' }
          ]}
          onLogout={onLogout}
        />
      </div>

      {/* Contenido principal con gradiente */}
      <div
        className="w-full min-h-screen p-8"
        style={{
          background: 'linear-gradient(45deg, rgb(140,159,233) 0%, rgb(249,250,254) 50%, rgb(140,159,233) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Sección de título + controles */}
          <div ref={headerRef} className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestión de usuarios</h1>
            <p className="text-gray-600 text-sm mb-4">
              Administra y gestiona la información de los usuarios de la plataforma.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
            <button
              onClick={handleOpenModal}
              className="cursor-pointer bg-[rgb(92,70,154)] hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105 hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              Nuevo usuario
            </button>

            <div className="relative">
              <Search className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Buscar..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="w-full px-3 sm:w-80 py-1 rounded-2xl border-gray-300 focus:outline-none bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 focus:shadow-md"
              />
              {localSearchTerm !== searchTerm && (
                <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                  <Loader2 className="w-3 h-3 animate-spin text-purple-500" />
                </div>
              )}
            </div>
          </div>

          {/* Sección de la tabla con container animado */}
          <div
            ref={tableRef}
            className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${loading ? 'loading-overlay' : ''
              }`}
          >
            {loading && isFirstLoad ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600 mr-3" />
                <span className="text-gray-600">Cargando usuarios...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12">
                <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
                <div className="text-center">
                  <p className="text-red-600 font-medium">Error al cargar usuarios</p>
                  <p className="text-gray-500 text-sm mt-1">{error.message}</p>
                  <button
                    onClick={refetch}
                    className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    Reintentar
                  </button>
                </div>
              </div>
            ) : displayedUsers.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-gray-600 font-medium">No hay usuarios disponibles</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Ajusta tu búsqueda o vuelve a cargar más tarde.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Table container with height animation */}
                <div ref={tableContainerRef} className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[rgb(196,199,232)]">
                      <tr>
                        <th
                          data-sort="fullName"
                          className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-[rgb(132,138,210)] transition-all duration-200 select-none"
                          onClick={() => handleSort('fullName')}
                        >
                          <div className="flex items-center">
                            Nombre
                            <SortIcon field="fullName" />
                          </div>
                        </th>
                        <th
                          data-sort="email"
                          className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-[rgb(132,138,210)] transition-all duration-200 select-none"
                          onClick={() => handleSort('email')}
                        >
                          <div className="flex items-center">
                            Correo
                            <SortIcon field="email" />
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Teléfono
                        </th>
                        <th
                          data-sort="userType"
                          className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-[rgb(132,138,210)] transition-all duration-200 select-none"
                          onClick={() => handleSort('userType')}
                        >
                          <div className="flex items-center">
                            Tipo de usuario
                            <SortIcon field="userType" />
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Acceso
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody ref={tableBodyRef} className="divide-y divide-gray-200">
                      {displayedUsers.map((user, index) => (
                        <tr
                          key={user._id}
                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-purple-50'} 
                            transition-all duration-200 hover:bg-purple-100 hover:shadow-sm`}
                        >
                          <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                            <div>
                              <div>{user.fullName}</div>
                              <div className="text-xs text-gray-500 capitalize">{user.authType}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div>
                              <div>{user.email}</div>

                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {user.phone || 'No disponible'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${user.userType === 'Estudiante'
                              ? 'bg-blue-100 text-blue-800'
                              : user.userType === 'Ventas'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                              }`}>
                              {user.userType}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                data-user-id={user._id}
                                checked={user.access}
                                onChange={() => toggleAccess(user._id)}
                                disabled={isAnimating}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              data-edit-user={user._id}
                              onClick={() => handleEditUser(user._id)}
                              disabled={isAnimating}
                              className="text-gray-600 hover:text-purple-600 transition-all duration-200 transform hover:scale-110 disabled:opacity-50"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Paginador */}
                {renderPagination()}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de nuevo usuario */}
      <NewUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateUser}
      />
      {/* Modal para editar usuario */}
      {isEditModalOpen && selectedUserData && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={selectedUserData}
          onSubmit={async (updatedData) => {
            try {
              await editUser({
                id: updatedData._id!,
                fullName: updatedData.fullName,
                email: updatedData.email,
                phone: updatedData.phone,
                userType: updatedData.userType,
                specialty: updatedData.specialty,
                university: updatedData.university,
                residencyHospital: updatedData.residencyHospital,
                licenseNumber: updatedData.licenseNumber,
                residency: updatedData.residency,
                document: updatedData.document,
              });
              setIsEditModalOpen(false);
              refetch();
              showNotification('Usuario actualizado', 'success');
            } catch (err) {
              showNotification('Error al actualizar usuario', 'error');
            }
          }}
        />
      )}
      {notif.visible && (
        <div className="fixed top-4 right-4 z-50">
          <Notification
            message={notif.message}
            type={notif.type}
            onClose={handleCloseNotification}
          />
        </div>
      )}
    </div>
  );
};

export default UserManagement;