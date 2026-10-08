import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
  ArrowRight,
  ZoomIn,
  Eye
} from 'lucide-react';
import { HMONG_GROUPS } from '../data/mongCulture';
import { ChibiCharacter, Gender, Pose, Expression } from './ChibiCharacter';
import { sound } from '../utils/audio';

interface FashionGalleryProps {
  onAwardPoints: (points: number, reason: string) => void;
  onGoToPatternStudio?: () => void;
}

// 5 groups in strict requested order: Trắng -> Đen -> Xanh -> Đỏ -> Hoa
interface CardGroupConfig {
  id: 'trang' | 'den' | 'xanh' | 'do' | 'hoa';
  femalePose: Pose;
  femaleExpression: Expression;
  femalePoseLabel: string;
  malePose: Pose;
  maleExpression: Expression;
  malePoseLabel: string;
  accentBg: string;
  cardBorder: string;
  glowColor: string;
}

const FIVE_GROUPS_CONFIG: CardGroupConfig[] = [
  {
    id: 'trang',
    femalePose: 'welcome',
    femaleExpression: 'shy',
    femalePoseLabel: 'Dáng đứng thanh thoát, trang nhã',
    malePose: 'welcome',
    maleExpression: 'smile',
    malePoseLabel: 'Dáng đĩnh đạc góc 3/4',
    accentBg: 'from-slate-100/60 via-white/40 to-slate-200/50',
    cardBorder: 'border-slate-300 hover:border-sky-300',
    glowColor: 'rgba(226, 232, 240, 0.6)',
  },
  {
    id: 'den',
    femalePose: 'showcase',
    femaleExpression: 'proud',
    femalePoseLabel: 'Dáng kiêu hãnh khoe tà áo',
    malePose: 'showcase',
    maleExpression: 'proud',
    malePoseLabel: 'Dáng khoác vạt chàm mun',
    accentBg: 'from-slate-800/15 via-indigo-950/10 to-slate-900/20',
    cardBorder: 'border-indigo-300/40 hover:border-indigo-400',
    glowColor: 'rgba(99, 102, 241, 0.4)',
  },
  {
    id: 'xanh',
    femalePose: 'dance',
    femaleExpression: 'sparkle',
    femalePoseLabel: 'Dáng múa xòe ô duyên dáng',
    malePose: 'welcome',
    maleExpression: 'sparkle',
    malePoseLabel: 'Dáng múa khèn bè phong trần',
    accentBg: 'from-sky-400/20 via-cyan-300/15 to-teal-400/20',
    cardBorder: 'border-sky-300 hover:border-cyan-400',
    glowColor: 'rgba(14, 165, 233, 0.5)',
  },
  {
    id: 'do',
    femalePose: 'welcome',
    femaleExpression: 'excited',
    femalePoseLabel: 'Dáng vẫy chào nồng nhiệt',
    malePose: 'welcome',
    maleExpression: 'excited',
    malePoseLabel: 'Dáng chào rạng rỡ kiên cường',
    accentBg: 'from-rose-500/20 via-red-400/15 to-amber-500/20',
    cardBorder: 'border-rose-300 hover:border-red-400',
    glowColor: 'rgba(244, 63, 94, 0.5)',
  },
  {
    id: 'hoa',
    femalePose: 'dance',
    femaleExpression: 'smile',
    femalePoseLabel: 'Dáng xoay tà váy thổ cẩm',
    malePose: 'dance',
    maleExpression: 'smile',
    malePoseLabel: 'Dáng dạo hội xuân rực rỡ',
    accentBg: 'from-pink-500/20 via-rose-400/15 to-amber-400/20',
    cardBorder: 'border-pink-300 hover:border-[#FF3B5C]',
    glowColor: 'rgba(255, 59, 92, 0.5)',
  },
];

// Separated components of White Hmong traditional costume (as in user images)
interface SeparatedCostumePart {
  id: string;
  name: string;
  subName: string;
  image: string;
  technique: string;
  description: string;
  material: string;
}

const MONG_TRANG_PARTS: SeparatedCostumePart[] = [
  {
    id: 'mu_doi_dau',
    name: 'Mũ đội đầu',
    subName: 'Khăn cuốn đính cườm chữ X & chỏm trắng',
    image: '/src/assets/images/part_mu_doi_dau_1791357739998.jpg',
    technique: 'Vải nhung đen, tết cườm hạt bạc thủ công',
    description: 'Mũ cuốn đen cao với hai dải đính hạt cườm bạc bắt chéo hình chữ X quanh trán và chỏm lông trắng kiêu hãnh trên đỉnh.',
    material: 'Vải nhung đen tuyền, hạt cườm bạc trắng, sợi len'
  },
  {
    id: 'vong_co_bac',
    name: 'Vòng cổ bạc lớn',
    subName: 'Kiềng cổ bạc nhiều tầng & bản chạm khắc',
    image: '/src/assets/images/part_vong_co_bac_1791357749091.jpg',
    technique: 'Đúc & chạm khắc bạc truyền thống thủ công',
    description: 'Kiềng cổ bạc nhiều tầng che phủ vùng ngực, xếp lớp dây chuyền, bản chạm khắc hình chữ nhật và chuỗi hạt bạc xâu thủ công.',
    material: 'Bạc trắng nguyên chất chạm khắc hoa văn Mông'
  },
  {
    id: 'ao_nhung_den',
    name: 'Áo nhung đen viền thổ cẩm',
    subName: 'Áo tay lỡ viền thêu chỉ hồng - vàng',
    image: '/src/assets/images/part_ao_nhung_den_1791357760226.jpg',
    technique: 'Vải nhung đen + Thêu viền thổ cẩm ngũ sắc',
    description: 'Áo đen tay lỡ may bằng vải nhung mềm mại, cổ áo chữ V và gấu tay viền thêu dải hoa văn thổ cẩm màu hồng đào, vàng nắng và cam rực.',
    material: 'Vải nhung đen cao cấp, chỉ tơ lụa ngũ sắc'
  },
  {
    id: 'dai_lung_do_dong_xu',
    name: 'Đai lưng đỏ & Đai trang trí đính đồng xu',
    subName: 'Đai lưng đỏ bên trong, bên ngoài đai thổ cẩm đính đồng xu',
    image: '/src/assets/images/part_dai_do_dai_xanh_1791389465423.jpg',
    technique: 'May lót lụa đỏ bên trong + Đai thổ cẩm đính chuỗi đồng xu bạc bên ngoài',
    description: 'Thiết kế gồm đai lưng màu đỏ bên trong tạo nền nổi bật, phía bên ngoài là đai thắt lưng thổ cẩm trang trí đính chuỗi đồng xu bạc rủ leng keng vui tai theo từng nhịp bước chân.',
    material: 'Vải lụa đỏ, vải thổ cẩm dệt tay, chuỗi đồng xu bạc'
  },
  {
    id: 'dai_vai_xanh_dui',
    name: '2 Dải vải xanh lá rủ thẳng xuống đùi',
    subName: 'Từ đai lưng rủ thẳng xuống ngang đùi',
    image: '/src/assets/images/part_dai_do_dai_xanh_1791389465423.jpg',
    technique: 'Lụa xanh lá may buông thẳng từ thắt lưng',
    description: 'Từ đai lưng, có 2 dải vải màu xanh lá cây buông thẳng tắp xuống đến ngang đùi hai bên hông, tạo điểm nhấn tương phản tươi tắn và mềm mại trên nền trang phục.',
    material: 'Vải lụa xanh lá cây mềm mại'
  },
  {
    id: 'dai_yem_truoc',
    name: 'Tấm dải yếm thổ cẩm phía trước',
    subName: 'Dài gần bằng độ dài của váy đen',
    image: '/src/assets/images/part_dai_yem_truoc_1791357786962.jpg',
    technique: 'Thêu chữ thập hoa văn ziczac & quả trám',
    description: 'Tấm dải yếm thổ cẩm buông dài chính giữa phía trước từ đai lưng xuống, có độ dài buông rủ dài gần bằng độ dài của tà váy đen mắt cá chân.',
    material: 'Vải lanh đen, chỉ thêu ngũ sắc tơ tằm'
  },
  {
    id: 'chan_vay_xanh',
    name: 'Chân váy đen dài đến mắt cá chân',
    subName: 'Tà váy lanh đen suông dài chạm mắt cá chân',
    image: '/src/assets/images/part_chan_vay_ankle_1791359523552.jpg',
    technique: 'May lanh suông dài đến mắt cá chân',
    description: 'Chân váy suông đen tuyền với độ dài tà đen buông dài đến mắt cá chân tôn dáng thanh mảnh, kết hợp hài hòa cùng 2 dải vải xanh lá và dải yếm thổ cẩm dài.',
    material: 'Vải lanh đen tuyền nhuộm chàm tự nhiên'
  },
  {
    id: 'dai_lung_chi_tiet',
    name: 'Đai lưng thổ cẩm đính đồng xu (Chi tiết)',
    subName: 'Cận cảnh hoa văn thêu tay & chuỗi đồng xu bạc (Hình 4)',
    image: '/src/assets/images/part_dai_lung_chi_tiet_1791359032302.jpg',
    technique: 'Thêu tay họa tiết thổ cẩm + Đính cườm chuỗi đồng xu',
    description: 'Bản thắt lưng thêu hoa văn chữ V, quả trám ngũ sắc đối xứng tỉ mỉ, đính nhiều tầng chuỗi xích bạc và đồng xu tròn lấp lánh (chi tiết từ Hình 4).',
    material: 'Chỉ tơ tằm ngũ sắc, đồng xu bạc truyền thống'
  }
];

