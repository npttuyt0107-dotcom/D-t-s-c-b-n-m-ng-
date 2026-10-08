import React, { useState } from 'react';
import { Camera, Sparkles, Check, Download, RefreshCw, Award, Heart, Share2, Layers } from 'lucide-react';
import { HMONG_GROUPS } from '../data/mongCulture';
import { ChibiCharacter, Gender, Pose, Expression } from './ChibiCharacter';
import { sound } from '../utils/audio';

interface DressUpStudioProps {
  onAwardPoints: (points: number, reason: string) => void;
  savedPattern: string | null;
  onGoToPatternStudio: () => void;
}

export const DressUpStudio: React.FC<DressUpStudioProps> = ({
  onAwardPoints,
  savedPattern,
  onGoToPatternStudio,
}) => {
  const [gender, setGender] = useState<Gender>('female');
  const [pose, setPose] = useState<Pose>('welcome');
  const [expression, setExpression] = useState<Expression>('smile');

  // Selected clothing parts (defaults to Flower Hmong)
  const [selectedCostume, setSelectedCostume] = useState<{
    ao: string;
    vay: string;
    khan: string;
    tapde: string;
    xacap: string;
    trangsuc: string;
  }>({
    ao: 'hoa',
    vay: 'hoa',
    khan: 'hoa',
    tapde: 'hoa',
    xacap: 'hoa',
    trangsuc: 'hoa',
  });

  const [applyCustomPattern, setApplyCustomPattern] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'ao' | 'vay' | 'khan' | 'tapde' | 'xacap' | 'trangsuc'>('ao');

  // Photo Booth / Postcard state
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
  const [artisanName, setArtisanName] = useState<string>('Nghệ Nhân Vùng Cao');
  const [matchedGroupBadge, setMatchedGroupBadge] = useState<string | null>(null);

  // Check Traditional Match
  const checkTraditionalMatch = (newCostume: typeof selectedCostume) => {
    const values = Object.values(newCostume);
    const allMatch = values.every((v) => v === values[0]);

    if (allMatch) {
      const group = HMONG_GROUPS[values[0]];
      sound.playFanfare();
      setMatchedGroupBadge(group.name);
      onAwardPoints(100, `Hoàn thành bộ trang phục chuẩn bản sắc: ${group.name}`);
    } else {
      setMatchedGroupBadge(null);
    }
  };

  const handleSelectPiece = (category: keyof typeof selectedCostume, groupId: string) => {
    sound.playSilverChime();
    const updated = { ...selectedCostume, [category]: groupId };
    setSelectedCostume(updated);
    checkTraditionalMatch(updated);
  };

  const handleQuickSet = (groupId: string) => {
    sound.playFanfare();
    const fullSet = {
      ao: groupId,
      vay: groupId,
      khan: groupId,
      tapde: groupId,
      xacap: groupId,
      trangsuc: groupId,
    };
    setSelectedCostume(fullSet);
    checkTraditionalMatch(fullSet);
  };

  const currentDominantGroup = selectedCostume.ao;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold text-[#FF3B5C] uppercase tracking-widest bg-[#FF3B5C]/10 px-3 py-1 rounded-full">
            Phần 5: Studio Sáng Tạo
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#2C241E] font-display mt-1">
            Tủ Đồ Phối Đồ & Chụp Ảnh
          </h2>
        </div>

        {/* Action Buttons: Photo Booth */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playSilverChime();
              setShowPhotoModal(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-[#FF3B5C] to-[#FF7043] text-white text-xs font-semibold rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Camera className="w-4 h-4" />
            <span>Chụp Ảnh Bưu Thiếp (Photo Booth)</span>
          </button>
        </div>
      </div>

      {/* Traditional Match Banner Alert if unlocked */}
      {matchedGroupBadge && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 text-white shadow-lg flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-yellow-200" />
            <div>
              <h4 className="font-bold text-sm lg:text-base font-display">
                🎉 Tuyệt Đỉnh! Bộ Trang Phục Chuẩn Bản Sắc: {matchedGroupBadge}
              </h4>
              <p className="text-xs text-white/90">
                Bạn đã phối chính xác toàn bộ áo, váy, khăn, xà cạp và phụ kiện đặc trưng của nhóm! (+100 Điểm)
              </p>
            </div>
          </div>
          <Award className="w-8 h-8 text-yellow-200 shrink-0" />
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 Cols): Chibi Doll Wardrobe View */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#FFFDF9] to-[#FFF4E8] rounded-3xl p-6 shadow-md border border-[#E8DFD5] flex flex-col items-center relative">
          <ChibiCharacter
            gender={gender}
            onChangeGender={setGender}
            currentGroup={currentDominantGroup}
            customCostume={selectedCostume}
            customPatternDataUrl={applyCustomPattern && savedPattern ? savedPattern : null}
            pose={pose}
            onPoseChange={setPose}
            expression={expression}
            onExpressionChange={setExpression}
            interactiveHotspots={false}
            enableRotation={true}
            enablePoseSwitch={true}
          />

          {/* Current Outfit Spec */}
          <div className="w-full mt-4 p-3 bg-white/90 rounded-2xl border border-[#E8DFD5] text-xs space-y-1.5">
            <div className="flex items-center justify-between font-semibold text-stone-700">
              <div className="flex items-center gap-2">
                <img
                  src={gender === 'female' ? "/src/assets/images/chibi_kut_yeu_portrait_1791187201444.jpg" : "/src/assets/images/chibi_a_vu_portrait_1791187223010.jpg"}
                  alt={gender === 'female' ? "Kút Yệu" : "A Vừ"}
                  className="w-5 h-5 rounded-full object-cover border border-[#FF3B5C]"
                  referrerPolicy="no-referrer"
                />
                <span>Trang phục {gender === 'female' ? 'Kút Yệu' : 'A Vừ'}:</span>
              </div>
              <span className="text-[#FF3B5C] font-bold">
                {matchedGroupBadge ? `Trọn bộ ${matchedGroupBadge}` : 'Phối đồ tự do'}
              </span>
            </div>
            <p className="text-stone-500 text-[11px]">
              Áo {HMONG_GROUPS[selectedCostume.ao]?.name} · Váy {HMONG_GROUPS[selectedCostume.vay]?.name} · Khăn {HMONG_GROUPS[selectedCostume.khan]?.name}
            </p>
          </div>

          {/* Feature: Custom Pattern Application Toggle */}
          <div className="w-full mt-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">🎨</span>
                <div>
                  <h5 className="font-bold text-xs text-[#2C241E]">
                    Gắn Hoa Văn Tự Vẽ Lên Vải
                  </h5>
                  <p className="text-[10px] text-stone-600">
                    {savedPattern
                      ? 'Áp dụng họa tiết bạn vừa vẽ ở Phần 3 lên vạt áo & váy'
                      : 'Bạn chưa vẽ hoa văn nào ở Phần 3'}
                  </p>
                </div>
              </div>

              {savedPattern ? (
                <button
                  onClick={() => {
                    sound.playSilverChime();
                    setApplyCustomPattern(!applyCustomPattern);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    applyCustomPattern
                      ? 'bg-[#FF3B5C] text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-[#E8DFD5]'
                  }`}
                >
                  {applyCustomPattern ? 'Đang bật' : 'Bật lên'}
                </button>
              ) : (
                <button
                  onClick={onGoToPatternStudio}
                  className="px-2.5 py-1 bg-[#FF3B5C] text-white text-[11px] font-semibold rounded-lg hover:underline"
                >
                  Vẽ ngay
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Wardrobe Catalog & Quick Presets */}
        <div className="lg:col-span-7 space-y-5">
          {/* Quick Preset Sets for 5 Groups */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8DFD5]">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-2">
              Bộ phối mẫu nguyên bản (Thử thách chuẩn bản sắc):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {Object.values(HMONG_GROUPS).map((group) => (
                <button
                  key={group.id}
                  onClick={() => handleQuickSet(group.id)}
                  className="p-2 rounded-xl text-center border border-[#E8DFD5] hover:border-[#FF3B5C] hover:bg-[#FFF9F2] transition-all text-xs"
                >
                  <span className="text-base block mb-0.5">{group.icon}</span>
                  <span className="font-semibold text-stone-800 block truncate">{group.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Clothing Category Tabs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8DFD5]">
            <div className="flex items-center justify-between mb-4 border-b border-[#E8DFD5] pb-3">
              <h4 className="font-bold text-sm text-[#2C241E] flex items-center gap-1.5 uppercase tracking-wider text-xs">
                <Layers className="w-4 h-4 text-[#FF3B5C]" />
                <span>Danh Mục Trang Phục</span>
              </h4>
            </div>

            {/* Sub-Category Nav */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-4">
              {[
                { id: 'ao', label: 'Áo', icon: '🎽' },
                { id: 'vay', label: gender === 'female' ? 'Váy' : 'Quần', icon: '👗' },
                { id: 'khan', label: 'Khăn / Mũ', icon: '👒' },
                { id: 'tapde', label: 'Đại Xáy / Tạp Dề', icon: '🎗️' },
                { id: 'xacap', label: 'Xà Cạp', icon: '🧦' },
                { id: 'trangsuc', label: 'Trang Sức Bạc', icon: '💍' },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sound.playKhen(440);
                      setActiveTab(tab.id as any);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                      isActive
                        ? 'bg-[#FF3B5C] text-white border-[#FF3B5C] shadow-sm'
                        : 'bg-[#FFF9F2] text-stone-700 border-[#E8DFD5] hover:bg-white'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Garment Cards Grid for Active Category */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.values(HMONG_GROUPS).map((group) => {
                const isSelected = selectedCostume[activeTab] === group.id;
                const garmentItem = group.garments[activeTab];

                return (
                  <div
                    key={group.id}
                    onClick={() => handleSelectPiece(activeTab, group.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#FFFDF9] border-[#FF3B5C] shadow-md ring-2 ring-[#FF3B5C]/20'
                        : 'bg-white border-[#E8DFD5] hover:border-amber-400 hover:shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-stone-500">{group.name}</span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#FF3B5C] text-white flex items-center justify-center text-xs">
                            ✓
                          </span>
                        )}
                      </div>
                      <h5 className="font-bold text-xs text-[#2C241E] line-clamp-2 leading-snug">
                        {garmentItem.name}
                      </h5>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#E8DFD5] text-[10px] text-stone-500">
                      <span>{garmentItem.color}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* PHOTO BOOTH POSTCARD MODAL */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-[#FF3B5C]/30 relative flex flex-col items-center">
            {/* Postcard Frame */}
            <div className="w-full bg-[#FFF9F2] rounded-2xl p-6 border-2 border-[#D6CEBE] relative overflow-hidden linen-bg shadow-inner flex flex-col items-center">
              {/* Traditional sawtooth decorative border */}
              <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#FF3B5C] via-[#FFB703] to-[#4FC3F7]" />

              {/* Postcard Header */}
              <div className="text-center mt-2 mb-4">
                <span className="text-[10px] font-bold text-[#FF3B5C] uppercase tracking-widest block">
                  Bưu Thiếp Lưu Niệm
                </span>
                <h3 className="text-2xl font-bold font-display text-[#2C241E]">
                  Dệt Sắc Bản Mông
                </h3>
                <p className="text-xs text-stone-500 italic">
                  Thiết kế bởi: <strong>{artisanName}</strong> · Tháng {new Date().getMonth() + 1}/{new Date().getFullYear()}
                </p>
              </div>

              {/* Chibi Character Centerpiece */}
              <div className="relative py-2">
                <ChibiCharacter
                  gender={gender}
                  currentGroup={currentDominantGroup}
                  customCostume={selectedCostume}
                  customPatternDataUrl={applyCustomPattern && savedPattern ? savedPattern : null}
                  pose={pose}
                  expression={expression}
                  interactiveHotspots={false}
                  enableRotation={false}
                  enablePoseSwitch={false}
                  scale={0.9}
                />
              </div>

              {/* Stamp Seal */}
              <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full border-2 border-red-500/80 flex flex-col items-center justify-center text-red-600 rotate-12 bg-white/70 shadow-xs pointer-events-none">
                <span className="text-[8px] font-bold uppercase tracking-wider">CHỨNG NHẬN</span>
                <span className="text-[9px] font-bold">NGHỆ NHÂN</span>
                <span className="text-[7px]">BẢN MÔNG</span>
              </div>
            </div>

            {/* Custom Name Input */}
            <div className="w-full mt-4 flex items-center gap-2">
              <span className="text-xs text-stone-600 font-semibold shrink-0">Tên của bạn:</span>
              <input
                type="text"
                value={artisanName}
                onChange={(e) => setArtisanName(e.target.value)}
                className="w-full text-xs font-medium px-3 py-1.5 rounded-lg border border-[#E8DFD5] bg-white text-stone-800"
                placeholder="Nhập tên của bạn để in lên bưu thiếp..."
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 w-full mt-4 pt-3 border-t border-[#E8DFD5]">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  sound.playFanfare();
                  alert('🎉 Đã xuất bưu thiếp thành công! Cảm ơn bạn đã gìn giữ và lan tỏa sắc màu văn hóa Mông!');
                  setShowPhotoModal(false);
                }}
                className="px-5 py-2 bg-[#FF3B5C] hover:bg-[#E11D48] text-white text-xs font-semibold rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Tải Bưu Thiếp Về Máy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
