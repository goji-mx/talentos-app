import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Progress } from '../ui/Progress';
import OnboardingVisuals from './OnboardingVisuals';
import { 
  Target, 
  Brain,
  Heart, 
  Trophy,
  ChevronRight, 
  ChevronLeft,
  TrendingUp,
  Award,
  Zap,
  Star,
  BarChart3,
  Smile
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingScreenProps {
  onComplete: () => void;
}

interface StepData {
  icon: any;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  features: string[];
  instructionTitle?: string;
  instructionText?: string;
  decorativeIcons?: any[]; // Para iconos adicionales en animaciones
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps: StepData[] = [
    {
      icon: Target,
      title: "¡Muévete a tu mejor versión! 🌟",
      description: "Cada persona tiene talentos únicos… y los tuyos están listos para activarse. ¡Descubre Tu Mejor Versión Ahora! 💥",
      color: "from-mova-coral to-mova-pink",
      bgColor: "from-mova-lime to-mova-lime-light",
      features: [
        "🎮 Descúbrete jugando",
        "🎯 Suma puntos y desbloquea niveles",
        "💪 Tips y Retos para sacar lo mejor de ti"
      ],
      decorativeIcons: [Star, Zap, Trophy]
    },
    {
      icon: Brain,
      title: "¡Sube de nivel tus Talentos!",
      description: "Tu siguiente nivel empieza aquí: gana, desbloquea y progresa. Cada reto te acerca a tu máximo potencial.",
      color: "from-mova-turquoise-medium to-mova-turquoise-light",
      bgColor: "from-mova-cream to-mova-salmon",
      features: [
        "📈 Ve tu avance en tiempo real",
        "🎉 Celebra cada logro",
        "💪 Gana confianza con cada éxito"
      ],
      decorativeIcons: [TrendingUp, Award, BarChart3]
    },
    {
      icon: Heart,
      title: "Lo que sientes importa 💖",
      description: "Tus emociones son movimiento y transformación. Te acompañamos con actividades para entenderte mejor cada día.",
      color: "from-mova-salmon to-mova-pink",
      bgColor: "from-mova-pink to-mova-coral",
      features: [
        "📱 Seguimiento diario de estado de ánimo",
        "🧘 Actividades de relajación y activación",
        "💬 Recursos de apoyo confidenciales"
      ],
      decorativeIcons: [Smile, Heart, Star]
    },
    {
      icon: Trophy,
      title: "¿Listo para comenzar? 🚀",
      description: "Tu primer reto para descubrir lo que te hace único. Solo responde con sinceridad para conocerte mejor.",
      color: "from-mova-lime to-mova-lime-light",
      bgColor: "from-mova-turquoise-light to-mova-turquoise-medium",
      features: [
        "📖 Lee las dos frases en cada pantalla",
        "🎭 Elige el emoji que más te describe",
        "💯 Responde con sinceridad",
        "🎯 Completa todas las preguntas"
      ],
      instructionTitle: "Tips rápidos",
      instructionText: "⏰ Tómate 20-30 minutos sin distracciones. 🎯 Confía en tu primera respuesta.",
      decorativeIcons: [Trophy, Star, Zap]
    }
  ];

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;
  const decorativeIcons = currentStepData.decorativeIcons || [];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 0) {
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced background floating elements */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 360],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-6 left-6 text-2xl md:text-4xl pointer-events-none z-0"
      >
        {currentStep === 0 ? '🌟' : currentStep === 1 ? '🚀' : currentStep === 2 ? '💖' : '🎯'}
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, -360],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-6 right-6 text-xl md:text-3xl pointer-events-none z-0"
      >
        {currentStep === 0 ? '💫' : currentStep === 1 ? '⚡' : currentStep === 2 ? '🌈' : '✨'}
      </motion.div>

      {/* Additional animated decorative icons for step 2 */}
      {currentStep === 1 && (
        <>
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute top-1/4 left-12 pointer-events-none z-0"
          >
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-mova-turquoise-medium opacity-60" />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -180, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 right-12 pointer-events-none z-0"
          >
            <Award className="w-6 h-6 md:w-8 md:h-8 text-mova-salmon opacity-60" />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, -25, 0],
              x: [0, 10, 0],
              rotate: [0, 360, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
            className="absolute top-1/2 left-8 pointer-events-none z-0"
          >
            <BarChart3 className="w-5 h-5 md:w-7 md:h-7 text-mova-cream opacity-50" />
          </motion.div>
        </>
      )}

      {/* Header with Progress */}
      <div className="flex-shrink-0 p-4 md:p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-neutral-gray-dark font-medium">Comenzando</span>
            <span className="text-sm text-neutral-gray-dark font-medium">{currentStep + 1} de {steps.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>
      </div>

      {/* Main Content Area - Flexible */}
      <div className="flex-1 flex items-center justify-center p-4 min-h-0 relative z-10">
        <div className="w-full max-w-4xl h-full flex items-center">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className={`w-full relative overflow-hidden rounded-3xl bg-gradient-to-br ${currentStepData.bgColor} mova-sticker-bordered shadow-2xl`}
          >
            <Card className="border-0 bg-transparent h-full">
              <CardContent className="p-4 md:p-8 h-full">
                <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-center h-full">
                  {/* Left Content */}
                  <div className="space-y-3 md:space-y-6">
                    {/* Enhanced icon with floating decorative icons for step 2 */}
                    <div className="relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${currentStepData.color} flex items-center justify-center mova-sticker-bordered`}
                      >
                        <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </motion.div>

                      {/* Animated decorative icons around main icon for step 2 */}
                      {currentStep === 1 && decorativeIcons.map((DecorativeIcon, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [0, 1, 1],
                            opacity: [0, 1, 0.7],
                            rotate: [0, 360, 0],
                            y: [0, -10, 0]
                          }}
                          transition={{ 
                            delay: 0.5 + index * 0.3,
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className={`absolute pointer-events-none ${
                            index === 0 ? '-top-4 -right-4' :
                            index === 1 ? '-bottom-4 -left-4' :
                            '-top-4 -left-4'
                          }`}
                        >
                          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg mova-sticker-bordered">
                            <DecorativeIcon className="w-3 h-3 md:w-4 md:h-4 text-mova-turquoise-medium" />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl md:text-3xl lg:text-4xl text-neutral-black"
                    >
                      {currentStepData.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-base md:text-lg text-neutral-gray-dark leading-relaxed"
                    >
                      {currentStepData.description}
                    </motion.p>

                    {/* Tutorial section for step 3 - Simplified */}
                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-mova-coral shadow-lg mova-sticker-bordered"
                      >
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-lg md:text-xl text-mova-coral mb-2 flex items-center gap-2"
                        >
                          🎮 ¿Cómo jugar?
                        </motion.h3>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-2"
                        >
                          {currentStepData.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + index * 0.1 }}
                              className="flex items-center gap-2 text-neutral-gray-dark"
                            >
                              <motion.div 
                                className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentStepData.color} flex-shrink-0`}
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                              ></motion.div>
                              <span className="text-xs md:text-sm">{feature}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                        
                        {currentStepData.instructionTitle && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0 }}
                            className="mt-3 pt-3 border-t border-mova-coral"
                          >
                            <h4 className="text-sm md:text-base text-mova-salmon mb-1 flex items-center gap-1">
                              💡 {currentStepData.instructionTitle}
                            </h4>
                            <p className="text-xs md:text-sm text-neutral-gray-dark">
                              {currentStepData.instructionText}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {/* Enhanced features for other steps */}
                    {currentStep !== 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2 md:space-y-3"
                      >
                        {currentStepData.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="flex items-center gap-3 text-neutral-gray-dark"
                          >
                            <motion.div 
                              className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentStepData.color}`}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                            ></motion.div>
                            <span className="text-sm md:text-base">{feature}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Right Visual - Responsive with Progress Bars for Step 2 */}
                  <div className="space-y-4">
                    {/* OnboardingVisuals Component */}
                    <OnboardingVisuals 
                      currentStep={currentStep} 
                      stepColor={currentStepData.color} 
                    />

                    {/* Progress Bars Element - Only on Step 2, positioned on the right */}
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-mova-turquoise-medium shadow-lg mova-sticker-bordered"
                      >
                        <motion.h4
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.0 }}
                          className="text-sm md:text-base text-mova-turquoise-medium mb-3 flex items-center gap-2"
                        >
                          <BarChart3 className="w-4 h-4" />
                          Tu Progreso de Talentos
                        </motion.h4>
                        
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.1 }}
                          className="flex justify-center"
                        >
                          {/* <motion.img
                            src={progressBarsImage}
                            alt="Barras de progreso de talentos"
                            className="w-full max-w-[280px] h-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                          /> */}
                        </motion.div>
                        
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.3 }}
                          className="text-xs text-neutral-gray-dark text-center mt-3"
                        >
                          Cada nivel desbloqueado te acerca más a descubrir tu potencial único
                        </motion.p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Footer Navigation - Fixed */}
      <div className="flex-shrink-0 p-4 md:p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-4xl mx-auto flex items-center justify-between"
        >
          <Button
            onClick={handlePrev}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 px-3 py-2 md:px-6 md:py-3 rounded-xl mova-sticker-bordered bg-white text-neutral-gray-dark hover:bg-neutral-gray-50 hover:text-neutral-gray-dark hover:cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">
              {currentStep === 0 ? 'Volver' : 'Anterior'}
            </span>
            <span className="sm:hidden">
              {currentStep === 0 ? 'Volver' : 'Ant.'}
            </span>
          </Button>

          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-white scale-125 shadow-lg'
                    : index < currentStep
                    ? 'bg-white/70'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            size="lg"
            className={`flex items-center gap-2 px-3 py-2 md:px-6 md:py-3 rounded-xl shadow-xl transform hover:scale-105 transition-all mova-sticker-bordered hover:cursor-pointer ${
              currentStep === steps.length - 1
                ? 'bg-gradient-to-r from-mova-lime to-mova-lime-light hover:from-mova-lime-light hover:to-mova-lime text-neutral-black'
                : 'bg-gradient-to-r from-mova-coral to-mova-pink hover:from-mova-pink hover:to-mova-coral text-white'
            }`}
          >
            <span className="hidden sm:inline">
              {currentStep === steps.length - 1 ? '¡Empezar!' : 'Continuar'}
            </span>
            <span className="sm:hidden">
              {currentStep === steps.length - 1 ? '¡Empezar!' : 'Sig.'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}