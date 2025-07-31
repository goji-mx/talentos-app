import React, { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/user';
import Notification from './ui/Notificaciont';
import { ArrowLeft } from 'lucide-react';
import { useRegisterStudent } from '../hooks/useRegisterStudent';
import gsap from 'gsap';

import { isValidEmail, isValidPhone, isLettersAndNumbers, isEmpty } from '../utils/validations'
import BackgroundCircles from './BackgroundCircles';
import FloatingInput from './ui/FloatingInput';
import FloatingSelect from './ui/FloatingSelect';
import type { Student } from '../types/Student';
import AnimatedBlock from './ui/AnimatedBlock';

const Register: React.FC = () => {
    const [showNotif, setShowNotif] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof Student, string>>>({});
    const { register, error } = useRegisterStudent();
    const [localError, setLocalError] = useState<string | null>(null);

    const [formData, setFormData] = useState<Student>({
        authType: 'direct',
        userType: 'student',
        isResident: true,
        fullName: '',
        email: '',
        phone: '',
        backupEmail: '',
        specialty: '',
        residency: '',
        residencyHospital: '',
        university: '',
        licenseNumber: '',
        privacyPolicyAccepted: false,
        privacyPolicyAcceptedAt: '',
        specialtyOther: '',
        universityOther: '',
        residencyHospitalOther: '',
    });

    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement | null>(null);

    const goToLogin = () => {
        if (formRef.current) {
            gsap.to(formRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => {
                    navigate('/');
                },
            });
        } else {
            navigate('/');
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleLettersKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;
        if (!regex.test(e.key)) {
            e.preventDefault();
        }
    };


    const handleNumbersKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const regex = /^[0-9]*$/;
        if (!regex.test(e.key)) {
            e.preventDefault();
        }
    };


    const handleNumbersAndLettersKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isLettersAndNumbers(e.key)) {
            e.preventDefault();
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const newErrors: Partial<Record<keyof User, string>> = {};

        if (!isValidEmail(formData.email ?? '')) {
            newErrors.email = 'Correo inválido';
        }

        if (!isValidPhone(formData.phone)) {
            newErrors.phone = 'Debe tener 10 dígitos';
        }

        if (!isValidEmail(formData.backupEmail ?? '')) {
            newErrors.backupEmail = 'Correo de respaldo inválido';
        }

        if (isEmpty(formData.fullName)) {
            newErrors.fullName = 'Llenar campo vacio';
        }

        if (isEmpty(formData.licenseNumber)) {
            newErrors.licenseNumber = 'Llenar campo vacío';
        }

        if (formData.specialty === 'otro' && isEmpty(formData.specialtyOther)) {
            newErrors.specialtyOther = 'Llenar campo vacío';
        }

        if (
            formData.residencyHospital === 'otro' &&
            isEmpty(formData.residencyHospitalOther)
        ) {
            newErrors.residencyHospitalOther = 'Llenar campo vacío';
        }

        if (formData.university === 'otro' && isEmpty(formData.universityOther)) {
            newErrors.universityOther = 'Llenar campo vacío';
        }

        if (!formData.privacyPolicyAccepted) {
            newErrors.privacyPolicyAccepted = 'Debe aceptar la política de privacidad';
        }

        if (formData.privacyPolicyAccepted) {
            formData.privacyPolicyAcceptedAt = new Date().toISOString();
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const response = await register(formData);

        if (response.success) {
            setShowNotif(true);
            setTimeout(() => navigate('/'), 2000);
        } else {
            console.error(response.message);
        }
    };

    useEffect(() => {
        if (error) {
            setLocalError(error);
            const timer = setTimeout(() => {
                setLocalError(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                }
            );
        }
    }, []);

    return (
        <div className="flex justify-center items-center flex-col min-h-screen py-12 px-4 bg-gradient-to-br from-[#aabafc] via-[#3f4fc0] to-[#13186f]">
            <BackgroundCircles />
            {/* Regresar */}
            <div className="py-2 z-2 flex w-full max-w-xl mb-4 text-white underline decoration-1">
                <ArrowLeft className="cursor-pointer" onClick={goToLogin} />
                <span className="ml-2 cursor-pointer" onClick={goToLogin}>Regresar</span>
            </div>

            {/* Formulario */}
            <form ref={formRef} onSubmit={handleSubmit} className="bg-white/10 z-2 backdrop-blur-md shadow-lg rounded-3xl py-6 px-6 sm:px-8 w-full max-w-xl text-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-6 font-semibold">Registro</h2>

                <div className="flex flex-wrap justify-between gap-4">
                    <FloatingInput
                        id="fullName"
                        label="Nombre completo"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        onKeyPress={handleLettersKeyPress}
                        error={errors.fullName}
                    />
                    <FloatingInput
                        id="email"
                        label="Correo electrónico"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <FloatingInput
                        id="backupEmail"
                        label="Correo de recuperación"
                        name="backupEmail"
                        type="email"
                        value={formData.backupEmail}
                        onChange={handleChange}
                        error={errors.backupEmail}
                    />
                    <FloatingInput
                        id="phone"
                        label="Número telefónico"
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                        onKeyPress={handleNumbersKeyPress}
                        error={errors.phone}
                    />
                    <FloatingSelect
                        id="specialty"
                        label="Especialidad"
                        value={formData.specialty}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                specialty: e.target.value,
                            }))
                        }
                        options={[
                            { value: 'medicina interna', label: 'Medicina interna' },
                            { value: 'pediatria', label: 'Pediatría' },
                            { value: 'gineco obstetricia', label: 'Gineco obstetricia' },
                            { value: 'cirugia general', label: 'Cirugía general' },
                            { value: 'medicina de urgencias', label: 'Medicina de urgencias' },
                            { value: 'otro', label: 'Otra' },
                        ]}
                        hasError={!formData.specialty}
                        error="Este campo es obligatorio"
                    />

                    <AnimatedBlock show={formData.specialty === 'otro'}>
                        <FloatingInput
                            id="especialidadOtro"
                            label="Especifique otra especialidad"
                            name="specialtyOther"
                            value={formData.specialtyOther}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, specialtyOther: e.target.value }))
                            }
                            error={errors.specialtyOther}
                        />
                    </AnimatedBlock>

                    <FloatingSelect
                        id='residencyHospital'
                        label='Hospital de residencia'
                        value={formData.residencyHospital}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                residencyHospital: e.target.value,
                            }))
                        }
                        options={[
                            { value: 'imss', label: 'IMSS' },
                            { value: 'isste', label: 'ISSTE' },
                            { value: 'otro', label: 'Otro' },
                        ]}
                        hasError={!formData.residencyHospital}
                        error="Este campo es obligatorio"
                    />

                    <AnimatedBlock show={formData.residencyHospital === 'otro'}>
                        <FloatingInput
                            id="residenciaHospitalOtro"
                            label="Especifique otro hospital"
                            name="residencyHospitalOther"
                            value={formData.residencyHospitalOther}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, residencyHospitalOther: e.target.value }))
                            }
                            error={errors.residencyHospitalOther}
                        />
                    </AnimatedBlock>

                    <FloatingInput
                        id="licenseNumber"
                        label="Cédula profesional"
                        name="licenseNumber"
                        type="text"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        onKeyPress={handleNumbersAndLettersKeyPress}
                        error={errors.licenseNumber}
                    />
                    <FloatingSelect
                        id="university"
                        label="Universidad"
                        value={formData.university}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                university: e.target.value,
                            }))
                        }
                        options={[
                            { value: 'unam', label: 'UNAM' },
                            { value: 'uaem', label: 'UAEM' },
                            { value: 'otro', label: 'Otro' },
                        ]}
                        hasError={!formData.university}
                        error="Este campo es obligatorio"
                    />

                    <AnimatedBlock show={formData.university === 'otro'}>
                        <FloatingInput
                            id="universidadOtro"
                            label="Especifique otra universidad"
                            name="universityOther"
                            value={formData.universityOther}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, universityOther: e.target.value }))
                            }
                            error={errors.universityOther}
                        />
                    </AnimatedBlock>

                    <FloatingSelect
                        id="residency"
                        label="Año de residencia"
                        value={formData.residency}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                residency: e.target.value,
                            }))
                        }
                        options={[
                            { value: 'R1', label: 'R1' },
                            { value: 'R2', label: 'R2' },
                            { value: 'R3', label: 'R3' },
                            { value: 'R4', label: 'R4' },
                        ]}
                        hasError={!formData.residency}
                        error="Este campo es obligatorio"
                    />
                </div>

                <div className="inline-flex items-center">
                    <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="ripple-on"
                        data-ripple-dark="true"
                    >
                        <input
                            id="ripple-on"
                            type="checkbox"
                            className="peer relative h-5 w-5 cursor-pointer appearance-none rounded shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-400 before:opacity-0 before:transition-opacity checked:bg-slate-800 checked:before:bg-slate-400 hover:before:opacity-10"
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    privacyPolicyAccepted: e.target.checked ? true : false,
                                }))
                            }
                        />
                        <span className="pointer-events-none bg-blue-400 absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </span>
                    </label>
                    <label className="cursor-pointer text-white text-sm" htmlFor="ripple-on">
                        Acepto la política de privacidad
                    </label>
                </div>
                {errors.privacyPolicyAccepted && <p className="text-red-400 text-xs px-1">{errors.privacyPolicyAccepted}</p>}


                {/* Botón */}
                <button
                    type="submit"
                    className="w-full bg-white text-blue-600 py-3 rounded-xl hover:bg-gray-300 transition cursor-pointer mt-4"
                >
                    Registrarse
                </button>
            </form>

            {/* Notificación de éxito */}
            {showNotif && (
                <div className="fixed top-4 right-4 z-50">
                    <Notification
                        type="success"
                        message="Usuario registrado exitosamente"
                        onClose={() => setShowNotif(false)}
                    />
                </div>
            )}
            {localError && (
                <div className="fixed top-4 right-4 z-50">
                    <Notification
                        type="error"
                        message={localError}
                        onClose={() => setLocalError(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default Register;