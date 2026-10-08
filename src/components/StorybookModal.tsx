import React, { useState } from 'react';
import { BookOpen, MapPin, Users, Award, ChevronLeft, ChevronRight, Sparkles, Volume2 } from 'lucide-react';
import { CULTURAL_ORIGIN_DATA } from '../data/mongCulture';
import { sound } from '../utils/audio';

interface StorybookModalProps {
  onAwardPoints: (points: number, reason: string) => void;
  onNextModule: () => void;
}

export const StorybookModal: React.FC<StorybookModalProps> = ({ onAwardPoints, onNextModule }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedProvince, setSelectedProvince] = useState<number>(0);
  const [discoveredBadges, setDiscoveredBadges] = useState<string[]>(['b_name']);

  const handleDiscoverBadge = (id: string) => {
    if (!discoveredBadges.includes(id)) {
      sound.playSilverChime();
      setDiscoveredBadges((prev) => [...prev, id]);
      onAwardPoints(20, 'Khám phá tri thức văn hóa nguồn cội');
    }
  };

  const pages = [
    // Page 0: Lời Chào Từ Kút Yệu & A Vừ
    {
      title: 'Chào Bạn Đến Với Bản Mông Hoa!',
      subtitle: 'Lời chào từ Kút Yệu & A Vừ bên rặng mây trời',
    },
    // Page 1: Thông Số & Nguồn Cội Rực Rỡ
    {
      title: 'Dấu Ấn Cội Nguồn Dân Tộc',
      subtitle: 'Hơn 1.3 triệu đồng bào sinh sống trên dải non cao',
    },
    // Page 2: Bản Đồ Cư Trú & Địa Bàn Vùng Cao
    {
      title: 'Non Sông Hùng Vĩ & Địa Bàn Cư Trú',
      subtitle: 'Khám phá 6 tỉnh thành tụ hội các nhánh người Mông',
    },
    // Page 3: 5 Nhánh Mông & Tinh Hoa Sắc Màu
    {
      title: '5 Sắc Thổ Cẩm Vùng Cao',
      subtitle: 'Trắng - Hoa - Đen - Xanh - Đỏ: Bức tranh thổ cẩm sống động',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Book Cover / Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-[#FF3B5C] uppercase tracking-widest bg-[#FF3B5C]/10 px-3 py-1 rounded-full">
          Phần 1: Sách Truyện Nguồn Cội
        </span>
        <h2 className="text-2xl lg:text-4xl font-bold text-[#2C241E] font-display mt-2">
          {pages[currentPage].title}
        </h2>
        <p className="text-sm text-[#5C4D42] mt-1">{pages[currentPage].subtitle}</p>
      </div>

      {/* Main Interactive Storybook Container */}
      <div className="relative bg-[#FFFDF9] rounded-2xl shadow-xl border-2 border-[#E8DFD5] overflow-hidden min-h-[460px] flex flex-col justify-between p-6 lg:p-8 linen-bg">
        {/* Decorative Sawtooth Header Border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF3B5C] via-[#FFB703] to-[#4FC3F7]" />

        {/* Page Content Rendering */}
        <div className="flex-1 py-2">
          {currentPage === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
              {/* Guides Dialogue & Illustration */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  {/* Kút Yệu Avatar */}
                  <div className="relative group">
                    <img
                      src="/src/assets/images/chibi_kut_yeu_portrait_1791187201444.jpg"
                      alt="Kút Yệu"
                      className="w-24 h-24 lg:w-28 lg:h-28 rounded-2xl object-cover shadow-md border-2 border-[#FF3B5C] group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FF3B5C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      Kút Yệu (22t)
                    </span>
                  </div>

                  {/* A Vừ Avatar */}
                  <div className="relative group">
                    <img
                      src="/src/assets/images/chibi_a_vu_portrait_1791187223010.jpg"
                      alt="A Vừ"
                      className="w-24 h-24 lg:w-28 lg:h-28 rounded-2xl object-cover shadow-md border-2 border-[#4FC3F7] group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#0284C7] text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                      A Vừ (23t)
                    </span>
                  </div>
                </div>

                <div className="relative bg-white/90 p-4 rounded-2xl shadow-sm border border-[#E8DFD5] max-w-sm">
                  {/* Cloud speech bubble pointer */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-[#E8DFD5] rotate-45" />
                  <p className="text-sm text-[#2C241E] italic leading-relaxed">
                    "<strong>Nyob zoo!</strong> (Xin chào!) Mình là <strong>Kút Yệu</strong>, còn đây là anh <strong>A Vừ</strong>. Chào mừng bạn đến với vùng núi cao lộng gió, nơi hoa lanh trổ bông và những nếp váy xòe rực rỡ như nắng mai!"
                  </p>
                  <button
                    onClick={() => {
                      sound.playFanfare();
                      handleDiscoverBadge('b_name');
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF3B5C] hover:underline"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Lắng nghe giai điệu khèn chào đón</span>
                  </button>
                </div>
              </div>

              {/* Story Intro Prose */}
              <div className="space-y-4 text-[#4A3E37] text-sm leading-relaxed">
                <div className="p-4 rounded-xl bg-white/80 border border-[#E8DFD5] shadow-xs">
                  <h4 className="font-bold text-base text-[#2C241E] mb-1 font-display flex items-center gap-2">
                    <span>Huyền Thoại Về Cây Lanh & Con Người</span>
                    <Sparkles className="w-4 h-4 text-[#FFB703]" />
                  </h4>
                  <p>
                    Từ ngàn xưa, người Mông đã gắn bó máu thịt với cây lanh trên sườn đá tai mèo. Sợi lanh dẫn lối linh hồn người Mông trở về với tổ tiên nguồn cội. Trang phục truyền thống của người Mông không chỉ để mặc, mà còn là một cuốn sử thi ghi lại hành trình vượt suối băng đèo, biểu tượng cho sức sống kiên cường giữa ngút ngàn non cao.
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <Award className="w-8 h-8 text-[#FFB703] shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-[#2C241E]">Nhiệm Vụ Dành Cho Bạn:</p>
                    <p className="text-stone-600">Lật từng trang sách, chạm vào các huy hiệu để mở khóa tri thức và nhận điểm thưởng Nghệ Nhân!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === 1 && (
            <div className="space-y-6">
              <p className="text-sm text-center text-[#5C4D42] max-w-xl mx-auto">
                Chạm vào các Huy hiệu phát sáng dưới đây để khám phá các số liệu nhân khẩu & ngôn ngữ đặc sắc của người Mông:
              </p>

              {/* Glowing Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CULTURAL_ORIGIN_DATA.badges.map((b) => {
                  const isUnlocked = discoveredBadges.includes(b.id);
                  return (
                    <button
                      key={b.id}
                      onClick={() => handleDiscoverBadge(b.id)}
                      className={`text-left p-4 rounded-xl transition-all relative overflow-hidden border ${
                        isUnlocked
                          ? 'bg-white shadow-md border-[#FF3B5C]/30 hover:border-[#FF3B5C]'
                          : 'bg-white/50 border-stone-200 opacity-80 hover:opacity-100 hover:border-amber-300'
                      }`}
                    >
                      {isUnlocked && (
                        <span className="absolute top-2 right-2 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                      )}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FFF9F2] border border-[#E8DFD5] flex items-center justify-center text-xl shrink-0">
                          {b.icon}
                        </div>
                        <div>
                          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                            {b.label}
                          </span>
                          <span className="text-base font-bold text-[#2C241E] block font-display">
                            {b.value}
                          </span>
                          <span className="text-xs text-stone-600 block mt-0.5">{b.sub}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 bg-white/90 rounded-xl border border-[#E8DFD5] text-xs text-[#5C4D42] flex items-center justify-between">
                <span>
                  Đã mở khóa: <strong>{discoveredBadges.length} / {CULTURAL_ORIGIN_DATA.badges.length}</strong> huy hiệu tri thức
                </span>
                <span className="text-[#FF3B5C] font-semibold">+20 Điểm cho mỗi huy hiệu mới</span>
              </div>
            </div>
          )}

          {currentPage === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Map Illustration Box */}
              <div className="bg-[#E0F7FA]/40 p-4 rounded-2xl border border-[#4FC3F7]/30">
                <h4 className="text-xs font-bold text-[#0284C7] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>Chọn địa bàn vùng cao để khám phá</span>
                </h4>

                <div className="grid grid-cols-2 gap-2 my-2">
                  {CULTURAL_ORIGIN_DATA.provinces.map((prov, idx) => (
                    <button
                      key={prov.name}
                      onClick={() => {
                        sound.playKhen(400 + idx * 60);
                        setSelectedProvince(idx);
                        handleDiscoverBadge('b_geo');
                      }}
                      className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                        selectedProvince === idx
                          ? 'bg-[#FF3B5C] text-white border-[#FF3B5C] shadow-sm font-semibold'
                          : 'bg-white/90 text-stone-700 border-[#E8DFD5] hover:bg-white'
                      }`}
                    >
                      <span className="block font-medium">{prov.name}</span>
                      <span className="text-[10px] opacity-80 block truncate">
                        {prov.highlight.split(' - ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Province Detail Panel */}
              <div className="p-5 bg-white rounded-2xl border border-[#E8DFD5] shadow-xs">
                <span className="text-[11px] font-semibold text-[#FF7043] uppercase tracking-wider block">
                  Cộng Đồng Người Mông Tại
                </span>
                <h3 className="text-2xl font-bold text-[#2C241E] font-display mt-0.5">
                  {CULTURAL_ORIGIN_DATA.provinces[selectedProvince].name}
                </h3>

                <div className="mt-4 space-y-3 text-xs leading-relaxed text-[#4A3E37]">
                  <div className="p-3 bg-[#FFF9F2] rounded-lg border border-[#E8DFD5]">
                    <span className="font-semibold block text-stone-800 mb-1">Địa danh tiêu biểu & Phân nhóm:</span>
                    <p className="text-stone-600">{CULTURAL_ORIGIN_DATA.provinces[selectedProvince].highlight}</p>
                  </div>

                  <p>
                    Địa hình núi đá vôi hùng vĩ đã tạo nên không gian văn hóa khép kín nhưng đậm đà bản sắc. Tại đây, mỗi dịp chợ phiên hay lễ hội Gầu Tào, đồng bào xúng xính trong những bộ váy xòe rực rỡ nhất để gặp gỡ, thổi khèn tìm bạn tình.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentPage === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-center text-stone-600">
                Dân tộc Mông tại Việt Nam được chia thành 5 phân nhóm chính dựa theo nét trang phục độc đáo của người phụ nữ:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {CULTURAL_ORIGIN_DATA.branches.map((br) => (
                  <div
                    key={br.name}
                    className="p-3 bg-white rounded-xl border border-[#E8DFD5] shadow-xs hover:border-[#FF3B5C] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-lg">
                        {br.name.includes('Hoa') ? '🌺' : br.name.includes('Trắng') ? '🌸' : br.name.includes('Đen') ? '🖤' : br.name.includes('Xanh') ? '🍃' : '🍎'}
                      </span>
                      <h4 className="font-bold text-sm text-[#2C241E] mt-1 font-display">{br.name}</h4>
                      <span className="text-[10px] text-stone-500 italic block">{br.native}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-2 line-clamp-3 leading-tight">{br.trait}</p>
                  </div>
                ))}
              </div>

              <div className="text-center pt-3">
                <button
                  onClick={() => {
                    sound.playFanfare();
                    onAwardPoints(30, 'Hoàn thành xem toàn bộ nguồn cội');
                    onNextModule();
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#FF3B5C] to-[#FF7043] text-white text-xs font-semibold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Bước Sang Phần 2: Bảo Tàng Trang Phục</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation of Book */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E8DFD5] mt-4">
          <button
            onClick={() => {
              if (currentPage > 0) {
                sound.playKhen(440);
                setCurrentPage((p) => p - 1);
              }
            }}
            disabled={currentPage === 0}
            className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
              currentPage === 0
                ? 'opacity-40 cursor-not-allowed border-stone-200 text-stone-400'
                : 'border-[#E8DFD5] text-[#2C241E] hover:bg-white'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Trang trước</span>
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-1.5">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  sound.playKhen(440 + i * 50);
                  setCurrentPage(i);
                }}
                className={`h-2 rounded-full transition-all ${
                  currentPage === i ? 'w-6 bg-[#FF3B5C]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                title={`Trang ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (currentPage < pages.length - 1) {
                sound.playKhen(550);
                setCurrentPage((p) => p + 1);
              } else {
                onNextModule();
              }
            }}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#FF3B5C] text-white hover:bg-[#E11D48] transition-colors"
          >
            <span>{currentPage === pages.length - 1 ? 'Khám phá Trang phục' : 'Trang tiếp'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
