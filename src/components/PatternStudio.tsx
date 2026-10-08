import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Palette, Eraser, Lightbulb, RotateCcw, Save, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { PATTERN_CODEX, PatternItem } from '../data/mongCulture';
import { sound } from '../utils/audio';

interface PatternStudioProps {
  onAwardPoints: (points: number, reason: string) => void;
  onSaveCustomPattern: (dataUrl: string) => void;
  savedPattern: string | null;
}

export const PatternStudio: React.FC<PatternStudioProps> = ({
  onAwardPoints,
  onSaveCustomPattern,
  savedPattern,
}) => {
  const [studioMode, setStudioMode] = useState<'codex' | 'canvas'>('canvas');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'geometric' | 'animal' | 'plant' | 'object'>('all');
  const [selectedCodexItem, setSelectedCodexItem] = useState<PatternItem>(PATTERN_CODEX[0]);

  // Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeBrushColor, setActiveBrushColor] = useState<string>('#78350F'); // molten beeswax default
  const [brushSize, setBrushSize] = useState<number>(5);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [showStencilHint, setShowStencilHint] = useState<boolean>(true);
  const [activeStencil, setActiveStencil] = useState<PatternItem>(PATTERN_CODEX[0]);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Filtered patterns
  const filteredPatterns = categoryFilter === 'all'
    ? PATTERN_CODEX
    : PATTERN_CODEX.filter((p) => p.category === categoryFilter);

  // Setup Canvas
  useEffect(() => {
    if (studioMode !== 'canvas') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill linen background
    ctx.fillStyle = '#FFF9F2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle weave grain
    ctx.fillStyle = '#EFE6DA';
    for (let x = 0; x < canvas.width; x += 6) {
      for (let y = 0; y < canvas.height; y += 6) {
        if ((x + y) % 12 === 0) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }
    }
  }, [studioMode, activeStencil]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (activeBrushColor === '#78350F') {
      sound.playWaxDip();
    } else {
      sound.playStitch();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;

    if (isEraser) {
      ctx.strokeStyle = '#FFF9F2';
    } else {
      ctx.strokeStyle = activeBrushColor;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClearCanvas = () => {
    sound.playKhen(440);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFF9F2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSavePattern = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    sound.playFanfare();
    const dataUrl = canvas.toDataURL('image/png');
    onSaveCustomPattern(dataUrl);
    setSaveSuccess(true);
    onAwardPoints(50, 'Sáng tạo & hoàn thành mẫu hoa văn');

    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Studio Header & Segmented Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold text-[#FF3B5C] uppercase tracking-widest bg-[#FF3B5C]/10 px-3 py-1 rounded-full">
            Phần 3: Xưởng Họa Tiết Truyền Thống
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#2C241E] font-display mt-1">
            Bộ Sổ Tay & Góc Tập Vẽ Hoa Văn
          </h2>
        </div>

        {/* 2-Mode Segmented Control */}
        <div className="flex items-center p-1 bg-white/90 rounded-xl border border-[#E8DFD5] shadow-xs">
          <button
            onClick={() => {
              sound.playKhen(520);
              setStudioMode('canvas');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              studioMode === 'canvas'
                ? 'bg-[#FF3B5C] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Góc Tập Vẽ (Canvas)</span>
          </button>
          <button
            onClick={() => {
              sound.playKhen(650);
              setStudioMode('codex');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              studioMode === 'codex'
                ? 'bg-[#FF3B5C] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Sổ Tay Họa Tiết (Codex)</span>
          </button>
        </div>
      </div>

      {/* MODE 1: GÓC TẬP VẼ (CANVAS MINI-GAME) */}
      {studioMode === 'canvas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas Panel (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-md border border-[#E8DFD5] flex flex-col items-center">
            {/* Stencil Selection Bar */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-[#E8DFD5] mb-4 gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#FF7043] uppercase tracking-wider">
                  Mẫu mờ đồ nét:
                </span>
                <select
                  value={activeStencil.id}
                  onChange={(e) => {
                    const found = PATTERN_CODEX.find((p) => p.id === e.target.value);
                    if (found) {
                      sound.playSilverChime();
                      setActiveStencil(found);
                    }
                  }}
                  className="text-xs font-medium bg-[#FFF9F2] border border-[#E8DFD5] rounded-lg px-2.5 py-1.5 text-stone-800"
                >
                  {PATTERN_CODEX.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.difficulty})
                    </option>
                  ))}
                </select>
              </div>

              {/* Tools row */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowStencilHint(!showStencilHint)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 transition-colors ${
                    showStencilHint
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-stone-100 text-stone-600 border-stone-200'
                  }`}
                  title="Bật/Tắt đường viền mẫu mờ"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Gợi ý nét</span>
                </button>
                <button
                  onClick={handleClearCanvas}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200 flex items-center gap-1 transition-colors"
                  title="Xóa bảng vẽ"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm mới</span>
                </button>
              </div>
            </div>

            {/* Canvas Stage Area */}
            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl shadow-inner border-4 border-[#D6CEBE] overflow-hidden cursor-crosshair">
              {/* Actual Drawing Canvas */}
              <canvas
                ref={canvasRef}
                width={420}
                height={420}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full block touch-none"
              />

              {/* Stencil Overlay (Mẫu mờ màu hồng pastel để đồ nét) */}
              {showStencilHint && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-8 opacity-45">
                  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                    <path
                      d={activeStencil.stencilPath}
                      stroke="#FF3B5C"
                      strokeWidth="3.5"
                      strokeDasharray="6 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="#FF3B5C"
                      fillOpacity="0.08"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Palette & Brush Controls Below Canvas */}
            <div className="w-full max-w-[420px] mt-4 space-y-3">
              {/* Brushes: Molten beeswax and embroidery threads */}
              <div className="flex items-center justify-between gap-2 p-2 bg-[#FFF9F2] rounded-xl border border-[#E8DFD5]">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-stone-500 uppercase">Cọ vẽ:</span>
                  {[
                    { color: '#78350F', label: 'Sáp ong nâu' },
                    { color: '#FF3B5C', label: 'Chỉ đỏ thổ cẩm' },
                    { color: '#FFB703', label: 'Chỉ vàng nắng' },
                    { color: '#FF7043', label: 'Chỉ cam rực' },
                    { color: '#4FC3F7', label: 'Chỉ xanh lơ' },
                    { color: '#1E293B', label: 'Chàm sâu' },
                  ].map((b) => (
                    <button
                      key={b.color}
                      onClick={() => {
                        sound.playStitch();
                        setActiveBrushColor(b.color);
                        setIsEraser(false);
                      }}
                      className={`w-7 h-7 rounded-full shadow-xs transition-transform border-2 ${
                        !isEraser && activeBrushColor === b.color
                          ? 'scale-125 border-stone-900 shadow-md ring-2 ring-stone-300'
                          : 'border-white hover:scale-110'
                      }`}
                      style={{ backgroundColor: b.color }}
                      title={b.label}
                    />
                  ))}
                </div>

                {/* Eraser */}
                <button
                  onClick={() => {
                    sound.playKhen(400);
                    setIsEraser(!isEraser);
                  }}
                  className={`p-2 rounded-lg border transition-colors ${
                    isEraser ? 'bg-[#FF3B5C] text-white border-[#FF3B5C]' : 'bg-white text-stone-600 border-[#E8DFD5]'
                  }`}
                  title="Tẩy"
                >
                  <Eraser className="w-4 h-4" />
                </button>
              </div>

              {/* Stroke Size Slider */}
              <div className="flex items-center gap-3 px-2 text-xs text-stone-600">
                <span className="shrink-0">Nét cọ ({brushSize}px):</span>
                <input
                  type="range"
                  min="2"
                  max="16"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full accent-[#FF3B5C]"
                />
              </div>

              {/* Action: Save Custom Pattern for Dress-up */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleSavePattern}
                  className="w-full py-3 bg-gradient-to-r from-[#FF3B5C] to-[#FF7043] text-white text-xs lg:text-sm font-bold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu Mẫu Vào Tủ Đồ Phối Đồ (+50 Điểm)</span>
                </button>
              </div>

              {saveSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đã lưu thành công! Bạn có thể may hoa văn này lên váy hoặc áo ở <strong>Phần 5: Tủ đồ</strong>.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Info Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8DFD5]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#FF3B5C] uppercase tracking-wider">
                  Mẫu đang chọn
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                  Độ khó: {activeStencil.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#2C241E] font-display">
                {activeStencil.name}
              </h3>
              <span className="text-xs text-stone-500 italic block">{activeStencil.nativeName}</span>

              <div className="mt-4 space-y-3 text-xs text-[#4A3E37]">
                <div className="p-3 bg-[#FFF9F2] rounded-xl border border-[#E8DFD5]">
                  <h5 className="font-semibold text-stone-800 mb-1">Ý nghĩa biểu tượng:</h5>
                  <p className="leading-relaxed">{activeStencil.symbolism}</p>
                </div>
                <div className="p-3 bg-[#FFF9F2] rounded-xl border border-[#E8DFD5]">
                  <h5 className="font-semibold text-stone-800 mb-1">Vị trí may truyền thống:</h5>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activeStencil.placement.map((pos) => (
                      <span key={pos} className="px-2 py-0.5 rounded bg-white text-stone-700 border border-[#E8DFD5] text-[10px]">
                        {pos}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-stone-600 leading-relaxed italic text-[11px]">
                  "{activeStencil.lore}"
                </p>
              </div>
            </div>

            {savedPattern && (
              <div className="p-4 bg-white rounded-2xl border border-emerald-300 shadow-xs">
                <span className="text-xs font-semibold text-emerald-700 block mb-2">
                  Hoa văn bạn vừa lưu:
                </span>
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#E8DFD5] shadow-xs">
                  <img src={savedPattern} alt="Custom Pattern" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: BỘ SỔ TAY HỌA TIẾT (PATTERN CODEX) */}
      {studioMode === 'codex' && (
        <div className="space-y-6">
          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'geometric', label: 'Hình học' },
              { id: 'plant', label: 'Thực vật' },
              { id: 'animal', label: 'Động vật' },
              { id: 'object', label: 'Đồ vật' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playKhen(480);
                  setCategoryFilter(cat.id as any);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  categoryFilter === cat.id
                    ? 'bg-[#FF3B5C] text-white shadow-sm'
                    : 'bg-white/80 text-stone-600 border border-[#E8DFD5] hover:bg-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredPatterns.map((pat) => (
              <div
                key={pat.id}
                onClick={() => {
                  sound.playSilverChime();
                  setSelectedCodexItem(pat);
                  setActiveStencil(pat);
                  setStudioMode('canvas');
                }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8DFD5] hover:border-[#FF3B5C] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Pattern Art Container */}
                  <div className="w-full h-32 bg-[#FFF9F2] rounded-xl flex items-center justify-center mb-3 border border-[#E8DFD5] group-hover:scale-102 transition-transform">
                    <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#FF3B5C]">
                      <path
                        d={pat.svgPath}
                        stroke="#FF3B5C"
                        strokeWidth="3"
                        fill="#FFB703"
                        fillOpacity="0.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FF7043]">
                    {pat.category}
                  </span>
                  <h4 className="font-bold text-base text-[#2C241E] font-display mt-0.5">
                    {pat.name}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                    {pat.symbolism}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8DFD5] flex items-center justify-between text-[11px]">
                  <span className="text-stone-500">{pat.difficulty}</span>
                  <span className="text-[#FF3B5C] font-semibold group-hover:underline">Tập vẽ ngay →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
