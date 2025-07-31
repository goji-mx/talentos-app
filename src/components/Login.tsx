import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import Notification from './ui/Notificaciont';
import BackgroundCircles from './BackgroundCircles';
import FloatingInput from './ui/FloatingInput';
import { useLoginPhone } from '../hooks/useLoginPhone';
import { useVerifyOtp } from '../hooks/useVerifyOtp';
import talentos from "../assets/logos/talentos.png"
import { gsap } from 'gsap';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const { requestOtp, notif: notifPhone, setNotif: setNotifPhone } = useLoginPhone();
  const { verifyOtp, notif: notifOtp, setNotif: setNotifOtp } = useVerifyOtp();

  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement | null>(null);

  const goToRegister = () => {
    if (formRef.current) {
      gsap.to(formRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.95,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          navigate('/register');
        },
      });
    } else {
      navigate('/register');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 'phone') {
      const success = await requestOtp(phone);
      if (success) {
        // Animate step transition
        if (formRef.current) {
          gsap.to(formRef.current, {
            opacity: 0,
            x: -20,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              setStep('otp');
              gsap.fromTo(formRef.current,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
              );
            }
          });
        } else {
          setStep('otp');
        }
      }
    } else {
      const success = await verifyOtp(phone, otp);
      if (success) {
        if (formRef.current) {
          gsap.to(formRef.current, {
            opacity: 0,
            y: -30,
            scale: 0.95,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
              onLogin();
            },
          });
        } else {
          onLogin();
        }
      }

    }
  };

  const handleBack = () => {
    if (formRef.current) {
      gsap.to(formRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          setStep('phone');
          setOtp('');
          gsap.fromTo(formRef.current,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
          );
        }
      });
    } else {
      setStep('phone');
      setOtp('');
    }
  };

  const notif = notifPhone || notifOtp;
  const setNotif = setNotifPhone || setNotifOtp;

  useEffect(() => {
    if (notif) {
      const timer = setTimeout(() => setNotif(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notif]);

  // Initial entrance animation
  useEffect(() => {
    if (formRef.current) {
      // Set initial state
      gsap.set(formRef.current, { 
        opacity: 0, 
        y: 50, 
        scale: 0.95 
      });
      
      // Animate in
      gsap.to(formRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1 // Small delay to ensure DOM is ready
      });
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen px-4 relative overflow-hidden">
      {/* Enhanced gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgb(140,159,233) 0%, rgb(63,79,192) 25%, rgb(19,24,111) 50%, rgb(63,79,192) 75%, rgb(140,159,233) 100%)'
        }}
      />

      {/* Your existing BackgroundCircles component */}
      <BackgroundCircles />

      {/* Additional floating geometric shapes */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-6 h-6 bg-white/15 rounded-full animate-bounce"></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/25 rounded-full animate-ping"></div>

      {/* Notification */}
      {notif && (
        <div className="absolute top-6 right-6 z-50 animate-in slide-in-from-top-2 duration-300">
          <Notification
            type={notif.type}
            message={notif.message}
            onClose={() => setNotif(null)}
          />
        </div>
      )}

      {/* Main form container */}
      <div className="relative z-10 w-full max-w-md" ref={formRef}>
        {/* Header section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 backdrop-blur-sm border border-white/30 shadow-lg">
            {step === 'phone' ? (
              <div className="flex items-center">
                <img src={talentos} alt="Talentos Logo" className="w-10 h-10 bg-w" />
              </div>
            ) : (
              <Shield className="w-8 h-8 text-blue-600" />
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            {step === 'phone' ? '¡Bienvenido a Talentos!' : 'Verificación'}
          </h1>
          <p className="text-white/90 text-sm md:text-base drop-shadow-md">
            {step === 'phone'
              ? ''
              : `Código enviado a ${phone}`}
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 'phone' ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <FloatingInput
                    id="phone"
                    label="Ingresa tu número de teléfono"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={goToRegister}
                    className="
                      flex-1 bg-white/10 border border-white/30 text-white py-3 px-4 
                      rounded-xl hover:bg-white/20 transition-all duration-300 
                      transform hover:scale-105 hover:shadow-lg
                      backdrop-blur-sm font-medium
                    "
                  >
                    Registrarse
                  </button>

                  <button
                    type="submit"
                    className="
                      flex-1 bg-white text-purple-700 py-3 px-4 rounded-xl 
                      hover:bg-gray-100 transition-all duration-300 transform 
                      hover:scale-105 hover:shadow-lg font-semibold
                      flex items-center justify-center gap-2
                    "
                  >
                    Solicitar código
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <FloatingInput
                    id="otp"
                    label="Ingresa el código"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="
                      flex-1 bg-white/10 border border-white/30 text-white py-3 px-4 
                      rounded-xl hover:bg-white/20 transition-all duration-300 
                      transform hover:scale-105 hover:shadow-lg
                      backdrop-blur-sm flex items-center justify-center gap-2 font-medium
                    "
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Atrás
                  </button>

                  <button
                    type="submit"
                    className="
                      flex-1 bg-white text-purple-700 py-3 px-4 rounded-xl 
                      hover:bg-gray-100 transition-all duration-300 transform 
                      hover:scale-105 hover:shadow-lg font-semibold
                      flex items-center justify-center gap-2
                    "
                  >
                    Ingresar
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/70 text-sm drop-shadow-sm">
            ¿Necesitas ayuda? <button className="text-white hover:underline font-medium">Contáctanos</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;