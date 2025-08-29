import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, Edit3 } from 'lucide-react';

interface Director {
    name: string;
    email: string;
    curp: string;
    mobile: string;
}

interface SchoolForm {
    name: string;
    level: 'Secundaria' | 'Preparatoria' | '';
    zone: string;
    director: Director;
    postalCode: string;
    rvoe: string;
    students: number;
    teachers: number;
    wellbeingPercentage: number;
}

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
    directorDetails?: Director;
}

interface EditSchoolModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (school: School) => void;
    school: School | null;
}

const EditSchoolModal: React.FC<EditSchoolModalProps> = ({ isOpen, onClose, onSuccess, school }) => {
    const [formData, setFormData] = useState<SchoolForm>({
        name: '',
        level: '',
        zone: 'Pendiente',
        director: {
            name: '',
            email: '',
            curp: '',
            mobile: ''
        },
        postalCode: '',
        rvoe: '',
        students: 0,
        teachers: 0,
        wellbeingPercentage: 70
    });

    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load school data when modal opens or school changes
    useEffect(() => {
        if (isOpen && school) {
            // Extract postal code from address
            const postalCodeMatch = school.address.match(/CP (\d+)/);
            const postalCode = postalCodeMatch ? postalCodeMatch[1] : '';
            
            setFormData({
                name: school.name,
                level: (school.level as 'Secundaria' | 'Preparatoria') || '',
                zone: school.zone || 'Pendiente',
                director: school.directorDetails || {
                    name: school.director,
                    email: '',
                    curp: '',
                    mobile: ''
                },
                postalCode: postalCode,
                rvoe: school.rvoe || '',
                students: school.students,
                teachers: school.teachers,
                wellbeingPercentage: school.wellbeingPercentage
            });
            setShowMessage(false);
        }
    }, [isOpen, school]);

    const handleInputChange = (field: string, value: string | number) => {
        if (field.startsWith('director.')) {
            const directorField = field.split('.')[1];
            setFormData(prev => ({
                ...prev,
                director: {
                    ...prev.director,
                    [directorField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const validateForm = (): boolean => {
        const required = [
            formData.name,
            formData.level,
            formData.director.name,
            formData.director.email,
            formData.director.curp,
            formData.director.mobile,
            formData.postalCode,
            formData.rvoe
        ];

        return required.every(field => field.toString().trim() !== '') && 
               formData.students > 0 && 
               formData.teachers > 0;
    };

    const handleSubmit = async () => {
        if (!validateForm() || !school) {
            setMessageType('error');
            setShowMessage(true);
            return;
        }

        setIsSubmitting(true);

        // Simular llamada a API
        setTimeout(() => {
            try {
                // Simular éxito (95% de probabilidad)
                const isSuccess = Math.random() > 0.05;
                
                if (isSuccess) {
                    const updatedSchool: School = {
                        ...school,
                        name: formData.name,
                        address: `Zona ${formData.zone}, CP ${formData.postalCode}`,
                        students: formData.students,
                        teachers: formData.teachers,
                        director: formData.director.name,
                        wellbeingPercentage: formData.wellbeingPercentage,
                        level: formData.level,
                        zone: formData.zone,
                        rvoe: formData.rvoe,
                        directorDetails: formData.director
                    };

                    setMessageType('success');
                    setShowMessage(true);
                    
                    setTimeout(() => {
                        onSuccess(updatedSchool);
                        onClose();
                    }, 2000);
                } else {
                    throw new Error('Error en el servidor');
                }
            } catch (error) {
                setMessageType('error');
                setShowMessage(true);
            } finally {
                setIsSubmitting(false);
            }
        }, 1000);
    };

    if (!isOpen || !school) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center gap-3">
                        <Edit3 className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">Editar Escuela</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Success/Error Message */}
                {showMessage && (
                    <div className={`mx-6 mt-6 p-4 rounded-lg flex items-center gap-3 ${
                        messageType === 'success' 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                        {messageType === 'success' ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <XCircle className="w-5 h-5" />
                        )}
                        <span className="font-medium">
                            {messageType === 'success' 
                                ? '¡Escuela actualizada exitosamente!' 
                                : 'Error: Por favor completa todos los campos requeridos'
                            }
                        </span>
                    </div>
                )}

                {/* Form */}
                <div className="p-6 space-y-6">
                    {/* Información General */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Información General</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre de la Institución *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ej. Escuela Primaria Benito Juárez"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nivel Escolar *
                                </label>
                                <select
                                    value={formData.level}
                                    onChange={(e) => handleInputChange('level', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Seleccionar nivel</option>
                                    <option value="Secundaria">Secundaria</option>
                                    <option value="Preparatoria">Preparatoria</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Zona Escolar
                                </label>
                                <input
                                    type="text"
                                    value={formData.zone}
                                    onChange={(e) => handleInputChange('zone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Pendiente"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Código Postal *
                                </label>
                                <input
                                    type="text"
                                    value={formData.postalCode}
                                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="12345"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    RVOE *
                                </label>
                                <input
                                    type="text"
                                    value={formData.rvoe}
                                    onChange={(e) => handleInputChange('rvoe', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ej. ES-242-85"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Estadísticas</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Número de Estudiantes *
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.students}
                                    onChange={(e) => handleInputChange('students', parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Número de Profesores *
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.teachers}
                                    onChange={(e) => handleInputChange('teachers', parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bienestar Promedio (%) *
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.wellbeingPercentage}
                                    onChange={(e) => handleInputChange('wellbeingPercentage', parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Director Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Director de la Institución</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre Completo *
                                </label>
                                <input
                                    type="text"
                                    value={formData.director.name}
                                    onChange={(e) => handleInputChange('director.name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Ej. Dra. María González"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Correo Electrónico *
                                </label>
                                <input
                                    type="email"
                                    value={formData.director.email}
                                    onChange={(e) => handleInputChange('director.email', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="director@escuela.edu.mx"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CURP *
                                </label>
                                <input
                                    type="text"
                                    value={formData.director.curp}
                                    onChange={(e) => handleInputChange('director.curp', e.target.value.toUpperCase())}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="CURP123456HDFMMR09"
                                    maxLength={18}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Número Móvil *
                                </label>
                                <input
                                    type="tel"
                                    value={formData.director.mobile}
                                    onChange={(e) => handleInputChange('director.mobile', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="55 1234 5678"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 pt-6 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Actualizando...' : 'Actualizar Escuela'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSchoolModal;