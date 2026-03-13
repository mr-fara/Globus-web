import React from 'react'
import { useScrollReveal } from '--/--/hooks/useScrollReveal'

const ScrollReveal = (
    children,
    animation = 'fadeup',
    delay=0,
    duration=700


) => {
    const { ref, isVisble } = useScrollReveal({ threshold: 0.5});

    const animationClasses = {
        fadeup: 'opacity-0 translate-y-8',
        fadeIn: 'opacity-0',
        FadeLeft: 'opacity-0 -translate-x-12',
        FadeRight: 'opacity-0 translate-x-12',
        scaleIn: 'opacity-0 scale-90'
    };

    const visibleClasses = 'opacity-100 translate-y-0 translate-x-0 scale-100';

    return (
        <div 
            ref={ref}
            className={`transition-all ease-out ${isVisble ? visibleClasses : animationClasses[animation]
                }`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`
            }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;