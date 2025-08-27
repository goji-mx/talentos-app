import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { EyeOff, Eye, Lock, Sparkles,
  Mail,
  Target,
  AlertCircle,
 } from 'lucide-react';
import Notification from './ui/Notificaciont';
import { useLoginEmail } from '../hooks/useLoginEmail';
import { useVerifyOtp } from '../hooks/useVerifyOtp';
import { useUser } from '../utils/UserContext';
import { gsap } from 'gsap';
import { getUserFromToken, getDefaultRouteForRole } from '../utils/auth';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [otp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading] = useState(false);

  const { requestOtp, notif: notifEmail, setNotif: setNotifEmail } = useLoginEmail();
  const { verifyOtp, notif: notifOtp, setNotif: setNotifOtp } = useVerifyOtp();
  const { setUserData } = useUser(); // Obtener la función para actualizar el contexto

  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement | null>(null);

  // const goToRegister = () => {
  //   if (formRef.current) {
  //     gsap.to(formRef.current, {
  //       opacity: 0,
  //       y: -30,
  //       scale: 0.95,
  //       duration: 0.5,
  //       ease: 'power2.in',
  //       onComplete: () => {
  //         navigate('/register');
  //       },
  //     });
  //   } else {
  //     navigate('/register');
  //   }
  // };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
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
        
        // Get user data from token and update context
        const userData = getUserFromToken();
        if (userData) {
          // Actualizar el contexto con los datos del usuario
          setUserData({
            nombre: userData.nombre || '',
            email: userData.correo || '', // Provide a default value if email is missing
            userType: userData.userType,
            originalUserType: userData.originalUserType || '',
          });
          
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

  // const handleBack = () => {
  //   if (formRef.current) {
  //     gsap.to(formRef.current, {
  //       opacity: 0,
  //       x: 20,
  //       duration: 0.3,
  //       ease: 'power2.out',
  //       onComplete: () => {
  //         setStep('email');
  //         setOtp('');
  //         gsap.fromTo(formRef.current,
  //           { opacity: 0, x: -20 },
  //           { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
  //         );
  //       }
  //     });
  //   } else {
  //     setStep('email');
  //     setOtp('');
  //   }
  // };

  const handleForgotPassword = () => {
    setError('Funcionalidad de recuperación de contraseña próximamente disponible.');
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
    <div className="min-h-screen bg-[rgba(250,234,186,1)] flex items-center justify-center p-6 border-b-4 border-neutral-black">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0 }}
          className="absolute top-20 left-10 text-4xl opacity-20"
        >
          🎯
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute top-32 right-20 text-3xl opacity-20"
        >
          ⭐
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          className="absolute bottom-40 left-20 text-3xl opacity-20"
        >
          🚀
        </motion.div>
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 3 }}
          className="absolute bottom-20 right-10 text-4xl opacity-20"
        >
          💎
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="w-full max-w-5xl relative z-10"
      >
        {/* Main header with MOVA branding */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-6"
          >
            <div className="w-20 h-20 rounded-2xl bg-teen-electric flex items-center justify-center mx-auto shadow-xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          {/* MOVA App Name */}
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl md:text-7xl text-neutral-black mb-2"
            style={{ fontFamily: 'Young Serif, serif' }}
          >
            möva
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-4"
          >
            <p className="text-2xl md:text-3xl text-neutral-black mb-2" style={{ fontFamily: 'Young Serif, serif' }}>
              Descubre tu mejor versión
            </p>
            <p className="text-lg text-neutral-black/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Plataforma de descubrimiento de talentos para adolescentes
            </p>
          </motion.div>
        </div>

        {/* Login Form - Centered */}
        <div className="flex justify-center mb-12">
          <Card className="shadow-mova bg-white/95 backdrop-blur-sm w-full max-w-md">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-teen-charcoal">Iniciar Sesión</CardTitle>
              <p className="text-teen-charcoal/70">Ingresa tus credenciales</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-teen-charcoal">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-teen-charcoal/50" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="tu-email@ejemplo.com"
                    className="pl-10 h-12 border-2 border-input focus:border-teen-electric bg-white/80 text-teen-charcoal"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-teen-charcoal">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-teen-charcoal/50" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12 border-2 border-input focus:border-teen-electric bg-white/80 text-teen-charcoal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-teen-charcoal/50 hover:text-teen-charcoal"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                  className="text-teen-electric hover:text-teen-neon-pink transition-colors text-sm font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-teen-neon-pink/10 text-teen-neon-pink rounded-lg p-3 text-sm flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              {/* Login Button - With bottom border and black text */}
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                variant="teen"
                size="xl"
                className="w-full font-bold py-4 rounded-2xl text-lg shadow-mova hover:shadow-mova-strong transition-all mova-sticker-bordered text-neutral-black"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 mr-3"
                    >
                      <Target className="w-5 h-5" />
                    </motion.div>
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-3" />
                    Iniciar Sesión
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>

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
    </div>
  );
};

export default Login;