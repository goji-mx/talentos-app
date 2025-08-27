import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

const MovaLanding: React.FC = () => {
  const navigate = useNavigate();
  const onGetStarted = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-mova-turquoise-medium flex items-center justify-center p-4">

      {/* Logo MOVA en esquina superior izquierda */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-6 lg:top-8 lg:left-8 z-20"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-black" style={{ fontFamily: "'Playfair Display', serif" }}>
          möva
        </h1>
      </motion.div>
      
      <div className="max-w-4xl w-full">
        {/* Main Content */}
        <div className="text-center">
          {/* Título principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl lg:text-6xl text-neutral-black mb-4 leading-tight" style={{ fontFamily: "'Young Serif', serif" }}>
              El cambio no espera
            </h1>
            <h2 className="text-4xl lg:text-6xl text-neutral-black leading-tight" style={{ fontFamily: "'Young Serif', serif" }}>
              Tú tampoco
            </h2>
          </motion.div>

          {/* Subtítulo descriptivo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <p className="text-lg lg:text-xl text-neutral-black max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Únete a miles de jóvenes que ya están activando sus talentos únicos. Una experiencia 
              divertida y personalizada que te ayudará a conocerte mejor y a moverte hacia tu máximo 
              potencial.
            </p>
          </motion.div>

          {/* Tres tarjetas características */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
          >
            
            {/* Tarjeta 1 - Reta a tus talentos */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-mova-lime-light rounded-2xl p-6 shadow-mova text-center mova-sticker-bordered"
            >
              <h3 className="text-xl text-neutral-black mb-3" style={{ fontFamily: "'Young Serif', serif" }}>
                Reta a tus talentos
              </h3>
              <p className="text-neutral-black text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Descubre tus 5 habilidades únicas.
              </p>
            </motion.div>

            {/* Tarjeta 2 - Mentores que inspiran */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-mova-cream rounded-2xl p-6 shadow-mova text-center mova-sticker-bordered"
            >
              <h3 className="text-xl text-neutral-black mb-3" style={{ fontFamily: "'Young Serif', serif" }}>
                Mentores que inspiran
              </h3>
              <p className="text-neutral-black text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Aprende de quienes ya lo lograron.
              </p>
            </motion.div>

            {/* Tarjeta 3 - Juega y crece */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-mova-coral rounded-2xl p-6 shadow-mova text-center mova-sticker-bordered"
            >
              <h3 className="text-xl text-neutral-black mb-3" style={{ fontFamily: "'Young Serif', serif" }}>
                Juega y crece
              </h3>
              <p className="text-neutral-black text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Desbloquea medallas y sube de nivel.
              </p>
            </motion.div>
          </motion.div>

          {/* Botón Empezar - Verde lima con flecha */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-8"
          >
            <Button
              onClick={onGetStarted}
              className="px-8 py-3 rounded-full shadow-mova hover:shadow-mova-strong transition-all duration-300 hover:scale-105 text-lg font-medium mova-sticker-bordered"
              style={{ backgroundColor: '#ebfc63', color: '#101828' }}
            >
              <span style={{ fontFamily: "'Montserrat', sans-serif" }}>Empezar</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* Decorative Element (Chat bubble) */}
        <div className="fixed bottom-8 right-8">
          <div className="bg-slate-800 rounded-full p-4 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 cursor-pointer">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs">😊</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovaLanding;