import { motion } from 'motion/react';
import { 
  Target, 
  Zap, 
  Heart, 
  Trophy, 
  Sparkles,
  Star
} from 'lucide-react';

interface OnboardingVisualsProps {
  currentStep: number;
  stepColor: string;
}

export default function OnboardingVisuals({ currentStep, stepColor }: OnboardingVisualsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="relative flex items-center justify-center"
    >
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Pulsating Background Glow */}
      <PulsatingGlow stepColor={stepColor} />

      <div className="relative z-10">
        {currentStep === 0 && <StepZeroVisual />}
        {currentStep === 1 && <StepOneVisual stepColor={stepColor} />}
        {currentStep === 2 && <StepTwoVisual />}
        {currentStep === 3 && <StepThreeVisual />}
      </div>
    </motion.div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 400 - 200, 
            y: Math.random() * 400 - 200,
            scale: 0
          }}
          animate={{ 
            x: Math.random() * 400 - 200 + Math.sin(Date.now() * 0.001 + i) * 50,
            y: Math.random() * 400 - 200 + Math.cos(Date.now() * 0.001 + i) * 50,
            scale: [0, 1, 0.8, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8 + i * 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: i * 0.5
          }}
          className={`absolute w-2 h-2 md:w-3 md:h-3 rounded-full opacity-20 ${
            i % 4 === 0 ? 'bg-mova-lime' :
            i % 4 === 1 ? 'bg-mova-coral' :
            i % 4 === 2 ? 'bg-mova-turquoise-medium' :
            'bg-mova-salmon'
          }`}
        />
      ))}
    </div>
  );
}

function PulsatingGlow({ stepColor }: { stepColor: string }) {
  return (
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className={`absolute inset-0 rounded-full bg-gradient-to-r ${stepColor} blur-3xl`}
    />
  );
}

function StepZeroVisual() {
  return (
    <div className="grid grid-cols-2 gap-2 md:gap-4">
      {[Target, Zap, Heart, Star].map((Icon, index) => (
        <motion.div
          key={index}
          initial={{ 
            scale: 0, 
            rotate: -180,
            opacity: 0 
          }}
          animate={{ 
            scale: 1,
            rotate: 0,
            opacity: 1,
            y: [0, -10, 0],
            rotateZ: [0, 5, -5, 0]
          }}
          whileHover={{ 
            scale: 1.2,
            rotateZ: 10,
            y: -15,
            transition: { duration: 0.3 }
          }}
          transition={{ 
            delay: index * 0.2, 
            duration: 0.6, 
            type: "spring",
            y: {
              duration: 3, 
              repeat: Infinity, 
              delay: index * 0.4
            },
            rotateZ: {
              duration: 3, 
              repeat: Infinity, 
              delay: index * 0.4
            }
          }}
          className="p-3 md:p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl mova-sticker-bordered cursor-pointer relative overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 1, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: index * 0.3 + 1 
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12"
          />
          <Icon className="w-6 h-6 md:w-8 md:h-8 text-purple-500 relative z-10" />
        </motion.div>
      ))}
    </div>
  );
}

