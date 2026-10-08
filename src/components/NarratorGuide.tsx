import React, { useState } from 'react';
import { Volume2, Sparkles, MessageCircle, ChevronDown, ChevronUp, User } from 'lucide-react';
import { ActiveModule } from './TopNav';
import { sound } from '../utils/audio';

interface NarratorGuideProps {
  currentModule: ActiveModule;
}

export const NarratorGuide: React.FC<NarratorGuideProps> = ({ currentModule }) => {
  const [activeGuide, setActiveGuide] = useState<'kut_yeu' | 'a_vu'>('kut_yeu');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [showFull2DFigure, setShowFull2DFigure] = useState<boolean>(true);

  // Dialogues per character and module
  const dialogues = {
    hub: {
      kut_yeu: {
        text: 'Nyob zoo bạn yêu quý! Mình là Kút Yệu (22 tuổi). Cùng mình khám phá 5 sắc màu trang phục rực rỡ nhất của người Mông nhé! Bạn thích bắt đầu ở Bảo Tàng hay Xưởng Vẽ?',
        mood: 'Nụ cười rạng rỡ chào đón',
        tip: 'Mẹo: Nhấn nút [✨ BẮT ĐẦU KHÁM PHÁ ✨] để vào Sách Truyện Nguồn Cội!',
      },
      a_vu: {
        text: 'A Vừ (23 tuổi) xin chào bạn! Trang phục người Mông dệt từ cây lanh trên nương đá, nhuộm sắc chàm sâu của rừng già. Mỗi đường nét đều là câu chuyện ngàn đời của bản làng.',
        mood: 'Thổi điệu khèn chào đón',
        tip: 'Mẹo: Bạn có thể bật âm thanh ở góc trên để nghe tiếng khèn bè Mông.',
      },
    },
    intro: {
      kut_yeu: {
        text: 'Bạn có biết phụ nữ Mông dệt sợi lanh từ nhỏ để làm của hồi môn không? Lanh trắng, lanh vẽ sáp ong đều có vẻ đẹp riêng. Hãy chạm vào các huy hiệu sáng để thu thập điểm nhé!',
        mood: 'Hồ hởi giới thiệu nguồn cội',
        tip: 'Khám phá hết 5 huy hiệu để nhận danh hiệu "Người Tìm Cội Nguồn".',
      },
      a_vu: {
        text: 'Đồng bào Mông ta cư trú trên các triền núi đá vôi hùng vĩ ở Hà Giang, Lào Cai, Sơn La, Điện Biên, Lai Châu và Yên Bái. Khí hậu sương mù lạnh giá đã tạo nên những bộ trang phục dày dặn, ấm áp.',
        mood: 'Trầm ấm kể chuyện lịch sử',
        tip: 'Chạm vào từng tỉnh trên bản đồ để xem chi tiết địa bàn của từng nhánh Mông.',
      },
    },
    gallery: {
      kut_yeu: {
        text: 'Chiếc váy xòe Mông Hoa được xếp hàng trăm nếp ly tinh xảo, khi múa sẽ bung tròn như đóa hoa rừng! Bạn chạm vào các điểm sáng ✦ trên người búp bê để xem cận cảnh nhé!',
        mood: 'Xúng xính tà váy hoa',
        tip: 'Nhớ đổi tư thế "Múa Ô" để ngắm vạt váy xòe rộng rực rỡ.',
      },
      a_vu: {
        text: 'Trang phục Mông Đen nhuộm chàm tới 30 lần rồi dùng đá nghiến lăn ép với sáp ong cho tới khi mặt vải ánh lên sắc đen bóng bẩy như lụa mun. Rất bền và chống thấm nước mưa rừng!',
        mood: 'Tự hào về kỹ thuật nhuộm chàm',
        tip: 'Dùng nút xoay 360° để ngắm vạt áo lật sau lưng và xà cạp bó gọn gàng.',
      },
    },
    pattern: {
      kut_yeu: {
        text: 'Hoa cúc là hiện thân của mặt trời ban sự sống cho cây lúa trên nương, còn chữ S là mây lành mang mưa mát. Bạn hãy tập vẽ theo đường nét mờ rồi nhấn "Lưu Mẫu" để may lên áo nhé!',
        mood: 'Cầm cọ sáp ong hướng dẫn',
        tip: 'Bật nút "Gợi ý nét" nếu muốn xem đường mẫu mờ màu hồng pastel.',
      },
      a_vu: {
        text: 'Đường xoắn ốc của con ốc nhắc nhở người Mông dù đi xa đến đâu cũng luôn nhớ về cội nguồn. Còn dấu chân hổ và răng cưa núi đá tượng trưng cho sự chở che vững chãi của bản làng.',
        mood: 'Chăm chú phân tích biểu tượng',
        tip: 'Sau khi vẽ xong, hoa văn sẽ được chuyển trực tiếp vào Tủ Đồ Phối Đồ!',
      },
    },
    craft: {
      kut_yeu: {
        text: 'Khi thêu chữ thập, phụ nữ Mông cầm vải tự do trên tay, thêu từ mặt trái sang mặt phải nhưng các đường đan chéo vẫn đều tăm tắp. Bạn chạm theo thứ tự 1-8 để hoàn thành đường chỉ nhé!',
        mood: 'Tỉ mẩn từng mũi thêu tơ tằm',
        tip: 'Chặng 3: Kéo ghép các mảnh vải ngũ sắc vào đúng ô cổ áo yếm!',
      },
      a_vu: {
        text: 'Kỹ thuật vẽ sáp ong cần nhúng bút đồng vào bát sáp đang sôi than hồng. Khi sáp nguội bám chặt thớ vải, ta nhúng vào vò chàm rồi thả vào nồi nước sôi để sáp tan chảy diệu kỳ!',
        mood: 'Nhóm bếp than sáp ong',
        tip: 'Nhấn "Nhuộm Chàm" sau khi chấm đủ điểm sáp để thấy sự biến đổi màu sắc.',
      },
    },
    dressup: {
      kut_yeu: {
        text: 'Bạn phối đồ khéo quá! Nếu bạn bật công tắc "Gắn Hoa Văn Tự Vẽ", tác phẩm bạn vừa vẽ ở Xưởng Họa Tiết sẽ xuất hiện ngay trên vạt áo và váy đấy!',
        mood: 'Ngắm nhìn trang phục rạng rỡ',
        tip: 'Nhấn "Chụp Ảnh Bưu Thiếp" để tải ảnh lưu niệm có mộc chứng nhận Nghệ Nhân!',
      },
      a_vu: {
        text: 'Hãy thử thách bản thân phối đúng trọn bộ của từng nhóm (ví dụ trọn bộ Mông Xanh hay Mông Đỏ) để nhận pháo hoa lấp lánh và huy hiệu Nghệ Nhân Chuẩn Bản Sắc nhé!',
        mood: 'Vỗ tay tán thưởng',
        tip: 'Bạn có thể đổi sang búp bê Nam (A Vừ) hoặc Nữ (Kút Yệu) bất cứ lúc nào.',
      },
    },
  };

  const currentDialogue = dialogues[currentModule][activeGuide];
  const isKutYeu = activeGuide === 'kut_yeu';

  // 2D Character Figure Paths
  const figureImgPath = isKutYeu
    ? '/src/assets/images/figure_kut_yeu_2d_1791253054971.jpg'
    : '/src/assets/images/figure_a_vu_2d_1791253068100.jpg';

  const portraitImgPath = isKutYeu
    ? '/src/assets/images/chibi_kut_yeu_portrait_1791187201444.jpg'
    : '/src/assets/images/chibi_a_vu_portrait_1791187223010.jpg';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mb-6">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-md border-2 border-[#E8DFD5] p-4 lg:p-5 relative overflow-hidden transition-all">
        {/* Decorative Top Sawtooth Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF3B5C] via-[#FFB703] via-[#4FC3F7] to-[#FF3B5C]" />

        {/* Header & Character Selector Bar */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E8DFD5]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#FF3B5C] uppercase tracking-wider flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-[#FF3B5C]" />
              <span>Người Dẫn Chuyện 2D Xuyên Suốt:</span>
            </span>

            {/* Character Selector Buttons with Portraits */}
            <div className="flex items-center gap-1.5 ml-1">
              {/* Kút Yệu Button */}
              <button
                onClick={() => {
                  sound.playSilverChime();
                  setActiveGuide('kut_yeu');
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isKutYeu
                    ? 'bg-[#FF3B5C] text-white shadow-sm scale-105'
                    : 'bg-[#FFF9F2] text-stone-700 hover:bg-stone-100 border border-[#E8DFD5]'
                }`}
              >
                <img
                  src="/src/assets/images/chibi_kut_yeu_portrait_1791187201444.jpg"
                  alt="Kút Yệu"
                  className="w-5 h-5 rounded-full object-cover border border-white"
                  referrerPolicy="no-referrer"
                />
                <span>Kút Yệu (22t)</span>
                {isKutYeu && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>

              {/* A Vừ Button */}
              <button
                onClick={() => {
                  sound.playKhen(440);
                  setActiveGuide('a_vu');
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  !isKutYeu
                    ? 'bg-[#0284C7] text-white shadow-sm scale-105'
                    : 'bg-[#FFF9F2] text-stone-700 hover:bg-stone-100 border border-[#E8DFD5]'
                }`}
              >
                <img
                  src="/src/assets/images/chibi_a_vu_portrait_1791187223010.jpg"
                  alt="A Vừ"
                  className="w-5 h-5 rounded-full object-cover border border-white"
                  referrerPolicy="no-referrer"
                />
                <span>A Vừ (23t)</span>
                {!isKutYeu && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            </div>
          </div>

          {/* View Mode & Collapse Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowFull2DFigure(!showFull2DFigure)}
              className="px-2.5 py-1 text-[11px] font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors hidden sm:flex items-center gap-1"
              title="Đổi giữa người 2D toàn thân và chân dung"
            >
              <User className="w-3.5 h-3.5" />
              <span>{showFull2DFigure ? 'Người 2D' : 'Chân dung'}</span>
            </button>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors text-xs flex items-center gap-1"
              title={isCollapsed ? 'Mở rộng lời dẫn' : 'Thu gọn'}
            >
              <span className="hidden sm:inline text-[11px]">{isCollapsed ? 'Mở lời dẫn' : 'Thu gọn'}</span>
              {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isCollapsed && (
          <div className="pt-3.5 flex flex-col sm:flex-row items-center sm:items-start gap-4 animate-in fade-in duration-200">
            {/* 2D Simulated Character Figure */}
            <div className="relative shrink-0 flex flex-col items-center">
              {showFull2DFigure ? (
                <div className="relative group">
                  <div className="w-24 sm:w-28 h-36 sm:h-40 rounded-2xl overflow-hidden shadow-md border-2 border-[#E8DFD5] bg-[#FFF9F2] flex items-center justify-center">
                    <img
                      src={figureImgPath}
                      alt={isKutYeu ? 'Kút Yệu 2D' : 'A Vừ 2D'}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white whitespace-nowrap shadow-sm ${
                      isKutYeu ? 'bg-[#FF3B5C]' : 'bg-[#0284C7]'
                    }`}
                  >
                    {isKutYeu ? 'Kút Yệu 2D' : 'A Vừ 2D'}
                  </span>
                </div>
              ) : (
                <div className="relative group">
                  <img
                    src={portraitImgPath}
                    alt={isKutYeu ? 'Kút Yệu' : 'A Vừ'}
                    className={`w-16 h-16 rounded-2xl object-cover shadow-sm border-2 ${
                      isKutYeu ? 'border-[#FF3B5C]' : 'border-[#0284C7]'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  <span
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-bold px-2 py-0.5 rounded-full text-white whitespace-nowrap shadow-xs ${
                      isKutYeu ? 'bg-[#FF3B5C]' : 'bg-[#0284C7]'
                    }`}
                  >
                    {isKutYeu ? '22 tuổi' : '23 tuổi'}
                  </span>
                </div>
              )}
            </div>

            {/* Speech Dialogue Bubble */}
            <div className="flex-1 bg-[#FFF9F2] p-4 rounded-2xl border border-[#E8DFD5] relative space-y-1.5 w-full">
              {/* Cloud triangle pointing to the character */}
              <div className="hidden sm:block absolute -left-2 top-6 w-3 h-3 bg-[#FFF9F2] border-l border-b border-[#E8DFD5] rotate-45" />

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#2C241E] font-display">
                    {isKutYeu ? 'Kút Yệu (22 tuổi)' : 'A Vừ (23 tuổi)'}:
                  </span>
                  <span className="text-xs text-stone-500 italic">
                    ({currentDialogue.mood})
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (isKutYeu) {
                      sound.playSilverChime();
                    } else {
                      sound.playKhen(523.25);
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white shadow-2xs hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1 border border-[#E8DFD5] transition-colors"
                  title="Nghe âm thanh"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#FF3B5C]" />
                  <span className="text-[11px] hidden sm:inline">{isKutYeu ? 'Chuông bạc' : 'Tiếng khèn'}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#3E322A] leading-relaxed italic">
                "{currentDialogue.text}"
              </p>

              <div className="flex items-center gap-1.5 text-xs text-[#FF7043] font-medium pt-1 border-t border-[#E8DFD5]/60 mt-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB703] shrink-0" />
                <span>{currentDialogue.tip}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
