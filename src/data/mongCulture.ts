/**
 * Cultural Database for "Dệt sắc Mông Hoa"
 * Covering Hmong culture, 5 groups, pattern codex, and traditional crafts.
 */

export interface HmongGroupInfo {
  id: 'hoa' | 'trang' | 'den' | 'xanh' | 'do';
  name: string;
  nativeName: string;
  icon: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  badge: string;
  description: string;
  distribution: string;
  garments: {
    vay: {
      name: string;
      desc: string;
      technique: string;
      color: string;
    };
    ao: {
      name: string;
      desc: string;
      technique: string;
      color: string;
    };
    khan: {
      name: string;
      desc: string;
      technique: string;
      color: string;
    };
    xacap: {
      name: string;
      desc: string;
      technique: string;
      color: string;
    };
    trangsuc: {
      name: string;
      desc: string;
      technique: string;
      color: string;
    };
    tapde: {
      name: string;
      desc: string;
      technique: string;
      color: string;
    };
  };
  hotspots: {
    id: string;
    title: string;
    part: 'collar' | 'waist' | 'cuff' | 'skirt' | 'hat' | 'torc';
    coords: { x: number; y: number }; // percentage on chibi doll
    meaning: string;
    craftProcess: string;
    detailImage: string;
  }[];
}

export const HMONG_GROUPS: Record<string, HmongGroupInfo> = {
  hoa: {
    id: 'hoa',
    name: 'Mông Hoa',
    nativeName: 'Hmoob Lềnh (Lenh)',
    icon: '🌺',
    tagline: 'Sắc thêu rực rỡ & Váy in sáp ong tinh xảo bậc nhất',
    primaryColor: '#FF3B5C',
    accentColor: '#FFB703',
    badge: 'Nghệ Nhân Mông Hoa',
    description: 'Phân nhóm có trang phục hoa mỹ, phong phú nhất. Điểm đặc trưng là váy xếp ly hình nón cụt dệt bằng sợi lanh, in hoa văn sáp ong (Batik) rồi nhuộm chàm, thêu đắp các mảng vải màu đỏ rực rỡ ở gấu váy và cổ áo sau lưng có yếm thêu như cánh bướm.',
    distribution: 'Lào Cai (Bắc Hà, Sa Pa), Hà Giang, Lai Châu, Sơn La',
    garments: {
      vay: {
        name: 'Váy xòe lanh in sáp ong thêu hoa',
        desc: 'Váy xếp hàng trăm nếp ly tinh tế, vẽ sáp ong họa tiết ốc và hoa cúc, nhuộm chàm xanh đậm, gấu váy đắp vải hoa văn màu đỏ vàng rực rỡ.',
        technique: 'Vẽ sáp ong (Batik) + Thêu chữ thập + Đắp ghép vải ngũ sắc',
        color: 'Chàm sâu, viền đỏ, hoa văn vàng cam'
      },
      ao: {
        name: 'Áo xẻ ngực vạt chéo đắp vải hoa',
        desc: 'Áo tay dài nhiều dải vải màu ghép so le ở bắp tay và cổ tay. Cổ áo lật ra sau lưng tạo thành tấm yếm vuông thêu chỉ tơ rực rỡ.',
        technique: 'Ghép vải hình học (Appliqué) + Thêu luồn sợi',
        color: 'Nền chàm đen hoặc xanh sẫm, vạt tay đắp vải ngũ sắc'
      },
      khan: {
        name: 'Khăn vấn đầu quả lê đính cườm & tua rua',
        desc: 'Khăn dài quấn nhiều lớp quanh đầu, để lộ chỏm tóc hoặc búi tóc cao, cài hoa len và tua rua đỏ cam lúc lắc theo từng nhịp bước.',
        technique: 'Dệt sợi lanh tết bím + Đính hạt cườm bạc và len màu',
        color: 'Đen, hồng đào, đỏ thắm'
      },
      tapde: {
        name: 'Đại xáy & Tạp dề thắt eo buông dài',
        desc: 'Hai dải thắt lưng dài thêu hoa văn chữ S và răng cưa rủ xuống hai bên hông hoặc trước bụng, đung đưa duyên dáng.',
        technique: 'Thêu chữ thập chỉ tơ lụa',
        color: 'Đỏ thêu viền xanh lơ và vàng nắng'
      },
      xacap: {
        name: 'Xà cạp quấn bắp chân viền hoa văn',
        desc: 'Dải vải chàm quấn gọn gàng từ cổ chân lên đầu gối, thắt bằng dây lanh thêu hoa bảo vệ chân khi leo dốc núi.',
        technique: 'May lanh thô bọc mép chỉ nổi',
        color: 'Chàm đen tuyền viền thêu đỏ rực'
      },
      trangsuc: {
        name: 'Vòng cổ bạc chạm khắc hoa văn Mông',
        desc: 'Kiềng bạc trắng tinh khiết chạm hình chim muông và hoa cúc, khuyên tai hình vầng trăng khuyết kêu leng keng vui tai.',
        technique: 'Chạm khắc bạc truyền thống thủ công',
        color: 'Bạc sáng lấp lánh'
      }
    },
    hotspots: [
      {
        id: 'hoa-hat',
        title: 'Khăn Thổ Cẩm & Tua Rua Hoa Đào',
        part: 'hat',
        coords: { x: 50, y: 14 },
        meaning: 'Tượng trưng cho vẻ đẹp e ấp của thiếu nữ vùng cao và đóa hoa ban mùa xuân.',
        craftProcess: 'Quấn tỉ mỉ từng lớp vải thổ cẩm kết hợp kết hạt cườm đỏ và chùm tua rua dệt tay.',
        detailImage: 'hat_detail'
      },
      {
        id: 'hoa-torc',
        title: 'Kiềng Bạc Chạm Hoa Cúc',
        part: 'torc',
        coords: { x: 50, y: 26 },
        meaning: 'Chiếc kiềng bạc giữ linh hồn trong sáng, bảo hộ sức khỏe và khẳng định sự sung túc.',
        craftProcess: 'Nung chảy bạc nén, dát tròn rồi đục chạm hoa văn thủ công bằng búa nhỏ.',
        detailImage: 'torc_detail'
      },
      {
        id: 'hoa-collar',
        title: 'Yếm Cổ Ghép Vải Ngũ Sắc (Paj Ntaub)',
        part: 'collar',
        coords: { x: 50, y: 38 },
        meaning: 'Hoa văn hình học che chắn gió lạnh và mang lại phúc lộc của đất trời.',
        craftProcess: 'Cắt gọt các mảnh vải hình tam giác, gấp mép giấu chỉ và may đè lên nền chàm.',
        detailImage: 'collar_detail'
      },
      {
        id: 'hoa-waist',
        title: 'Đại Xáy Hoa Văn Chữ S',
        part: 'waist',
        coords: { x: 50, y: 55 },
        meaning: 'Hình chữ S uốn lượn tượng trưng cho mây nước, cầu mưa thuận gió hòa cho nương ngô.',
        craftProcess: 'Thêu chữ thập dày dặn trên dải vải lanh nhuộm sáp ong.',
        detailImage: 'waist_detail'
      },
      {
        id: 'hoa-skirt',
        title: 'Váy Xếp Nếp In Sáp Ong (Batik)',
        part: 'skirt',
        coords: { x: 50, y: 72 },
        meaning: 'Xòe tròn như bông hoa rừng khi múa; nếp gấp tượng trưng cho ruộng bậc thang trùng điệp.',
        craftProcess: 'Vẽ sáp ong nóng chảy bằng bút đồng mỏ nhọn rồi nhúng chàm 15-20 lần.',
        detailImage: 'skirt_detail'
      },
      {
        id: 'hoa-cuff',
        title: 'Xà Cạp Chàm Thắt Nơ Đỏ',
        part: 'cuff',
        coords: { x: 50, y: 90 },
        meaning: 'Đôi chân thoăn thoắt vượt đỉnh đèo, chống gai cào và vắt cắn trong rừng sâu.',
        craftProcess: 'Vải lanh đen quấn nhiều vòng, cố định bằng dây dệt hoa văn sắc đỏ.',
        detailImage: 'cuff_detail'
      }
    ]
  },
  trang: {
    id: 'trang',
    name: 'Mông Trắng',
    nativeName: 'Hmoob Dawb (Dau)',
    icon: '🌸',
    tagline: 'Vẻ đẹp thanh khiết của váy lanh mộc tự nhiên',
    primaryColor: '#E2E8F0',
    accentColor: '#38BDF8',
    badge: 'Nghệ Nhân Mông Trắng',
    description: 'Nổi bật với chiếc váy làm bằng chất liệu lanh trắng tự nhiên không nhuộm, tượng trưng cho sự thuần khiết, trong sáng như dòng suối đầu nguồn. Áo xẻ ngực, vạt áo trước và sau thêu viền nhẹ nhàng, đầu quấn khăn lanh trắng tinh khôi.',
    distribution: 'Hà Giang (Đồng Văn, Mèo Vạc), Sơn La (Mộc Châu), Điện Biên',
    garments: {
      vay: {
        name: 'Váy lanh trắng mộc nguyên bản',
        desc: 'Váy may bằng vải lanh sợi tự nhiên được giặt trắng phơi sương, xếp nếp lớn mộc mạc và thanh thoát.',
        technique: 'Tước sợi lanh mộc + Dệt khung cửi lưng + Giặt tro làm trắng',
        color: 'Trắng kem tự nhiên của sợi lanh'
      },
      ao: {
        name: 'Áo chàm xẻ ngực vạt thêu viền xanh',
        desc: 'Áo ngắn ngang hông, cổ bẻ ra phía sau vai thêu hoa văn chữ thập thanh tao, nẹp áo viền vải lụa xanh.',
        technique: 'Thêu luồn chỉ tơ tinh giản',
        color: 'Chàm sẫm viền xanh lơ và trắng'
      },
      khan: {
        name: 'Khăn lanh trắng xếp nếp hình vành khuyên',
        desc: 'Vành khăn quấn cao tao nhã, ôm gọn mái tóc đen mượt, tôn lên nét mặt rạng rỡ của người phụ nữ.',
        technique: 'Gấp nếp ép phẳng không may viền',
        color: 'Trắng tinh khôi'
      },
      tapde: {
        name: 'Tạp dề lanh đen vạt dài buông trước',
        desc: 'Tấm tạp dề màu đen hoặc chàm tuyền buông thẳng từ thắt lưng xuống gối tạo nét tương phản thanh lịch.',
        technique: 'May lanh nhuộm chàm một màu',
        color: 'Đen chàm huyền bí'
      },
      xacap: {
        name: 'Xà cạp lanh trắng quấn gối',
        desc: 'Xà cạp màu trắng đồng điệu với tà váy, giữ ấm chân giữa những ngày đông sương mù lạnh buốt.',
        technique: 'Lanh dệt dày dặn',
        color: 'Trắng kem'
      },
      trangsuc: {
        name: 'Chuỗi xà tích bạc móc hoa cúc',
        desc: 'Dây chuyền bạc nhiều mắt xích buông từ thắt lưng kèm chuông bạc nhỏ xua đuổi tà ma.',
        technique: 'Uốn xích bạc thủ công',
        color: 'Bạc trắng'
      }
    },
    hotspots: [
      {
        id: 'trang-hat',
        title: 'Khăn Lanh Trắng Thanh Nhã',
        part: 'hat',
        coords: { x: 50, y: 14 },
        meaning: 'Màu trắng của mây núi ôm lấy đỉnh đèo Tây Bắc sáng sớm.',
        craftProcess: 'Vải lanh tự nhiên giặt tro bếp và phơi trên đá tai mèo dưới ánh nắng ban mai.',
        detailImage: 'hat_detail'
      },
      {
        id: 'trang-collar',
        title: 'Cổ Áo Xẻ Ngực Lật Sau Lưng',
        part: 'collar',
        coords: { x: 50, y: 38 },
        meaning: 'Đón nhận khí trời trong lành, giải phóng sự thanh thoát khi làm nương.',
        craftProcess: 'Thêu các đường chỉ viền màu xanh lơ và đỏ nhỏ li ti.',
        detailImage: 'collar_detail'
      },
      {
        id: 'trang-skirt',
        title: 'Váy Lanh Trắng Nguyên Bản',
        part: 'skirt',
        coords: { x: 50, y: 72 },
        meaning: 'Sự trinh bạch, mộc mạc và lòng trung trinh son sắt.',
        craftProcess: 'Tước vỏ cây lanh, luộc nước tro, dệt sợi và xếp nếp thủ công bằng đá lăn.',
        detailImage: 'skirt_detail'
      }
    ]
  },
  den: {
    id: 'den',
    name: 'Mông Đen',
    nativeName: 'Hmoob Dub (Du)',
    icon: '🖤',
    tagline: 'Sắc chàm đen tuyền óng ả bí ẩn & mạnh mẽ',
    primaryColor: '#1E293B',
    accentColor: '#F59E0B',
    badge: 'Nghệ Nhân Mông Đen',
    description: 'Người Mông Đen nổi tiếng với kỹ thuật nhuộm chàm đỉnh cao. Vải lanh được nhuộm đi nhuộm lại hàng chục lần, sau đó ngâm nước tro vỏ cây và lăn đá phẳng cho tới khi mặt vải ánh lên sắc đen bóng bẩy như lụa mun. Phụ nữ mặc áo chàm ngoài xẻ nách, thắt lưng thêu hoa rực rỡ.',
    distribution: 'Lào Cai (Sa Pa, Bát Xát), Yên Bái (Mù Cang Chải)',
    garments: {
      vay: {
        name: 'Váy ngắn ngang gối hoặc quần chàm thụng',
        desc: 'Váy hoặc quần chàm đen bóng tuyền, xếp nếp gọn gàng thuận tiện cho việc leo dốc đá dựng đứng.',
        technique: 'Nhuộm chàm 30 lần + Lăn đá bề mặt với sáp ong',
        color: 'Chàm ánh kim đen bóng'
      },
      ao: {
        name: 'Áo cánh xẻ nách chàm bóng cổ bẻ lót thêu',
        desc: 'Áo ngắn chàm đen bóng, tay áo ôm sát, bên trong lộ đường thêu hoa cúc vàng cam điểm xuyết nổi bật.',
        technique: 'Nhuộm chàm ngâm vỏ sồi + Thêu điểm xuyết',
        color: 'Đen mun bóng láng'
      },
      khan: {
        name: 'Khăn chàm đen quấn nhiều nếp hình mũ nồi',
        desc: 'Khăn vấn ôm sát đầu gọn gàng, đỉnh khăn để hở cài trâm bạc hoặc đồng xu may mắn.',
        technique: 'Quấn nếp gấp chéo đối xứng',
        color: 'Đen mun'
      },
      tapde: {
        name: 'Thắt lưng lanh đỏ viền cam rực',
        desc: 'Dải thắt lưng tạo điểm nhấn đối lập cực mạnh trên nền trang phục đen mun huyền ảo.',
        technique: 'Thêu dệt sợi nổi khối',
        color: 'Đỏ cam nổi bật'
      },
      xacap: {
        name: 'Xà cạp chàm đen bó sát bắp chân',
        desc: 'Quấn ôm khít chân bảo vệ khỏi gai nhọn và sương muối vùng lạnh giá.',
        technique: 'Dệt sợi gai nhuộm đậm',
        color: 'Đen tuyền'
      },
      trangsuc: {
        name: 'Khuyên tai bạc xoắn ốc & Lắc tay vuông',
        desc: 'Trang sức bạc chạm nổi các khối hình học trừu tượng to bản đầy sức sống.',
        technique: 'Đúc và gò bạc truyền thống',
        color: 'Bạc sáng cổ điển'
      }
    },
    hotspots: [
      {
        id: 'den-collar',
        title: 'Mặt Vải Lanh Lăn Đá Ánh Kim',
        part: 'collar',
        coords: { x: 50, y: 38 },
        meaning: 'Độ óng ánh chứng minh sự chịu thương chịu khó của người phụ nữ dệt vải.',
        craftProcess: 'Đặt vải lên phiến đá phẳng, bôi sáp ong và dùng khúc gỗ nghiến lăn ép liên tục.',
        detailImage: 'collar_detail'
      },
      {
        id: 'den-waist',
        title: 'Đai Thắt Lưng Đỏ Cam Tương Phản',
        part: 'waist',
        coords: { x: 50, y: 55 },
        meaning: 'Ngọn lửa sưởi ấm đêm đông giữa rừng già Tây Bắc.',
        craftProcess: 'Chỉ đỏ tơ tằm thêu nổi hoa văn răng cưa chéo.',
        detailImage: 'waist_detail'
      },
      {
        id: 'den-skirt',
        title: 'Váy Chàm Ngắn & Ống Xà Cạp Gọn Gàng',
        part: 'skirt',
        coords: { x: 50, y: 72 },
        meaning: 'Sự kiên cường, dẻo dai thích nghi với địa hình đèo dốc hiểm trở.',
        craftProcess: 'May phom dáng tối giản nhưng đường may chắc chắn gấp ba lần thông thường.',
        detailImage: 'skirt_detail'
      }
    ]
  },
  xanh: {
    id: 'xanh',
    name: 'Mông Xanh',
    nativeName: 'Hmoob Đua',
    icon: '🍃',
    tagline: 'Vẻ đẹp thanh bình của tà áo dài xanh biếc & tay áo khoanh màu',
    primaryColor: '#0EA5E9',
    accentColor: '#10B981',
    badge: 'Nghệ Nhân Mông Xanh',
    description: 'Trang phục Mông Xanh mang gam màu xanh ngọc, xanh lá và chàm biếc dịu mát. Phụ nữ mặc áo dài trùm qua gối xẻ hai bên sườn, đặc biệt ống tay áo ghép các khoanh vải màu (xanh, đỏ, vàng, trắng) sặc sỡ và váy xếp ly thêu hoa văn tinh xảo.',
    distribution: 'Lào Cai (Văn Bàn), Lai Châu, Yên Bái',
    garments: {
      vay: {
        name: 'Váy xếp ly màu chàm xanh biếc',
        desc: 'Váy xòe mềm mại bằng lanh nhuộm chàm xanh nhạt hơn Mông Đen, hoa văn thêu tỉ mỉ ở lưng váy.',
        technique: 'Nhuộm chàm nhẹ nước + Xếp nếp đều tăm tắp',
        color: 'Xanh chàm ngọc bích'
      },
      ao: {
        name: 'Áo dài qua gối xẻ tà tay áo khoanh màu',
        desc: 'Tà áo dài duyên dáng, cổ áo tròn xẻ ngực, ống tay đắp các dải vải màu cầu vồng rực rỡ.',
        technique: 'May can dải màu ngang + Viền cổ thêu tay',
        color: 'Xanh ngọc, khoanh tay đỏ vàng'
      },
      khan: {
        name: 'Khăn xanh chàm vấn chữ V trước trán',
        desc: 'Khăn dài quấn nhiều vòng, tạo hình chữ V thanh thoát ở giữa trán làm sáng bừng gương mặt.',
        technique: 'Vấn nếp chéo cân đối',
        color: 'Xanh chàm đậm'
      },
      tapde: {
        name: 'Đai lưng xanh thắt dải hoa cúc',
        desc: 'Dải thắt lưng thêu hoa cúc vàng rực nở rộ trên nền vải xanh lá mạ tươi mới.',
        technique: 'Thêu hoa văn thực vật',
        color: 'Xanh lá và vàng cúc'
      },
      xacap: {
        name: 'Xà cạp xanh ngọc viền hoa thêu',
        desc: 'Xà cạp vải lanh màu xanh ngọc quấn ôm nhẹ nhàng quanh bắp chân.',
        technique: 'May lót hai lớp êm ái',
        color: 'Xanh ngọc bích'
      },
      trangsuc: {
        name: 'Khuyên tai hình giọt nước bằng bạc',
        desc: 'Đôi khuyên tai bạc đung đưa nhẹ nhàng tựa hạt sương ban mai trên chồi non.',
        technique: 'Kéo sợi bạc mảnh đan giọt nước',
        color: 'Bạc trắng ánh xanh'
      }
    },
    hotspots: [
      {
        id: 'xanh-sleeve',
        title: 'Tay Áo Ghép Khoanh Màu Cầu Vồng',
        part: 'cuff',
        coords: { x: 28, y: 45 },
        meaning: 'Cầu vồng sau cơn mưa rừng, mang lại may mắn và vụ mùa tươi tốt.',
        craftProcess: 'Cắt đều các dải vải màu rộng 2cm may nối mí khéo léo.',
        detailImage: 'cuff_detail'
      },
      {
        id: 'xanh-skirt',
        title: 'Tà Áo Dài Xẻ Hông Duyên Dáng',
        part: 'skirt',
        coords: { x: 50, y: 65 },
        meaning: 'Dáng vẻ thướt tha hòa quyện cùng cỏ cây hoa lá thảo nguyên.',
        craftProcess: 'Cắt may tà dài qua gối, xẻ từ hông xuống để bước đi uyển chuyển.',
        detailImage: 'skirt_detail'
      }
    ]
  },
  do: {
    id: 'do',
    name: 'Mông Đỏ',
    nativeName: 'Hmoob Si',
    icon: '🍎',
    tagline: 'Chùm hoa len đỏ thắm rực rỡ & Khăn đội đầu nhiều tầng lộng lẫy',
    primaryColor: '#EF4444',
    accentColor: '#F97316',
    badge: 'Nghệ Nhân Mông Đỏ',
    description: 'Người Mông Đỏ có trang phục nổi bật rực rỡ nhất trong các lễ hội. Điểm nhận diện không thể nhầm lẫn là các chùm hoa len đỏ thắm đính ở ngực áo, khăn đội đầu xếp nhiều tầng đính hạt cườm rủ và gấu váy thêu chỉ đỏ rực cháy như ngọn lửa.',
    distribution: 'Lai Châu, Lào Cai, Hà Giang',
    garments: {
      vay: {
        name: 'Váy thêu hoa văn đỏ rực lửa',
        desc: 'Váy xòe rộng với dải hoa văn thổ cẩm màu đỏ tươi chiếm trọn nửa dưới của thân váy.',
        technique: 'Thêu chữ thập phủ kín nền + Đắp vải đỏ tươi',
        color: 'Đỏ thắm, cam lửa và viền chàm'
      },
      ao: {
        name: 'Áo chàm đính chùm hoa len đỏ trước ngực',
        desc: 'Áo xẻ ngực đính hàng chục quả bông len màu đỏ thắm rung rinh theo từng nhịp thở.',
        technique: 'Làm hoa len quả bông thủ công + Thêu nẹp áo',
        color: 'Chàm sẫm đính chùm quả bông đỏ rực'
      },
      khan: {
        name: 'Mũ khăn nhiều tầng đính cườm đỏ',
        desc: 'Mũ khăn hình trụ cao, kết tầng nhiều dải vải đỏ, đính các chuỗi hạt cườm buông xuống ngang trán.',
        technique: 'Dựng khung phom cứng bọc vải thêu hạt cườm',
        color: 'Đỏ tươi kết hợp chuỗi cườm trắng bạc'
      },
      tapde: {
        name: 'Tạp dề lụa đỏ thêu hoa văn quả trám',
        desc: 'Tấm tạp dề phủ trước ngực thêu hình quả trám tượng trưng cho đất mẹ chở che con người.',
        technique: 'Thêu kín mảng hình học quả trám',
        color: 'Đỏ son rực rỡ'
      },
      xacap: {
        name: 'Xà cạp đỏ kết tua rua hoa cúc',
        desc: 'Xà cạp may bằng vải thêu đỏ quấn từ mắt cá chân, viền hoa cúc may mắn.',
        technique: 'Thêu dệt phối len đỏ',
        color: 'Đỏ son'
      },
      trangsuc: {
        name: 'Vòng cổ bạc nhiều tầng kèm lục lạc',
        desc: 'Bộ kiềng bạc 3-5 chiếc lồng vào nhau, có lục lạc nhỏ phát ra âm thanh vui nhộn khi nhảy múa.',
        technique: 'Gò bạc uốn tầng và gắn lục lạc phát âm',
        color: 'Bạc trắng bóng'
      }
    },
    hotspots: [
      {
        id: 'do-hat',
        title: 'Mũ Tầng Hoa Len & Hạt Cườm Đỏ',
        part: 'hat',
        coords: { x: 50, y: 12 },
        meaning: 'Hình tượng mặt trời chiếu rọi xua tan sương giá mùa đông trên đỉnh núi cao.',
        craftProcess: 'Xâu từng chuỗi hạt cườm đính vào khung khăn bọc thổ cẩm đỏ.',
        detailImage: 'hat_detail'
      },
      {
        id: 'do-chest',
        title: 'Chùm Bông Len Đỏ Trước Ngực',
        part: 'collar',
        coords: { x: 50, y: 36 },
        meaning: 'Trái tim nồng nhiệt, lòng hiếu khách và lời chúc phúc viên mãn.',
        craftProcess: 'Quấn sợi len quanh ngón tay rồi cắt xù thành quả bông tròn trĩnh.',
        detailImage: 'collar_detail'
      },
      {
        id: 'do-skirt',
        title: 'Váy Thêu Chỉ Đỏ Ngũ Sắc Rực Cháy',
        part: 'skirt',
        coords: { x: 50, y: 72 },
        meaning: 'Ngọn lửa hồng ấm áp của bếp lò trong ngôi nhà trình tường.',
        craftProcess: 'Thêu chữ thập phủ kín hàng tháng trời với chỉ nhuộm củ nâu và rễ cây.',
        detailImage: 'skirt_detail'
      }
    ]
  }
};

export interface PatternItem {
  id: string;
  name: string;
  nativeName: string;
  category: 'geometric' | 'animal' | 'plant' | 'object';
  symbolism: string;
  lore: string;
  placement: string[];
  svgPath: string; // for rendering icon
  stencilPath: string; // SVG path data for canvas tracing
  difficulty: 'Dễ' | 'Trung bình' | 'Tinh xảo';
}

export const PATTERN_CODEX: PatternItem[] = [
  {
    id: 'chrysanthemum',
    name: 'Hoa Cúc (Mặt Trời)',
    nativeName: 'Paj Cúc',
    category: 'plant',
    symbolism: 'Ánh dương, sức sống trường thọ và sự sinh sôi nảy nở của vạn vật',
    lore: 'Người Mông tin rằng hoa cúc tám cánh chính là hiện thân của mặt trời rọi chiếu ban phát sự sống cho cây ngô, cây lúa trên các triền núi dốc.',
    placement: ['Cổ áo sau lưng', 'Gấu váy xòe', 'Thắt lưng'],
    svgPath: 'M50,15 L53,35 L70,25 L60,42 L80,50 L60,58 L70,75 L53,65 L50,85 L47,65 L30,75 L40,58 L20,50 L40,42 L30,25 L47,35 Z M50,42 A8,8 0 1,0 50,58 A8,8 0 1,0 50,42 Z',
    stencilPath: 'M 100,50 C 100,20 150,20 150,50 C 180,50 180,100 150,100 C 150,130 100,130 100,100 C 70,100 70,50 100,50 Z',
    difficulty: 'Dễ'
  },
  {
    id: 'snail_shell',
    name: 'Con Ốc (Vỏ Ốc Xoắn)',
    nativeName: 'Nkawg Ntsia',
    category: 'animal',
    symbolism: 'Vòng xoáy của sự sống, sự tuần hoàn của vũ trụ và lòng kiên trì',
    lore: 'Đường xoắn ốc biểu thị hành trình di cư của tổ tiên người Mông qua bao đèo dốc sông suối, dù đi xa đến đâu cũng luôn nhớ về cội nguồn.',
    placement: ['Vạt váy in sáp ong', 'Cổ áo', 'Khăn đội đầu'],
    svgPath: 'M50,50 m-2,0 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0 M50,44 a6,6 0 1,1 6,6 a6,6 0 0,1 -6,6 a12,12 0 1,1 12,-12 a18,18 0 1,1 -18,18 a24,24 0 1,1 24,-24',
    stencilPath: 'M 70,100 A 30,30 0 1 1 130,100 A 20,20 0 1 1 90,100 A 10,10 0 1 1 110,100',
    difficulty: 'Trung bình'
  },
  {
    id: 's_shape',
    name: 'Chữ S (Mây & Mưa)',
    nativeName: 'Ntsa Iab / Huab Cua',
    category: 'geometric',
    symbolism: 'Cầu mong mưa thuận gió hòa, mùa màng tốt tươi, dòng nước tưới nương',
    lore: 'Hình chữ S uốn lượn tượng trưng cho mây lành ngưng tụ thành những hạt mưa tưới mát cho ruộng bậc thang mùa khô hạn.',
    placement: ['Đại xáy (thắt lưng)', 'Vạt áo trước', 'Xà cạp'],
    svgPath: 'M30,35 C30,20 48,18 60,25 C72,32 68,48 50,52 C32,56 28,72 40,79 C52,86 70,84 70,69',
    stencilPath: 'M 60,60 C 60,30 110,30 110,60 C 110,90 60,90 60,120 C 60,150 110,150 110,120',
    difficulty: 'Dễ'
  },
  {
    id: 'windmill',
    name: 'Chong Chóng (Bốn Phương Trời)',
    nativeName: 'Kiv Cua',
    category: 'object',
    symbolism: 'Gió ngàn bốn phương, sự linh hoạt nhạy bén và đón nhận may mắn',
    lore: 'Cánh chong chóng quay tít trong gió thu trên nương rẫy, mang tin vui về vụ ngô vàng bắp và sự thanh bình nơi xóm bản.',
    placement: ['Yếm cổ sau lưng', 'Gấu váy in sáp ong'],
    svgPath: 'M50,50 L20,30 L35,15 Z M50,50 L70,20 L85,35 Z M50,50 L80,70 L65,85 Z M50,50 L30,80 L15,65 Z',
    stencilPath: 'M 100,100 L 50,70 L 70,50 Z M 100,100 L 130,50 L 150,70 Z M 100,100 L 150,130 L 130,150 Z M 100,100 L 70,150 L 50,130 Z',
    difficulty: 'Trung bình'
  },
  {
    id: 'mountain_sawtooth',
    name: 'Răng Cưa (Dãy Núi Đá)',
    nativeName: 'Zฟj Roob Zeb',
    category: 'geometric',
    symbolism: 'Sự kiên định, dãy núi đá tai mèo che chắn buôn làng khỏi giông bão',
    lore: 'Những chóp nhọn đối xứng tái hiện những dãy núi đá cao ngất trời nơi người Mông sinh sống, rèn giũa ý chí kiên cường không chịu lùi bước.',
    placement: ['Viền cổ áo', 'Nẹp vạt áo', 'Viền xà cạp'],
    svgPath: 'M15,65 L25,35 L35,65 L45,35 L55,65 L65,35 L75,65 L85,35 L85,75 L15,75 Z',
    stencilPath: 'M 30,120 L 50,60 L 70,120 L 90,60 L 110,120 L 130,60 L 150,120',
    difficulty: 'Dễ'
  },
  {
    id: 'bird_eye',
    name: 'Mắt Chim / Quả Trám Đôi',
    nativeName: 'Qhov Muag Noog',
    category: 'animal',
    symbolism: 'Tầm nhìn bao quát, sự tinh anh sáng suốt và che chở tâm hồn',
    lore: 'Người phụ nữ Mông thêu họa tiết mắt chim lên trang phục con cái để các loài thú dữ trong rừng già phải kiêng dè không dám quấy nhiễu.',
    placement: ['Mũ trẻ em', 'Cổ áo', 'Dải yếm'],
    svgPath: 'M50,25 L75,50 L50,75 L25,50 Z M50,38 L62,50 L50,62 L38,50 Z M50,46 A4,4 0 1,0 50,54 A4,4 0 1,0 50,46 Z',
    stencilPath: 'M 100,50 L 150,100 L 100,150 L 50,100 Z M 100,75 L 125,100 L 100,125 L 75,100 Z',
    difficulty: 'Tinh xảo'
  },
  {
    id: 'tiger_paw',
    name: 'Dấu Chân Hổ',
    nativeName: 'Tร Qub Tsov',
    category: 'animal',
    symbolism: 'Sức mạnh dũng mãnh, sự can trường của các chàng trai săn thú và khai hoang',
    lore: 'Biểu trưng cho sức mạnh thủ lĩnh, bảo vệ bản làng trước những mối nguy hiểm nơi hoang dã.',
    placement: ['Túi đeo thổ cẩm', 'Thắt lưng nam'],
    svgPath: 'M50,62 C40,62 38,78 50,78 C62,78 60,62 50,62 Z M35,48 A6,8 0 1,0 35,32 A6,8 0 1,0 35,48 Z M45,40 A6,8 0 1,0 45,24 A6,8 0 1,0 45,40 Z M55,40 A6,8 0 1,0 55,24 A6,8 0 1,0 55,40 Z M65,48 A6,8 0 1,0 65,32 A6,8 0 1,0 65,48 Z',
    stencilPath: 'M 100,120 C 80,120 76,150 100,150 C 124,150 120,120 100,120 Z M 70,90 A 12,16 0 1,0 70,60 A 12,16 0 1,0 70,90 Z M 90,75 A 12,16 0 1,0 90,45 A 12,16 0 1,0 90,75 Z M 110,75 A 12,16 0 1,0 110,45 A 12,16 0 1,0 110,75 Z M 130,90 A 12,16 0 1,0 130,60 A 12,16 0 1,0 130,90 Z',
    difficulty: 'Tinh xảo'
  },
  {
    id: 'rhombus_diamond',
    name: 'Quả Trám Đất Trời',
    nativeName: 'Lub Pob Zeb',
    category: 'geometric',
    symbolism: 'Sự vững chãi của đất mẹ, tổ ấm gia đình hòa thuận và đầm ấm',
    lore: 'Bốn đỉnh của quả trám liên kết đất trời với con người, tạo thành lá chắn linh thiêng gắn kết các thành viên trong gia đình.',
    placement: ['Dải nơ thắt lưng', 'Vạt ngực áo', 'Khăn quấn'],
    svgPath: 'M50,20 L80,50 L50,80 L20,50 Z M50,32 L68,50 L50,68 L32,50 Z',
    stencilPath: 'M 100,40 L 160,100 L 100,160 L 40,100 Z M 100,65 L 135,100 L 100,135 L 65,100 Z',
    difficulty: 'Dễ'
  }
];

export interface OriginBadge {
  id: string;
  label: string;
  value: string;
  sub: string;
  icon: string;
  color: string;
}

export const CULTURAL_ORIGIN_DATA = {
  name: 'Mông (Na Miẻo / Hmoob)',
  population: '1.393.547 người',
  languageGroup: 'Hệ Mông - Dao',
  provinces: [
    { name: 'Hà Giang', highlight: 'Đồng Văn, Mèo Vạc - Mông Trắng, Mông Hoa' },
    { name: 'Lào Cai', highlight: 'Sa Pa, Bắc Hà - Mông Hoa, Mông Đen, Mông Xanh' },
    { name: 'Sơn La', highlight: 'Mộc Châu, Yên Châu - Mông Trắng, Mông Đỏ' },
    { name: 'Điện Biên', highlight: 'Tủa Chùa, Điện Biên Đông - Mông Trắng' },
    { name: 'Lai Châu', highlight: 'Phong Thổ, Sìn Hồ - Mông Đỏ, Mông Hoa' },
    { name: 'Yên Bái', highlight: 'Mù Cang Chải - Mông Đen, Mông Hoa' }
  ],
  branches: [
    { name: 'Mông Trắng', native: 'Hmoob Dawb', trait: 'Váy lanh trắng mộc mạc tinh khôi' },
    { name: 'Mông Hoa', native: 'Hmoob Lềnh', trait: 'Váy in sáp ong vẽ chữ S và thêu đắp ngũ sắc' },
    { name: 'Mông Đen', native: 'Hmoob Dub', trait: 'Trang phục nhuộm chàm đen tuyền óng ả' },
    { name: 'Mông Xanh', native: 'Hmoob Đua', trait: 'Áo dài qua gối xẻ tà, tay áo khoanh màu' },
    { name: 'Mông Đỏ', native: 'Hmoob Si', trait: 'Đính chùm hoa len đỏ thắm và mũ tầng cườm' }
  ],
  badges: [
    { id: 'b_name', label: 'Tên gọi', value: 'Mông / Hmoob', sub: 'Na Miẻo, Mèo', icon: '🏔️', color: 'from-amber-400 to-orange-500' },
    { id: 'b_pop', label: 'Dân số', value: '1.393.547 người', sub: 'Xếp thứ 6 tại Việt Nam', icon: '👥', color: 'from-rose-400 to-red-500' },
    { id: 'b_lang', label: 'Ngôn ngữ', value: 'Hệ Mông - Dao', sub: 'Chữ Mông Latinh & Truyền khẩu', icon: '📜', color: 'from-sky-400 to-indigo-500' },
    { id: 'b_geo', label: 'Địa bàn chính', value: '6 tỉnh Tây Bắc & Đông Bắc', sub: 'Cư trú trên các triền núi cao', icon: '📍', color: 'from-emerald-400 to-teal-500' },
    { id: 'b_groups', label: '5 Phân nhóm', value: 'Trắng - Hoa - Đen - Xanh - Đỏ', sub: 'Phân biệt theo trang phục nữ', icon: '✨', color: 'from-violet-400 to-purple-500' }
  ]
};
