import React from 'react';

interface ParallaxBackgroundProps {
  intensity?: number;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base gradient sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E0F7FA]/70 via-[#FFF9F2] to-[#FFF9F2]" />

      {/* Atmospheric landscape art */}
      <div 
        className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-multiply"
        style={{ backgroundImage: `url('/src/assets/images/hero_mong_landscape_1791187183818.jpg')` }}
      />

      {/* Layer 1: Floating Clouds */}
      <div className="absolute top-0 left-0 w-[140%] h-64 opacity-50 animate-float-slow">
        <svg viewBox="0 0 1200 200" fill="none" className="w-full h-full">
          <path
            d="M50 120 Q90 60 160 80 Q220 50 280 90 Q340 70 380 110 Q420 80 470 120 Z"
            fill="white"
            fillOpacity="0.8"
          />
          <path
            d="M600 100 Q650 40 720 70 Q790 40 850 80 Q910 60 970 110 Z"
            fill="white"
            fillOpacity="0.7"
          />
        </svg>
      </div>

      {/* Layer 2: Mountain Silhouettes with soft mist */}
      <div className="absolute bottom-16 left-0 right-0 h-96 opacity-25">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
          {/* Back mountains */}
          <path
            d="M0,192L80,181.3C160,171,320,149,480,165.3C640,181,800,235,960,224C1120,213,1280,139,1360,101.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            fill="#38BDF8"
          />
          {/* Mid mountains / Terraces */}
          <path
            d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,240C840,256,960,256,1080,240C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            fill="#10B981"
            fillOpacity="0.3"
          />
        </svg>
      </div>

      {/* Layer 3: Swaying Embroidered Linen Ribbons (Dải vải lanh phơi trước gió) */}
      <div className="absolute -top-6 right-8 lg:right-24 flex items-start gap-5 opacity-90">
        {/* Ribbon 1: Pink & Yellow Geometric */}
        <div className="w-10 h-72 lg:h-96 rounded-b-md shadow-md animate-sway origin-top overflow-hidden bg-gradient-to-b from-[#FF3B5C] via-[#FF7043] to-[#FFB703]">
          <div className="w-full h-full flex flex-col justify-between py-4 items-center opacity-85">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-6 h-6 border border-white/60 rotate-45 mb-2" />
            ))}
          </div>
        </div>

        {/* Ribbon 2: Indigo Batik with Snail Motif */}
        <div 
          className="w-12 h-64 lg:h-80 rounded-b-md shadow-md animate-sway origin-top overflow-hidden bg-[#1E293B]"
          style={{ animationDelay: '1.2s' }}
        >
          <div className="w-full h-full flex flex-col justify-around py-3 items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="24" height="24" viewBox="0 0 50 50" fill="none" stroke="#4FC3F7" strokeWidth="2">
                <circle cx="25" cy="25" r="8" />
                <path d="M 25 15 A 10 10 0 1 1 25 35 A 5 5 0 1 1 25 25" />
              </svg>
            ))}
          </div>
        </div>

        {/* Ribbon 3: Sun Yellow & Diamond */}
        <div 
          className="w-8 h-56 lg:h-72 rounded-b-md shadow-md animate-sway origin-top overflow-hidden bg-gradient-to-b from-[#FFB703] to-[#FFF9F2] border-r border-[#FF7043]"
          style={{ animationDelay: '2.5s' }}
        >
          <div className="w-full h-full flex flex-col justify-around items-center py-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-[#FF3B5C] rotate-45" />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Traditional Sawtooth Border at top screen */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF3B5C] via-[#FFB703] via-[#4FC3F7] to-[#FF3B5C]" />
    </div>
  );
};
