import React from 'react';
import { Volume2, VolumeX, Sparkles, Award } from 'lucide-react';
import { sound } from '../utils/audio';

export type ActiveModule = 'hub' | 'intro' | 'gallery' | 'pattern' | 'craft' | 'dressup';
export type Language = 'vi' | 'en' | 'hmoob';

interface TopNavProps {
  activeModule: ActiveModule;
  onSelectModule: (module: ActiveModule) => void;
  artisanPoints: number;
  unlockedBadgesCount: number;
  onOpenBadges: () => void;
  currentLang: Language;
  onToggleLang: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeModule,
  onSelectModule,
  artisanPoints,
  unlockedBadgesCount,
  onOpenBadges,
  currentLang,
  onToggleLang,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#faf7ed] backdrop-blur-md border-b border-[#E8DFD5] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            sound.playKhen(523.25);
            onSelectModule('hub');
          }}
          className="text-xl lg:text-2xl font-bold tracking-tight text-[#2C241E] hover:text-[#FF3B5C] transition-colors font-display shrink-0 flex items-center gap-2 text-left"
        >
          <span>Dệt Sắc Bản Mông</span>
          <span className="w-2 h-2 rounded-full bg-[#FF3B5C] inline-block animate-ping" />
        </button>

        {/* Zone 3: Actions & utilities */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          {/* Sound / Music Toggle */}
          <button
            onClick={onToggleMute}
            aria-label="Toggle Sound"
            className="p-2 rounded-lg text-[#5C4D42] hover:text-[#2C241E] hover:bg-black/5 transition-colors"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-[#FF3B5C]" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1 text-xs font-semibold rounded-md border border-[#E8DFD5] text-[#5C4D42] hover:text-[#2C241E] hover:bg-white transition-colors uppercase tracking-wider"
            title="Đổi ngôn ngữ (VI / EN / HMOOB)"
          >
            {currentLang}
          </button>

          {/* Artisan Points & Badges */}
          <button
            onClick={() => {
              sound.playSilverChime();
              onOpenBadges();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#FFB703] to-[#FF7043] text-white rounded-lg text-xs font-semibold shadow-sm hover:brightness-105 active:scale-95 transition-all"
            title="Xem bảng thành tích & Huy hiệu"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tabular-nums">{artisanPoints}</span>
            <span className="hidden sm:inline">Điểm</span>
            <span className="w-px h-3 bg-white/40 mx-0.5" />
            <Award className="w-3.5 h-3.5" />
            <span className="tabular-nums">{unlockedBadgesCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
