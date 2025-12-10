import React from 'react';
import LightRays from '../components/LightRays.jsx'; // Adjust path as needed

const DesktopBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
            {/* Light rays effect layer */}


            {/* Enhanced multi-layer gradient background */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(circle at 15% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 40%),
                        radial-gradient(circle at 85% 75%, rgba(6, 182, 212, 0.10) 0%, transparent 45%),
                        radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 60%),
                        radial-gradient(ellipse at 30% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
                        linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)
                    `
                }}
            />

            {/* Layered grid patterns for depth */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Secondary smaller grid for detail */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                }}
            />

            {/* Diagonal lines accent */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 80px,
                        rgba(6, 182, 212, 0.1) 80px,
                        rgba(6, 182, 212, 0.1) 81px
                    )`
                }}
            />

            {/* Enhanced vignette with multiple layers */}
            <div
                className="absolute inset-0 opacity-50"
                style={{
                    background: `
                        radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.9) 100%)
                    `
                }}
            />

            {/* Corner accents - top left */}
            <div
                className="absolute top-0 left-0 w-96 h-96 opacity-10"
                style={{
                    background: 'radial-gradient(circle at top left, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
                }}
            />

            {/* Corner accents - bottom right */}
            <div
                className="absolute bottom-0 right-0 w-96 h-96 opacity-10"
                style={{
                    background: 'radial-gradient(circle at bottom right, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
                }}
            />

            {/* Scanline effect - very subtle */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.3) 2px, rgba(6, 182, 212, 0.3) 4px)'
                }}
            />

            {/* Enhanced static particles with varied sizes and colors */}
            <div className="absolute inset-0 opacity-25">
                {[...Array(30)].map((_, i) => {
                    const size = Math.random() > 0.7 ? 2 : 1;
                    const isGreen = Math.random() > 0.8;

                    return (
                        <div
                            key={i}
                            className={`absolute rounded-full ${
                                isGreen ? 'bg-emerald-400/30' : 'bg-cyan-400/40'
                            }`}
                            style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                boxShadow: isGreen
                                    ? '0 0 4px rgba(16, 185, 129, 0.3)'
                                    : '0 0 4px rgba(6, 182, 212, 0.3)',
                            }}
                        />
                    );
                })}
            </div>

            {/* Subtle glow spots */}
            <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-400/4 rounded-full blur-3xl" />
            <div className="absolute top-2/3 left-1/4 w-72 h-72 bg-emerald-400/3 rounded-full blur-3xl" />

            {/* Border accent - top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

            {/* Border accent - bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        </div>
    );
};

export default DesktopBackground;
