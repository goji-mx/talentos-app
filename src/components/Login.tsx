import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, MessageSquare } from 'lucide-react';
import Notification from './ui/Notificaciont';
import { useLoginEmail } from '../hooks/useLoginEmail';
import { useVerifyOtp } from '../hooks/useVerifyOtp';
import talentos from "../assets/logos/talentos.png"
import { gsap } from 'gsap';
import { getUserFromToken, getDefaultRouteForRole } from '../utils/auth';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');

  const { requestOtp, notif: notifEmail, setNotif: setNotifEmail } = useLoginEmail();
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

    if (step === 'email') {
      const success = await requestOtp(email);
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
      const success = await verifyOtp(email, otp);
      if (success) {
        // Call onLogin to update auth state
        onLogin();
        
        // Get user data from token and navigate to appropriate dashboard
        const userData = getUserFromToken();
        if (userData) {
          const defaultRoute = getDefaultRouteForRole(userData.userType, userData.originalUserType);
          
          if (formRef.current) {
            gsap.to(formRef.current, {
              opacity: 0,
              y: -30,
              scale: 0.95,
              duration: 0.5,
              ease: 'power2.in',
              onComplete: () => {
                navigate(defaultRoute);
              },
            });
          } else {
            navigate(defaultRoute);
          }
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
          setStep('email');
          setOtp('');
          gsap.fromTo(formRef.current,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
          );
        }
      });
    } else {
      setStep('email');
      setOtp('');
    }
  };

  const notif = notifEmail || notifOtp;
  const setNotif = setNotifEmail || setNotifOtp;

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
      </div>

      {/* Notification */}
      {notif && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-2 duration-300">
          <Notification
            type={notif.type}
            message={notif.message}
            onClose={() => setNotif(null)}
          />
        </div>
      )}

      {/* Main login container */}
      <div className="w-full max-w-sm relative z-10" ref={formRef}>
        {/* App icon and title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-105">
            <img src={talentos} alt="Talentos" className="w-12 h-12 rounded-lg" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
            {step === 'email' ? 'Talentos' : 'Verificación'}
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            {step === 'email' 
              ? 'Inicia sesión para continuar' 
              : `Código enviado a ${email.slice(0, 3)}****@${email.split('@')[1]}`}
          </p>
        </div>

        {/* Login form */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {step === 'email' ? (
              <>
                {/* Email input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700 block">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-0 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                      placeholder="ejemplo@correo.com"
                      autoComplete="email"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Ingresa tu correo electrónico registrado
                  </p>
                </div>

                {/* Action buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:shadow-none disabled:transform-none"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={goToRegister}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    ¿No tienes cuenta? Regístrate
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* OTP input */}
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-sm font-semibold text-gray-700 block">
                    Código de verificación
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-0 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white text-center text-lg font-mono tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                      autoComplete="one-time-code"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Ingresa el código de 6 dígitos que enviamos
                  </p>
                </div>

                {/* Action buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={otp.length !== 6}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:shadow-none disabled:transform-none"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Verificar
                      <Check className="w-4 h-4" />
                    </span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Cambiar correo
                  </button>
                </div>

                {/* Resend code option */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">¿No recibiste el código?</p>
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                    onClick={() => requestOtp(email)}
                  >
                    Reenviar código
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        {/* Footer help text */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            ¿Necesitas ayuda?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              Contáctanos
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;