const MONG_DEN_PARTS: SeparatedCostumePart[] = [
  {
    id: 'khan_doi_dau_den',
    name: 'Khăn đội đầu bằng vải chàm',
    subName: 'Khăn quấn vải chàm đen xếp nếp cánh tam giác hai bên',
    image: '/src/assets/images/part_khan_doi_dau_den_1791393864625.jpg',
    technique: 'Vải lanh nhuộm chàm đen tuyền, xếp nếp gấp tạo phom cánh',
    description: 'Khăn đội đầu bằng vải lanh nhuộm chàm đen đặc trưng, được gấp và tạo hình tinh tế với hai cánh xòe rộng vát sang hai bên hông tai, tạo vẻ đẹp uy nghi và độc đáo của phụ nữ Mông Đen.',
    material: 'Vải lanh tự nhiên nhuộm chàm nhiều lần'
  },
  {
    id: 'ao_khoac_xe_nguc_den',
    name: 'Áo khoác xẻ ngực viền thổ cẩm',
    subName: 'Áo khoác mở vạt viền chỉ xanh - đỏ và hoa văn kỷ hà',
    image: '/src/assets/images/part_ao_khoac_xe_nguc_den_1791393883513.jpg',
    technique: 'May lanh nhuộm chàm xẻ ngực + Thêu viền thổ cẩm nẹp áo và gấu tay',
    description: 'Áo khoác lanh chàm đen dài vừa vặn, xẻ vạt thẳng phía trước để lộ yếm ngực thêu bên trong. Nẹp áo và gấu tay được nẹp dải thổ cẩm xanh dương, đỏ và các dải sọc hình học rực rỡ.',
    material: 'Vải lanh nhuộm chàm truyền thống, chỉ thêu thổ cẩm tơ lụa'
  },
  {
    id: 'yem_nguc_tho_cam_den',
    name: 'Yếm ngực thêu thổ cẩm',
    subName: 'Yếm quả trám thêu hoa văn ngũ sắc rực rỡ',
    image: '/src/assets/images/part_yem_nguc_tho_cam_den_1791393901768.jpg',
    technique: 'Thêu chữ thập tinh xảo các họa tiết hoa văn ngôi sao, hình thoi',
    description: 'Tấm yếm ngực hình quả trám buộc dây quanh cổ, mặc lót bên trong áo khoác mở vạt. Phần ngực trên thêu kín các dải hoa văn sao hoa, dải chỉ đỏ, xanh cobalt và vàng nổi bật trên nền vải đen chàm.',
    material: 'Vải lanh chàm, chỉ thêu tơ tằm ngũ sắc'
  },
  {
    id: 'trang_suc_bac_den',
    name: 'Chuỗi hạt và khuyên tai bạc',
    subName: 'Dây chuyền bạc hạt chuỗi đôi & khuyên tai tròn bạc',
    image: '/src/assets/images/part_trang_suc_bac_den_1791393917743.jpg',
    technique: 'Chế tác bạc thủ công truyền thống của nghệ nhân Mông',
    description: 'Chuỗi dây chuyền bạc kết từ các hạt bạc tròn xâu thành hai vòng buông rủ duyên dáng qua ngực, đi kèm khuyên tai bạc tròn dạng vòng buông nhẹ bên vành tai.',
    material: 'Bạc trắng nguyên chất xâu chuỗi và uốn vòng thủ công'
  },
  {
    id: 'chan_vay_xep_ly_den',
    name: 'Chân váy xếp ly vải chàm',
    subName: 'Váy xòe xếp ly nhuyễn nhuộm chàm cạp xanh nổi bật',
    image: '/src/assets/images/part_chan_vay_cham_den_1791393933978.jpg',
    technique: 'Nhuộm chàm đen + Xếp ly nhuyễn thủ công bằng nhiệt và nếp đá',
    description: 'Chân váy xòe ngắn ngang gối bằng vải lanh nhuộm chàm đen bóng mượt, được xếp hàng trăm nếp ly nhuyễn đều tăm tắp, phối cạp váy màu xanh dương sáng tương phản nổi bật.',
    material: 'Vải lanh đen tuyền nhuộm chàm sâu, cạp lụa xanh'
  },
  {
    id: 'xa_cap_day_dai_den',
    name: 'Xà cạp & Dây đai thổ cẩm',
    subName: 'Xà cạp quấn bắp chân nẹp sọc và dải dây thổ cẩm xanh quấn chặt',
    image: '/src/assets/images/part_xa_cap_day_dai_den_1791393952265.jpg',
    technique: 'May xà cạp lanh chàm nẹp sọc viền vàng-trắng + Dệt đai thổ cẩm hoa văn',
    description: 'Đôi xà cạp bằng vải chàm quấn ôm gọn bắp chân giúp đi rừng leo dốc thuận tiện, được nẹp dải viền màu vàng-trắng và quấn cố định bằng đôi dây đai dệt thổ cẩm xanh cobalt thêu họa tiết.',
    material: 'Vải lanh chàm, dây đai thổ cẩm dệt tay'
  }
];

const MONG_XANH_PARTS: SeparatedCostumePart[] = [
  {
    id: 'khan_man_xanh',
    name: 'Khăn quấn đầu (mấn) sọc xanh trắng',
    subName: 'Khăn mấn tròn vải kẻ ca-rô xanh trắng độc đáo',
    image: '/src/assets/images/part_khan_man_xanh_1791395220855.jpg',
    technique: 'Dệt vải kẻ ca-rô xanh trắng + Quấn tạo hình mấn tròn ôm quanh đầu',
    description: 'Chiếc khăn quấn đầu dạng mấn tròn bọc vải kẻ ca-rô (gingham) xanh ngọc và trắng sáng là nét nhận diện nổi bật, trẻ trung và độc nhất của người phụ nữ Mông Xanh.',
    material: 'Vải cotton kẻ ô xanh trắng thủ công'
  },
  {
    id: 'ao_khoac_ngoai_xanh',
    name: 'Áo khoác ngoài 2 vạt to nổi & lộ cổ áo',
    subName: '2 vạt áo to nổi bật chạy thẳng xuống đai lưng, để lộ cổ áo bên trong',
    image: '/src/assets/images/part_ao_khoac_xanh_1791395236945.jpg',
    technique: 'May lanh chàm đen + 2 vạt nẹp nổi to chạy thẳng xuống đai + Lộ cổ áo lót',
    description: 'Áo khoác lửng mở ngực với thiết kế đặc trưng của người Mông Xanh: 2 phần vạt áo to và nổi lên rõ rệt, buông thẳng tắp từ vai xuống tới đai lưng; phần cổ áo lót bên trong lộ ra thanh thoát ở phía trên vạt áo tạo lớp lang duyên dáng.',
    material: 'Vải lanh chàm sẫm, viền vạt nổi dày dặn, chỉ thêu xanh lá'
  },
  {
    id: 'ao_lot_trong_xanh',
    name: 'Áo lót trong',
    subName: 'Áo dài tay trắng tinh khôi cổ chéo viền hồng nhạt',
    image: '/src/assets/images/part_ao_lot_xanh_1791395253642.jpg',
    technique: 'May vạt chéo bất đối xứng truyền thống viền nẹp cổ hồng',
    description: 'Áo lót trong màu trắng tinh khiết dài tay mặc bên trong áo khoác, thiết kế vạt cài chéo sang bên phải với đường viền cổ nẹp lụa màu hồng phấn dịu dàng.',
    material: 'Vải sợi bông dệt tự nhiên màu trắng'
  },
  {
    id: 'dai_lung_tho_cam_xanh',
    name: 'Đai lưng to họa tiết thổ cẩm',
    subName: 'Bản thắt lưng to thêu kín hoa văn thổ cẩm ngũ sắc rực rỡ',
    image: '/src/assets/images/part_dai_lung_tho_cam_xanh_1791396217070.jpg',
    technique: 'Dệt & thêu thổ cẩm thủ công bản lớn với họa tiết kỷ hà đối xứng',
    description: 'Bản đai thắt lưng to quấn ôm quanh eo, thêu dày đặc các họa tiết thổ cẩm truyền thống rực rỡ sắc màu, giữ cố định 2 vạt áo đi thẳng xuống và tạo điểm nhấn eo trang trọng, bề thế cho toàn bộ trang phục Mông Xanh.',
    material: 'Vải thổ cẩm dệt tay, chỉ tơ tằm thêu ngũ sắc'
  },
  {
    id: 'dai_yem_truoc_xanh',
    name: 'Tấm dải yếm thổ cẩm trước váy',
    subName: 'Dải yếm chữ nhật thêu hoa văn xanh - vàng - tím viền tua rua',
    image: '/src/assets/images/part_dai_yem_xanh_1791395290219.jpg',
    technique: 'Thêu chữ thập dải sọc hình học đối xứng + Đính tua rua đáy yếm',
    description: 'Tấm dải yếm hình chữ nhật buông rủ chính giữa phía trước từ đai lưng, phối thêu các dải hoa văn thổ cẩm xanh lá, vàng ánh kim và tím mộng mơ với gấu tua rua nhỏ tinh nghịch.',
    material: 'Vải lanh, chỉ thêu tơ tằm màu xanh lá, vàng, tím'
  },
  {
    id: 'chan_vay_xep_ly_xanh',
    name: 'Chân váy xếp ly',
    subName: 'Váy xòe xếp nếp viền dải thổ cẩm xanh lá rực rỡ quanh gấu',
    image: '/src/assets/images/part_chan_vay_xanh_ly_1791395310664.jpg',
    technique: 'Xếp ly nhuyễn thủ công + Thêu ghép thổ cẩm ziczac chân váy',
    description: 'Chân váy xòe xếp hàng trăm nếp ly mềm mại, điểm đặc trưng nhất là phần chân váy được thêu và chắp dải hoa văn thổ cẩm ziczac màu xanh lá cây vô cùng bắt mắt và sống động khi chuyển động.',
    material: 'Vải lanh đen sẫm, chỉ thổ cẩm màu xanh lá đặc trưng'
  },
  {
    id: 'xa_cap_xanh',
    name: 'Xà cạp quấn chân',
    subName: 'Xà cạp vải chàm đen ôm bắp chân thắt dây nơ',
    image: '/src/assets/images/part_xa_cap_xanh_quan_1791395336703.jpg',
    technique: 'May xà cạp lanh đen + Dây buộc đan chéo cố định bắp chân',
    description: 'Đôi xà cạp màu chàm đen viền hoa văn nhẹ quanh miệng, quấn ôm gọn đôi bắp chân và thắt cố định bằng các dải dây đen chéo chữ X, giúp bước chân leo đèo núi thoăn thoắt.',
    material: 'Vải lanh đen bền chắc, dây vải bện'
  }
];

const MONG_HOA_PARTS: SeparatedCostumePart[] = [
  {
    id: 'khan_non_mong_hoa',
    name: 'Khăn/Nón đội đầu',
    subName: 'Khăn nón quấn vải kẻ ca-rô đa sắc đính quả bông tròn',
    image: '/src/assets/images/part_khan_non_mong_hoa_1791398146588.jpg',
    technique: 'Dệt vải kẻ ca-rô đa sắc + Quấn tạo hình phễu + Đính quả bông len',
    description: 'Chiếc khăn/nón đội đầu độc đáo của người Mông Hoa, được quấn từ dải vải dệt kẻ ca-rô phối nhiều dải màu rực rỡ (hồng cánh sen, xanh lá, xanh ngọc, vàng, cam), chóp nón trang trí các chùm quả bông len sắc màu và dải vải buông duyên dáng một bên.',
    material: 'Vải cotton dệt kẻ ô đa sắc, sợi len màu làm quả bông pom-poms'
  },
  {
    id: 'ao_choang_vai_lung_hoa',
    name: 'Áo choàng vai lửng',
    subName: 'Áo khoác lửng cổ V sâu viền tua rua & sọc thổ cẩm vòng cung',
    image: '/src/assets/images/part_ao_choang_vai_lung_hoa_1791398160412.jpg',
    technique: 'Ghép dải thổ cẩm uốn vòng cung đa sắc + Cổ bẻ chữ V sâu + Đính hàng tua rua đáy áo',
    description: 'Áo choàng lửng dạng cape khoác ngoài vai với cổ bẻ chữ V sâu để lộ áo lót bên trong. Thân áo kết tinh từ các dải thêu thổ cẩm vòng cung đa sắc (hồng, cam, vàng, xanh), viền gấu áo đính hàng tua rua nhỏ rủ xuống mềm mại và ống tay áo phối sọc thổ cẩm bắt mắt.',
    material: 'Vải lanh chàm, chỉ thêu thổ cẩm ngũ sắc, hạt cườm và sợi tua rua'
  },
  {
    id: 'ao_lot_trong_hoa',
    name: 'Áo lót trong dài tay',
    subName: 'Áo đen cài khuy chéo vai thêu hoa hồng cam viền vàng',
    image: '/src/assets/images/part_ao_lot_trong_hoa_1791398175435.jpg',
    technique: 'May vạt đắp chéo bên vai + Cổ đứng nẹp thổ cẩm + Thêu nổi hoa văn hoa tròn',
    description: 'Áo lót mặc bên trong có phom dáng ôm gọn gàng màu đen chàm, cổ đứng nẹp viền hoa văn tinh xảo, vạt áo cài khuy chéo sang vai phải được đắp mảng thổ cẩm hoa văn hoa tròn màu hồng - cam rực rỡ viền chỉ vàng kim. Hai ống tay áo nẹp các dải thổ cẩm ngang đồng điệu.',
    material: 'Vải lanh chàm sẫm, chỉ thêu tơ tằm màu hồng, cam, vàng kim'
  },
  {
    id: 'dai_lung_vai_hoa',
    name: 'Đai lưng vải & Thắt lưng thổ cẩm',
    subName: 'Đai vải đỏ thắm quấn eo phối thắt lưng thổ cẩm buông dải',
    image: '/src/assets/images/part_dai_lung_vai_hoa_1791398185584.jpg',
    technique: 'Quấn đai lụa đỏ + Thắt lưng dệt thổ cẩm kỷ hà + Buông dải tua rua 2 bên hông',
    description: 'Bản đai thắt lưng bằng vải đỏ thắm quấn nhiều vòng ôm gọn eo thon, lồng ghép đai thắt lưng thêu thổ cẩm hoa văn tinh mỹ. Hai đầu dải thắt lưng đỏ thắt nút buông dài xuống hai bên hông với chùm tua rua ở đuôi dải, tạo điểm nhấn eo rực rỡ và chuyển tiếp hài hòa giữa áo và váy.',
    material: 'Vải lụa đỏ thắm, đai thổ cẩm dệt tay truyền thống'
  },
  {
    id: 'tam_yem_truoc_hoa',
    name: 'Tấm dải yếm thổ cẩm trước váy',
    subName: 'Dải yếm chữ nhật quả trám ngũ sắc viền tua rua buông trước váy',
    image: '/src/assets/images/part_tam_yem_truoc_hoa_1791398197694.jpg',
    technique: 'Thêu mạng chữ thập quả trám ngũ sắc rực rỡ + Nẹp viền + Đính tua rua đáy yếm',
    description: 'Tấm dải yếm tạp dề hình chữ nhật buông rủ chính giữa phía trước từ đai lưng xuống quá gối trên nền vải đen. Phần thân trên đắp ô hoa văn quả trám thổ cẩm màu đỏ, cam, vàng, xanh cực kỳ bắt mắt; đáy yếm đính hàng tua rua nhiều màu rủ bay bổng theo từng bước đi.',
    material: 'Vải lanh chàm, chỉ thêu tơ tằm ngũ sắc, hạt đính và sợi tua rua'
  },
  {
    id: 'chan_vay_xoe_hoa',
    name: 'Chân váy xòe xếp ly thổ cẩm',
    subName: 'Váy xòe xếp hàng trăm nếp ly bồng bềnh dập dải thổ cẩm đa sắc',
    image: '/src/assets/images/part_chan_vay_xoe_hoa_1791398208438.jpg',
    technique: 'Vẽ sáp ong + Nhuộm chàm + Thêu đáp vải thổ cẩm ngũ sắc + Xếp ly nhuyễn thủ công',
    description: 'Kiệt tác trang phục Mông Hoa là chiếc chân váy xòe hình chuông xếp hàng trăm nếp ly nhuyễn bồng bềnh. Thân váy gồm nhiều tầng dải hoa văn thổ cẩm thêu đắp nối tiếp nhau với gam màu đỏ, hồng cánh sen, cam, vàng rực rỡ; gấu váy nẹp các dải viền xanh lá, vàng, hồng tạo hiệu ứng như đóa hoa rừng đang nở rộ khi quay xoay.',
    material: 'Vải lanh tự nhiên, chỉ thêu thổ cẩm, sáp ong tự nhiên'
  },
  {
    id: 'xa_cap_hoa',
    name: 'Xà cạp quấn chân',
    subName: 'Xà cạp vải chàm đen ôm bắp chân nẹp thổ cẩm đỏ & dải nơ bên hông',
    image: '/src/assets/images/part_xa_cap_hoa_1791398223367.jpg',
    technique: 'May xà cạp lanh đen + Nẹp cổ viền thổ cẩm đỏ vàng + Thắt nơ đỏ buông bên',
    description: 'Đôi xà cạp bằng vải lanh chàm đen quấn ôm sát bắp chân giúp bảo vệ đôi chân khi leo dốc băng rừng. Phần miệng trên được nẹp dải thổ cẩm hoa văn đỏ - vàng tinh tế và đính dải nơ đỏ buông rủ một bên hông bắp chân tăng thêm nét duyên dáng.',
    material: 'Vải lanh chàm bền chắc, nẹp thổ cẩm thêu tay, dải lụa đỏ'
  }
];

