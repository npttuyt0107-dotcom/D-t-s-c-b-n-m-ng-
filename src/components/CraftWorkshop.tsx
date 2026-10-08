import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronRight, RotateCcw, Droplets, Scissors, Layers } from 'lucide-react';
import { sound } from '../utils/audio';

interface CraftWorkshopProps {
  onAwardPoints: (points: number, reason: string) => void;
  onGoToDressUp: () => void;
}

export const CraftWorkshop: React.FC<CraftWorkshopProps> = ({ onAwardPoints, onGoToDressUp }) => {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(1);

  // GAME 1: BATIK WAX & INDIGO DYEING
  const [batikStrokes, setBatikStrokes] = useState<{ x: number; y: number }[]>([]);
  const [isIndigoDyed, setIsIndigoDyed] = useState<boolean>(false);
  const [isBoiledClean, setIsBoiledClean] = useState<boolean>(false);

  // GAME 2: NUMBERED EMBROIDERY STITCHING
  const [stitchedPoints, setStitchedPoints] = useState<number[]>([]);
  const embroideryTarget = [1, 2, 3, 4, 5, 6, 7, 8];

  // GAME 3: APPLIQUÉ PATCHWORK
  const [placedPatches, setPlacedPatches] = useState<{ id: string; slot: number }[]>([]);
  const patchPalette = [
    { id: 'tri_red', type: 'triangle', color: '#FF3B5C', name: 'Tam giác đỏ' },
    { id: 'tri_yellow', type: 'triangle', color: '#FFB703', name: 'Tam giác vàng' },
    { id: 'tri_blue', type: 'triangle', color: '#4FC3F7', name: 'Tam giác xanh' },
    { id: 'sq_orange', type: 'square', color: '#FF7043', name: 'Vuông cam' },
  ];

  // Stage 1 Handlers
  const handleAddBatikPoint = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isIndigoDyed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    sound.playWaxDip();
    setBatikStrokes((prev) => [...prev, { x, y }]);
  };

  const handleDyeIndigo = () => {
    sound.playIndigoDip();
    setIsIndigoDyed(true);
    setTimeout(() => {
      sound.playFanfare();
      setIsBoiledClean(true);
      onAwardPoints(40, 'Hoàn thành nhuộm chàm vẽ sáp ong (Batik)');
    }, 1800);
  };

  // Stage 2 Handlers
  const handleStitchPoint = (pointNum: number) => {
    const nextExpected = stitchedPoints.length + 1;
    if (pointNum === nextExpected) {
      sound.playStitch();
      const updated = [...stitchedPoints, pointNum];
      setStitchedPoints(updated);

      if (updated.length === embroideryTarget.length) {
        sound.playFanfare();
        onAwardPoints(40, 'Hoàn thành đường thêu chữ thập ngũ sắc');
      }
    } else {
      sound.playKhen(220); // gently indicate order
    }
  };

  // Stage 3 Handlers
  const handlePlacePatch = (patchId: string, slotIdx: number) => {
    sound.playSilverChime();
    setPlacedPatches((prev) => {
      const filtered = prev.filter((p) => p.slot !== slotIdx);
      const next = [...filtered, { id: patchId, slot: slotIdx }];
      if (next.length === 4) {
        sound.playFanfare();
        onAwardPoints(40, 'Hoàn thành ghép vải đắp mảng (Appliqué)');
      }
      return next;
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-[#FF3B5C] uppercase tracking-widest bg-[#FF3B5C]/10 px-3 py-1 rounded-full">
          Phần 4: Lộ Trình 3 Công Đoạn Thủ Công
        </span>
        <h2 className="text-2xl lg:text-4xl font-bold text-[#2C241E] font-display mt-2">
          Góc Trải Nghiệm Thủ Công Bản Sắc
        </h2>
        <p className="text-sm text-[#5C4D42] mt-1 max-w-xl mx-auto">
          Tận tay thử sức qua 3 công đoạn kỳ công bậc nhất tạo nên bộ trang phục Mông truyền thống
        </p>
      </div>

      {/* Stage Roadmap Progress Bar */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
        {[
          { num: 1, title: 'Vẽ Sáp Ong (Batik)', icon: '🕯️' },
          { num: 2, title: 'Thêu Thổ Cẩm', icon: '🪡' },
          { num: 3, title: 'Đắp Vải Ghép Màu', icon: '✂️' },
        ].map((st) => {
          const isActive = activeStage === st.num;
          const isDone = activeStage > st.num;
          return (
            <button
              key={st.num}
              onClick={() => {
                sound.playKhen(500 + st.num * 80);
                setActiveStage(st.num as any);
              }}
              className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-[#FF3B5C] text-white border-[#FF3B5C] shadow-md scale-105'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-stone-600 border-[#E8DFD5]'
              }`}
            >
              <span>{st.icon}</span>
              <span className="hidden sm:inline">Chặng {st.num}:</span>
              <span>{st.title}</span>
              {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </button>
          );
        })}
      </div>

      {/* STAGE 1: VẼ SÁP ONG & NHUỘM CHÀM (BATIK) */}
      {activeStage === 1 && (
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-md border border-[#E8DFD5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Fabric Canvas (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="text-stone-600 font-medium">
                {isBoiledClean
                  ? '✨ Vải chàm đã luộc sạch sáp, lộ hoa văn lộng lẫy!'
                  : isIndigoDyed
                  ? '🌊 Đang ngâm trong thùng nhuộm chàm...'
                  : '👇 Chạm/click lên mặt vải để chấm vẽ sáp ong nóng chảy'}
              </span>
              <button
                onClick={() => {
                  setBatikStrokes([]);
                  setIsIndigoDyed(false);
                  setIsBoiledClean(false);
                }}
                className="text-stone-500 hover:text-stone-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại</span>
              </button>
            </div>

            {/* Fabric Square */}
            <div
              onClick={handleAddBatikPoint}
              className={`relative w-full max-w-[360px] aspect-square rounded-2xl shadow-inner border-4 transition-colors duration-1000 overflow-hidden cursor-pointer ${
                isIndigoDyed
                  ? 'bg-[#0F172A] border-[#1E293B]'
                  : 'bg-[#FFF9F2] border-[#E8DFD5]'
              }`}
            >
              {/* Molten Wax Strokes */}
              {batikStrokes.map((pt, idx) => (
                <div
                  key={idx}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors ${
                    isBoiledClean
                      ? 'w-7 h-7 bg-[#FFFDF9] shadow-sm border border-[#4FC3F7]/50'
                      : isIndigoDyed
                      ? 'w-6 h-6 bg-[#92400E]'
                      : 'w-6 h-6 bg-[#78350F] shadow-xs'
                  }`}
                  style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                />
              ))}

              {/* Pre-traced decorative snail guide */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                <svg viewBox="0 0 100 100" className="w-48 h-48">
                  <path
                    d="M 50 20 A 30 30 0 1 1 50 80 A 20 20 0 1 1 50 40 A 10 10 0 1 1 50 60"
                    stroke={isIndigoDyed ? '#4FC3F7' : '#FF3B5C'}
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* Action buttons */}
            <div className="w-full max-w-[360px] mt-4">
              {!isIndigoDyed ? (
                <button
                  onClick={handleDyeIndigo}
                  disabled={batikStrokes.length < 3}
                  className={`w-full py-3 rounded-xl font-bold text-xs lg:text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                    batikStrokes.length >= 3
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#1E293B] text-white hover:brightness-110 active:scale-95'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <Droplets className="w-4 h-4 text-[#38BDF8]" />
                  <span>
                    {batikStrokes.length < 3
                      ? `Chấm thêm ${3 - batikStrokes.length} điểm sáp nữa`
                      : 'Nhấn Để "Nhuộm Chàm" Vào Vò Men'}
                  </span>
                </button>
              ) : isBoiledClean ? (
                <button
                  onClick={() => {
                    sound.playKhen(550);
                    setActiveStage(2);
                  }}
                  className="w-full py-3 rounded-xl font-bold text-xs lg:text-sm bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Tuyệt vời! Tiếp tục sang Chặng 2: Thêu Thổ Cẩm</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="py-3 text-center text-xs font-semibold text-[#0284C7] animate-pulse">
                  Đang nhuộm chàm và luộc nước sôi tách sáp...
                </div>
              )}
            </div>
          </div>

          {/* Explanation Lore (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs text-[#4A3E37]">
            <div className="p-4 bg-[#FFF9F2] rounded-2xl border border-[#E8DFD5]">
              <span className="text-[10px] font-bold text-[#FF7043] uppercase tracking-wider block">
                Bí quyết thủ công
              </span>
              <h4 className="font-bold text-base text-[#2C241E] font-display mt-0.5">
                Kỹ Thuật Vẽ Sáp Ong (Batik)
              </h4>
              <p className="mt-2 leading-relaxed">
                Người phụ nữ Mông dùng một chiếc bút đồng nhỏ có hai lá đồng khép lại làm mỏ ngòi, chấm vào bát sáp ong nóng chảy đặt trên bếp than hồng. Khi sáp bám vào thớ vải lanh, phần vải đó sẽ không bị nước chàm ngấm vào khi nhuộm.
              </p>
              <p className="mt-2 leading-relaxed text-stone-600">
                Sau khi nhúng chàm phơi khô hàng chục lần, tấm vải được thả vào nồi nước sôi sùng sục. Sáp ong tan chảy nổi lên mặt nước, để lộ ra những đường hoa văn màu trắng ngà sắc nét nổi bật giữa nền xanh biếc!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: THÊU THỔ CẨM THEO ĐIỂM SỐ */}
      {activeStage === 2 && (
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-md border border-[#E8DFD5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Stitch Board (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="text-stone-600 font-medium">
                Chạm lần lượt theo thứ tự số: <strong>{stitchedPoints.length + 1}</strong>
              </span>
              <button
                onClick={() => setStitchedPoints([])}
                className="text-stone-500 hover:text-stone-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Thêu lại</span>
              </button>
            </div>

            {/* Embroidery Grid Plate */}
            <div className="relative w-full max-w-[360px] aspect-square rounded-2xl shadow-inner border-4 border-[#D6CEBE] bg-[#1E293B] p-6 flex items-center justify-center">
              {/* Connecting thread lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {stitchedPoints.map((pt, idx) => {
                  if (idx === 0) return null;
                  const prevPt = stitchedPoints[idx - 1];
                  const coords: Record<number, { x: number; y: number }> = {
                    1: { x: 80, y: 80 },
                    2: { x: 280, y: 280 },
                    3: { x: 280, y: 80 },
                    4: { x: 80, y: 280 },
                    5: { x: 180, y: 40 },
                    6: { x: 180, y: 320 },
                    7: { x: 40, y: 180 },
                    8: { x: 320, y: 180 },
                  };
                  return (
                    <line
                      key={idx}
                      x1={coords[prevPt].x}
                      y1={coords[prevPt].y}
                      x2={coords[pt].x}
                      y2={coords[pt].y}
                      stroke={idx % 2 === 0 ? '#FF3B5C' : '#FFB703'}
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>

              {/* 8 Numbered Stitch Holes */}
              <div className="relative w-full h-full">
                {[
                  { num: 1, left: '20%', top: '20%' },
                  { num: 2, left: '80%', top: '80%' },
                  { num: 3, left: '80%', top: '20%' },
                  { num: 4, left: '20%', top: '80%' },
                  { num: 5, left: '50%', top: '10%' },
                  { num: 6, left: '50%', top: '90%' },
                  { num: 7, left: '10%', top: '50%' },
                  { num: 8, left: '90%', top: '50%' },
                ].map((pos) => {
                  const isStitched = stitchedPoints.includes(pos.num);
                  const isNext = stitchedPoints.length + 1 === pos.num;
                  return (
                    <button
                      key={pos.num}
                      onClick={() => handleStitchPoint(pos.num)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-transform ${
                        isStitched
                          ? 'bg-[#FF3B5C] text-white shadow-md scale-100 ring-2 ring-white'
                          : isNext
                          ? 'bg-[#FFB703] text-stone-900 animate-bounce scale-110 shadow-lg'
                          : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
                      }`}
                      style={{ left: pos.left, top: pos.top }}
                    >
                      {pos.num}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next stage button */}
            <div className="w-full max-w-[360px] mt-4">
              {stitchedPoints.length === embroideryTarget.length ? (
                <button
                  onClick={() => {
                    sound.playKhen(620);
                    setActiveStage(3);
                  }}
                  className="w-full py-3 rounded-xl font-bold text-xs lg:text-sm bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Hoàn thành! Sang Chặng 3: Đắp Ghép Vải Màu</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <p className="text-center text-xs text-stone-500">
                  Đã đan {stitchedPoints.length} / 8 mũi chỉ chữ thập
                </p>
              )}
            </div>
          </div>

          {/* Lore Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs text-[#4A3E37]">
            <div className="p-4 bg-[#FFF9F2] rounded-2xl border border-[#E8DFD5]">
              <span className="text-[10px] font-bold text-[#FF3B5C] uppercase tracking-wider block">
                Tinh hoa sợi chỉ
              </span>
              <h4 className="font-bold text-base text-[#2C241E] font-display mt-0.5">
                Nghệ Thuật Thêu Chữ Thập & Luồn Sợi
              </h4>
              <p className="mt-2 leading-relaxed">
                Người phụ nữ Mông không dùng khung thêu căng vải mà cầm tấm vải tự do trên tay, thêu từ mặt trái sang mặt phải nhưng các đường chỉ đan chéo vẫn đều tăm tắp như in.
              </p>
              <p className="mt-2 leading-relaxed text-stone-600">
                Chỉ thêu được nhuộm từ cỏ cây thiên nhiên: màu đỏ từ củ nâu, màu vàng từ củ nghệ, màu xanh từ lá tràm. Đường chỉ dầy dặn tạo nên hiệu ứng nổi khối 3D rực rỡ bảo vệ trang phục bền bỉ qua năm tháng.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: ĐẮP GHÉP VẢI MÀU (APPLIQUÉ - PAJ NTAUB) */}
      {activeStage === 3 && (
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-md border border-[#E8DFD5] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Patchwork Assembly Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="text-stone-600 font-medium">
                Chọn mảnh vải màu bên dưới rồi chạm vào khung cổ áo để may ghép:
              </span>
              <button
                onClick={() => setPlacedPatches([])}
                className="text-stone-500 hover:text-stone-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ghép lại</span>
              </button>
            </div>

            {/* Collar Frame Target with 4 Slots */}
            <div className="relative w-full max-w-[360px] h-64 rounded-2xl shadow-inner border-4 border-[#D6CEBE] bg-[#FFF9F2] p-4 flex flex-col items-center justify-center">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                Khung Cổ Áo Yếm Mông Hoa
              </span>

              <div className="grid grid-cols-2 gap-3 w-48">
                {[0, 1, 2, 3].map((slotIdx) => {
                  const placed = placedPatches.find((p) => p.slot === slotIdx);
                  const patchInfo = placed ? patchPalette.find((pl) => pl.id === placed.id) : null;
                  return (
                    <div
                      key={slotIdx}
                      className={`h-20 rounded-xl border-2 border-dashed flex items-center justify-center text-xs transition-colors ${
                        patchInfo
                          ? 'border-transparent shadow-sm'
                          : 'border-stone-300 bg-stone-100/50 text-stone-400'
                      }`}
                      style={{ backgroundColor: patchInfo ? patchInfo.color : undefined }}
                    >
                      {patchInfo ? (
                        <span className="text-white font-bold text-xs drop-shadow-sm">✓ Đã may</span>
                      ) : (
                        <span>Ô {slotIdx + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Patch Pieces Picker */}
            <div className="w-full max-w-[360px] mt-4">
              <span className="text-[11px] font-semibold text-stone-500 uppercase block mb-1.5">
                Các mảnh vải cắt sẵn:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {patchPalette.map((patch, idx) => (
                  <button
                    key={patch.id}
                    onClick={() => {
                      const emptySlot = [0, 1, 2, 3].find(
                        (s) => !placedPatches.some((p) => p.slot === s)
                      );
                      if (emptySlot !== undefined) {
                        handlePlacePatch(patch.id, emptySlot);
                      }
                    }}
                    className="p-2 rounded-xl text-center shadow-xs hover:scale-105 active:scale-95 transition-all text-white font-semibold text-[11px]"
                    style={{ backgroundColor: patch.color }}
                  >
                    <span>{patch.name}</span>
                  </button>
                ))}
              </div>

              {placedPatches.length === 4 && (
                <div className="mt-4">
                  <button
                    onClick={() => {
                      sound.playFanfare();
                      onGoToDressUp();
                    }}
                    className="w-full py-3 bg-gradient-to-r from-[#FF3B5C] to-[#FF7043] text-white text-xs lg:text-sm font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Hoàn Thành Xuất Sắc! Đi Đến Phòng Phối Đồ</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Lore Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-xs text-[#4A3E37]">
            <div className="p-4 bg-[#FFF9F2] rounded-2xl border border-[#E8DFD5]">
              <span className="text-[10px] font-bold text-[#FFB703] uppercase tracking-wider block">
                Kỹ thuật cắt dán
              </span>
              <h4 className="font-bold text-base text-[#2C241E] font-display mt-0.5">
                Đắp Ghép Vải Màu (Paj Ntaub Ci)
              </h4>
              <p className="mt-2 leading-relaxed">
                Kỹ thuật này đòi hỏi sự khéo léo phi thường: người phụ nữ dùng kéo cắt các mảnh vải nhỏ hình tam giác, hình thoi rồi gấp mép vải vào trong chỉ 1 milimet để giấu đường chỉ, sau đó may ép từng lớp lên tấm áo.
              </p>
              <p className="mt-2 leading-relaxed text-stone-600">
                Sự phối màu tương phản giữa đỏ, vàng nắng và xanh ngọc trên nền chàm tạo nên hiệu ứng thị giác bừng sáng như những bông hoa rừng nở rộ giữa đại ngàn Tây Bắc.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
