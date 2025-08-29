import React, { useState } from 'react';
import { AlertTriangle, Trash2, CheckCircle, XCircle } from 'lucide-react';

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
}

interface DeleteSchoolModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (schoolId: number) => void;
    school: School | null;
}

const DeleteSchoolModal: React.FC<DeleteSchoolModalProps> = ({ isOpen, onClose, onSuccess, school }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');

    const handleDelete = async () => {
        if (!school) return;

        setIsDeleting(true);

        // Simular llamada a API
        setTimeout(() => {
            try {
                // Simular éxito (95% de probabilidad)
                const isSuccess = Math.random() > 0.05;
                
                if (isSuccess) {
                    setMessageType('success');
                    setShowMessage(true);
                    
                    setTimeout(() => {
                        onSuccess(school.id);
                        onClose();
                        setShowMessage(false);
                    }, 2000);
                } else {
                    throw new Error('Error en el servidor');
                }
            } catch (error) {
                setMessageType('error');
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
            } finally {
                setIsDeleting(false);
            }
        }, 1000);
    };

    const handleClose = () => {
        if (!isDeleting) {
            setShowMessage(false);
            onClose();
        }
    };

    if (!isOpen || !school) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
                {/* Success/Error Message */}
                {showMessage && (
                    <div className={`p-6 rounded-t-xl flex items-center gap-3 ${
                        messageType === 'success' 
                            ? 'bg-green-100 text-green-800 border-b border-green-200' 
                            : 'bg-red-100 text-red-800 border-b border-red-200'
                    }`}>
                        {messageType === 'success' ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <XCircle className="w-5 h-5" />
                        )}
                        <span className="font-medium">
                            {messageType === 'success' 
                                ? '¡Escuela eliminada exitosamente!' 
                                : 'Error al eliminar la escuela. Inténtalo de nuevo.'
                            }
                        </span>
                    </div>
                )}

                <div className="p-6">
                    {/* Warning Icon */}
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>

                    {/* Content */}
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            ¿Eliminar Escuela?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Esta acción eliminará permanentemente la escuela:
                        </p>
                        
                        {/* School Info Card */}
                        <div className={`${school.color || 'bg-gray-100'} rounded-lg p-4 mb-4 text-left`}>
                            <h4 className="font-medium text-gray-900 mb-2">{school.name}</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>📍 {school.address}</p>
                                <p>👥 {school.students} estudiantes • {school.teachers} profesores</p>
                                <p>👨‍💼 Director: {school.director}</p>
                                {school.level && <p>🎓 Nivel: {school.level}</p>}
                                {school.rvoe && <p>📋 RVOE: {school.rvoe}</p>}
                            </div>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                            <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-red-800 text-left">
                                    <p className="font-medium mb-1">⚠️ Advertencia:</p>
                                    <p>Esta acción no se puede deshacer. Se eliminarán todos los datos asociados incluyendo registros de estudiantes, profesores y estadísticas.</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-500 text-sm">
                            ¿Estás seguro que deseas continuar?
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isDeleting}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isDeleting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Eliminando...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    Eliminar Escuela
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteSchoolModal;