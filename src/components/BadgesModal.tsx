import React from 'react';
import { X, Award, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { sound } from '../utils/audio';

export interface BadgeItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  pointsReq: number;
  unlocked: boolean;
}

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  artisanPoints: number;
  badges: BadgeItem[];
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  artisanPoints,
  badges,
}) => {
  if (!isOpen) return null;

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const getRank = (pts: number) => {
    if (pts >= 300) return 'Bậc Thầy Dệt Sắc Bản Mông';
    if (pts >= 180) return 'Nghệ Nhân Thổ Cẩm Vùng Cao';
    if (pts >= 80) return 'Thợ Thêu Khéo Tay';
    return 'Người Mới Tập Sự';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-[#E8DFD5] relative overflow-hidden flex flex-col max-h-[85vh]">
        {/* Decorative Top Sawtooth Border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF3B5C] via-[#FFB703] to-[#4FC3F7]" />

        <button
          onClick={() => {
            sound.playKhen(400);
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 mb-2">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold font-display text-[#2C241E]">
            Bảng Huy Hiệu Nghệ Nhân
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Cấp bậc hiện tại: <strong className="text-[#FF3B5C]">{getRank(artisanPoints)}</strong>
          </p>
        </div>

        {/* Score Card */}
        <div className="p-4 bg-gradient-to-r from-[#FFF9F2] to-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FFB703]" />
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                Tổng Điểm Thưởng
              </span>
              <h4 className="text-xl font-bold text-[#2C241E] tabular-nums font-display">
                {artisanPoints} Điểm
              </h4>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
              Huy Hiệu
            </span>
            <h4 className="text-xl font-bold text-[#FF3B5C] tabular-nums font-display">
              {unlockedCount} / {badges.length}
            </h4>
          </div>
        </div>

        {/* Badges List */}
        <div className="overflow-y-auto space-y-2.5 pr-1 flex-1 scrollbar-thin">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-3 rounded-2xl border transition-all flex items-center gap-3.5 ${
                b.unlocked
                  ? 'bg-white border-emerald-200 shadow-xs'
                  : 'bg-stone-50/70 border-stone-200 opacity-60'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                  b.unlocked ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-400'
                }`}
              >
                {b.unlocked ? b.icon : <Lock className="w-4 h-4 text-stone-400" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-xs text-[#2C241E]">{b.title}</h5>
                  {b.unlocked ? (
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      Đã đạt
                    </span>
                  ) : (
                    <span className="text-[10px] text-stone-400">Yêu cầu {b.pointsReq}đ</span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Close button */}
        <div className="mt-4 pt-3 border-t border-[#E8DFD5] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#FF3B5C] text-white text-xs font-semibold rounded-xl hover:bg-[#E11D48] transition-colors"
          >
            Tiếp tục khám phá
          </button>
        </div>
      </div>
    </div>
  );
};
