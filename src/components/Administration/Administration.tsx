import React, { useEffect, useRef } from 'react';
import { Users, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Breadcrumb from '../ui/BreadCrum';

interface AdminProps {
  onLogout: () => void;
}

const Administration: React.FC<AdminProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation for cards appearing
    const cards = [card1Ref.current, card2Ref.current].filter(Boolean);

    // Set initial state for each card
    cards.forEach(card => {
      gsap.set(card, {
        opacity: 0,
        y: 50,
        scale: 0.9
      });
    });

    // Animate cards in with stagger
    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: index * 0.2
      });
    });
  }, []);

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="w-full min-h-screen">
      {/* Header with breadcrumb */}
      <div className='sticky top-0 z-50 bg-white border-b border-gray-200 px-6'>
        <Breadcrumb items={[
          { label: 'Administración', path: '/admin' }
        ]} onLogout={onLogout} />
      </div>

      {/* Main content with gradient background */}
      <div className='w-full min-h-screen p-8' style={{
        background: 'linear-gradient(45deg, rgb(140,159,233) 0%, rgb(249,250,254) 50%, rgb(140,159,233) 100%)'
      }}>
        {/* Cards container */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Gestión de Socios Card */}
            <div
              ref={card1Ref}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-300 ease-out hover:shadow-2xl"
              onClick={() => handleCardClick('/admin/users')}
              style={{
                transition: 'transform 0.1s ease, box-shadow 0.1s ease'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -8,
                  scale: 1.02,
                  duration: 0.1,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  scale: 1,
                  duration: 0.1,
                  ease: "power2.out"
                });
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Administrador de usuarios
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Gestiona los usuarios, su jerarquía y nivel de acceso
                  </p>
                </div>
              </div>
            </div>

            {/* Example Card */}
            <div
              ref={card2Ref}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-300 ease-out hover:shadow-2xl"
              onClick={() => handleCardClick('/admin/example')}
              style={{
                transition: 'transform 0.1s ease, box-shadow 0.1s ease'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -8,
                  scale: 1.02,
                  duration: 0.1,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  scale: 1,
                  duration: 0.1,
                  ease: "power2.out"
                });
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Ejemplo de Card
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Esta es una tarjeta de ejemplo que puedes personalizar
                    según tus necesidades. Puedes agregar más información o
                    enlaces aquí.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Administration;