export const FashionGallery: React.FC<FashionGalleryProps> = ({ onAwardPoints }) => {
  // Detailed modal state
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);
  const [exploredGroups, setExploredGroups] = useState<string[]>([]);

  // In-modal controls
  const [detailGender, setDetailGender] = useState<Gender>('female');
  const [detailGarmentTab, setDetailGarmentTab] = useState<'vay' | 'ao' | 'khan' | 'tapde' | 'xacap' | 'trangsuc'>('vay');
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);

  // Female track vector drag scroll
  const femaleTrackRef = useRef<HTMLDivElement>(null);
  const [isFemaleMouseDown, setIsFemaleMouseDown] = useState(false);
  const [femaleStartX, setFemaleStartX] = useState(0);
  const [femaleScrollLeft, setFemaleScrollLeft] = useState(0);
  const [femaleDragMoved, setFemaleDragMoved] = useState(false);
  const [canFemaleScrollLeft, setCanFemaleScrollLeft] = useState(false);
  const [canFemaleScrollRight, setCanFemaleScrollRight] = useState(true);

  // Male track vector drag scroll
  const maleTrackRef = useRef<HTMLDivElement>(null);
  const [isMaleMouseDown, setIsMaleMouseDown] = useState(false);
  const [maleStartX, setMaleStartX] = useState(0);
  const [maleScrollLeft, setMaleScrollLeft] = useState(0);
  const [maleDragMoved, setMaleDragMoved] = useState(false);
  const [canMaleScrollLeft, setCanMaleScrollLeft] = useState(false);
  const [canMaleScrollRight, setCanMaleScrollRight] = useState(true);

  // White Hmong parts horizontal track ref
  const partsTrackRef = useRef<HTMLDivElement>(null);
  const [isPartsMouseDown, setIsPartsMouseDown] = useState(false);
  const [partsStartX, setPartsStartX] = useState(0);
  const [partsScrollLeft, setPartsScrollLeft] = useState(0);

  // Check female scroll
  const updateFemaleScroll = () => {
    if (femaleTrackRef.current) {
      const { scrollLeft: left, scrollWidth, clientWidth } = femaleTrackRef.current;
      setCanFemaleScrollLeft(left > 10);
      setCanFemaleScrollRight(left < scrollWidth - clientWidth - 10);
    }
  };

  // Check male scroll
  const updateMaleScroll = () => {
    if (maleTrackRef.current) {
      const { scrollLeft: left, scrollWidth, clientWidth } = maleTrackRef.current;
      setCanMaleScrollLeft(left > 10);
      setCanMaleScrollRight(left < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const fEl = femaleTrackRef.current;
    if (fEl) {
      fEl.addEventListener('scroll', updateFemaleScroll, { passive: true });
      updateFemaleScroll();
    }
    const mEl = maleTrackRef.current;
    if (mEl) {
      mEl.addEventListener('scroll', updateMaleScroll, { passive: true });
      updateMaleScroll();
    }
    return () => {
      fEl?.removeEventListener('scroll', updateFemaleScroll);
      mEl?.removeEventListener('scroll', updateMaleScroll);
    };
  }, []);

  // Female Drag Handlers
  const handleFemaleMouseDown = (e: React.MouseEvent) => {
    if (!femaleTrackRef.current) return;
    setIsFemaleMouseDown(true);
    setFemaleStartX(e.pageX - femaleTrackRef.current.offsetLeft);
    setFemaleScrollLeft(femaleTrackRef.current.scrollLeft);
    setFemaleDragMoved(false);
  };

  const handleFemaleMouseMove = (e: React.MouseEvent) => {
    if (!isFemaleMouseDown || !femaleTrackRef.current) return;
    e.preventDefault();
    const x = e.pageX - femaleTrackRef.current.offsetLeft;
    const walk = (x - femaleStartX) * 1.5;
    if (Math.abs(x - femaleStartX) > 6) setFemaleDragMoved(true);
    femaleTrackRef.current.scrollLeft = femaleScrollLeft - walk;
  };

  const handleFemaleMouseUp = () => setIsFemaleMouseDown(false);

  // Male Drag Handlers
  const handleMaleMouseDown = (e: React.MouseEvent) => {
    if (!maleTrackRef.current) return;
    setIsMaleMouseDown(true);
    setMaleStartX(e.pageX - maleTrackRef.current.offsetLeft);
    setMaleScrollLeft(maleTrackRef.current.scrollLeft);
    setMaleDragMoved(false);
  };

  const handleMaleMouseMove = (e: React.MouseEvent) => {
    if (!isMaleMouseDown || !maleTrackRef.current) return;
    e.preventDefault();
    const x = e.pageX - maleTrackRef.current.offsetLeft;
    const walk = (x - maleStartX) * 1.5;
    if (Math.abs(x - maleStartX) > 6) setMaleDragMoved(true);
    maleTrackRef.current.scrollLeft = maleScrollLeft - walk;
  };

  const handleMaleMouseUp = () => setIsMaleMouseDown(false);

  // Open detail with pre-selected gender
  const handleOpenDetail = (groupId: string, gender: Gender, wasDragged: boolean) => {
    if (wasDragged) return;
    sound.playSilverChime();
    setSelectedDetailId(groupId);
    setDetailGender(gender);
    setDetailGarmentTab('vay');
    setSelectedPartId(null);

    if (!exploredGroups.includes(groupId)) {
      setExploredGroups((prev) => [...prev, groupId]);
      onAwardPoints(25, `Khám phá trang phục ${HMONG_GROUPS[groupId]?.name || ''}`);
    }
  };

  const selectedGroup = selectedDetailId ? HMONG_GROUPS[selectedDetailId] : null;

  const navigateDetailGroup = (step: number) => {
    if (!selectedDetailId) return;
    sound.playSilverChime();
    const currentIndex = FIVE_GROUPS_CONFIG.findIndex((g) => g.id === selectedDetailId);
    let nextIndex = currentIndex + step;
    if (nextIndex < 0) nextIndex = FIVE_GROUPS_CONFIG.length - 1;
    if (nextIndex >= FIVE_GROUPS_CONFIG.length) nextIndex = 0;

    const nextId = FIVE_GROUPS_CONFIG[nextIndex].id;
    setSelectedDetailId(nextId);
    setSelectedPartId(null);
    if (!exploredGroups.includes(nextId)) {
      setExploredGroups((prev) => [...prev, nextId]);
      onAwardPoints(25, `Khám phá trang phục ${HMONG_GROUPS[nextId]?.name || ''}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Studio Banner Header */}
      <div className="text-center mb-8 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C241E] font-display">
          Bảo tàng trang phục Bản Mông
        </h2>
        <p className="text-xs sm:text-sm text-[#5C4D42] mt-2 leading-relaxed">
          Bộ sưu tập trang phục truyền thống 5 nhóm người Mông Việt Nam cùng hai nhân vật đại diện: nàng <strong>Kút Yệu</strong> (22 tuổi, cao 1m60) và chàng <strong>A Vừ</strong> (23 tuổi, cao 1m75) với gương mặt tươi tắn rạng rỡ.
        </p>
      </div>

      {/* ======================================================== */}
      {/* HÀNG 1: TRANG PHỤC TRUYỀN THỐNG NỮ (KÚT YỆU - 22 TUỔI - 1M60) */}
      {/* ======================================================== */}
      <section className="mb-10">
        <div className="flex items-center justify-between pb-3 mb-2 px-2 border-b border-[#E8DFD5]">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/images/chibi_kut_yeu_portrait_1791187201444.jpg"
              alt="Kút Yệu"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#FF3B5C] shadow-xs shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2C241E] font-display flex items-center gap-2">
                <span>Trang Phục Truyền Thống Nữ</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FF3B5C]/10 text-[#FF3B5C]">
                  Kút Yệu
                </span>
              </h3>
              <p className="text-[11px] text-stone-500 font-medium">
                Model: Kút Yệu · 22 tuổi · Cao 1m60 · Gương mặt tươi tắn dịu dàng
              </p>
            </div>
          </div>

          {/* Navigation Arrows for Female Row */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playSilverChime();
                femaleTrackRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
              }}
              disabled={!canFemaleScrollLeft}
              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
                canFemaleScrollLeft
                  ? 'bg-white/80 border-[#E8DFD5] text-[#2C241E] hover:bg-white shadow-sm hover:scale-105 active:scale-95'
                  : 'bg-white/30 border-transparent text-stone-300 cursor-not-allowed'
              }`}
              title="Cuộn sang trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.playSilverChime();
                femaleTrackRef.current?.scrollBy({ left: 340, behavior: 'smooth' });
              }}
              disabled={!canFemaleScrollRight}
              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
                canFemaleScrollRight
                  ? 'bg-white/80 border-[#E8DFD5] text-[#2C241E] hover:bg-white shadow-sm hover:scale-105 active:scale-95'
                  : 'bg-white/30 border-transparent text-stone-300 cursor-not-allowed'
              }`}
              title="Cuộn sang phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Transparent Horizontal Cards Track (Female) */}
        <div
          ref={femaleTrackRef}
          onMouseDown={handleFemaleMouseDown}
          onMouseMove={handleFemaleMouseMove}
          onMouseUp={handleFemaleMouseUp}
          onMouseLeave={handleFemaleMouseUp}
          className={`flex items-stretch gap-6 overflow-x-auto pb-5 pt-2 px-2 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none transition-shadow ${
            isFemaleMouseDown ? 'cursor-grabbing' : ''
          }`}
          style={{ scrollBehavior: isFemaleMouseDown ? 'auto' : 'smooth' }}
        >
          {FIVE_GROUPS_CONFIG.map((cfg) => {
            const group = HMONG_GROUPS[cfg.id];
            if (!group) return null;
            const isExplored = exploredGroups.includes(cfg.id);

            return (
              <div
                key={`female-${cfg.id}`}
                onClick={() => handleOpenDetail(cfg.id, 'female', femaleDragMoved)}
                className={`w-[290px] sm:w-[320px] lg:w-[330px] shrink-0 snap-center rounded-3xl p-5 flex flex-col items-center justify-between transition-all duration-300 relative group overflow-hidden border-2 shadow-md hover:shadow-2xl hover:-translate-y-2 backdrop-blur-xl bg-white/45 ${cfg.cardBorder}`}
                style={{
                  boxShadow: `0 10px 30px -10px ${cfg.glowColor}`,
                }}
              >
                {/* Internal Glass Ambient Aura */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${cfg.accentBg} pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity`}
                />

                {/* Card Center: Model Representation */}
                <div className="relative z-10 w-full my-3 flex flex-col items-center justify-center">
                  {/* Glowing Aura Ring */}
                  <div
                    className="absolute w-44 h-44 rounded-full blur-2xl opacity-40 group-hover:scale-125 transition-transform duration-500 pointer-events-none"
                    style={{ backgroundColor: group.primaryColor }}
                  />

                  {/* Character Stage: Model Fashion Figure for White Hmong / SVG Doll for others */}
                  <div className="relative w-full h-[320px] flex items-center justify-center overflow-visible">
                    {cfg.id === 'trang' || cfg.id === 'den' || cfg.id === 'xanh' || cfg.id === 'hoa' ? (
                      /* Model Nữ Mông Trắng / Mông Đen / Mông Xanh / Mông Hoa: Phom dáng người mẫu chuẩn diện trọn bộ trang phục */
                      <div className="relative h-full flex items-center justify-center py-1 group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={
                            cfg.id === 'trang'
                              ? '/src/assets/images/mong_trang_new_model_1791389909915.jpg'
                              : cfg.id === 'den'
                              ? '/src/assets/images/mong_den_fashion_model_1791393845685.jpg'
                              : cfg.id === 'xanh'
                              ? '/src/assets/images/mong_xanh_model_lapels_belt_1791396195844.jpg'
                              : '/src/assets/images/mong_hoa_fashion_model_1791398131142.jpg'
                          }
                          alt={
                            cfg.id === 'trang'
                              ? 'Model Nữ Người Mông Trắng'
                              : cfg.id === 'den'
                              ? 'Model Nữ Người Mông Đen'
                              : cfg.id === 'xanh'
                              ? 'Model Nữ Người Mông Xanh'
                              : 'Model Nữ Người Mông Hoa'
                          }
                          className="h-full object-contain drop-shadow-md rounded-2xl"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <ChibiCharacter
                        gender="female"
                        currentGroup={cfg.id}
                        pose={cfg.femalePose}
                        expression={cfg.femaleExpression}
                        interactiveHotspots={false}
                        enableRotation={false}
                        enablePoseSwitch={false}
                        enableModeSwitch={false}
                        initialViewMode="svg_doll"
                        scale={0.88}
                      />
                    )}
                  </div>
                </div>

                {/* Card Footer: Group Title & CTA */}
                <div className="relative z-10 w-full pt-3 border-t border-white/60 text-center">
                  <h4 className="text-base sm:text-lg font-bold text-[#2C241E] font-display">
                    {group.name}
                  </h4>
                  <p className="text-[11px] text-[#5C4D42] mt-0.5 line-clamp-1 italic">
                    "{group.tagline}"
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetail(cfg.id, 'female', false);
                    }}
                    className="mt-3 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-white/90 to-white/70 hover:from-[#FF3B5C] hover:to-[#FF7043] hover:text-white text-stone-800 font-bold text-xs shadow-2xs border border-white/80 flex items-center justify-center gap-1.5 transition-all group-hover:scale-102"
                  >
                    <span>Xem Chi Tiết</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    {isExplored && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1" title="Đã xem" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* HÀNG 2: TRANG PHỤC TRUYỀN THỐNG NAM (A VỪ - 23 TUỔI - 1M75) */}
      {/* ======================================================== */}
      <section className="mb-6">
        <div className="flex items-center justify-between pb-3 mb-2 px-2 border-b border-[#E8DFD5]">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/images/chibi_a_vu_portrait_1791187223010.jpg"
              alt="A Vừ"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#0284C7] shadow-xs shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2C241E] font-display flex items-center gap-2">
                <span>Trang Phục Truyền Thống Nam</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#0284C7]/10 text-[#0284C7]">
                  A Vừ
                </span>
              </h3>
              <p className="text-[11px] text-stone-500 font-medium">
                Model: A Vừ · 23 tuổi · Cao 1m75 · Gương mặt tươi tắn đĩnh đạc
              </p>
            </div>
          </div>

          {/* Navigation Arrows for Male Row */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playSilverChime();
                maleTrackRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
              }}
              disabled={!canMaleScrollLeft}
              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
                canMaleScrollLeft
                  ? 'bg-white/80 border-[#E8DFD5] text-[#2C241E] hover:bg-white shadow-sm hover:scale-105 active:scale-95'
                  : 'bg-white/30 border-transparent text-stone-300 cursor-not-allowed'
              }`}
              title="Cuộn sang trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sound.playSilverChime();
                maleTrackRef.current?.scrollBy({ left: 340, behavior: 'smooth' });
              }}
              disabled={!canMaleScrollRight}
              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
                canMaleScrollRight
                  ? 'bg-white/80 border-[#E8DFD5] text-[#2C241E] hover:bg-white shadow-sm hover:scale-105 active:scale-95'
                  : 'bg-white/30 border-transparent text-stone-300 cursor-not-allowed'
              }`}
              title="Cuộn sang phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Transparent Horizontal Cards Track (Male) */}
        <div
          ref={maleTrackRef}
          onMouseDown={handleMaleMouseDown}
          onMouseMove={handleMaleMouseMove}
          onMouseUp={handleMaleMouseUp}
          onMouseLeave={handleMaleMouseUp}
          className={`flex items-stretch gap-6 overflow-x-auto pb-5 pt-2 px-2 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none transition-shadow ${
            isMaleMouseDown ? 'cursor-grabbing' : ''
          }`}
          style={{ scrollBehavior: isMaleMouseDown ? 'auto' : 'smooth' }}
        >
          {FIVE_GROUPS_CONFIG.map((cfg) => {
            const group = HMONG_GROUPS[cfg.id];
            if (!group) return null;
            const isExplored = exploredGroups.includes(cfg.id);

            return (
              <div
                key={`male-${cfg.id}`}
                onClick={() => handleOpenDetail(cfg.id, 'male', maleDragMoved)}
                className={`w-[290px] sm:w-[320px] lg:w-[330px] shrink-0 snap-center rounded-3xl p-5 flex flex-col items-center justify-between transition-all duration-300 relative group overflow-hidden border-2 shadow-md hover:shadow-2xl hover:-translate-y-2 backdrop-blur-xl bg-white/45 ${cfg.cardBorder}`}
                style={{
                  boxShadow: `0 10px 30px -10px ${cfg.glowColor}`,
                }}
              >
                {/* Internal Glass Ambient Aura */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${cfg.accentBg} pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity`}
                />

                {/* Card Header: Group Icon & Native Name */}
                <div className="relative z-10 w-full flex items-center justify-center gap-2 pb-2 border-b border-white/60">
                  <span className="text-lg">{group.icon}</span>
                  <span className="text-xs font-semibold text-stone-700 italic">
                    {group.nativeName}
                  </span>
                </div>

                {/* Card Center: A Vừ (23t, 1m75) Vector Model */}
                <div className="relative z-10 w-full my-3 flex flex-col items-center justify-center">
                  {/* Glowing Aura Ring */}
                  <div
                    className="absolute w-44 h-44 rounded-full blur-2xl opacity-40 group-hover:scale-125 transition-transform duration-500 pointer-events-none"
                    style={{ backgroundColor: group.primaryColor }}
                  />

                  {/* Vector SVG Model */}
                  <div className="relative w-full h-[320px] flex items-center justify-center overflow-visible">
                    <ChibiCharacter
                      gender="male"
                      currentGroup={cfg.id}
                      pose={cfg.malePose}
                      expression={cfg.maleExpression}
                      interactiveHotspots={false}
                      enableRotation={false}
                      enablePoseSwitch={false}
                      enableModeSwitch={false}
                      initialViewMode="svg_doll"
                      scale={0.92}
                    />
                  </div>

                  {/* Pose Badge Tag */}
                  <div className="mt-1 flex flex-col items-center text-center w-full">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-white/80 text-[11px] font-semibold text-stone-800 shadow-2xs">
                      <Sparkles className="w-3 h-3 text-[#0284C7]" />
                      <span>{cfg.malePoseLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Group Title & CTA */}
                <div className="relative z-10 w-full pt-3 border-t border-white/60 text-center">
                  <h4 className="text-base sm:text-lg font-bold text-[#2C241E] font-display">
                    {group.name}
                  </h4>
                  <p className="text-[11px] text-[#5C4D42] mt-0.5 line-clamp-1 italic">
                    "{group.tagline}"
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetail(cfg.id, 'male', false);
                    }}
                    className="mt-3 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-white/90 to-white/70 hover:from-[#0284C7] hover:to-[#0369A1] hover:text-white text-stone-800 font-bold text-xs shadow-2xs border border-white/80 flex items-center justify-center gap-1.5 transition-all group-hover:scale-102"
                  >
                    <span>Xem Chi Tiết</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    {isExplored && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1" title="Đã xem" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* MODAL CHI TIẾT TRANG PHỤC KHI NHẤN VÀO TỪNG CARD */}
      {/* ======================================================== */}
      {selectedGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-6xl max-h-[94vh] overflow-y-auto bg-[#FFFDF9]/98 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-white/80 p-5 sm:p-7 relative flex flex-col text-[#2C241E]"
            style={{
              scrollbarWidth: 'thin',
            }}
          >
            {/* Top Close & Navigation Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD5] mb-5">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl">{selectedGroup.icon}</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#2C241E]">
                    {selectedGroup.name}
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  sound.playSilverChime();
                  setSelectedDetailId(null);
                }}
                className="p-2 rounded-full bg-white/80 hover:bg-[#FF3B5C] hover:text-white border border-[#E8DFD5] transition-colors shadow-2xs"
                title="Đóng chi tiết"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ======================================================== */}
            {/* ĐẶC BIỆT: LAYOUT TIÊU CHUẨN 1/3 VÀ 2/3 CHO MÔNG TRẮNG, MÔNG ĐEN, MÔNG XANH & MÔNG HOA */}
            {/* ======================================================== */}
            {selectedGroup.id === 'trang' || selectedGroup.id === 'den' || selectedGroup.id === 'xanh' || selectedGroup.id === 'hoa' ? (
              (() => {
                const currentModelImage =
                  selectedGroup.id === 'trang'
                    ? '/src/assets/images/mong_trang_new_model_1791389909915.jpg'
                    : selectedGroup.id === 'den'
                    ? '/src/assets/images/mong_den_fashion_model_1791393845685.jpg'
                    : selectedGroup.id === 'xanh'
                    ? '/src/assets/images/mong_xanh_model_lapels_belt_1791396195844.jpg'
                    : '/src/assets/images/mong_hoa_fashion_model_1791398131142.jpg';

                const currentModelAlt =
                  selectedGroup.id === 'trang'
                    ? 'Model Nữ Người Mông Trắng'
                    : selectedGroup.id === 'den'
                    ? 'Model Nữ Người Mông Đen'
                    : selectedGroup.id === 'xanh'
                    ? 'Model Nữ Người Mông Xanh'
                    : 'Model Nữ Người Mông Hoa';

                const currentParts =
                  selectedGroup.id === 'trang'
                    ? MONG_TRANG_PARTS
                    : selectedGroup.id === 'den'
                    ? MONG_DEN_PARTS
                    : selectedGroup.id === 'xanh'
                    ? MONG_XANH_PARTS
                    : MONG_HOA_PARTS;

                const groupDisplayName =
                  selectedGroup.id === 'trang'
                    ? 'người Mông Trắng'
                    : selectedGroup.id === 'den'
                    ? 'người Mông Đen'
                    : selectedGroup.id === 'xanh'
                    ? 'người Mông Xanh'
                    : 'người Mông Hoa';

                return (
                  <div className="flex flex-col space-y-6 flex-1">
                    {/* ======================================================== */}
                    {/* HÀNG TRÊN: MẪU MẶC ĐỒ SÁT BÊN TAY TRÁI (1/3) & 2/3 BÊN PHẢI HIỂN THỊ GIẢI THÍCH */}
                    {/* ======================================================== */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      {/* CỘT TRÁI (1/3 MÀN HÌNH - SÁT BÊN TAY TRÁI): MẪU MẶC ĐỒ */}
                      <div className="lg:col-span-4 bg-gradient-to-b from-white/95 to-[#FFF7EE]/90 rounded-2xl p-4 sm:p-5 border-2 border-slate-200/80 shadow-sm flex flex-col items-center justify-center">
                        {/* Model Image Figure */}
                        <div className="relative w-full rounded-2xl overflow-hidden bg-white/80 border border-[#E8DFD5] shadow-xs p-2 flex flex-col items-center">
                          <img
                            src={currentModelImage}
                            alt={currentModelAlt}
                            className="w-full max-h-[500px] object-contain drop-shadow-md rounded-xl"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      {/* CỘT PHẢI (2/3 MÀN HÌNH BÊN TAY PHẢI): GIẢI THÍCH CHI TIẾT THEO CHIỀU NGANG KHI CHỌN BỘ PHẬN */}
                      <div className="lg:col-span-8 bg-gradient-to-b from-white/95 to-[#FFFDF9]/90 rounded-2xl p-5 sm:p-6 border-2 border-[#E8DFD5] shadow-sm flex flex-col justify-center min-h-[380px]">
                        {selectedPartId ? (
                          (() => {
                            const activePart = currentParts.find((p) => p.id === selectedPartId) || currentParts[0];
                            return (
                              <div className="w-full flex flex-col h-full justify-between animate-in fade-in zoom-in-95 duration-200">
                                {/* Header của 2/3 khu vực giải thích */}
                                <div className="flex items-center justify-end pb-2 border-b border-[#E8DFD5] mb-2">
                                  <button
                                    onClick={() => setSelectedPartId(null)}
                                    className="text-xs text-stone-400 hover:text-stone-700 underline flex items-center gap-1"
                                    title="Đóng để trở về để trống 2/3"
                                  >
                                    <span>Để trống lại</span>
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                {/* Dàn theo chiều ngang: Ảnh cận cảnh + Nội dung giải thích */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1 py-1">
                                  {/* Ảnh chi tiết bên trái (md:col-span-5) */}
                                  <div className="md:col-span-5 flex flex-col items-center">
                                    <div className="w-full max-w-[260px] aspect-square rounded-2xl bg-white p-3 border-2 border-[#E8DFD5] shadow-sm flex items-center justify-center overflow-hidden group">
                                      <img
                                        src={activePart.image}
                                        alt={activePart.name}
                                        className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                                      />
                                    </div>
                                    <span className="text-[11px] text-stone-400 mt-2 italic text-center">
                                      Cận cảnh cấu phần tách rời
                                    </span>
                                  </div>

                                  {/* Thông tin giải thích chi tiết bên phải (md:col-span-7) */}
                                  <div className="md:col-span-7 flex flex-col space-y-3 text-left">
                                    <div>
                                      <h4 className="text-xl sm:text-2xl font-bold font-display text-[#2C241E]">
                                        {activePart.name}
                                      </h4>
                                      <p className="text-xs text-[#FF3B5C] font-semibold mt-0.5">
                                        {activePart.subName}
                                      </p>
                                    </div>

                                    {/* Ý nghĩa & Thiết kế */}
                                    <div className="bg-white/85 rounded-xl p-3 border border-[#E8DFD5]">
                                      <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1">
                                        Ý nghĩa văn hóa & Thiết kế:
                                      </span>
                                      <p className="text-xs sm:text-sm text-[#4A3E37] leading-relaxed">
                                        {activePart.description}
                                      </p>
                                    </div>

                                    {/* Kỹ thuật & Chất liệu theo chiều ngang */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                      <div className="bg-white/70 rounded-xl p-2.5 border border-[#E8DFD5]">
                                        <span className="text-[10px] font-bold text-[#0284C7] uppercase tracking-wider block mb-0.5">
                                          Kỹ thuật chế tác:
                                        </span>
                                        <p className="text-xs text-stone-700 font-medium">
                                          {activePart.technique}
                                        </p>
                                      </div>
                                      <div className="bg-white/70 rounded-xl p-2.5 border border-[#E8DFD5]">
                                        <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider block mb-0.5">
                                          Chất liệu truyền thống:
                                        </span>
                                        <p className="text-xs text-stone-700 font-medium">
                                          {activePart.material}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })()
                        ) : (
                          /* ĐỂ TRỐNG 2/3 MÀN HÌNH BÊN TAY PHẢI KHI CHƯA CHỌN BỘ PHẬN NÀO */
                          <div className="flex flex-col items-center justify-center text-center p-8 space-y-3 text-stone-400">
                            <div className="w-16 h-16 rounded-2xl bg-white/80 border border-stone-200 flex items-center justify-center text-stone-400 shadow-2xs">
                              <Layers className="w-8 h-8 stroke-1 text-[#FF3B5C]" />
                            </div>
                            <div>
                              <h5 className="font-bold text-base text-stone-600 font-display">
                                Khu vực giải thích chi tiết cấu phần (2/3 màn hình)
                              </h5>
                              <p className="text-xs text-stone-400 max-w-md mt-1 leading-relaxed">
                                Nhấp vào hình ảnh của từng bộ phận ở hàng ngang bên dưới. Phần giải thích chi tiết của bộ phận đó sẽ xuất hiện tại đây theo chiều ngang.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ======================================================== */}
                    {/* HÀNG DƯỚI: CHI TIẾT CÁC BỘ PHẬN TRANG PHỤC ĐỂ BÊN DƯỚI (CHỈ ĐỂ HÌNH ẢNH VÀ TÊN BỘ PHẬN, HÀNG NGANG VECTOR) */}
                    {/* ======================================================== */}
                    <div className="w-full bg-white/75 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#E8DFD5] shadow-xs flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#FF3B5C]" />
                          <h4 className="font-bold text-sm text-[#2C241E] font-display">
                            Chi tiết các bộ phận trang phục {groupDisplayName}
                          </h4>
                          <span className="text-xs text-stone-500 hidden sm:inline">
                            — Nhấp vào hình của từng bộ phận để xem giải thích ở 2/3 màn hình bên trên
                          </span>
                        </div>

                        {/* Scroll buttons for parts track */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              sound.playSilverChime();
                              partsTrackRef.current?.scrollBy({ left: -220, behavior: 'smooth' });
                            }}
                            className="p-1.5 rounded-lg bg-white border border-[#E8DFD5] hover:bg-stone-50 shadow-2xs text-stone-700"
                            title="Cuộn sang trái"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              sound.playSilverChime();
                              partsTrackRef.current?.scrollBy({ left: 220, behavior: 'smooth' });
                            }}
                            className="p-1.5 rounded-lg bg-white border border-[#E8DFD5] hover:bg-stone-50 shadow-2xs text-stone-700"
                            title="Cuộn sang phải"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* HÀNG NGANG (VECTOR): CHỈ ĐỂ HÌNH ẢNH VÀ TÊN BỘ PHẬN */}
                      <div
                        ref={partsTrackRef}
                        onMouseDown={(e) => {
                          if (!partsTrackRef.current) return;
                          setIsPartsMouseDown(true);
                          setPartsStartX(e.pageX - partsTrackRef.current.offsetLeft);
                          setPartsScrollLeft(partsTrackRef.current.scrollLeft);
                        }}
                        onMouseMove={(e) => {
                          if (!isPartsMouseDown || !partsTrackRef.current) return;
                          e.preventDefault();
                          const x = e.pageX - partsTrackRef.current.offsetLeft;
                          partsTrackRef.current.scrollLeft = partsScrollLeft - (x - partsStartX) * 1.5;
                        }}
                        onMouseUp={() => setIsPartsMouseDown(false)}
                        onMouseLeave={() => setIsPartsMouseDown(false)}
                        className="flex gap-4 overflow-x-auto pb-2 pt-1 px-1 scrollbar-none snap-x cursor-grab active:cursor-grabbing select-none"
                      >
                        {currentParts.map((part) => {
                          const isSelected = selectedPartId === part.id;
                          return (
                            <div
                              key={part.id}
                              onClick={() => {
                                sound.playSilverChime();
                                setSelectedPartId(isSelected ? null : part.id);
                              }}
                              className={`w-[145px] sm:w-[160px] shrink-0 snap-center rounded-2xl p-2.5 flex flex-col items-center justify-between transition-all duration-300 relative group cursor-pointer border-2 backdrop-blur-xl ${
                                isSelected
                                  ? 'bg-white border-[#FF3B5C] ring-3 ring-[#FF3B5C]/25 shadow-lg scale-105'
                                  : 'bg-white/60 border-[#E8DFD5] hover:bg-white/90 hover:border-stone-400 hover:shadow-md hover:-translate-y-1'
                              }`}
                            >
                              {/* Chỉ để hình ảnh bộ phận */}
                              <div className="w-full h-28 sm:h-32 rounded-xl overflow-hidden bg-white/90 border border-stone-200/80 p-1.5 flex items-center justify-center relative mb-2">
                                <img
                                  src={part.image}
                                  alt={part.name}
                                  className="w-full h-full object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
                                />
                              </div>

                              {/* Chỉ để tên bộ phận */}
                              <span
                                className={`text-xs font-bold text-center line-clamp-2 px-1 leading-snug ${
                                  isSelected ? 'text-[#FF3B5C]' : 'text-[#2C241E]'
                                }`}
                              >
                                {part.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              /* LAYOUT CHO NHÓM CÒN LẠI (MÔNG ĐỎ) */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
                {/* Left Column (5 Cols): Character Showcase & Gender Switch */}
                <div className="lg:col-span-5 bg-gradient-to-b from-white/90 to-[#FFF4E8]/90 rounded-2xl p-4 sm:p-5 border border-[#E8DFD5] flex flex-col items-center shadow-xs">
                  {/* Model Gender Switcher */}
                  <div className="flex items-center gap-2 bg-white/90 p-1 rounded-xl border border-[#E8DFD5] mb-3 text-xs">
                    <button
                      onClick={() => {
                        sound.playSilverChime();
                        setDetailGender('female');
                      }}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                        detailGender === 'female'
                          ? 'bg-[#FF3B5C] text-white shadow-2xs'
                          : 'text-stone-600 hover:text-black'
                      }`}
                    >
                      Kút Yệu (Nữ - 1m60)
                    </button>
                    <button
                      onClick={() => {
                        sound.playKhen(440);
                        setDetailGender('male');
                      }}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                        detailGender === 'male'
                          ? 'bg-[#0284C7] text-white shadow-2xs'
                          : 'text-stone-600 hover:text-black'
                      }`}
                    >
                      A Vừ (Nam - 1m75)
                    </button>
                  </div>

                  {/* Character Doll in Detail */}
                  <div className="w-full h-[360px] flex items-center justify-center">
                    <ChibiCharacter
                      gender={detailGender}
                      currentGroup={selectedGroup.id}
                      pose="dance"
                      expression="smile"
                      interactiveHotspots={true}
                      enableRotation={true}
                      enablePoseSwitch={true}
                      enableModeSwitch={true}
                      initialViewMode="svg_doll"
                    />
                  </div>

                  <div className="mt-3 text-center">
                    <p className="text-xs text-[#5C4D42] italic">
                      "{selectedGroup.tagline}"
                    </p>
                  </div>
                </div>

                {/* Right Column (7 Cols): Cultural Details & Garments Breakdown */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Group Description Overview */}
                  <div className="bg-white/80 p-4 rounded-2xl border border-[#E8DFD5]">
                    <span className="text-[10px] font-bold text-[#FF7043] uppercase tracking-wider block mb-1">
                      Tổng quan văn hóa
                    </span>
                    <p className="text-xs sm:text-sm text-[#4A3E37] leading-relaxed">
                      {selectedGroup.description}
                    </p>
                  </div>

                  {/* Garments Category Tabs */}
                  <div className="bg-white/80 p-4 rounded-2xl border border-[#E8DFD5]">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#2C241E] mb-3 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#FF3B5C]" />
                      <span>Cấu Thành Bộ Trang Phục</span>
                    </h4>

                    {/* 6 Tabs */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-3">
                      {[
                        { key: 'vay', label: detailGender === 'female' ? 'Váy' : 'Quần', icon: detailGender === 'female' ? '👗' : '👖' },
                        { key: 'ao', label: 'Áo', icon: '🎽' },
                        { key: 'khan', label: 'Khăn / Mũ', icon: '👒' },
                        { key: 'tapde', label: 'Đại Xáy', icon: '🎗️' },
                        { key: 'xacap', label: 'Xà Cạp', icon: '🧦' },
                        { key: 'trangsuc', label: 'Trang Sức', icon: '💍' },
                      ].map((tab) => {
                        const isActive = detailGarmentTab === tab.key;
                        return (
                          <button
                            key={tab.key}
                            onClick={() => {
                              sound.playKhen(520);
                              setDetailGarmentTab(tab.key as any);
                            }}
                            className={`p-2 rounded-xl text-center text-[11px] font-medium transition-all border ${
                              isActive
                                ? 'bg-[#FF3B5C] text-white border-[#FF3B5C] shadow-2xs'
                                : 'bg-white text-stone-700 border-[#E8DFD5] hover:bg-stone-50'
                            }`}
                          >
                            <span className="block text-sm mb-0.5">{tab.icon}</span>
                            <span className="block truncate">{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Garment Details */}
                    {selectedGroup.garments[detailGarmentTab] && (
                      <div className="p-3.5 rounded-xl bg-[#FFF9F2] border border-[#E8DFD5] space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-bold text-[#2C241E] font-display">
                            {selectedGroup.garments[detailGarmentTab].name}
                          </h5>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFB703]/20 text-[#B45309] font-medium">
                            {selectedGroup.garments[detailGarmentTab].color}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {selectedGroup.garments[detailGarmentTab].desc}
                        </p>
                        <div className="pt-2 border-t border-[#E8DFD5] text-[11px] text-stone-500">
                          <strong className="text-stone-700">Kỹ thuật dệt may: </strong>
                          {selectedGroup.garments[detailGarmentTab].technique}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Color Swatch & Identity Badge */}
                  <div className="flex items-center justify-between p-3.5 bg-white/80 rounded-2xl border border-[#E8DFD5]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-stone-700">Sắc màu chủ đạo:</span>
                      <span
                        className="w-4 h-4 rounded-full border border-black/15 shadow-2xs inline-block"
                        style={{ backgroundColor: selectedGroup.primaryColor }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/15 shadow-2xs inline-block"
                        style={{ backgroundColor: selectedGroup.accentColor }}
                      />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FFB703]/20 text-[#B45309]">
                      {selectedGroup.badge}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Bottom Controls: Cycle Through 5 Groups */}
            <div className="mt-6 pt-4 border-t border-[#E8DFD5] flex items-center justify-between gap-3">
              <button
                onClick={() => navigateDetailGroup(-1)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs border border-[#E8DFD5] flex items-center gap-1.5 shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Nhóm trước</span>
              </button>

              <div className="text-xs text-stone-500 font-medium hidden sm:block">
                Lướt chuyển qua lại giữa 5 nhóm Mông
              </div>

              <button
                onClick={() => navigateDetailGroup(1)}
                className="px-4 py-2 rounded-xl bg-[#FF3B5C] hover:bg-[#E11D48] text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs"
              >
                <span>Nhóm tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
