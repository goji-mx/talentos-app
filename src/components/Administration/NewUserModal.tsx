// src/components/NewUserModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, User, Mail, Phone, Building, CreditCard, Check } from 'lucide-react';
import { gsap } from 'gsap';

interface NewUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (userData: UserFormData) => void;
}

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

const userTypeOptions = [
    { value: 'student', label: 'Estudiante', color: 'bg-blue-100 text-blue-800' },
    { value: 'admin', label: 'Administrador', color: 'bg-green-100 text-green-800' },
    { value: 'seller', label: 'Ventas', color: 'bg-yellow-100 text-yellow-800' }
];

const residencyOptions = [
    { value: 'R1', label: 'R1 - Primer año' },
    { value: 'R2', label: 'R2 - Segundo año' },
    { value: 'R3', label: 'R3 - Tercer año' },
    { value: 'R4', label: 'R4 - Cuarto año' }
];

const specialtyOptions = [
    { value: 'cardiologia', label: 'Cardiología' },
    { value: 'pediatria', label: 'Pediatría' },
    { value: 'ginecologia', label: 'Ginecología' },
    { value: 'neurologia', label: 'Neurología' },
    { value: 'traumatologia', label: 'Traumatología' },
    { value: 'medicina_interna', label: 'Medicina Interna' },
    { value: 'psiquiatria', label: 'Psiquiatría' },
    { value: 'dermatologia', label: 'Dermatología' },
    { value: 'oftalmologia', label: 'Oftalmología' },
    { value: 'urologia', label: 'Urología' },
    { value: 'otro', label: 'Otro' }
];

const hospitalOptions = [
    { value: 'hospital_general', label: 'Hospital General' },
    { value: 'hospital_universitario', label: 'Hospital Universitario' },
    { value: 'hospital_nacional', label: 'Hospital Nacional' },
    { value: 'clinica_san_jose', label: 'Clínica San José' },
    { value: 'hospital_militar', label: 'Hospital Militar' },
    { value: 'hospital_infantil', label: 'Hospital Infantil' },
    { value: 'instituto_cardiologia', label: 'Instituto de Cardiología' },
    { value: 'hospital_psiquiatrico', label: 'Hospital Psiquiátrico' },
    { value: 'otro', label: 'Otro' }
];