function StepOneVisual({ stepColor }: { stepColor: string }) {
  return (
    <div className="space-y-3 md:space-y-4 w-full max-w-sm">
      {[1, 2, 3].map((level) => (
        <motion.div
          key={level}
          initial={{ 
            width: 0, 
            opacity: 0,
            x: -50
          }}
          animate={{ 
            width: `${level * 30}%`,
            opacity: 1,
            x: 0
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(158, 213, 223, 0.5)"
          }}
          transition={{ 
            delay: 0.5 + level * 0.3,
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
          className={`h-3 md:h-4 rounded-full bg-gradient-to-r ${stepColor} shadow-lg relative overflow-hidden cursor-pointer`}
        >
          <motion.div
            animate={{ 
              x: ["-100%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: level * 0.5 + 2
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
          <motion.div
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: level * 0.2 
            }}
            className="absolute inset-0 bg-white/20 rounded-full"
          />
        </motion.div>
      ))}
    </div>
  );
}

function StepTwoVisual() {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3">
      {['😊', '😎', '🤗', '💪', '🌟', '❤️'].map((emoji, index) => (
        <motion.div
          key={index}
          initial={{ 
            scale: 0,
            rotate: -180,
            opacity: 0,
            y: 50
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
            opacity: 1,
            y: [0, -5, 0]
          }}
          whileHover={{ 
            scale: 1.4,
            rotate: 15,
            y: -10,
            zIndex: 10,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ 
            scale: 0.9,
            rotate: -10
          }}
          transition={{ 
            delay: index * 0.15, 
            duration: 0.6, 
            type: "spring",
            bounce: 0.6,
            scale: {
              duration: 2 + index * 0.2, 
              repeat: Infinity, 
              delay: index * 0.3,
              ease: "easeInOut"
            },
            rotate: {
              duration: 2 + index * 0.2, 
              repeat: Infinity, 
              delay: index * 0.3,
              ease: "easeInOut"
            },
            y: {
              duration: 2 + index * 0.2, 
              repeat: Infinity, 
              delay: index * 0.3,
              ease: "easeInOut"
            }
          }}
          className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white rounded-xl shadow-lg text-xl md:text-2xl mova-sticker-bordered cursor-pointer relative overflow-hidden"
        >
          <motion.div
            animate={{ 
              scale: [0, 2],
              opacity: [0.5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: index * 0.4 + 1
            }}
            className="absolute inset-0 bg-gradient-to-r from-mova-lime to-mova-coral rounded-xl"
          />
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: index * 0.2
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl"
          />
          <span className="relative z-10">{emoji}</span>
        </motion.div>
      ))}
    </div>
  );
}

function StepThreeVisual() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: [1, 1.05, 1],
        rotate: 0
      }}
      transition={{ 
        duration: 0.8, 
        type: "spring", 
        bounce: 0.6,
        scale: {
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut"
        }
      }}
      className="relative"
    >
      {/* Multiple glowing rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            scale: [1, 1.3 + i * 0.2, 1],
            opacity: [0.3, 0.1, 0.3],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 4 + i * 2, 
            repeat: Infinity, 
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          className={`absolute inset-0 rounded-full border-2 border-yellow-400/30`}
          style={{
            width: `${120 + i * 20}%`,
            height: `${120 + i * 20}%`,
            left: `${-10 - i * 10}%`,
            top: `${-10 - i * 10}%`
          }}
        />
      ))}
      
      {/* Main trophy */}
      <motion.div 
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 40px rgba(251, 191, 36, 0.6)"
        }}
        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shadow-2xl mova-sticker-bordered relative overflow-hidden cursor-pointer"
      >
        <motion.div
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent"
        />
        
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            y: [0, -2, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Trophy className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white drop-shadow-lg relative z-10" />
        </motion.div>
        
        <motion.div
          animate={{ 
            x: ["-100%", "100%"],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            delay: 1
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-12"
        />
      </motion.div>
      
      {/* Floating sparkles and stars */}
      <FloatingSparkles />
      
      {/* Confetti particles */}
      <ConfettiParticles />
    </motion.div>
  );
}

function FloatingSparkles() {
  const sparkleItems = [
    { icon: Sparkles, size: "w-4 h-4 md:w-6 md:h-6", color: "text-purple-400", pos: "top-0 left-1/2" },
    { icon: Sparkles, size: "w-3 h-3 md:w-4 md:h-4", color: "text-pink-400", pos: "top-1/2 right-0" },
    { icon: Star, size: "w-4 h-4 md:w-5 md:h-5", color: "text-yellow-400", pos: "top-1/4 right-1/4" },
    { icon: Star, size: "w-3 h-3 md:w-4 md:h-4", color: "text-blue-400", pos: "bottom-1/4 left-1/4" },
    { icon: Sparkles, size: "w-3 h-3 md:w-5 md:h-5", color: "text-green-400", pos: "bottom-0 left-1/2" },
    { icon: Star, size: "w-4 h-4 md:w-6 md:h-6", color: "text-red-400", pos: "top-1/2 left-0" }
  ];

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      className="absolute -inset-6 md:-inset-8"
    >
      {sparkleItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={index}
            animate={{ 
              scale: [0.8, 1.3, 0.8],
              rotate: [0, -360],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 2 + index * 0.3, 
              repeat: Infinity, 
              delay: index * 0.4,
              ease: "easeInOut"
            }}
            className={`absolute ${item.pos}`}
          >
            <IconComponent className={`${item.size} ${item.color} drop-shadow-lg`} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function ConfettiParticles() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: 0, 
            opacity: 0, 
            scale: 0 
          }}
          animate={{ 
            y: [-20, -60, -20],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, Math.random() * 40 - 20, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            delay: i * 0.5 + 2,
            ease: "easeOut"
          }}
          className={`absolute w-2 h-2 rounded-full ${
            i % 3 === 0 ? 'bg-yellow-400' :
            i % 3 === 1 ? 'bg-orange-500' :
            'bg-red-500'
          }`}
          style={{
            left: `${20 + i * 10}%`,
            top: `${80 + (i % 2) * 10}%`
          }}
        />
      ))}
    </>
  );
}