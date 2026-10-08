import React from 'react';
import { ActiveModule } from './TopNav';
import { sound } from '../utils/audio';

interface BottomNavProps {
  activeModule: ActiveModule;
  onSelectModule: (module: ActiveModule) => void;
}

interface NavItem {
  id: 'gallery' | 'pattern' | 'craft' | 'dressup';
  title: string;
  shortTitle: string;
  icon: string;
  activeColor: string;
  tone: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeModule, onSelectModule }) => {
  const items: NavItem[] = [
    {
      id: 'gallery',
      title: 'Bảo tàng Trang phục',
      shortTitle: 'Bảo tàng',
      icon: '👗',
      activeColor: 'bg-[#FF3B5C] text-white shadow-sm',
      tone: '#FF3B5C',
    },
    {
      id: 'pattern',
      title: 'Xưởng Họa tiết',
      shortTitle: 'Xưởng Họa tiết',
      icon: '🎨',
      activeColor: 'bg-[#FFB703] text-stone-900 shadow-sm',
      tone: '#FFB703',
    },
    {
      id: 'craft',
      title: 'Góc Thủ công',
      shortTitle: 'Góc Thủ công',
      icon: '✂️',
      activeColor: 'bg-[#0284C7] text-white shadow-sm',
      tone: '#0284C7',
    },
    {
      id: 'dressup',
      title: 'Tủ Phối đồ',
      shortTitle: 'Tủ Phối đồ',
      icon: '✨',
      activeColor: 'bg-[#FF7043] text-white shadow-sm',
      tone: '#FF7043',
    },
  ];

  return (
    <nav
      aria-label="Thanh điều hướng 4 chức năng chính"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#faf7ed]/95 backdrop-blur-md border-t-2 border-[#E8DFD5] shadow-2xl transition-all"
    >
      {/* Decorative Traditional Multi-color Ribbon at top of bottom bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3B5C] via-[#FFB703] via-[#4FC3F7] to-[#FF3B5C]" />

      <div className="max-w-5xl mx-auto px-2 sm:px-6 py-2 sm:py-2.5">
        {/* All 4 main functions on 1 single horizontal bar (grid grid-cols-4) */}
        <div className="grid grid-cols-4 gap-1 sm:gap-3 items-center">
          {items.map((item, idx) => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playKhen(520 + idx * 70);
                  onSelectModule(item.id);
                }}
                className={`group relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 py-1.5 sm:py-2 px-1 sm:px-3 rounded-xl font-semibold transition-all select-none border ${
                  isActive
                    ? `${item.activeColor} border-transparent scale-102 ring-2 ring-black/10`
                    : 'bg-white/80 border-[#E8DFD5] text-[#4A3E37] hover:bg-white hover:border-[#FFB703] hover:text-[#2C241E]'
                }`}
              >
                {/* Icon */}
                <span className="text-base sm:text-xl shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>

                {/* Text Label - Single Line */}
                <div className="flex flex-col text-center sm:text-left min-w-0">
                  <span className="text-[11px] sm:text-xs lg:text-sm font-bold truncate whitespace-nowrap leading-tight">
                    {/* On very small mobile screens show shortTitle, on sm+ show full title */}
                    <span className="hidden sm:inline">{item.title}</span>
                    <span className="inline sm:hidden">{item.shortTitle}</span>
                  </span>
                </div>

                {/* Active Indicator Dot */}
                {isActive && (
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white animate-ping ml-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
