import React, { useState } from 'react';
import { MapPin, Edit3, Trash2, MoreVertical } from 'lucide-react';
import AddSchoolModal from './AddSchoolModal'; 
import EditSchoolModal from './EditSchoolModal';
import DeleteSchoolModal from './DeleteSchoolModal';

interface School {
    id: number;
    name: string;
    address: string;
    students: number;
    teachers: number;
    director: string;
    wellbeingPercentage: number;
    color?: string;
    level?: string;
    zone?: string;
    rvoe?: string;
    directorDetails?: {
        name: string;
        email: string;
        curp: string;
        mobile: string;
    };
}

interface SchoolManagementProps {
    secretariaId?: string;
}

const SchoolManagement: React.FC<SchoolManagementProps> = ({ }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    const [schools, setSchools] = useState<School[]>([
        {
            id: 1,
            name: 'Escuela Primaria Benito Juárez',
            address: 'Av. Reforma 123, Centro',
            students: 450,
            teachers: 18,
            director: 'Dra. María González',
            wellbeingPercentage: 85,
            color: 'bg-lime-200',
            level: 'Secundaria',
            zone: 'Norte',
            rvoe: 'ES-242-85',
            directorDetails: {
                name: 'Dra. María González',
                email: 'maria.gonzalez@benito.edu.mx',
                curp: 'GOMA801215MDFNZR04',
                mobile: '55 1234 5678'
            }
        },
        {
            id: 2,
            name: 'Instituto Educativo Miguel Hidalgo',
            address: 'Calle Morelos 456, Norte',
            students: 320,
            teachers: 15,
            director: 'Prof. Carlos Mendoza',
            wellbeingPercentage: 78,
            color: 'bg-blue-300',
            level: 'Preparatoria',
            zone: 'Centro',
            rvoe: 'ES-143-90',
            directorDetails: {
                name: 'Prof. Carlos Mendoza',
                email: 'carlos.mendoza@hidalgo.edu.mx',
                curp: 'MECA751020HDFNDR08',
                mobile: '55 2345 6789'
            }
        },
        {
            id: 3,
            name: 'Colegio Sor Juana Inés de la Cruz',
            address: 'Blvd. Independencia 789, Sur',
            students: 275,
            teachers: 12,
            director: 'Lic. Ana Rodríguez',
            wellbeingPercentage: 92,
            color: 'bg-red-300',
            level: 'Secundaria',
            zone: 'Sur',
            rvoe: 'ES-089-78',
            directorDetails: {
                name: 'Lic. Ana Rodríguez',
                email: 'ana.rodriguez@sorjuana.edu.mx',
                curp: 'RODA690315MDFDRN02',
                mobile: '55 3456 7890'
            }
        }
    ]);

    const handleViewDetails = (schoolId: number) => {
        console.log('Ver detalles de la escuela:', schoolId);
        setActiveDropdown(null);
        // Aquí implementarías la lógica para ver los detalles de la escuela
    };

    const handleAddSchool = (newSchool: School) => {
        setSchools(prev => [...prev, newSchool]);
    };

    const handleEditSchool = (updatedSchool: School) => {
        setSchools(prev => 
            prev.map(school => 
                school.id === updatedSchool.id ? updatedSchool : school
            )
        );
    };

    const handleDeleteSchool = (schoolId: number) => {
        setSchools(prev => prev.filter(school => school.id !== schoolId));
    };

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    const openEditModal = (school: School) => {
        setSelectedSchool(school);
        setIsEditModalOpen(true);
        setActiveDropdown(null);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedSchool(null);
    };

    const openDeleteModal = (school: School) => {
        setSelectedSchool(school);
        setIsDeleteModalOpen(true);
        setActiveDropdown(null);
    };
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedSchool(null);
    };

    const toggleDropdown = (schoolId: number, event: React.MouseEvent) => {
        event.stopPropagation();
        setActiveDropdown(activeDropdown === schoolId ? null : schoolId);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => {
            setActiveDropdown(null);
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="animate-fadeIn space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-medium text-gray-900">Gestión de Escuelas</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        {schools.length} {schools.length === 1 ? 'escuela registrada' : 'escuelas registradas'}
                    </p>
                </div>
                <button 
                    onClick={openAddModal}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg h-10 px-4 py-2 border shadow-md shadow-black bg-lime-300 hover:bg-lime-400 text-gray-900"
                >
                    + Agregar Escuela
                </button>
            </div>

            {/* Schools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.map((school) => (
                    <div
                        key={school.id}
                        className={`rounded-xl border shadow-md shadow-black backdrop-blur-sm text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-96 ${school.color} transform hover:scale-105 relative`}
                    >
                        {/* Actions Dropdown */}
                        <div className="absolute top-3 right-2 z-10">
                            <button
                                onClick={(e) => toggleDropdown(school.id, e)}
                                className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                            >
                                <MoreVertical className="w-4 h-4 text-gray-600" />
                            </button>

                            {activeDropdown === school.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20">
                                    <div className="py-1">
                                        <button
                                            onClick={() => openEditModal(school)}
                                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <Edit3 className="w-4 h-4 text-blue-600" />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(school)}
                                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Header */}
                        <div className="flex flex-col space-y-1.5 p-6 pr-12">
                            <div className="flex items-start justify-between">
                                <h3 className="font-medium tracking-tight text-lg text-gray-900 leading-tight">
                                    {school.name}
                                </h3>
                                {school.level && (
                                    <span className="text-xs bg-white/80 px-2 py-1 rounded-full font-medium text-gray-700 ml-2">
                                        {school.level}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600">
                                <MapPin className="w-4 h-4 inline mr-1" />
                                {school.address}
                            </p>
                            {school.rvoe && (
                                <p className="text-xs text-gray-500">
                                    RVOE: {school.rvoe}
                                </p>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-6 pt-0 h-full flex flex-col space-y-4">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900">{school.students}</p>
                                    <p className="text-xs text-gray-600">Estudiantes</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900">{school.teachers}</p>
                                    <p className="text-xs text-gray-600">Profesores</p>
                                </div>
                            </div>

                            {/* Director Info */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Director/a</span>
                                    <span className="font-medium text-gray-900 text-right">{school.director}</span>
                                </div>
                            </div>

                            {/* Wellbeing Progress */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Bienestar Promedio</span>
                                    <span className="font-medium text-gray-900">{school.wellbeingPercentage}%</span>
                                </div>
                                <div className="w-full bg-white/70 rounded-full h-3">
                                    <div
                                        className="bg-green-500 rounded-full h-3 transition-all duration-300"
                                        style={{ width: `${school.wellbeingPercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex-1 flex items-end">
                                <button
                                    onClick={() => handleViewDetails(school.id)}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg h-10 px-4 py-2 w-full border shadow-md shadow-black bg-white hover:bg-gray-50 text-gray-900"
                                >
                                    Ver Detalles Completos
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {schools.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay escuelas registradas</h3>
                    <p className="text-gray-500 mb-6">Comienza agregando tu primera escuela al sistema</p>
                    <button 
                        onClick={openAddModal}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
                    >
                        + Agregar Primera Escuela
                    </button>
                </div>
            )}

            {/* Modals */}
            <AddSchoolModal
                isOpen={isAddModalOpen}
                onClose={closeAddModal}
                onSuccess={handleAddSchool}
            />

            <EditSchoolModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                onSuccess={handleEditSchool}
                school={selectedSchool}
            />

            <DeleteSchoolModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onSuccess={handleDeleteSchool}
                school={selectedSchool}
            />
        </div>
    );
};

export default SchoolManagement;