import React, { useState } from 'react';
import { RotateCw, Sparkles, X, ChevronRight, Eye } from 'lucide-react';
import { HMONG_GROUPS, HmongGroupInfo } from '../data/mongCulture';
import { sound } from '../utils/audio';

export type Gender = 'female' | 'male';
export type Expression = 'smile' | 'laugh' | 'wink' | 'focus' | 'shy' | 'proud' | 'sparkle' | 'excited';
export type Pose = 'welcome' | 'dance' | 'showcase';

export interface CustomClothingItem {
  id: string;
  name: string;
  group: string;
  category: 'ao' | 'vay' | 'khan' | 'tapde' | 'xacap' | 'trangsuc';
}

interface ChibiCharacterProps {
  gender: Gender;
  onChangeGender?: (gender: Gender) => void;
  currentGroup?: string;
  customCostume?: {
    ao?: string;
    vay?: string;
    khan?: string;
    tapde?: string;
    xacap?: string;
    trangsuc?: string;
  };
  customPatternDataUrl?: string | null;
  interactiveHotspots?: boolean;
  enableRotation?: boolean;
  enablePoseSwitch?: boolean;
  enableModeSwitch?: boolean;
  initialViewMode?: '2d_figure' | 'svg_doll';
  pose?: Pose;
  onPoseChange?: (pose: Pose) => void;
  expression?: Expression;
  onExpressionChange?: (exp: Expression) => void;
  scale?: number;
  highlightPart?: string | null;
}

export const ChibiCharacter: React.FC<ChibiCharacterProps> = ({
  gender,
  onChangeGender,
  currentGroup = 'hoa',
  customCostume,
  customPatternDataUrl,
  interactiveHotspots = true,
  enableRotation = true,
  enablePoseSwitch = true,
  enableModeSwitch = true,
  initialViewMode = 'svg_doll',
  pose = 'welcome',
  onPoseChange,
  expression = 'smile',
  onExpressionChange,
  scale = 1,
  highlightPart = null,
}) => {
  const [rotationAngle, setRotationAngle] = useState<0 | 45 | 315 | 180>(0);
  const [activeHotspot, setActiveHotspot] = useState<HmongGroupInfo['hotspots'][0] | null>(null);
  const [viewMode, setViewMode] = useState<'2d_figure' | 'svg_doll'>(initialViewMode);

  const groupData = HMONG_GROUPS[currentGroup] || HMONG_GROUPS.hoa;
  const isFemale = gender === 'female';

  // Group-specific base colors
  const primaryTone = groupData.primaryColor;
  const isDarkGroup = currentGroup === 'den';
  const isWhiteGroup = currentGroup === 'trang';
  const isBlueGroup = currentGroup === 'xanh';
  const isRedGroup = currentGroup === 'do';

  const handleNextRotation = () => {
    sound.playSilverChime();
    setRotationAngle((prev) => {
      if (prev === 0) return 45;
      if (prev === 45) return 180;
      if (prev === 180) return 315;
      return 0;
    });
  };

  const currentPose = pose;

  return (
    <div className="relative flex flex-col items-center select-none" style={{ transform: `scale(${scale})` }}>
      {/* Upper Character Header / Quick Switcher */}
      <div className="flex items-center justify-between w-full max-w-xs mb-3 px-2">
        <div className="flex items-center gap-2">
          {onChangeGender && (
            <button
              onClick={() => {
                sound.playSilverChime();
                onChangeGender(isFemale ? 'male' : 'female');
              }}
              className="px-2 py-1 text-xs font-semibold rounded-lg bg-white/90 shadow-sm border border-[#E8DFD5] text-[#2C241E] hover:border-[#FF3B5C] transition-all flex items-center gap-1.5"
            >
              <img
                src={isFemale ? "/src/assets/images/chibi_kut_yeu_portrait_1791187201444.jpg" : "/src/assets/images/chibi_a_vu_portrait_1791187223010.jpg"}
                alt={isFemale ? "Kút Yệu" : "A Vừ"}
                className="w-5 h-5 rounded-full object-cover border border-[#FF3B5C]"
                referrerPolicy="no-referrer"
              />
              <span>{isFemale ? 'Kút Yệu (22t)' : 'A Vừ (23t)'}</span>
              <span className="text-[10px] text-[#FF3B5C] font-normal">Đổi</span>
            </button>
          )}

          {enablePoseSwitch && onPoseChange && (
            <div className="flex items-center bg-white/80 p-0.5 rounded-lg border border-[#E8DFD5] text-[11px]">
              <button
                onClick={() => {
                  sound.playKhen(523);
                  onPoseChange('welcome');
                }}
                className={`px-2 py-0.5 rounded ${currentPose === 'welcome' ? 'bg-[#FF3B5C] text-white font-medium' : 'text-stone-600'}`}
                title="Chào đón"
              >
                Chào
              </button>
              <button
                onClick={() => {
                  sound.playKhen(659);
                  onPoseChange('dance');
                }}
                className={`px-2 py-0.5 rounded ${currentPose === 'dance' ? 'bg-[#FF3B5C] text-white font-medium' : 'text-stone-600'}`}
                title="Múa xòe ô / khèn"
              >
                {isFemale ? 'Múa Ô' : 'Múa Khèn'}
              </button>
              <button
                onClick={() => {
                  sound.playKhen(784);
                  onPoseChange('showcase');
                }}
                className={`px-2 py-0.5 rounded ${currentPose === 'showcase' ? 'bg-[#FF3B5C] text-white font-medium' : 'text-stone-600'}`}
                title="Giới thiệu trang phục"
              >
                Tạo Dáng
              </button>
            </div>
          )}
        </div>

        {(enableModeSwitch || enableRotation) && (
          <div className="flex items-center gap-1.5">
            {enableModeSwitch && (
              <button
                onClick={() => {
                  sound.playSilverChime();
                  setViewMode(viewMode === '2d_figure' ? 'svg_doll' : '2d_figure');
                }}
                className={`px-2 py-1 rounded-lg shadow-2xs border text-[11px] font-semibold transition-all ${
                  viewMode === '2d_figure'
                    ? 'bg-[#FF3B5C] text-white border-[#FF3B5C]'
                    : 'bg-white/90 border-[#E8DFD5] text-stone-700 hover:text-[#FF3B5C]'
                }`}
                title="Đổi giữa mô phỏng người 2D và Búp bê May đo"
              >
                {viewMode === '2d_figure' ? 'Người 2D' : 'Búp Bê'}
              </button>
            )}

            {enableRotation && (
              <button
                onClick={handleNextRotation}
                className="p-1.5 bg-white/90 rounded-lg shadow-sm border border-[#E8DFD5] text-stone-700 hover:text-[#FF3B5C] transition-colors"
                title="Xoay 360°"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Chibi Character Stage */}
      <div className="relative w-72 h-[420px] flex items-center justify-center">
        {/* Soft shadow under doll */}
        <div className="absolute bottom-6 w-36 h-6 bg-black/15 rounded-full blur-sm" />

        {/* 360 Rotation Wrapper */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-500"
          style={{
            transform:
              rotationAngle === 45
                ? 'rotateY(25deg) scaleX(0.96)'
                : rotationAngle === 315
                ? 'rotateY(-25deg) scaleX(0.96)'
                : rotationAngle === 180
                ? 'scaleX(-1)'
                : 'none',
          }}
        >
          {viewMode === '2d_figure' ? (
            /* 2D Simulated Character Figure based on portraits */
            <div className="relative w-full h-full flex flex-col items-center justify-center p-1">
              <div className="relative w-64 h-[390px] rounded-2xl overflow-hidden shadow-lg border-2 border-[#E8DFD5] bg-[#FFF9F2] flex items-center justify-center group">
                <img
                  src={
                    isFemale
                      ? '/src/assets/images/figure_kut_yeu_2d_1791253054971.jpg'
                      : '/src/assets/images/figure_a_vu_2d_1791253068100.jpg'
                  }
                  alt={isFemale ? 'Kút Yệu 2D' : 'A Vừ 2D'}
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                  {isFemale ? 'Kút Yệu (Mô phỏng 2D)' : 'A Vừ (Mô phỏng 2D)'}
                </span>
              </div>
            </div>
          ) : (
            /* SVG Character Rendering */
            <svg
              viewBox="0 0 300 460"
              className="w-full h-full drop-shadow-md overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
            <defs>
              {/* Pattern definition if custom pattern exists */}
              {customPatternDataUrl && (
                <pattern id="userCustomPattern" patternUnits="userSpaceOnUse" width="60" height="60">
                  <image href={customPatternDataUrl} width="60" height="60" />
                </pattern>
              )}
              {/* Batik skirt pattern */}
              <pattern id="batikSpiral" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 10 5 A 5 5 0 1 1 10 15 A 2.5 2.5 0 1 1 10 10" stroke="#4FC3F7" strokeWidth="1.2" fill="none" />
                <circle cx="10" cy="10" r="1.5" fill="#FFB703" />
              </pattern>
              {/* Geometric cross-stitch pattern */}
              <pattern id="crossStitch" width="12" height="12" patternUnits="userSpaceOnUse">
                <line x1="2" y1="2" x2="10" y2="10" stroke="#FF3B5C" strokeWidth="1.5" />
                <line x1="10" y1="2" x2="2" y2="10" stroke="#FFB703" strokeWidth="1.5" />
              </pattern>
            </defs>

            {/* ======================================================== */}
            {/* LAYER 1: LỚP THÂN & DA CƠ THỂ (BODY & SKIN LAYER) */}
            {/* ======================================================== */}
            <g id="layer-body-skin">
              {/* Legs based on gender & height */}
              {isFemale ? (
                /* Female Legs (1m60 Proportion) */
                <g id="female-legs">
                  {/* Left Leg */}
                  <rect x="116" y="335" width="24" height="75" rx="9" fill={isWhiteGroup ? '#F8FAFC' : isDarkGroup ? '#0F172A' : '#1E293B'} />
                  {/* Right Leg */}
                  <rect x="160" y="335" width="24" height="75" rx="9" fill={isWhiteGroup ? '#F8FAFC' : isDarkGroup ? '#0F172A' : '#1E293B'} />

                  {/* Female Leg Wraps (Xà cạp thêu hoa văn) */}
                  <rect x="115" y="348" width="26" height="6" fill="#FF3B5C" />
                  <rect x="115" y="362" width="26" height="6" fill="#FFB703" />
                  <rect x="115" y="376" width="26" height="6" fill="#4FC3F7" />

                  <rect x="159" y="348" width="26" height="6" fill="#FF3B5C" />
                  <rect x="159" y="362" width="26" height="6" fill="#FFB703" />
                  <rect x="159" y="376" width="26" height="6" fill="#4FC3F7" />

                  {/* Female Shoes */}
                  <path d="M112 410 C112 400 142 400 142 410 L140 417 L110 417 Z" fill="#1C1917" />
                  <path d="M158 410 C158 400 188 400 188 410 L190 417 L160 417 Z" fill="#1C1917" />
                </g>
              ) : (
                /* Male Legs (1m75 Taller Stature) */
                <g id="male-legs">
                  {/* Left Leg - Taller */}
                  <rect x="112" y="330" width="28" height="92" rx="10" fill={isDarkGroup ? '#0F172A' : '#1E293B'} />
                  {/* Right Leg - Taller */}
                  <rect x="160" y="330" width="28" height="92" rx="10" fill={isDarkGroup ? '#0F172A' : '#1E293B'} />

                  {/* Male Black Leg Wraps with Silver/Red pin */}
                  <rect x="111" y="356" width="30" height="7" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                  <rect x="111" y="372" width="30" height="7" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                  <rect x="111" y="388" width="30" height="7" fill={primaryTone} />

                  <rect x="159" y="356" width="30" height="7" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                  <rect x="159" y="372" width="30" height="7" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                  <rect x="159" y="388" width="30" height="7" fill={primaryTone} />

                  {/* Male Shoes - Stronger boots */}
                  <path d="M106 422 C106 410 142 410 142 422 L140 430 L104 430 Z" fill="#0F172A" />
                  <path d="M158 422 C158 410 194 410 194 422 L196 430 L160 430 Z" fill="#0F172A" />
                </g>
              )}

              {/* Neck Skin */}
              <rect x={isFemale ? "138" : "136"} y={isFemale ? "142" : "138"} width={isFemale ? "24" : "28"} height="22" fill="#FFE5CC" />
            </g>

            {/* --- SKIRT (FEMALE) / PANTS (MALE) --- */}
            {isFemale ? (
              <g id="skirt">
                {/* Pleated Skirt (Váy xòe) */}
                <path
                  d="M100 230 Q150 240 200 230 L245 350 Q150 380 55 350 Z"
                  fill={
                    isWhiteGroup
                      ? '#FFFFFF'
                      : isDarkGroup
                      ? '#0F172A'
                      : isBlueGroup
                      ? '#0369A1'
                      : isRedGroup
                      ? '#DC2626'
                      : '#1E293B'
                  }
                  stroke={isWhiteGroup ? '#CBD5E1' : '#0F172A'}
                  strokeWidth="2"
                />

                {/* Batik middle panel or custom user pattern */}
                {!isWhiteGroup && !isDarkGroup && (
                  <path
                    d="M80 280 Q150 295 220 280 L235 320 Q150 338 65 320 Z"
                    fill={customPatternDataUrl ? 'url(#userCustomPattern)' : 'url(#batikSpiral)'}
                    opacity="0.9"
                  />
                )}

                {/* Skirt pleats lines */}
                {[75, 95, 115, 135, 150, 165, 185, 205, 225].map((x, i) => (
                  <line
                    key={i}
                    x1={100 + (x - 100) * 0.5}
                    y1="235"
                    x2={x}
                    y2="355"
                    stroke={isWhiteGroup ? '#E2E8F0' : '#475569'}
                    strokeWidth="1.2"
                    opacity="0.6"
                  />
                ))}

                {/* Skirt Bottom Hem Border (Gấu váy thổ cẩm) */}
                <path
                  d="M55 350 Q150 380 245 350 L248 360 Q150 390 52 360 Z"
                  fill="#FF3B5C"
                />
                <path
                  d="M57 342 Q150 372 243 342 L245 348 Q150 378 55 348 Z"
                  fill="#FFB703"
                />
              </g>
            ) : (
              /* Male Pants (Quần chàm thụng) */
              <g id="pants">
                <path
                  d="M102 230 L102 345 L135 345 L150 270 L165 345 L198 345 L198 230 Z"
                  fill={isDarkGroup ? '#0F172A' : '#1E293B'}
                  stroke="#0F172A"
                  strokeWidth="1.5"
                />
              </g>
            )}

            {/* --- TORSO / JACKET / VEST --- */}
            <g id="jacket">
              {/* Torso Base */}
              <rect x="100" y="160" width="100" height="85" rx="8" fill={isWhiteGroup ? '#1E293B' : isDarkGroup ? '#0F172A' : isRedGroup ? '#991B1B' : '#1E293B'} />

              {/* Lapels / Collar flap (Yếm cổ & Vạt chéo) */}
              <path
                d="M110 160 L150 215 L190 160 L175 160 L150 195 L125 160 Z"
                fill={customPatternDataUrl ? 'url(#userCustomPattern)' : '#FF3B5C'}
                stroke="#FFB703"
                strokeWidth="1.5"
              />

              {/* Red fluffy wool pom-poms for Mong Do */}
              {isRedGroup && (
                <g id="pompoms">
                  <circle cx="130" cy="180" r="7" fill="#EF4444" stroke="#DC2626" />
                  <circle cx="170" cy="180" r="7" fill="#EF4444" stroke="#DC2626" />
                  <circle cx="150" cy="195" r="8" fill="#EF4444" stroke="#DC2626" />
                </g>
              )}

              {/* Waist Sash (Đại xáy & Thắt lưng thêu) */}
              <rect x="96" y="222" width="108" height="18" rx="4" fill="#FFB703" stroke="#FF7043" strokeWidth="1" />
              {/* Dropping ribbons from sash */}
              <path d="M135 240 L132 300 L145 295 L148 240 Z" fill="#FF3B5C" />
              <path d="M152 240 L155 300 L168 295 L165 240 Z" fill="#4FC3F7" />

              {/* Apron for Mong Trang / Mong Hoa */}
              {isWhiteGroup && (
                <path d="M125 240 L125 330 L175 330 L175 240 Z" fill="#0F172A" />
              )}
            </g>

            {/* --- ARMS & ACCESSORIES (PROP / FLUTE / UMBRELLA) --- */}
            <g id="arms">
              {currentPose === 'dance' ? (
                isFemale ? (
                  /* Umbrella Dance Pose */
                  <g>
                    {/* Left Arm raised holding umbrella handle */}
                    <path d="M102 170 Q75 140 70 115" stroke="#1E293B" strokeWidth="20" strokeLinecap="round" />
                    {/* Left Hand */}
                    <circle cx="70" cy="115" r="9" fill="#FFDFBA" />
                    {/* Colorful Hmong Paper Umbrella */}
                    <path d="M30 90 Q80 20 130 90 Z" fill="#FF3B5C" stroke="#FFB703" strokeWidth="2" />
                    <line x1="80" y1="55" x2="68" y2="125" stroke="#78350F" strokeWidth="3" />
                    {/* Umbrella scallops */}
                    <circle cx="45" cy="90" r="5" fill="#FFB703" />
                    <circle cx="65" cy="90" r="5" fill="#4FC3F7" />
                    <circle cx="85" cy="90" r="5" fill="#10B981" />
                    <circle cx="105" cy="90" r="5" fill="#FFB703" />
                    <circle cx="120" cy="90" r="5" fill="#FF3B5C" />
                    {/* Right Arm */}
                    <path d="M198 170 Q225 190 230 220" stroke="#1E293B" strokeWidth="20" strokeLinecap="round" />
                    <circle cx="230" cy="220" r="9" fill="#FFDFBA" />
                  </g>
                ) : (
                  /* Male Khen Flute Playing Pose */
                  <g>
                    {/* Khen Flute Pipes (Khèn Mông) */}
                    <path d="M110 220 L240 140" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
                    <path d="M115 225 L245 145" stroke="#B45309" strokeWidth="5" strokeLinecap="round" />
                    <path d="M120 230 L250 150" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
                    {/* Flute Gourd body */}
                    <ellipse cx="140" cy="205" rx="14" ry="10" fill="#78350F" />
                    {/* Flute mouth pipe */}
                    <line x1="140" y1="200" x2="150" y2="160" stroke="#D97706" strokeWidth="4" />

                    {/* Both hands holding Khen */}
                    <circle cx="140" cy="190" r="8" fill="#FFDFBA" />
                    <circle cx="165" cy="180" r="8" fill="#FFDFBA" />
                  </g>
                )
              ) : currentPose === 'showcase' ? (
                /* Showcase / Presenting Outfit Pose */
                <g>
                  {/* Left Hand on hip */}
                  <path d="M102 170 Q75 195 90 225" stroke="#1E293B" strokeWidth="20" strokeLinecap="round" />
                  <circle cx="90" cy="225" r="9" fill="#FFDFBA" />
                  {/* Right Hand presenting dress */}
                  <path d="M198 170 Q235 185 245 160" stroke="#1E293B" strokeWidth="20" strokeLinecap="round" />
                  <circle cx="245" cy="160" r="9" fill="#FFDFBA" />
                  <Sparkles className="w-5 h-5 text-[#FFB703]" x="250" y="145" />
                </g>
              ) : (
                /* Welcoming / Standing Pose (Đứng thẳng hoặc pose nhẹ góc 3/4) */
                isFemale ? (
                  <g id="female-arms-standing">
                    {/* Left Arm welcoming wave */}
                    <path d="M102 170 Q70 160 62 135" stroke="#1E293B" strokeWidth="20" strokeLinecap="round" />
                    {/* Sleeve stripes for Mong Xanh */}
                    {isBlueGroup && (
                      <g>
                        <path d="M85 168 L80 155" stroke="#EF4444" strokeWidth="18" />
                        <path d="M78 155 L72 142" stroke="#FBBF24" strokeWidth="18" />
                      </g>
                    )}
                    {/* Left Hand */}
                    <circle cx="62" cy="135" r="9" fill="#FFE5CC" />

                    {/* Right Arm resting politely */}
                    <path d="M198 170 Q225 190 215 220" stroke="#1E293B" strokeWidth="20" strokeLinecap="round" />
                    {isBlueGroup && (
                      <g>
                        <path d="M208 175 L215 190" stroke="#EF4444" strokeWidth="18" />
                        <path d="M215 190 L218 205" stroke="#FBBF24" strokeWidth="18" />
                      </g>
                    )}
                    <circle cx="215" cy="220" r="9" fill="#FFE5CC" />
                  </g>
                ) : (
                  /* Male Standing 3/4 Pose (A Vừ đĩnh đạc góc 3/4) */
                  <g id="male-arms-standing-34">
                    {/* Left arm resting naturally with hand near waist/sash */}
                    <path d="M96 160 Q72 186 84 215" stroke="#0F172A" strokeWidth="22" strokeLinecap="round" />
                    {isBlueGroup && <path d="M76 195 L84 212" stroke="#0284C7" strokeWidth="20" strokeLinecap="round" />}
                    {isRedGroup && <path d="M76 195 L84 212" stroke="#DC2626" strokeWidth="20" strokeLinecap="round" />}
                    <circle cx="84" cy="215" r="10" fill="#FFE5CC" />

                    {/* Right arm strong upright posture by side */}
                    <path d="M204 160 Q228 188 218 220" stroke="#0F172A" strokeWidth="22" strokeLinecap="round" />
                    {isBlueGroup && <path d="M224 200 L218 218" stroke="#0284C7" strokeWidth="20" strokeLinecap="round" />}
                    {isRedGroup && <path d="M224 200 L218 218" stroke="#DC2626" strokeWidth="20" strokeLinecap="round" />}
                    <circle cx="218" cy="220" r="10" fill="#FFE5CC" />
                  </g>
                )
              )}
            </g>

            {/* --- NECK & SILVER TORC (KIỀNG BẠC) --- */}
            <g id="neck">
              <rect x="138" y="145" width="24" height="20" fill="#FFDFBA" />
              {/* Silver Neck Torc (Kiềng bạc bản to chạm hoa văn) */}
              <path
                d="M128 158 Q150 174 172 158"
                stroke="#E2E8F0"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M125 163 Q150 181 175 163"
                stroke="#CBD5E1"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Small silver pendant / coin */}
              <circle cx="150" cy="172" r="3.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
            </g>

            {/* --- CHIBI HEAD & FACIAL EXPRESSIONS --- */}
            <g id="head">
              {/* Chibi Round Face */}
              <ellipse cx="150" cy="100" rx="55" ry="48" fill="#FFE5CC" />

              {/* Rosy Cheeks */}
              <circle
                cx="118"
                cy="114"
                r={expression === 'shy' ? 12 : 9}
                fill="#FF8A8A"
                opacity={expression === 'shy' ? 0.75 : 0.45}
              />
              <circle
                cx="182"
                cy="114"
                r={expression === 'shy' ? 12 : 9}
                fill="#FF8A8A"
                opacity={expression === 'shy' ? 0.75 : 0.45}
              />

              {/* Eyes based on expression */}
              {expression === 'wink' ? (
                <g>
                  {/* Left Eye open */}
                  <ellipse cx="128" cy="98" rx="8" ry="10" fill="#1C1917" />
                  <circle cx="126" cy="95" r="3.5" fill="#FFFFFF" />
                  <circle cx="130" cy="102" r="1.5" fill="#FFFFFF" />
                  {/* Right Eye winking arc */}
                  <path d="M165 98 Q174 88 183 98" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </g>
              ) : expression === 'laugh' || expression === 'excited' ? (
                <g>
                  {/* Happy crescent eyes */}
                  <path d="M120 98 Q128 84 136 98" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M164 98 Q172 84 180 98" stroke="#1C1917" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </g>
              ) : expression === 'shy' ? (
                <g>
                  {/* Gentle downward curved sweet eyes */}
                  <ellipse cx="128" cy="100" rx="7.5" ry="8.5" fill="#1C1917" />
                  <circle cx="126" cy="98" r="3" fill="#FFFFFF" />
                  <circle cx="130" cy="103" r="1.2" fill="#FFFFFF" />
                  <ellipse cx="172" cy="100" rx="7.5" ry="8.5" fill="#1C1917" />
                  <circle cx="170" cy="98" r="3" fill="#FFFFFF" />
                  <circle cx="174" cy="103" r="1.2" fill="#FFFFFF" />
                </g>
              ) : expression === 'sparkle' ? (
                <g>
                  {/* Sparkling starry eyes */}
                  <ellipse cx="128" cy="98" rx="8.5" ry="10.5" fill="#1C1917" />
                  <circle cx="125" cy="95" r="4" fill="#FFFFFF" />
                  <circle cx="130" cy="103" r="1.8" fill="#FFB703" />
                  <ellipse cx="172" cy="98" rx="8.5" ry="10.5" fill="#1C1917" />
                  <circle cx="169" cy="95" r="4" fill="#FFFFFF" />
                  <circle cx="174" cy="103" r="1.8" fill="#FFB703" />
                </g>
              ) : (
                /* Default Big Sparkling Chibi Eyes */
                <g>
                  {/* Left Eye */}
                  <ellipse cx="128" cy="98" rx="8" ry="10" fill="#1C1917" />
                  <circle cx="125" cy="95" r="3.5" fill="#FFFFFF" />
                  <circle cx="130" cy="102" r="1.5" fill="#FFFFFF" />

                  {/* Right Eye */}
                  <ellipse cx="172" cy="98" rx="8" ry="10" fill="#1C1917" />
                  <circle cx="169" cy="95" r="3.5" fill="#FFFFFF" />
                  <circle cx="174" cy="102" r="1.5" fill="#FFFFFF" />
                </g>
              )}

              {/* Eyebrows */}
              {expression === 'proud' ? (
                <g>
                  <path d="M120 81 Q128 78 136 83" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                  <path d="M164 83 Q172 78 180 81" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                <g>
                  <path d="M120 84 Q128 80 136 84" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  <path d="M164 84 Q172 80 180 84" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                </g>
              )}

              {/* Nose */}
              <circle cx="150" cy="106" r="2" fill="#E0A96D" />

              {/* Mouth */}
              {expression === 'laugh' || expression === 'excited' ? (
                <path d="M140 113 Q150 128 160 113 Z" fill="#E11D48" />
              ) : expression === 'shy' ? (
                <path d="M144 115 Q150 120 156 115" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" fill="none" />
              ) : (
                <path d="M142 114 Q150 122 158 114" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              )}
            </g>

            {/* --- HEADWEAR / HAIR (MŨ / KHĂN VẤN) --- */}
            <g id="headwear">
              {isFemale ? (
                /* Female Flower Hmong Brocade Turban (Khăn vấn hoa văn) */
                <g>
                  {/* Hair showing below turban */}
                  <path d="M96 90 Q150 65 204 90 L204 105 Q150 85 96 105 Z" fill="#1C1917" />

                  {/* Turban wraps */}
                  {isWhiteGroup ? (
                    /* White Turban for Mong Trang */
                    <path
                      d="M92 78 Q150 40 208 78 L206 58 Q150 25 94 58 Z"
                      fill="#FFFFFF"
                      stroke="#CBD5E1"
                      strokeWidth="2"
                    />
                  ) : isRedGroup ? (
                    /* Red Multi-tier Turban for Mong Do */
                    <g>
                      <path d="M90 75 Q150 35 210 75 L208 45 Q150 15 92 45 Z" fill="#EF4444" />
                      {/* Beads dangling */}
                      {[105, 120, 135, 150, 165, 180, 195].map((bx, i) => (
                        <circle key={i} cx={bx} cy="78" r="2.5" fill="#FFFFFF" stroke="#EF4444" strokeWidth="0.5" />
                      ))}
                    </g>
                  ) : (
                    /* Flower Hmong Multicolored Turban */
                    <g>
                      <path
                        d="M90 75 Q150 35 210 75 L208 48 Q150 18 92 48 Z"
                        fill="#FF3B5C"
                        stroke="#FFB703"
                        strokeWidth="1.5"
                      />
                      {/* Pattern stripes on turban */}
                      <path d="M96 68 Q150 38 204 68" stroke="#FFB703" strokeWidth="3" fill="none" />
                      <path d="M102 60 Q150 30 198 60" stroke="#4FC3F7" strokeWidth="3" fill="none" />

                      {/* Dangling Tassels (Tua rua hoa đào) */}
                      <g transform="translate(85, 70)">
                        <circle cx="0" cy="0" r="4" fill="#FFB703" />
                        <line x1="0" y1="0" x2="-6" y2="20" stroke="#FF3B5C" strokeWidth="3" strokeLinecap="round" />
                        <line x1="0" y1="0" x2="0" y2="24" stroke="#FF7043" strokeWidth="3" strokeLinecap="round" />
                      </g>
                      <g transform="translate(215, 70)">
                        <circle cx="0" cy="0" r="4" fill="#FFB703" />
                        <line x1="0" y1="0" x2="6" y2="20" stroke="#FF3B5C" strokeWidth="3" strokeLinecap="round" />
                        <line x1="0" y1="0" x2="0" y2="24" stroke="#FF7043" strokeWidth="3" strokeLinecap="round" />
                      </g>
                    </g>
                  )}
                </g>
              ) : (
                /* Male Traditional Beret / Hat (Mũ nồi Mông) */
                <g>
                  {/* Short Neat Hair */}
                  <path d="M96 90 Q150 68 204 90" stroke="#1C1917" strokeWidth="12" strokeLinecap="round" />
                  {/* Traditional Black Beret Hat */}
                  <path
                    d="M95 72 C95 45 130 35 150 35 C170 35 205 45 205 72 Z"
                    fill={isDarkGroup ? '#0F172A' : '#1E293B'}
                    stroke="#FF3B5C"
                    strokeWidth="1.5"
                  />
                  {/* Small red pom-pom on top */}
                  <circle cx="150" cy="33" r="5" fill="#FF3B5C" />
                </g>
              )}
            </g>
          </svg>
        )}

          {/* Interactive Hotspots Overlay */}
          {interactiveHotspots &&
            groupData.hotspots.map((hs) => {
              const isHighlighted = highlightPart === hs.part;
              return (
                <button
                  key={hs.id}
                  onClick={() => {
                    sound.playSilverChime();
                    setActiveHotspot(hs);
                  }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group transition-transform ${
                    isHighlighted ? 'scale-125' : 'hover:scale-110'
                  }`}
                  style={{
                    left: `${hs.coords.x}%`,
                    top: `${hs.coords.y}%`,
                  }}
                  title={hs.title}
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3B5C] opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FF3B5C] border-2 border-white shadow-md items-center justify-center text-[9px] text-white font-bold">
                      ✦
                    </span>
                  </span>
                </button>
              );
            })}
        </div>
      </div>

      {/* Expression quick buttons */}
      {onExpressionChange && (
        <div className="flex items-center gap-1.5 mt-2 bg-white/80 px-2.5 py-1 rounded-full border border-[#E8DFD5] text-xs">
          <span className="text-[11px] text-stone-500 mr-1">Biểu cảm:</span>
          {(['smile', 'laugh', 'wink'] as Expression[]).map((exp) => (
            <button
              key={exp}
              onClick={() => {
                sound.playKhen(550);
                onExpressionChange(exp);
              }}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                expression === exp ? 'bg-[#FF3B5C] text-white font-medium' : 'text-stone-600 hover:text-[#2C241E]'
              }`}
            >
              {exp === 'smile' ? 'Tươi' : exp === 'laugh' ? 'Rạng rỡ' : 'Nháy mắt'}
            </button>
          ))}
        </div>
      )}

      {/* Zoom-In Inspection Modal for Hotspots */}
      {activeHotspot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFF9F2] rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-[#FF3B5C]/30 relative overflow-hidden">
            {/* Traditional Sawtooth Border at top */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF3B5C] via-[#FFB703] to-[#4FC3F7]" />

            <button
              onClick={() => setActiveHotspot(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-[#FF3B5C]/10 text-[#FF3B5C] uppercase tracking-wider">
                Cận cảnh trang phục {groupData.name}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#2C241E] font-display mb-2">{activeHotspot.title}</h3>

            {/* Visual Close-up representation */}
            <div className="w-full h-36 bg-[#F5ECE1] rounded-xl flex items-center justify-center my-3 border border-[#E8DFD5] relative overflow-hidden">
              <div className="absolute inset-0 opacity-15 linen-bg" />
              <div className="flex flex-col items-center justify-center text-center p-4 z-10">
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-2 border border-[#FF3B5C]/20 text-3xl">
                  {activeHotspot.part === 'hat' ? '👒' : activeHotspot.part === 'torc' ? '✨' : activeHotspot.part === 'collar' ? '🎽' : activeHotspot.part === 'skirt' ? '👗' : '🪡'}
                </div>
                <span className="text-xs font-medium text-stone-700">Chi tiết thủ công tinh xảo</span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#4A3E37]">
              <div>
                <h4 className="font-semibold text-[#2C241E] flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#FF7043]">
                  <span>Ý nghĩa văn hóa & biểu tượng</span>
                </h4>
                <p className="mt-1 leading-relaxed">{activeHotspot.meaning}</p>
              </div>

              <div>
                <h4 className="font-semibold text-[#2C241E] flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#4FC3F7]">
                  <span>Quy trình chế tác thủ công</span>
                </h4>
                <p className="mt-1 leading-relaxed text-xs text-stone-600 bg-white/70 p-2.5 rounded-lg border border-[#E8DFD5]">
                  {activeHotspot.craftProcess}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => {
                  sound.playKhen(659);
                  setActiveHotspot(null);
                }}
                className="px-4 py-2 bg-[#FF3B5C] hover:bg-[#E11D48] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1"
              >
                <span>Đã hiểu</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
