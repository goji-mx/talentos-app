import React, { useEffect, useRef } from 'react';
import { Clock, Wrench, GraduationCap, LayoutDashboard, School } from 'lucide-react';
import { gsap } from 'gsap';
import Breadcrumb from './ui/BreadCrum';

interface HomeProps {
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogout }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Usar requestAnimationFrame para asegurar que los elementos estén montados
    const initAnimations = () => {
      // Verificar que todos los refs existan antes de animar
      if (!headerRef.current || !mainContentRef.current || !featuresRef.current) {
        return;
      }

      // Animaciones de entrada
      gsap.set([headerRef.current, mainContentRef.current, featuresRef.current], {
        opacity: 0,
        y: 30
      });

      const tl = gsap.timeline();
      
      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(mainContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2")
      .to(featuresRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2");

      // Animación del ícono principal (con verificación)
      const mainIcon = document.querySelector(".main-icon");
      if (mainIcon) {
        gsap.to(mainIcon, {
          rotation: 360,
          duration: 8,
          ease: "none",
          repeat: -1
        });
      }

      // Animación de pulso para las características (con verificación)
      const featureIcons = document.querySelectorAll(".feature-icon");
      if (featureIcons.length > 0) {
        gsap.to(featureIcons, {
          scale: 1.1,
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.3
        });
      }
    };

    // Usar requestAnimationFrame para diferir la inicialización
    requestAnimationFrame(initAnimations);
  }, []);

  return (
    <div className="w-full min-h-screen">
      {/* Header con Breadcrumb (sticky) */}
      <div className='sticky top-0 z-50 bg-white border-b border-gray-200 px-6'>
        <Breadcrumb
          items={[
            { label: 'Inicio', path: '/home' }
          ]}
          onLogout={onLogout}
        />
      </div>

      {/* Contenido principal con gradiente */}
      <div
        className="w-full min-h-screen p-8"
        style={{
          background: 'linear-gradient(45deg, rgb(140,159,233) 0%, rgb(249,250,254) 50%, rgb(140,159,233) 100%)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Sección de título */}
         

          {/* Contenido principal */}
          <div ref={mainContentRef} className="bg-white rounded-lg shadow-lg p-12 mb-8">
            <div className="text-center">
              {/* Ícono principal animado */}
              <div className="flex justify-center mb-8">
                <div className="main-icon bg-gradient-to-br from-purple-600 to-blue-600 rounded-full p-6 shadow-2xl">
                  <Wrench className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Título principal */}
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Próximamente
              </h2>
              
              {/* Descripción */}
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Estamos trabajando arduamente para traerte una experiencia excepcional. 
              </p>

              {/* Badge de estado */}
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium mb-8">
                <Clock className="w-4 h-4" />
                En desarrollo activo
              </div>
            </div>
          </div>

          {/* Características que vendrán */}
          <div ref={featuresRef} className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-all duration-200 hover:scale-105 hover:shadow-xl">
              <div className="feature-icon bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <School className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Escuelas</h3>
            
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-all duration-200 hover:scale-105 hover:shadow-xl">
              <div className="feature-icon bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <LayoutDashboard className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Dashboards</h3>
         
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-all duration-200 hover:scale-105 hover:shadow-xl">
              <div className="feature-icon bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Profesorado</h3>
            
            </div>
          </div>

          {/* Mensaje de progreso */}
          
        </div>
      </div>
    </div>
  );
};

export default Home;