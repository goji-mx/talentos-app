import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, School } from 'lucide-react';

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
}

interface AddSchoolModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (school: any) => void;
}

const AddSchoolModal: React.FC<AddSchoolModalProps> = ({ isOpen, onClose, onSuccess }) => {
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
        rvoe: ''
    });

    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
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
                rvoe: ''
            });
            setShowMessage(false);
        }
    }, [isOpen]);

    const handleInputChange = (field: string, value: string) => {
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

        return required.every(field => field.trim() !== '');
    };

    const handleSubmit = async () => {
        
        if (!validateForm()) {
            setMessageType('error');
            setShowMessage(true);
            return;
        }

        setIsSubmitting(true);

        // Simular llamada a API
        setTimeout(() => {
            try {
                // Simular éxito (90% de probabilidad)
                const isSuccess = Math.random() > 0.1;
                
                if (isSuccess) {
                    const newSchool = {
                        id: Date.now(),
                        name: formData.name,
                        address: `Zona ${formData.zone}, CP ${formData.postalCode}`,
                        students: Math.floor(Math.random() * 400) + 200,
                        teachers: Math.floor(Math.random() * 15) + 10,
                        director: formData.director.name,
                        wellbeingPercentage: Math.floor(Math.random() * 30) + 70,
                        color: ['bg-lime-200', 'bg-blue-300', 'bg-red-300', 'bg-yellow-200', 'bg-purple-200'][Math.floor(Math.random() * 5)],
                        level: formData.level,
                        zone: formData.zone,
                        rvoe: formData.rvoe,
                        directorDetails: formData.director
                    };

                    setMessageType('success');
                    setShowMessage(true);
                    
                    setTimeout(() => {
                        onSuccess(newSchool);
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

    if (!isOpen) return null;

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
                        <School className="w-6 h-6 text-lime-600" />
                        <h2 className="text-xl font-semibold text-gray-900">Agregar Nueva Escuela</h2>
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
                                ? '¡Escuela registrada exitosamente!' 
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                    placeholder="12345"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                RVOE *
                            </label>
                            <input
                                type="text"
                                value={formData.rvoe}
                                onChange={(e) => handleInputChange('rvoe', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                                placeholder="Ej. ES-242-85"
                            />
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
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
                            className="flex-1 px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Registrando...' : 'Registrar Escuela'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSchoolModal;