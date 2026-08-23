# 青甘大環線 2026 · 互動行程地圖

**Google My Maps 嵌入 + 右側行程列表**（免費，無需 Google Cloud API Key）

本地預覽：

```bash
cd /Users/sunny/Projects/qinggan_trip_2026
python3 -m http.server 8080
# http://localhost:8080
```

分享參數：
- `?day=3` — 第 3 天
- `?view=flowchart` — 路線圖
- `?lang=en` — English

行程：2026年9月24日–10月2日 · 5人自駕 · 蘭州 → 青海湖 → 茶卡 → 大柴旦 → 敦煌 → 嘉峪關 → 張掖 → 祁連 → 西寧 → 蘭州

---

## Google My Maps

已嵌入（`config.js`）：

- 嵌入：https://www.google.com/maps/d/embed?mid=1iKyD-JjYQy4CYJX6fsIqHrW_J8R-ruk
- 全屏：https://www.google.com/maps/d/viewer?mid=1iKyD-JjYQy4CYJX6fsIqHrW_J8R-ruk

KML 有改動時，在 My Maps 裡更新對應圖層即可。

---

## 網站用法

| 操作 | 說明 |
|------|------|
| Day 1–9 | 右側切換當天行程 |
| 「🗺️ 地圖定位」 | 左側聚焦該站點 |
| 「航班／預訂／費用／美食／行李」 | 對應面板；六段住宿已填店名地址，確認號／金額待補 |

---

## 文件說明

| 文件 | 說明 |
|------|------|
| `index.html` | 主頁面 |
| `app.js` | 行程 + 地圖交互 |
| `trip-data.js` | 行程數據 |
| `config.js` | My Maps 嵌入連結 |
| `qinggan-locations.kml` | 導入 My Maps |
| `qinggan-flowchart.html` | 手賬風流程圖 |

---

## 待補（貼上來即可寫入）

- PNR、座位、托運公斤（春秋 9C7395／9C7396 已填）
- 趙晨 9/24 抵達西寧曹家堡的航班號與時間
- 六段住宿確認號、房型、金額（店名地址已填）
- 莫高窟預約場次
- 租車車型／取還車點（目前按蘭州中川 7 座估算）
