// ./components/BackgroundCircles.tsx
import { useEffect } from "react";
import gsap from "gsap";

const BackgroundCircles = () => {
    useEffect(() => {
        gsap.to('.circle1', {
            y: -25,
            repeat: -1,
            yoyoEase: true,
            duration: 1.5,
            ease: 'sine.inOut',
        });
    
        gsap.to('.circle2', {
            x: 20,
            y: -20,
            repeat: -1,
            yoyoEase: true,
            duration: 1.5,
            ease: 'power1.inOut',
        });
    
        gsap.to('.circle3', {
            y: 20,
            x: -10,
            repeat: -1,
            yoyoEase: true,
            duration: 1.5,
            ease: 'power2.inOut',
        });
    }, []);
    
    
    return (
        <div className="absolute inset-0 z-1 overflow-hidden">
            {/* Círculo 1 - Inferior izquierdo */}
            <div className=" circle1
                absolute w-[40vw] h-[40vw] max-w-[200px] max-h-[200px]
                rounded-full
                bg-gradient-to-br from-[#7B8AD1] to-[#0C1093] 
                opacity-100 shadow-lg shadow-black/20
                bottom-[20vh] left-[10vw]
            " />

            {/* Círculo 2 - Superior derecho */}
            <div className=" circle2
                absolute w-[60vw] h-[60vw] max-w-[300px] max-h-[300px]
                rounded-full
                bg-gradient-to-br from-[#7B8AD1] to-[#0C1093] 
                opacity-90 shadow-xl shadow-black/20
                top-[8vh] right-[10vw]
            " />

            {/* Círculo 3 - Inferior derecho */}
            <div className=" circle3
                absolute w-[30vw] h-[30vw] max-w-[150px] max-h-[150px]
                rounded-full
                bg-gradient-to-br from-[#7B8AD1] to-[#0C1093] 
                opacity-80 shadow-md shadow-black/10
                bottom-[12vh] right-[25vw]
            " />
        </div>
    );
};

export default BackgroundCircles;  