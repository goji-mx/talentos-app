import React from 'react';
import { MapPin } from 'lucide-react';

interface School {
    id: number;
    name: string;
    address: string;
    students: number;
    teachers: number;
    director: string;
    wellbeingPercentage: number;
    color?: string;
}

interface SchoolManagementProps {
    secretariaId?: string;
}

const SchoolManagement: React.FC<SchoolManagementProps> = ({ }) => {
    const schools: School[] = [
        {
            id: 1,
            name: 'Escuela Primaria Benito Juárez',
            address: 'Av. Reforma 123, Centro',
            students: 450,
            teachers: 18,
            director: 'Dra. María González',
            wellbeingPercentage: 85,
            color: 'bg-lime-200'
        },
        {
            id: 2,
            name: 'Instituto Educativo Miguel Hidalgo',
            address: 'Calle Morelos 456, Norte',
            students: 320,
            teachers: 15,
            director: 'Prof. Carlos Mendoza',
            wellbeingPercentage: 78,
            color: 'bg-blue-300'
        },
        {
            id: 3,
            name: 'Colegio Sor Juana Inés de la Cruz',
            address: 'Blvd. Independencia 789, Sur',
            students: 275,
            teachers: 12,
            director: 'Lic. Ana Rodríguez',
            wellbeingPercentage: 92,
            color: 'bg-red-300'
        }
    ];

    const handleViewDetails = (schoolId: number) => {
        console.log('Ver detalles de la escuela:', schoolId);
        // Aquí implementarías la lógica para ver los detalles de la escuela
    };

    return (
        <div className="animate-fadeIn space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-medium text-gray-900">Gestión de Escuelas</h1>
                </div>
            </div>

            {/* Schools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.map((school) => (
                    <div
                        key={school.id}
                        className={`rounded-xl border shadow-md shadow-black backdrop-blur-sm text-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 h-96 ${school.color}`}
                    >
                        {/* Header */}
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="font-medium tracking-tight text-lg text-gray-900">
                                {school.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                <MapPin className="w-4 h-4 inline mr-1" />
                                {school.address}
                            </p>
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
                                    <span className="font-medium text-gray-900">{school.director}</span>
                                </div>
                            </div>

                            {/* Wellbeing Progress */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Bienestar Promedio</span>
                                    <span className="font-medium text-gray-900">{school.wellbeingPercentage}%</span>
                                </div>
                                <div className="w-full bg-white rounded-full h-3">
                                    <div
                                        className="bg-lime-300 rounded-full h-3 transition-all duration-300"
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
        </div>
    );
};

export default SchoolManagement;