const NewUserModal: React.FC<NewUserModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const residencyDropdownRef = useRef<HTMLDivElement>(null);
    const specialtyDropdownRef = useRef<HTMLDivElement>(null);
    const hospitalDropdownRef = useRef<HTMLDivElement>(null);

    const [selectedUserType, setSelectedUserType] = useState<'student' | 'admin' | 'seller'>('student');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isResidencyDropdownOpen, setIsResidencyDropdownOpen] = useState(false);
    const [isSpecialtyDropdownOpen, setIsSpecialtyDropdownOpen] = useState(false);
    const [isHospitalDropdownOpen, setIsHospitalDropdownOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<UserFormData>({
        _id: '',
        fullName: '',
        email: '',
        phone: '',
        userType: 'student',
        specialty: '',
        customSpecialty: '',
        university: '',
        residencyHospital: '',
        customHospital: '',
        licenseNumber: '',
        residency: '',
        document: '',
        acceptPrivacyPolicy: false
    });

    const [errors, setErrors] = useState<Partial<UserFormData>>({});

    // Animación de apertura del modal
    useEffect(() => {
        if (isOpen && modalRef.current && overlayRef.current && contentRef.current) {
            gsap.set([overlayRef.current, contentRef.current], { opacity: 0 });
            gsap.set(contentRef.current, { scale: 0.8, y: 50 });

            const tl = gsap.timeline();
            tl.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
                .to(contentRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }, '-=0.1');
        }
    }, [isOpen]);

    // Manejar cierre del modal
    const handleClose = () => {
        if (contentRef.current && overlayRef.current) {
            const tl = gsap.timeline({
                onComplete: () => {
                    onClose();
                    resetForm();
                }
            });

            tl.to(contentRef.current, { opacity: 0, scale: 0.8, y: 50, duration: 0.3, ease: 'power2.in' })
                .to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.1');
        }
    };

    // Resetear formulario
    const resetForm = () => {
        setFormData({
            _id: '',
            fullName: '',
            email: '',
            phone: '',
            userType: 'student',
            specialty: '',
            customSpecialty: '',
            university: '',
            residencyHospital: '',
            customHospital: '',
            licenseNumber: '',
            residency: '',
            document: '',
            acceptPrivacyPolicy: false
        });
        setSelectedUserType('student');
        setErrors({});
        setIsDropdownOpen(false);
        setIsResidencyDropdownOpen(false);
        setIsSpecialtyDropdownOpen(false);
        setIsHospitalDropdownOpen(false);
        setIsSubmitting(false);
    };

    // Manejar cambio en el selector de tipo de usuario
    const handleUserTypeChange = (userType: 'student' | 'admin' | 'seller') => {
        setSelectedUserType(userType);
        setFormData(prev => ({
            ...prev,
            userType,
            specialty: '',
            customSpecialty: '',
            university: '',
            residencyHospital: '',
            customHospital: '',
            licenseNumber: '',
            residency: '',
            document: '',
            acceptPrivacyPolicy: false
        }));
        setIsDropdownOpen(false);

        if (dropdownRef.current) {
            gsap.to(dropdownRef.current, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        }
    };

    // Manejar cambio en el selector de residencia
    const handleResidencyChange = (residency: string) => {
        setFormData(prev => ({ ...prev, residency }));
        setIsResidencyDropdownOpen(false);

        if (errors.residency) {
            setErrors(prev => ({ ...prev, residency: undefined }));
        }

        if (residencyDropdownRef.current) {
            gsap.to(residencyDropdownRef.current, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        }
    };

    // Manejar cambio en el selector de especialidad
    const handleSpecialtyChange = (specialty: string) => {
        setFormData(prev => ({
            ...prev,
            specialty,
            customSpecialty: specialty === 'otro' ? prev.customSpecialty : ''
        }));
        setIsSpecialtyDropdownOpen(false);

        if (errors.specialty) {
            setErrors(prev => ({ ...prev, specialty: undefined }));
        }

        if (specialtyDropdownRef.current) {
            gsap.to(specialtyDropdownRef.current, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        }
    };

    // Manejar cambio en el selector de hospital
    const handleHospitalChange = (hospital: string) => {
        setFormData(prev => ({
            ...prev,
            residencyHospital: hospital,
            customHospital: hospital === 'otro' ? prev.customHospital : ''
        }));
        setIsHospitalDropdownOpen(false);

        if (hospitalDropdownRef.current) {
            gsap.to(hospitalDropdownRef.current, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        }
    };

    // Manejar cambios en el formulario
    const handleInputChange = (field: keyof UserFormData, value: string | boolean) => {
        if (field === 'phone' && typeof value === 'string') {
            // Solo permitir números y limitar a 10 dígitos
            const numericValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [field]: numericValue }));
        } else if (field === 'licenseNumber' && typeof value === 'string') {
            // Limitar a 10 caracteres alfanuméricos
            const limitedValue = value.slice(0, 10);
            setFormData(prev => ({ ...prev, [field]: limitedValue }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }

        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    // Validar formulario
    const validateForm = (): boolean => {
        const newErrors: Partial<UserFormData> = {};

        // Validar nombre (permite acentos y caracteres especiales)
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'El nombre es requerido';
        }

        // Validar email
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        // Validar teléfono (debe tener exactamente 10 dígitos)
        if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'El teléfono debe tener exactamente 10 dígitos';
        }

        if (selectedUserType === 'student') {
            // Validar especialidad
            if (!formData.specialty?.trim()) {
                newErrors.specialty = 'La especialidad es requerida';
            } else if (formData.specialty === 'otro' && !formData.customSpecialty?.trim()) {
                newErrors.customSpecialty = 'Especifique la especialidad';
            }

            if (!formData.university?.trim()) newErrors.university = 'La universidad es requerida';

            // Validar cédula (alfanumérico, máximo 10 caracteres)
            if (!formData.licenseNumber?.trim()) {
                newErrors.licenseNumber = 'La cédula es requerida';
            } else if (formData.licenseNumber.length > 10) {
                newErrors.licenseNumber = 'La cédula no puede exceder 10 caracteres';
            }

            if (!formData.residency?.trim()) newErrors.residency = 'El año de residencia es requerido';
            if (!formData.document?.trim()) newErrors.document = 'El documento es requerido';

            // Validar hospital si se seleccionó "otro"
            if (formData.residencyHospital === 'otro' && !formData.customHospital?.trim()) {
                newErrors.customHospital = 'Especifique el hospital';
            }

            // Validar políticas de privacidad
            if (!formData.acceptPrivacyPolicy) {
                newErrors.acceptPrivacyPolicy = false;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar envío del formulario
      const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simular espera
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Aquí realizamos el mapeo de campos custom a los campos principales
      const mappedData: UserFormData = { ...formData };

      if (mappedData.specialty === 'otro' && mappedData.customSpecialty) {
        mappedData.specialty = mappedData.customSpecialty;
      }
      delete mappedData.customSpecialty;

      if (mappedData.residencyHospital === 'otro' && mappedData.customHospital) {
        mappedData.residencyHospital = mappedData.customHospital;
      }
      delete mappedData.customHospital;

      onSubmit(mappedData);
      handleClose();
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


    // Renderizar campos específicos según el tipo de usuario
    const renderSpecificFields = () => {
        if (selectedUserType === 'student') {
            const selectedResidency = residencyOptions.find(opt => opt.value === formData.residency);
            const selectedSpecialty = specialtyOptions.find(opt => opt.value === formData.specialty);
            const selectedHospital = hospitalOptions.find(opt => opt.value === formData.residencyHospital);

            return (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative z-[70]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Año de residencia *
                            </label>
                            <div className="relative" ref={residencyDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsResidencyDropdownOpen(!isResidencyDropdownOpen)}
                                    className={`w-full  cursor-pointer px-4 py-2 border rounded-lg bg-white flex items-center justify-between hover:border-purple-500 focus:outline-none transition-all duration-200 ${errors.residency ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <span className={`${!selectedResidency ? 'text-gray-400' : 'text-gray-900'}`}>
                                        {selectedResidency ? selectedResidency.label : 'Seleccionar año'}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isResidencyDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {isResidencyDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                                        {residencyOptions.map(option => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => handleResidencyChange(option.value)}
                                                className="w-full px-4 py-2 text-left hover:bg-purple-50 transition-all duration-200"
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errors.residency && (
                                <p className="text-red-500 text-xs mt-1">{errors.residency}</p>
                            )}
                        </div>
                        <div className="relative z-[65]">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ">
                                Hospital
                            </label>
                            <div className="relative" ref={hospitalDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsHospitalDropdownOpen(!isHospitalDropdownOpen)}
                                    className="w-full  cursor-pointer px-4 py-2 border border-gray-300 rounded-lg bg-white flex items-center justify-between hover:border-purple-500 focus:outline-none transition-all duration-200"
                                >
                                    <span className={`${!selectedHospital ? 'text-gray-400' : 'text-gray-900'}`}>
                                        {selectedHospital ? selectedHospital.label : 'Seleccionar hospital'}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isHospitalDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {isHospitalDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden max-h-48 overflow-y-auto">
                                        {hospitalOptions.map(option => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => handleHospitalChange(option.value)}
                                                className="w-full px-4 py-2 text-left hover:bg-purple-50 transition-all duration-200"
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Campo personalizado para hospital */}
                            {formData.residencyHospital === 'otro' && (
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={formData.customHospital || ''}
                                        onChange={e => handleInputChange('customHospital', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none bg-gray-50 transition-all duration-200 ${errors.customHospital ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Especificar hospital"
                                    />
                                    {errors.customHospital && (
                                        <p className="text-red-500 text-xs mt-1">{errors.customHospital}</p>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative z-[60]">
                            <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                                Especialidad *
                            </label>
                            <div className="relative" ref={specialtyDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsSpecialtyDropdownOpen(!isSpecialtyDropdownOpen)}
                                    className={`w-full cursor-pointer px-4 py-2 border rounded-lg bg-white flex items-center justify-between focus:outline-none transition-all duration-200 ${errors.specialty ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <span className={`${!selectedSpecialty ? 'text-gray-400' : 'text-gray-900'}`}>
                                        {selectedSpecialty ? selectedSpecialty.label : 'Seleccionar especialidad'}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isSpecialtyDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {isSpecialtyDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-h-48 overflow-y-auto">
                                        {specialtyOptions.map(option => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => handleSpecialtyChange(option.value)}
                                                className="w-full px-4 py-2 text-left hover:bg-purple-50 transition-all duration-200"
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errors.specialty && (
                                <p className="text-red-500 text-xs mt-1">{errors.specialty}</p>
                            )}

                            {/* Campo personalizado para especialidad */}
                            {formData.specialty === 'otro' && (
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={formData.customSpecialty || ''}
                                        onChange={e => handleInputChange('customSpecialty', e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none bg-gray-50 transition-all duration-200 ${errors.customSpecialty ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Especificar especialidad"
                                    />
                                    {errors.customSpecialty && (
                                        <p className="text-red-500 text-xs mt-1">{errors.customSpecialty}</p>
                                    )}
                                </div>
                            )}
                        </div>



                        <div className="relative z-[55]">
                            <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                                Cédula *
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                <CreditCard className="w-4 h-4 ml-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.licenseNumber || ''}
                                    onChange={e => handleInputChange('licenseNumber', e.target.value)}
                                    className={`flex-1 px-3 py-2 focus:outline-none border-0 bg-gray-50 transition-all duration-200 ${errors.licenseNumber ? 'border-red-500' : ''
                                        }`}
                                    placeholder="Máximo 10 caracteres"
                                    maxLength={10}
                                />
                            </div>
                            {errors.licenseNumber && (
                                <p className="text-red-500 text-xs mt-1">{errors.licenseNumber}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                                Universidad *
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                <Building className="w-4 h-4 ml-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.university || ''}
                                    onChange={e => handleInputChange('university', e.target.value)}
                                    className={`flex-1 px-3 py-2 focus:outline-none border-0 bg-gray-50 transition-all duration-200 ${errors.university ? 'border-red-500' : ''
                                        }`}
                                    placeholder="Ej: Universidad Nacional"
                                />
                            </div>
                            {errors.university && (
                                <p className="text-red-500 text-xs mt-1">{errors.university}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                                Documento *
                            </label>
                            <input
                                type="text"
                                value={formData.document || ''}
                                onChange={e => handleInputChange('document', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none bg-gray-50 transition-all duration-200 ${errors.document ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Número de documento"
                            />
                            {errors.document && (
                                <p className="text-red-500 text-xs mt-1">{errors.document}</p>
                            )}
                        </div>
                    </div>

                    {/* Checkbox de políticas de privacidad */}
                    <div className="mt-6">
                        <div className="flex items-start gap-3">
                            <button
                                type="button"
                                onClick={() => handleInputChange('acceptPrivacyPolicy', !formData.acceptPrivacyPolicy)}
                                className={`flex-shrink-0 w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${formData.acceptPrivacyPolicy
                                    ? 'bg-purple-600 border-purple-600'
                                    : 'border-gray-300 hover:border-purple-500'
                                    } ${errors.acceptPrivacyPolicy ? 'border-red-500' : ''}`}
                            >
                                {formData.acceptPrivacyPolicy && (
                                    <Check className="w-3 h-3 text-white" />
                                )}
                            </button>
                            <label className="text-sm text-gray-700 cursor-pointer" onClick={() => handleInputChange('acceptPrivacyPolicy', !formData.acceptPrivacyPolicy)}>
                                Acepto las <span className="text-purple-600 hover:underline">políticas de privacidad</span> *
                            </label>
                        </div>
                        {errors.acceptPrivacyPolicy && (
                            <p className="text-red-500 text-xs mt-1 ml-8">Debe aceptar las políticas</p>
                        )}
                    </div>
                </>
            );
        }

        return null;
    };

    if (!isOpen) return null;

    const selectedOption = userTypeOptions.find(opt => opt.value === selectedUserType);

    return (
        <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay con efecto glassmorphism */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Contenido del modal */}
            <div
                ref={contentRef}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}
            >
                {/* Header del modal - Fixed */}
                <div className="flex-shrink-0 px-8 py-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Nuevo usuario</h2>
                            <p className="text-gray-600 text-sm mt-1">Crea un nuevo usuario en la plataforma</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-110"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Formulario - Scrollable */}
                <div className="flex-1 overflow-y-auto p-8">
                    {/* Selector de tipo de usuario */}
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de usuario *</label>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white flex items-center justify-between focus:outline-none transition-all duration-200"
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedOption?.color}`}>
                                        {selectedOption?.label}
                                    </span>
                                </div>
                                <ChevronDown
                                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[60] overflow-hidden">
                                    {userTypeOptions.map(option => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => handleUserTypeChange(option.value as 'student' | 'admin' | 'seller')}
                                            className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-all duration-200 flex items-center gap-3"
                                        >
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${option.color}`}>
                                                {option.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Campos básicos */}
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                <User className="w-4 h-4 ml-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={e => handleInputChange('fullName', e.target.value)}
                                    className={`flex-1 px-3 py-2 border-0 bg-gray-50 focus:outline-none transition-all duration-200 ${errors.fullName ? 'border-red-500' : ''
                                        }`}
                                    placeholder="Nombre completo"
                                />
                            </div>
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico *</label>
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                    <Mail className="w-4 h-4 ml-3 text-gray-400" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={e => handleInputChange('email', e.target.value)}
                                        className={`flex-1 px-3 py-2 focus:outline-none border-0 bg-gray-50 transition-all duration-200 ${errors.email ? 'border-red-500' : ''
                                            }`}
                                        placeholder="usuario@email.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                    <Phone className="w-4 h-4 ml-3 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => handleInputChange('phone', e.target.value)}
                                        className={`flex-1 px-3 py-2 focus:outline-none border-0 bg-gray-50 transition-all duration-200 ${errors.phone ? 'border-red-500' : ''
                                            }`}
                                        placeholder="10 dígitos"
                                        maxLength={10}
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Campos específicos por tipo de usuario */}
                    {renderSpecificFields()}
                </div>

                {/* Footer con botones - Fixed */}
                <div className="flex-shrink-0 px-8 py-6 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-[rgb(92,70,154)] hover:bg-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creando...
                                </>
                            ) : (
                                'Crear usuario'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewUserModal;