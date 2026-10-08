import React, { useState } from 'react';
import { Sparkles, ChevronRight, BookOpen, Shirt, Palette, Scissors, Wand2, Award, Heart } from 'lucide-react';
import { ParallaxBackground } from './components/ParallaxBackground';
import { TopNav, ActiveModule, Language } from './components/TopNav';
import { StorybookModal } from './components/StorybookModal';
import { FashionGallery } from './components/FashionGallery';
import { PatternStudio } from './components/PatternStudio';
import { CraftWorkshop } from './components/CraftWorkshop';
import { DressUpStudio } from './components/DressUpStudio';
import { BadgesModal, BadgeItem } from './components/BadgesModal';
import { NarratorGuide } from './components/NarratorGuide';
import { BottomNav } from './components/BottomNav';
import { sound } from './utils/audio';

const INITIAL_BADGES: BadgeItem[] = [
  {
    id: 'origin_seeker',
    title: 'Người Tìm Cội Nguồn',
    desc: 'Khám phá đầy đủ thông tin nhân khẩu và bản đồ 6 tỉnh cư trú của người Mông',
    icon: '🏔️',
    pointsReq: 50,
    unlocked: false,
  },
  {
    id: 'fashion_connoisseur',
    title: 'Bậc Thầy Năm Sắc Thổ Cẩm',
    desc: 'Chiêm ngưỡng toàn diện 5 nhóm Mông Trắng, Mông Hoa, Mông Đen, Mông Xanh, Mông Đỏ',
    icon: '👗',
    pointsReq: 100,
    unlocked: false,
  },
  {
    id: 'batik_artisan',
    title: 'Nghệ Nhân Nhuộm Chàm Sáp Ong',
    desc: 'Vượt qua công đoạn vẽ sáp ong và nhúng vò chàm truyền thống',
    icon: '🕯️',
    pointsReq: 140,
    unlocked: false,
  },
  {
    id: 'embroidery_master',
    title: 'Mũi Kim Ngũ Sắc Tinh Xảo',
    desc: 'Thêu chuẩn xác toàn bộ các điểm chỉ chữ thập trên nền vải lanh',
    icon: '🪡',
    pointsReq: 180,
    unlocked: false,
  },
  {
    id: 'applique_expert',
    title: 'Khéo Tay Ghép Vải Paj Ntaub',
    desc: 'Hoàn thành ghép các mảng vải màu hình học lên yếm cổ áo',
    icon: '✂️',
    pointsReq: 220,
    unlocked: false,
  },
  {
    id: 'authentic_matcher',
    title: 'Phối Đồ Chuẩn Bản Sắc',
    desc: 'Phối đúng trọn bộ trang phục nguyên bản của một nhánh Mông',
    icon: '✨',
    pointsReq: 300,
    unlocked: false,
  },
];

export default function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('hub');
  const [artisanPoints, setArtisanPoints] = useState<number>(40);
  const [badges, setBadges] = useState<BadgeItem[]>(INITIAL_BADGES);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<Language>('vi');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Stored custom drawn pattern data URL from Module 3 to be applied in Module 5
  const [savedPattern, setSavedPattern] = useState<string | null>(null);
  const [hubSpeaker, setHubSpeaker] = useState<'both' | 'kut_yeu' | 'a_vu'>('both');

  // Notification toast for points/rewards
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAwardPoints = (pts: number, reason: string) => {
    setArtisanPoints((prev) => {
      const nextPts = prev + pts;

      // Check badge unlocks
      setBadges((currentBadges) =>
        currentBadges.map((b) => {
          if (!b.unlocked && nextPts >= b.pointsReq) {
            return { ...b, unlocked: true };
          }
          return b;
        })
      );

      return nextPts;
    });

    setToastMessage(`+${pts} Điểm: ${reason}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleToggleLang = () => {
    sound.playSilverChime();
    setCurrentLang((prev) => {
      if (prev === 'vi') return 'en';
      if (prev === 'en') return 'hmoob';
      return 'vi';
    });
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    sound.setMute(nextMute);
  };

  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="min-h-screen flex flex-col relative text-[#2C241E]">
      {/* 2D Parallax mountain & swaying linen background */}
      <ParallaxBackground />

      {/* Top Navigation Bar adhering to the Top Bar Contract */}
      <TopNav
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        artisanPoints={artisanPoints}
        unlockedBadgesCount={unlockedBadgesCount}
        onOpenBadges={() => setIsBadgesModalOpen(true)}
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Points & Achievement Toast */}
      {toastMessage && (
        <div className="fixed top-18 right-4 z-50 bg-[#2C241E] text-white px-4 py-2.5 rounded-xl shadow-lg border border-amber-300 flex items-center gap-2 animate-in slide-in-from-top duration-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container Viewport */}
      <main className="flex-1 relative z-10 pb-28 sm:pb-32">
        {/* ======================================================== */}
        {/* MÀN HÌNH CHÍNH (MAIN MENU / HUB) */}
        {/* ======================================================== */}
        {activeModule === 'hub' && (
          <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 flex flex-col items-center">
            {/* Hero Welcoming Section with Kút Yệu & A Vừ */}
            <div className="relative text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF9F2] border border-[#FF3B5C]/30 text-xs font-semibold text-[#FF3B5C] shadow-xs mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Không gian Tương tác Văn hóa Dân gian Mông Việt Nam</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C241E] font-display text-balance">
                Dệt Sắc Bản Mông
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#5C4D42] max-w-2xl mx-auto leading-relaxed text-balance">
                Cùng nàng thiếu nữ <strong>Kút Yệu</strong> và chàng trai <strong>A Vừ</strong> khám phá vẻ đẹp thuần khiết của sợi lanh, nét huyền ảo của sắc chàm và sự kỳ công của hoa văn thổ cẩm Tây Bắc.
              </p>

              {/* Central Primary Action Button */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    sound.playFanfare();
                    setActiveModule('intro');
                  }}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#FFB703] via-[#FF7043] to-[#FF3B5C] text-white font-bold text-sm lg:text-base rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 tracking-wide"
                >
                  <Sparkles className="w-5 h-5 text-amber-100" />
                  <span>✨ BẮT ĐẦU KHÁM PHÁ ✨</span>
                </button>
              </div>
            </div>

            {/* Guides Interactive Greeting Cloud Box */}
            <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-sm border-2 border-[#E8DFD5] mb-8 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3B5C] via-[#FFB703] to-[#4FC3F7]" />
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => {
                    sound.playSilverChime();
                    setHubSpeaker('kut_yeu');
                  }}
                  className={`relative group transition-all p-0.5 rounded-full ${
                    hubSpeaker === 'kut_yeu' ? 'ring-3 ring-[#FF3B5C] scale-105' : 'hover:scale-105'
                  }`}
                  title="Nghe Kút Yệu trò chuyện"
                >
                  <img
                    src="/src/assets/images/chibi_kut_yeu_portrait_1791187201444.jpg"
                    alt="Kút Yệu"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#FF3B5C] shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#FF3B5C] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full whitespace-nowrap">
                    Kút Yệu
                  </span>
                </button>

                <button
                  onClick={() => {
                    sound.playKhen(440);
                    setHubSpeaker('a_vu');
                  }}
                  className={`relative group transition-all p-0.5 rounded-full ${
                    hubSpeaker === 'a_vu' ? 'ring-3 ring-[#0284C7] scale-105' : 'hover:scale-105'
                  }`}
                  title="Nghe A Vừ trò chuyện"
                >
                  <img
                    src="/src/assets/images/chibi_a_vu_portrait_1791187223010.jpg"
                    alt="A Vừ"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#4FC3F7] shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#0284C7] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full whitespace-nowrap">
                    A Vừ
                  </span>
                </button>
              </div>

              <div className="text-center sm:text-left flex-1">
                <p className="text-xs sm:text-sm text-[#2C241E] italic leading-relaxed">
                  {hubSpeaker === 'kut_yeu' ? (
                    <span>
                      "Chào bạn nhé! Mình là <strong>Kút Yệu (22 tuổi)</strong>. Váy xòe thổ cẩm của người Mông chúng mình dệt từ sợi lanh phơi sương sớm, viền thêu chỉ đỏ rực rỡ như hoa ban mùa xuân!"
                    </span>
                  ) : hubSpeaker === 'a_vu' ? (
                    <span>
                      "A Vừ (23 tuổi) xin chào bạn! Trang phục nam người Mông gồm áo chàm xẻ nách, thắt lưng thêu hoa và xà cạp giúp vượt dốc đá tai mèo bền bỉ, kiên cường."
                    </span>
                  ) : (
                    <span>
                      "Nyob zoo bạn yêu quý! Bản làng của chúng mình có 5 nhánh trang phục truyền thống tuyệt đẹp. Hãy chọn 1 trong 4 chức năng chính ở thanh ngang dưới cùng nhé!"
                    </span>
                  )}
                </p>
                <div className="flex items-center justify-between mt-1 text-[11px] text-[#FF3B5C] font-semibold">
                  <span>
                    {hubSpeaker === 'kut_yeu' ? '— Kút Yệu (22 tuổi)' : hubSpeaker === 'a_vu' ? '— A Vừ (23 tuổi)' : '— Kút Yệu & A Vừ dẫn truyện'}
                  </span>
                  <span className="text-[10px] text-stone-500 font-normal">Chạm vào ảnh để đổi người dẫn chuyện</span>
                </div>
              </div>
            </div>

            {/* Quick Link Card to Storybook */}
            <div
              onClick={() => {
                sound.playSilverChime();
                setActiveModule('intro');
              }}
              className="w-full max-w-3xl p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 flex items-center justify-between gap-4 cursor-pointer hover:border-amber-300 transition-colors shadow-xs"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#FFB703] shrink-0" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#2C241E]">
                    Chưa rõ nguồn gốc và địa bàn cư trú của 5 nhóm Mông?
                  </h4>
                  <p className="text-[11px] text-stone-600">
                    Mở Sách Truyện Nguồn Cội tương tác để thu thập các huy hiệu lịch sử văn hóa!
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#FF7043] shrink-0">Khám phá ngay →</span>
            </div>
          </div>
        )}

        {/* Storytellers & Guides Throughout All Modules (except gallery as requested) */}
        {activeModule !== 'hub' && activeModule !== 'gallery' && (
          <div className="pt-4">
            <NarratorGuide currentModule={activeModule} />
          </div>
        )}

        {/* ======================================================== */}
        {/* PHẦN 1: TỔNG QUAN THÔNG TIN NGUỒN CỘI (STORYBOOK) */}
        {/* ======================================================== */}
        {activeModule === 'intro' && (
          <StorybookModal
            onAwardPoints={handleAwardPoints}
            onNextModule={() => setActiveModule('gallery')}
          />
        )}

        {/* ======================================================== */}
        {/* PHẦN 2: TRƯNG BÀY TRANG PHỤC 5 NHÓM MÔNG (FASHION GALLERY) */}
        {/* ======================================================== */}
        {activeModule === 'gallery' && (
          <FashionGallery
            onAwardPoints={handleAwardPoints}
            onGoToPatternStudio={() => setActiveModule('pattern')}
          />
        )}

        {/* ======================================================== */}
        {/* PHẦN 3: GIỚI THIỆU & XƯỞNG TẬP VẼ HỌA TIẾT (PATTERN STUDIO) */}
        {/* ======================================================== */}
        {activeModule === 'pattern' && (
          <PatternStudio
            onAwardPoints={handleAwardPoints}
            onSaveCustomPattern={(dataUrl) => setSavedPattern(dataUrl)}
            savedPattern={savedPattern}
          />
        )}

        {/* ======================================================== */}
        {/* PHẦN 4: GIỚI THIỆU CÔNG ĐOẠN THỦ CÔNG (CRAFT WORKSHOP) */}
        {/* ======================================================== */}
        {activeModule === 'craft' && (
          <CraftWorkshop
            onAwardPoints={handleAwardPoints}
            onGoToDressUp={() => setActiveModule('dressup')}
          />
        )}

        {/* ======================================================== */}
        {/* PHẦN 5: PHÒNG PHỐI ĐỒ (DRESS-UP STUDIO) */}
        {/* ======================================================== */}
        {activeModule === 'dressup' && (
          <DressUpStudio
            onAwardPoints={handleAwardPoints}
            savedPattern={savedPattern}
            onGoToPatternStudio={() => setActiveModule('pattern')}
          />
        )}
      </main>

      {/* Badges & Achievements Modal Drawer */}
      <BadgesModal
        isOpen={isBadgesModalOpen}
        onClose={() => setIsBadgesModalOpen(false)}
        artisanPoints={artisanPoints}
        badges={badges}
      />

      {/* Quiet Footer */}
      <footer className="relative z-10 border-t border-[#E8DFD5] bg-[#FFF9F2]/80 backdrop-blur-xs py-4 px-6 text-center text-xs text-stone-500 mb-16 sm:mb-20">
        <p>
          Ứng dụng tương tác văn hóa dân tộc <strong>Dệt Sắc Bản Mông</strong> · Tôn vinh trang phục thổ cẩm 5 nhóm người Mông Việt Nam
        </p>
      </footer>

      {/* Thanh ngang 4 chức năng chính dưới cùng của trang */}
      <BottomNav activeModule={activeModule} onSelectModule={setActiveModule} />
    </div>
  );
}
