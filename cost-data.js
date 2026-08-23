/** Trip cost summary · placeholders until tickets/hotels are booked. */
window.COST_DATA = {
  people: 5,
  updated: "2026-08-23",
  fx: {
    cnyToHkd: 1.08,
    krwPerHkd: 175,
    note: {
      zh: "基準貨幣 HKD · 約 1 CNY ≈ 1.08 HKD · 5 人分攤",
      en: "Base currency HKD · ~1 CNY ≈ 1.08 HKD · split 5 ways",
    },
  },
  categories: [
    {
      id: "flights",
      title: { zh: "機票", en: "Flights" },
      items: [
        {
          id: "in-lhw",
          name: { zh: "9C7395 廣州→蘭州 ×5", en: "9C7395 CAN→LHW ×5" },
          status: "tbd",
          note: { zh: "春秋 · 9/24 06:30–09:40 · 金額待補", en: "Spring · Sep 24 06:30–09:40 · amount TBD" },
        },
        {
          id: "out-lhw",
          name: { zh: "9C7396 蘭州→廣州 ×5", en: "9C7396 LHW→CAN ×5" },
          status: "tbd",
          note: { zh: "春秋 · 10/2 21:00–00:15+1 · 金額待補", en: "Spring · Oct 2 21:00–00:15+1 · amount TBD" },
        },
      ],
    },
    {
      id: "stay",
      title: { zh: "住宿", en: "Lodging" },
      items: [
        { id: "hotel-qinghai", name: { zh: "卡巴倉·措瓊諾日 · 1 晚", en: "Kabacang Cuoqiong Nuori · 1N" }, status: "tbd", note: { zh: "共和江西溝 · 確認號／金額待補", en: "Jiangxigou, Gonghe · conf. / amount TBD" } },
        { id: "hotel-dachaidan", name: { zh: "大柴旦麗呈翠星 · 2 晚", en: "Rezen Cuixing Da Qaidam · 2N" }, status: "tbd", note: { zh: "義海街 9 號 · 確認號／金額待補", en: "9 Yihai St · conf. / amount TBD" } },
        { id: "hotel-dunhuang", name: { zh: "煌漠玥 Moon Field · 2 晚", en: "Moon Field Homestay · 2N" }, status: "tbd", note: { zh: "月牙泉鎮楊家橋 · 確認號／金額待補", en: "Yueyaquan Town · conf. / amount TBD" } },
        { id: "hotel-zhangye", name: { zh: "望山國際（張掖西站）· 1 晚", en: "Wangshan (Zhangye West) · 1N" }, status: "tbd", note: { zh: "雙塔民俗文化村 · 確認號／金額待補", en: "Shuangta Folk Village · conf. / amount TBD" } },
        { id: "hotel-qilian", name: { zh: "祁連五礦國貿 · 1 晚", en: "Qilian Minmetals · 1N" }, status: "tbd", note: { zh: "八寶鎮濱河路 · 確認號／金額待補", en: "Binhe Rd, Babao · conf. / amount TBD" } },
        { id: "hotel-xining", name: { zh: "記憶時光摩洛哥復古鏡 · 1 晚", en: "Memory Time Moroccan Mirror · 1N" }, status: "tbd", note: { zh: "城東中發源廣場 · 確認號／金額待補", en: "Zhongfayuan Plaza, Chengdong · conf. / amount TBD" } },
      ],
    },
    {
      id: "transport",
      title: { zh: "自駕", en: "Self-drive" },
      items: [
        {
          id: "rental",
          name: { zh: "租車 7 座 × 9 日（待訂）", en: "7-seater rental × 9 days (TBD)" },
          status: "tbd",
          note: { zh: "5 人+行李建議 7 座 · 蘭州中川取還 · 確認無人區救援／全險", en: "7-seater for 5 + bags · pick up/return at LHW · confirm remote rescue + full insurance" },
        },
        {
          id: "fuel",
          name: { zh: "油費（環線約 3,000km）", en: "Fuel (~3,000 km loop)" },
          status: "estimate",
          cny: 4000,
          note: { zh: "7 座油耗偏高 · 無人區見站就加", en: "Thirsty 7-seater · fill up whenever you see a station" },
        },
        {
          id: "tolls",
          name: { zh: "過路費＋停車", en: "Tolls + parking" },
          status: "estimate",
          cny: 1500,
        },
      ],
    },
    {
      id: "tickets",
      title: { zh: "景區門票（預估）", en: "Scenic tickets (estimate)" },
      items: [
        { id: "erlangjian", name: { zh: "青海湖二郎劍 ×5", en: "Erlangjian ×5" }, status: "estimate", cny: 500 },
        { id: "chaka", name: { zh: "茶卡鹽湖 ×5", en: "Chaka Salt Lake ×5" }, status: "estimate", cny: 600, note: { zh: "小火車另計", en: "Mini-train extra" } },
        { id: "qarhan", name: { zh: "察爾汗鹽湖 ×5", en: "Qarhan Salt Lake ×5" }, status: "estimate", cny: 400 },
        { id: "yadan", name: { zh: "水上雅丹 ×5", en: "Water Yadan ×5" }, status: "estimate", cny: 450 },
        { id: "emerald", name: { zh: "大柴旦翡翠湖 ×5", en: "Emerald Lakes ×5" }, status: "estimate", cny: 300 },
        { id: "mogao", name: { zh: "莫高窟 A 類票 ×5", en: "Mogao Type A ×5" }, status: "estimate", cny: 1190, note: { zh: "含數字展示中心 · 務必預約", en: "Includes digital center · must pre-book" } },
        { id: "mingsha", name: { zh: "鳴沙山月牙泉 ×5", en: "Mingsha & Crescent Spring ×5" }, status: "estimate", cny: 550, note: { zh: "駱駝另計", en: "Camel ride extra" } },
        { id: "jiayuguan", name: { zh: "嘉峪關關城 ×5", en: "Jiayuguan Fort ×5" }, status: "estimate", cny: 600 },
        { id: "danxia", name: { zh: "張掖七彩丹霞 ×5", en: "Zhangye Danxia ×5" }, status: "estimate", cny: 600 },
        { id: "zhuoer", name: { zh: "卓爾山／草原 ×5", en: "Zhuoer Shan / grassland ×5" }, status: "estimate", cny: 400 },
        { id: "taersi", name: { zh: "塔爾寺 ×5", en: "Kumbum Monastery ×5" }, status: "estimate", cny: 400 },
      ],
    },
    {
      id: "local",
      title: { zh: "當地預估（未付）", en: "On-trip estimates (not yet paid)" },
      items: [
        {
          id: "food",
          name: { zh: "餐飲（9 日 · 5 人）", en: "Meals (9 days · 5 pax)" },
          status: "estimate",
          cny: 9000,
          note: { zh: "約 CNY 200／人／日", en: "~CNY 200/person/day" },
        },
        {
          id: "misc",
          name: { zh: "伴手禮／乾果／日用品預留", en: "Souvenirs / dried fruit / sundries" },
          status: "estimate",
          cny: 2000,
        },
      ],
    },
  ],
};
