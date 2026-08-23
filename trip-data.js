window.TRIP_DATA = {
  meta: {
    title: "青甘大環線 9日8夜",
    subtitle: "2026年9月24日–10月2日 · 5人 · 自駕",
    flights: [
      { date: "9/24", code: "9C7395", route: "廣州 06:30 → 蘭州 09:40" },
      { date: "10/2", code: "9C7396", route: "蘭州 21:00 → 廣州 00:15+1" },
    ],
  },
  regions: [
    {
      id: "qinggan",
      name: "青甘大環線",
      dates: "9/24 – 10/2",
      center: { lat: 38.25, lng: 98.4 },
      zoom: 6,
      dayColors: ["#1e88a8", "#c45c26", "#2e7d6f", "#6b4c9a", "#c9a227", "#c62828", "#4c7c3a", "#1565c0", "#8d4e2a"],
      inspirationUrl: "https://ticket.dunhuang.org.cn/",
      inspirationUrlAlt: "https://www.qhly.gov.cn/",
      inspirationUrlCity: "https://www.mogaoku.net/",
      days: [
        {
          id: "qinggan-d1",
          label: "Day 1 · 9/24",
          theme: "廣州早班 → 蘭州取車 → 青海湖二郎劍",
          stops: [
            { id: "q1-0", name: "廣州白雲國際機場 CAN", nameKo: "Guangzhou Baiyun", time: "04:30–06:30", desc: "春秋 9C7395 · 白雲 T3 · 廉航建議起飛前 2h 到場", transport: "✈️ 9C7395 06:30", lat: 23.3924, lng: 113.2988, skipMarker: true, mapsUrl: "https://www.google.com/maps/search/?api=1&query=广州白云国际机场" },
            { id: "q1-1", name: "蘭州中川國際機場 LHW", nameKo: "Lanzhou Zhongchuan", time: "09:40", desc: "9C7395 抵達中川 T3 · 取行李、租 7 座", transport: "✈️ 9C7395", lat: 36.5152, lng: 103.6208, mapsUrl: "https://www.google.com/maps/search/?api=1&query=兰州中川国际机场" },
            { id: "q1-2", name: "青海湖二郎劍景區", nameKo: "Erlangjian, Qinghai Lake", time: "15:00–18:30", desc: "環線第一站 · 南岸最經典觀湖點 · 趕日落倒影 · 海拔約 3,200m，下車慢走", transport: "🚗 自駕約 3.5–4.5h / 280km", lat: 36.578633, lng: 100.495767, mapsUrl: "https://www.google.com/maps/search/?api=1&query=青海湖二郎剑景区" },
            { id: "q1-3", name: "卡巴倉·措瓊諾日野奢民宿", nameKo: "Kabacang", time: "19:30+", desc: "江西溝鄉下社村 · 二郎劍約 10–15 分 · 製氧機／地暖 · 確認號見「預訂」", transport: "🚗 景區周邊", lat: 36.5835, lng: 100.468, bookingId: "hotel-qinghai", mapsUrl: "https://www.google.com/maps/search/?api=1&query=青海湖卡巴仓+措琼诺日+江西沟乡下社村" },
          ],
        },
        {
          id: "qinggan-d2",
          label: "Day 2 · 9/25",
          theme: "青海湖 → 茶卡鹽湖 → 德令哈經停 → 大柴旦",
          stops: [
            { id: "q2-1", name: "卡巴倉退房出發", nameKo: "Leave Kabacang", time: "08:00", desc: "退房後西行茶卡 · 可再補拍清晨湖面", transport: "—", lat: 36.5835, lng: 100.468, bookingId: "hotel-qinghai", skipMarker: true },
            { id: "q2-2", name: "茶卡鹽湖", nameKo: "Chaka Salt Lake", time: "10:00–12:00", desc: "天空之鏡 · 晴天出片 · 穿鞋套／白鞋 · 小火車可選 · 9月午後風大", transport: "🚗 約 2h / 150km", lat: 36.7528, lng: 99.0794, mapsUrl: "https://www.google.com/maps/search/?api=1&query=茶卡盐湖" },
            { id: "q2-3", name: "德令哈（經停午餐）", nameKo: "Delingha lunch stop", time: "14:30–15:30", desc: "柴達木東大門補給 · 加油、洗手間、午餐後續駛無人區", transport: "🚗 約 2.5h / 200km", lat: 37.3743, lng: 97.3701, mapsUrl: "https://www.google.com/maps/search/?api=1&query=德令哈市" },
            { id: "q2-4", name: "大柴旦麗呈翠星酒店", nameKo: "Rezen Cuixing", time: "18:00+", desc: "義海街 9 號 · 連住 2 晚 · 製氧機／加濕器", transport: "🚗 約 2h / 170km", lat: 37.8538, lng: 95.3688, bookingId: "hotel-dachaidan", mapsUrl: "https://www.google.com/maps/search/?api=1&query=大柴旦丽呈翠星酒店+义海街9号" },
          ],
        },
        {
          id: "qinggan-d3",
          label: "Day 3 · 9/26",
          theme: "察爾汗鹽湖 · 315 U 型公路 · 水上雅丹 · 回大柴旦",
          stops: [
            { id: "q3-1", name: "麗呈翠星出發", nameKo: "Leave Rezen", time: "07:00", desc: "超長趕路日 · 南下鹽湖再西出 315 · 備水、零食、滿油", transport: "—", lat: 37.8538, lng: 95.3688, bookingId: "hotel-dachaidan", skipMarker: true },
            { id: "q3-2", name: "察爾汗鹽湖", nameKo: "Qarhan Salt Lake", time: "09:00–10:15", desc: "中國最大鹽湖 · 鹽橋公路可駛湖面 · 別長時間停在未指定路段", transport: "🚗 約 1.5–2h 南下格爾木方向", lat: 36.814, lng: 95.3, mapsUrl: "https://www.google.com/maps/search/?api=1&query=察尔汗盐湖" },
            { id: "q3-3", name: "315 國道 U 型公路", nameKo: "G315 U-bend", time: "13:00–13:40", desc: "網紅天空之鏡彎道 · 指定觀景點停車 · 國道車速快勿佔道", transport: "🚗 經大柴旦再西行 G315", lat: 38.048, lng: 94.152, mapsUrl: "https://www.google.com/maps/search/?api=1&query=315国道U型公路" },
            { id: "q3-4", name: "水上雅丹（烏素特）", nameKo: "Water Yadan", time: "15:30–17:00", desc: "雅丹倒映湖面 · 9月水位仍可看 · 景區內無餐，自備補給", transport: "🚗 沿 G315 再西約 1.5–2h", lat: 37.53, lng: 93.48, mapsUrl: "https://www.google.com/maps/search/?api=1&query=乌素特水上雅丹" },
            { id: "q3-5", name: "返回麗呈翠星", nameKo: "Back to Rezen", time: "20:30+", desc: "原路東返同一酒店 · 無人區夜間注意疲勞駕駛", transport: "🚗 約 3–3.5h", lat: 37.8538, lng: 95.3688, bookingId: "hotel-dachaidan", mapsUrl: "https://www.google.com/maps/search/?api=1&query=大柴旦丽呈翠星酒店+义海街9号" },
          ],
        },
        {
          id: "qinggan-d4",
          label: "Day 4 · 9/27",
          theme: "翡翠湖 · 黑獨山 → 敦煌",
          stops: [
            { id: "q4-1", name: "大柴旦翡翠湖", nameKo: "Emerald Lakes", time: "08:00–10:00", desc: "鎮南鹽池群 · 蒂芙尼藍／祖母綠分層 · 電影取景地 · 穿鞋套", transport: "🚗 鎮內約 10–20 分", lat: 37.8389, lng: 95.3717, mapsUrl: "https://www.google.com/maps/search/?api=1&query=大柴旦翡翠湖" },
            { id: "q4-2", name: "黑獨山", nameKo: "Heidushan", time: "11:30–12:30", desc: "黑色火山岩丘 · 隔壁胭脂山粉紅對比 · 月球感航拍點 · 風大、訊號弱", transport: "🚗 約 1.5h 西北行", lat: 38.0247, lng: 94.8028, mapsUrl: "https://www.google.com/maps/search/?api=1&query=黑独山" },
            { id: "q4-3", name: "煌漠玥民宿 Moon Field", nameKo: "Moon Field", time: "17:30+", desc: "月牙泉鎮楊家橋三組 58 號 · 連住 2 晚 · 鳴沙山在旁邊", transport: "🚗 約 4–5h 入甘肅", lat: 40.095, lng: 94.682, bookingId: "hotel-dunhuang", mapsUrl: "https://www.google.com/maps/search/?api=1&query=煌漠玥民宿+月牙泉镇鸣山路杨家桥三组58号" },
          ],
        },
        {
          id: "qinggan-d5",
          label: "Day 5 · 9/28",
          theme: "莫高窟 + 鳴沙山月牙泉",
          stops: [
            { id: "q5-1", name: "莫高窟", nameKo: "Mogao Caves", time: "08:00–12:00", desc: "必提前在敦煌研究院預約 A 類票（實體窟+數字展示中心）· 現場極難補票 · 禁閃光／禁亂摸壁畫", transport: "🚗 月牙泉鎮東南約 25–35 分", lat: 40.0411, lng: 94.8097, bookingId: "mogao-ticket", mapsUrl: "https://www.google.com/maps/search/?api=1&query=莫高窟", infoUrl: "https://ticket.dunhuang.org.cn/" },
            { id: "q5-2", name: "敦煌市區午餐", nameKo: "Dunhuang lunch", time: "12:30–14:00", desc: "驢肉黃麵／趙記手工掛麵等 · 店名待補", transport: "🚗 莫高窟回城方向", lat: 40.142, lng: 94.662, mapsUrl: "https://www.google.com/maps/search/?api=1&query=敦煌+黄面", skipMarker: true },
            { id: "q5-3", name: "鳴沙山月牙泉", nameKo: "Mingsha Shan & Crescent Spring", time: "15:30–18:30", desc: "民宿就在月牙泉鎮 · 傍晚步行／短駛 · 可騎駱駝／滑沙 · 日落最美", transport: "🚶／🚗 民宿旁", lat: 40.0925, lng: 94.6694, mapsUrl: "https://www.google.com/maps/search/?api=1&query=鸣沙山月牙泉" },
          ],
        },
        {
          id: "qinggan-d6",
          label: "Day 6 · 9/29",
          theme: "敦煌 → 嘉峪關 → 張掖七彩丹霞",
          stops: [
            { id: "q6-1", name: "煌漠玥退房出發", nameKo: "Leave Moon Field", time: "08:00", desc: "月牙泉鎮退房東行河西走廊", transport: "—", lat: 40.095, lng: 94.682, bookingId: "hotel-dunhuang", skipMarker: true },
            { id: "q6-2", name: "嘉峪關關城", nameKo: "Jiayuguan Fort", time: "12:00–14:00", desc: "長城西端關城 · 關城＋城樓＋長城第一墩可選 · 中午日照強", transport: "🚗 約 4h / 380km", lat: 39.8015, lng: 98.216, mapsUrl: "https://www.google.com/maps/search/?api=1&query=嘉峪关关城" },
            { id: "q6-3", name: "張掖七彩丹霞", nameKo: "Zhangye Danxia", time: "16:30–18:30", desc: "世界地質公園 · 臨近日落層次最飽 · 景區車轉觀景台 · 勿翻越護欄", transport: "🚗 約 2.5–3h", lat: 38.91555, lng: 100.1332, mapsUrl: "https://www.google.com/maps/search/?api=1&query=张掖七彩丹霞" },
            { id: "q6-4", name: "望山國際大酒店（張掖西站店）", nameKo: "Wangshan Hotel", time: "19:30+", desc: "新墩鎮雙塔民俗文化村 2–3 號 · 近西站／高速西出口", transport: "🚗 丹霞約 40 分", lat: 38.911, lng: 100.395, bookingId: "hotel-zhangye", mapsUrl: "https://www.google.com/maps/search/?api=1&query=望山国际大酒店+张掖西站+双塔民俗文化村" },
          ],
        },
        {
          id: "qinggan-d7",
          label: "Day 7 · 9/30",
          theme: "張掖 → 祁連山草原 → 祁連縣",
          stops: [
            { id: "q7-1", name: "望山退房出發", nameKo: "Leave Wangshan", time: "09:00", desc: "經民樂、扁都口翻祁連山入青", transport: "—", lat: 38.911, lng: 100.395, bookingId: "hotel-zhangye", skipMarker: true },
            { id: "q7-2", name: "祁連山草原／卓爾山", nameKo: "Qilian Grassland / Zhuoer Shan", time: "12:30–16:00", desc: "扁都口草原＋卓爾山丹霞草原觀景 · 9月底草色轉金 · 風大備衝鋒衣", transport: "🚗 約 2.5–3h", lat: 38.196, lng: 100.238, mapsUrl: "https://www.google.com/maps/search/?api=1&query=祁连卓尔山" },
            { id: "q7-3", name: "祁連五礦國貿飯店", nameKo: "Minmetals Qilian", time: "17:00+", desc: "八寶鎮濱河路 · 縣城 1 晚 · 夜間可降至個位數", transport: "🚗 縣城內", lat: 38.1785, lng: 100.25, bookingId: "hotel-qilian", mapsUrl: "https://www.google.com/maps/search/?api=1&query=祁连五矿国贸饭店+八宝镇滨河路" },
          ],
        },
        {
          id: "qinggan-d8",
          label: "Day 8 · 10/1",
          theme: "崗什卡雪峰 → 門源 → 西寧（國慶）",
          stops: [
            { id: "q8-1", name: "五礦國貿退房出發", nameKo: "Leave Minmetals", time: "08:30", desc: "國慶首日 · 門源／西寧路段可能堵 · 早出發", transport: "—", lat: 38.1785, lng: 100.25, bookingId: "hotel-qilian", skipMarker: true },
            { id: "q8-2", name: "崗什卡雪峰觀景台", nameKo: "Gangshika Snow Peak", time: "10:00–11:30", desc: "祁連山主峰之一遠眺 · 沿祁連—門源公路 · 觀景台風大、紫外線強", transport: "🚗 約 1–1.5h", lat: 37.705, lng: 101.305, mapsUrl: "https://www.google.com/maps/search/?api=1&query=岗什卡雪峰观景台" },
            { id: "q8-3", name: "門源（午餐經停）", nameKo: "Menyuan stop", time: "13:00–14:00", desc: "油菜花季已過 · 縣城補給午餐後續駛西寧", transport: "🚗 約 1–1.5h", lat: 37.3766, lng: 101.6185, mapsUrl: "https://www.google.com/maps/search/?api=1&query=门源回族自治县" },
            { id: "q8-4", name: "記憶時光摩洛哥復古鏡民宿", nameKo: "Memory Time", time: "17:00+", desc: "城東中發源城市廣場 9 棟 26 樓 · 近東關 · 可走路吃釀皮甜醅", transport: "🚗 約 2–2.5h", lat: 36.6215, lng: 101.805, bookingId: "hotel-xining", mapsUrl: "https://www.google.com/maps/search/?api=1&query=中发源城市广场+西宁城东" },
          ],
        },
        {
          id: "qinggan-d9",
          label: "Day 9 · 10/2",
          theme: "西寧塔爾寺 → 9C7396 21:00 飛廣州",
          stops: [
            { id: "q9-1", name: "塔爾寺", nameKo: "Kumbum Monastery", time: "09:00–12:00", desc: "晚班機，上午從容參觀 · 藏傳佛教格魯派聖地 · 湟中 · 約 2–3h", transport: "🚗 西寧西南約 40 分", lat: 36.4883, lng: 101.5694, mapsUrl: "https://www.google.com/maps/search/?api=1&query=塔尔寺" },
            { id: "q9-2", name: "西寧市區午餐", nameKo: "Xining lunch", time: "12:30–14:00", desc: "釀皮／酸奶／手抓 · 晚班機不必趕", transport: "🚗 回城", lat: 36.6171, lng: 101.7782, skipMarker: true, mapsUrl: "https://www.google.com/maps/search/?api=1&query=西宁+酿皮" },
            { id: "q9-3", name: "蘭州中川國際機場 LHW", nameKo: "Lanzhou Zhongchuan", time: "18:30–21:00", desc: "西寧約 16:00 出發 · 還車 · 中川 T3 值機 · 9C7396 21:00 飛廣州（00:15+1 到白雲）", transport: "🚗 約 2–2.5h / 200km", lat: 36.5152, lng: 103.6208, mapsUrl: "https://www.google.com/maps/search/?api=1&query=兰州中川国际机场" },
          ],
        },
      ],
    },
  ],
};
