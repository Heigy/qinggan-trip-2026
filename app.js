/* global TRIP_DATA, MYMAPS_CONFIG, I18N, FLIGHT_DATA, BOOKING_DATA, FOOD_DATA, PACKING_DATA, WEATHER_DATA, COST_DATA */

const state = {
  regionId: "qinggan",
  dayIndex: 0,
  activeStopId: null,
  mapFocused: false,
  lang: "zh",
  theme: "light",
  view: "map",
  dayPlan: "a",
};

function readStoredTheme() {
  try {
    const saved = localStorage.getItem("trip-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch (_) {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

state.theme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : readStoredTheme();

const urlParams = new URLSearchParams(location.search);
if (urlParams.get("region") === "qinggan") state.regionId = "qinggan";
if (urlParams.get("day")) state.dayIndex = Math.max(0, parseInt(urlParams.get("day"), 10) - 1);
if (urlParams.get("lang") === "en") state.lang = "en";
else {
  try {
    if (localStorage.getItem("trip-lang") === "en") state.lang = "en";
  } catch (_) { /* private browsing */ }
}
if (urlParams.get("view") === "map") state.view = "map";
else if (urlParams.get("view") === "flights") state.view = "flights";
else if (urlParams.get("view") === "bookings") state.view = "bookings";
else if (urlParams.get("view") === "food") state.view = "food";
else if (urlParams.get("view") === "pack") state.view = "pack";
else if (urlParams.get("view") === "cost") state.view = "cost";
else if (urlParams.get("view") === "flowchart") state.view = "flowchart";
/* else keep default map */
if (urlParams.get("plan") === "b") state.dayPlan = "b";
else if (urlParams.get("plan") === "a") state.dayPlan = "a";
else {
  try {
    const savedPlan = localStorage.getItem("trip-day1-plan");
    if (savedPlan === "a" || savedPlan === "b") state.dayPlan = savedPlan;
  } catch (_) { /* private browsing */ }
}

/** China calendar date → region + day during the trip */
const TRIP_BY_DATE = {
  "2026-09-24": { regionId: "qinggan", dayIndex: 0 },
  "2026-09-25": { regionId: "qinggan", dayIndex: 1 },
  "2026-09-26": { regionId: "qinggan", dayIndex: 2 },
  "2026-09-27": { regionId: "qinggan", dayIndex: 3 },
  "2026-09-28": { regionId: "qinggan", dayIndex: 4 },
  "2026-09-29": { regionId: "qinggan", dayIndex: 5 },
  "2026-09-30": { regionId: "qinggan", dayIndex: 6 },
  "2026-10-01": { regionId: "qinggan", dayIndex: 7 },
  "2026-10-02": { regionId: "qinggan", dayIndex: 8 },
};

function chinaDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getTodayTrip() {
  return TRIP_BY_DATE[chinaDateKey()] || null;
}

function applyTodayTrip({ force = false } = {}) {
  const today = getTodayTrip();
  if (!today) return false;
  const urlHasDay = urlParams.has("day");
  const urlHasRegion = urlParams.has("region");
  if (!force && (urlHasDay || urlHasRegion)) return false;
  state.regionId = today.regionId;
  state.dayIndex = today.dayIndex;
  state.activeStopId = null;
  state.mapFocused = false;
  return true;
}

if (!applyTodayTrip()) {
  /* keep URL / defaults */
}

function isDark() {
  return state.theme === "dark";
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", isDark() ? "dark" : "light");
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.innerHTML = isDark()
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.setAttribute("aria-label", ui(isDark() ? "themeLight" : "themeDark"));
  }
}

function toggleTheme() {
  state.theme = isDark() ? "light" : "dark";
  try {
    localStorage.setItem("trip-theme", state.theme);
  } catch (_) {}
  applyTheme();
}

function isEn() {
  return state.lang === "en";
}

function ui(key) {
  const item = I18N.ui[key];
  if (!item) return key;
  if (typeof item === "function") return item;
  return isEn() ? item.en : item.zh;
}

function uiFn(key, arg) {
  const item = I18N.ui[key];
  const fn = isEn() ? item.en : item.zh;
  return typeof fn === "function" ? fn(arg) : fn;
}

function getMeta() {
  const base = TRIP_DATA.meta;
  if (!isEn() || !I18N.meta.en) return base;
  return { ...base, ...I18N.meta.en };
}

function getRegion() {
  const region = TRIP_DATA.regions.find((r) => r.id === state.regionId);
  if (!isEn()) return region;
  const en = I18N.regions[region.id]?.en;
  return en ? { ...region, ...en } : region;
}

function getDayRaw() {
  const day = TRIP_DATA.regions.find((r) => r.id === state.regionId).days[state.dayIndex];
  if (!day?.plans) return day;
  const planId = day.plans[state.dayPlan] ? state.dayPlan : day.defaultPlan || "a";
  const plan = day.plans[planId];
  return {
    ...day,
    activePlanId: planId,
    theme: plan.theme || day.theme,
    planName: plan.name,
    planBlurb: plan.blurb,
    stops: plan.stops,
  };
}

function getDay() {
  const day = getDayRaw();
  const planName = day.planName ? locField(day.planName) : null;
  const planBlurb = day.planBlurb ? locField(day.planBlurb) : null;
  const planTheme =
    day.plans && day.theme != null
      ? typeof day.theme === "object"
        ? locField(day.theme)
        : day.theme
      : null;

  if (!isEn()) {
    return {
      ...day,
      theme: planTheme || day.theme,
      planName,
      planBlurb,
    };
  }
  const en = I18N.days[day.id]?.en;
  const merged = en ? { ...day, ...en } : { ...day };
  if (planTheme) merged.theme = planTheme;
  return { ...merged, planName, planBlurb };
}

function setDayPlan(planId) {
  state.dayPlan = planId === "b" ? "b" : "a";
  state.activeStopId = null;
  state.mapFocused = false;
  try {
    localStorage.setItem("trip-day1-plan", state.dayPlan);
  } catch (_) {}
  updateUrl();
  renderAll();
}

function localizeStop(stop) {
  if (!isEn()) return stop;
  const en = I18N.stops[stop.id]?.en;
  return en ? { ...stop, ...en } : stop;
}

function getMyMapsConfig(regionId) {
  return (window.MYMAPS_CONFIG || {})[regionId] || {};
}

function extractMapMid(url) {
  if (!url) return "";
  try {
    return new URL(url).searchParams.get("mid") || "";
  } catch (_) {
    const m = String(url).match(/[?&]mid=([^&]+)/);
    return m ? decodeURIComponent(m[1]) : "";
  }
}

function isConfigured(url) {
  return url && !url.includes("YOUR_") && url.startsWith("http");
}

function hasDedicatedMyMap(regionId) {
  const cfg = getMyMapsConfig(regionId);
  return isConfigured(cfg.embedUrl);
}

function flowchartPage() {
  return "qinggan-flowchart.html?v=9";
}

function isMapView() {
  return state.view === "map";
}

function isFlowchartView() {
  return state.view === "flowchart";
}

function isFlightsView() {
  return state.view === "flights";
}

function isBookingsView() {
  return state.view === "bookings";
}

function isFoodView() {
  return state.view === "food";
}

function isPackView() {
  return state.view === "pack";
}

function isCostView() {
  return state.view === "cost";
}

function setView(view) {
  if (view === "flowchart") state.view = "flowchart";
  else if (view === "flights") state.view = "flights";
  else if (view === "bookings") state.view = "bookings";
  else if (view === "food") state.view = "food";
  else if (view === "pack") state.view = "pack";
  else if (view === "cost") state.view = "cost";
  else state.view = "map";
  if (state.view !== "map") {
    state.mapFocused = false;
    state.activeStopId = null;
  }
  updateUrl();
  renderAll();
}

function locField(obj) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return isEn() ? obj.en : obj.zh;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Mask order / PNR / phone for public display. Keep last 4 when long enough. */
function maskSecret(value) {
  const s = String(value || "").trim();
  if (!s) return "";
  if (s.length <= 4) return "••••";
  if (s.length <= 6) return `${s.slice(0, 1)}••••${s.slice(-1)}`;
  if (s.length <= 10) return `${s.slice(0, 2)}••••${s.slice(-2)}`;
  return `${s.slice(0, 4)}••••${s.slice(-4)}`;
}

function secretsRevealed() {
  try {
    return sessionStorage.getItem("trip-reveal-secrets") === "1";
  } catch (_) {
    return false;
  }
}

function setSecretsRevealed(on) {
  try {
    if (on) sessionStorage.setItem("trip-reveal-secrets", "1");
    else sessionStorage.removeItem("trip-reveal-secrets");
  } catch (_) {}
}

function displaySecret(value) {
  return secretsRevealed() ? String(value || "") : maskSecret(value);
}

function secretsToggleHtml() {
  const on = secretsRevealed();
  return `<button type="button" class="map-btn secrets-toggle" data-secrets-toggle="1">${
    on ? ui("hideSecrets") : ui("revealSecrets")
  }</button>`;
}

function wireSecretsToggle(root) {
  root?.querySelectorAll("[data-secrets-toggle]")?.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      setSecretsRevealed(!secretsRevealed());
      if (isFlightsView()) renderFlightsPanel();
      else if (isBookingsView()) renderBookingsPanel();
    });
  });
}

async function copyText(text) {
  const value = String(text || "").trim();
  if (!value) return false;
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch (_) {
    try {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (_) {
      return false;
    }
  }
}

function showCopyToast(msg) {
  let el = document.getElementById("copy-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "copy-toast";
    el.className = "copy-toast";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(showCopyToast._t);
  showCopyToast._t = setTimeout(() => el.classList.remove("show"), 1400);
}

function copyableValue(label, value, { sensitive = false } = {}) {
  if (!value) return "";
  const shown = sensitive ? displaySecret(value) : String(value);
  const copyVal = sensitive && !secretsRevealed() ? shown : String(value);
  const safeShown = escapeHtml(shown);
  const safeCopy = escapeHtml(copyVal);
  return `<div class="booking-meta-row">
    <span>${label}</span>
    <span class="copy-value-wrap">
      <strong class="copy-target${sensitive && !secretsRevealed() ? " is-masked" : ""}">${safeShown}</strong>
      <button type="button" class="copy-btn" data-copy="${safeCopy}" title="${ui("copy")}">${ui("copy")}</button>
    </span>
  </div>`;
}

function wireCopyButtons(root) {
  root?.querySelectorAll(".copy-btn[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const ok = await copyText(btn.dataset.copy);
      if (ok) {
        const prev = btn.textContent;
        btn.textContent = ui("copied");
        btn.classList.add("copied");
        showCopyToast(ui("copied"));
        setTimeout(() => {
          btn.textContent = prev;
          btn.classList.remove("copied");
        }, 1200);
      }
    });
  });
}

function jumpToToday() {
  if (!applyTodayTrip({ force: true })) {
    showCopyToast(ui("todayOffTrip"));
    return;
  }
  updateUrl();
  renderAll();
}

function renderFlightsPanel() {
  const root = document.getElementById("flights-content");
  if (!root || !window.FLIGHT_DATA) return;

  const passengers = FLIGHT_DATA.passengers
    .map((p) => `<span class="flight-pax">${p.surname} ${p.given}</span>`)
    .join("");

  const cards = FLIGHT_DATA.flights
    .map((f) => {
      const seats = f.seats
        .map((s) => {
          const bag =
            s.bag && s.bag !== "shared rule"
              ? `<span class="seat-bag">${ui("flightBag")} ${s.bag}</span>`
              : s.bag === "shared rule"
                ? ""
                : `<span class="seat-bag muted">${ui("flightNoBag")}</span>`;
          return `<li><strong>${s.name}</strong><span class="seat-no">${s.seat}</span>${bag}</li>`;
        })
        .join("");

      return `
      <article class="flight-card">
        <div class="flight-card-top">
          <div>
            <p class="flight-date">${locField(f.dateLabel)}</p>
            <h3 class="flight-no">${f.flightNo}</h3>
            <p class="flight-airline">${locField(f.airline)} · ${locField(f.cabin)}${f.fareClass ? ` · ${f.fareClass}` : ""}</p>
          </div>
          <div class="flight-pnr-box">
            <span class="flight-pnr-label">${ui("flightPnr")}</span>
            <button type="button" class="flight-pnr copy-btn${secretsRevealed() ? "" : " is-masked"}" data-copy="${escapeHtml(secretsRevealed() ? f.pnr : maskSecret(f.pnr))}" title="${ui("copy")}">${escapeHtml(displaySecret(f.pnr))}</button>
          </div>
        </div>
        <div class="flight-route">
          <div class="flight-endpoint">
            <span class="flight-time">${f.depart}</span>
            <span class="flight-code">${f.from.code}</span>
            <span class="flight-airport">${locField(f.from)}</span>
          </div>
          <div class="flight-arrow" aria-hidden="true">→</div>
          <div class="flight-endpoint">
            <span class="flight-time">${f.arrive}</span>
            <span class="flight-code">${f.to.code}</span>
            <span class="flight-airport">${locField(f.to)}</span>
          </div>
        </div>
        <p class="flight-tip"><strong>${ui("flightCheckIn")}</strong> ${locField(f.checkInHint)}</p>
        <p class="flight-tip"><strong>${ui("flightCarry")}</strong> ${locField(f.bagCarry)}</p>
        <div class="flight-seats">
          <h4>${ui("flightSeats")}</h4>
          <ul>${seats}</ul>
        </div>
      </article>`;
    })
    .join("");

  root.innerHTML = `
    <div class="flights-intro">
      <div class="secrets-intro-row">
        <div>
          <h2>${ui("flightsOverview")}</h2>
          <p class="flights-pax-label">${ui("flightPassengers")} · ${ui("secretsHint")}</p>
        </div>
        ${secretsToggleHtml()}
      </div>
      <div class="flight-pax-row">${passengers}</div>
    </div>
    ${cards}`;

  wireCopyButtons(root);
  wireSecretsToggle(root);
}

function findDayIndexById(regionId, dayId) {
  const region = TRIP_DATA.regions.find((r) => r.id === regionId);
  if (!region) return 0;
  const idx = region.days.findIndex((d) => d.id === dayId);
  return idx >= 0 ? idx : 0;
}

function openBookingDay(booking) {
  if (!booking) return;
  state.regionId = booking.region || "qinggan";
  state.dayIndex = findDayIndexById(state.regionId, booking.dayId);
  state.view = "map";
  state.mapFocused = false;
  state.activeStopId = booking.stopIds?.[0] || null;
  updateUrl();
  renderAll();
  if (state.activeStopId) focusStop(state.activeStopId);
}

function renderBookingsPanel() {
  const root = document.getElementById("bookings-content");
  if (!root || !window.BOOKING_DATA) return;

  const cards = BOOKING_DATA.bookings
    .map((b) => {
      const rows = [
        `<div class="booking-meta-row"><span>${ui("bookingPlatform")}</span><strong>${escapeHtml(b.platform || "")}</strong></div>`,
        copyableValue(ui("bookingOrder"), b.orderNo, { sensitive: true }),
        b.voucherNo ? copyableValue(ui("bookingVoucher"), b.voucherNo, { sensitive: true }) : "",
        `<div class="booking-meta-row"><span>${ui("bookingQty")}</span><strong>${escapeHtml(locField(b.qty))}</strong></div>`,
        b.lead ? copyableValue(ui("bookingLead"), b.lead) : "",
        b.amount
          ? `<div class="booking-meta-row"><span>${ui("bookingAmount")}</span><strong>${escapeHtml(b.amount)}</strong></div>`
          : "",
        copyableValue(ui("bookingAddress"), locField(b.address)),
        b.phone ? copyableValue(ui("bookingPhone"), b.phone) : "",
      ].join("");

      const travelers = (b.travelers || [])
        .map((name) => `<span class="flight-pax">${escapeHtml(name)}</span>`)
        .join("");

      const web = b.website
        ? `<a class="booking-web" href="${b.website}" target="_blank" rel="noopener">${ui("bookingWebsite")}</a>`
        : "";

      return `
      <article class="booking-card" data-booking-id="${b.id}">
        <div class="booking-card-top">
          <div>
            <p class="flight-date">${locField(b.dateLabel)} · ${locField(b.time)}</p>
            <h3 class="booking-title">${locField(b.title)}</h3>
            ${b.titleKo ? `<p class="booking-ko">${b.titleKo}</p>` : ""}
          </div>
          <span class="booking-status">${b.status === "pending" ? ui("bookingPending") : ui("bookingConfirmed")}</span>
        </div>
        <div class="booking-meta">${rows}</div>
        <p class="flight-tip"><strong>${ui("bookingHow")}</strong> ${locField(b.howToUse)}</p>
        ${b.note ? `<p class="flight-tip muted-tip">${locField(b.note)}</p>` : ""}
        ${travelers ? `<div class="flight-pax-row booking-pax">${travelers}</div>` : ""}
        <div class="booking-actions">
          <button type="button" class="booking-open-day" data-booking-id="${b.id}">${ui("bookingOpenDay")}</button>
          ${web}
        </div>
      </article>`;
    })
    .join("");

  root.innerHTML = `
    <div class="flights-intro">
      <div class="secrets-intro-row">
        <div>
          <h2>${ui("bookingsOverview")}</h2>
          <p class="flights-pax-label">${ui("bookingsHint")} · ${ui("secretsHint")}</p>
        </div>
        ${secretsToggleHtml()}
      </div>
    </div>
    ${cards}`;

  root.querySelectorAll(".booking-open-day").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const booking = BOOKING_DATA.bookings.find((x) => x.id === btn.dataset.bookingId);
      openBookingDay(booking);
    });
  });
  wireCopyButtons(root);
  wireSecretsToggle(root);
}

function openExternalPage(url) {
  if (!url) return;
  const absolute = /^https?:\/\//i.test(url) ? url : new URL(url, location.href).href;
  const win = window.open(absolute, "_blank", "noopener,noreferrer");
  if (!win) location.assign(absolute);
}

function wireOpenButtons(root = document) {
  root.querySelectorAll("[data-open]").forEach((el) => {
    if (el.dataset.openBound) return;
    el.dataset.openBound = "1";
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openExternalPage(el.getAttribute("data-open") || el.href);
    });
  });
}

function foodMapsUrl(place) {
  const q = place.maps || place.address || locField(place.name);
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

function renderFoodPanel() {
  const root = document.getElementById("food-content");
  if (!root || !window.FOOD_DATA) return;

  const cards = FOOD_DATA.places
    .map((p) => {
      const badge = p.onItinerary
        ? `<span class="food-badge">${ui("foodOnTrip")}</span>`
        : "";
      const note = p.note ? `<p class="food-note">${locField(p.note)}</p>` : "";
      const dayHint = p.dayHint ? `<p class="food-day">${locField(p.dayHint)}</p>` : "";
      return `
      <article class="food-card${p.onItinerary ? " on-trip" : ""}">
        <div class="food-card-top">
          <div>
            <p class="food-cat">${locField(p.category)} · ${locField(p.area)}</p>
            <h3 class="food-title">${locField(p.name)}${badge}</h3>
            ${p.nameKo ? `<p class="food-ko">${p.nameKo}</p>` : ""}
          </div>
        </div>
        <p class="food-address">${p.address}</p>
        ${note}
        ${dayHint}
        <div class="food-actions">
          <a class="food-maps" href="${foodMapsUrl(p)}" target="_blank" rel="noopener noreferrer">${ui("foodMaps")}</a>
        </div>
      </article>`;
    })
    .join("");

  root.innerHTML = `
    <div class="flights-intro">
      <h2>${ui("foodOverview")}</h2>
      <p class="flights-pax-label">${ui("foodHint")}</p>
    </div>
    <div class="food-grid">${cards}</div>`;
}

const PACK_STORAGE_KEY = "trip-packing-checked";

function loadPackChecked() {
  try {
    const raw = localStorage.getItem(PACK_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_) {
    return {};
  }
}

function savePackChecked(map) {
  try {
    localStorage.setItem(PACK_STORAGE_KEY, JSON.stringify(map));
  } catch (_) { /* private browsing */ }
}

function packingStats(checked) {
  const items = (PACKING_DATA?.categories || []).flatMap((c) => c.items);
  const total = items.length;
  const done = items.filter((it) => checked[it.id]).length;
  return { total, done };
}

function renderPackPanel() {
  const root = document.getElementById("pack-content");
  if (!root || !window.PACKING_DATA) return;

  const checked = loadPackChecked();
  const { total, done } = packingStats(checked);

  const cols = PACKING_DATA.categories
    .map((cat) => {
      const list = cat.items
        .map((it) => {
          const on = Boolean(checked[it.id]);
          return `
          <label class="pack-item${on ? " checked" : ""}">
            <input type="checkbox" data-pack-id="${it.id}" ${on ? "checked" : ""} />
            <span>${escapeHtml(locField(it.label))}</span>
          </label>`;
        })
        .join("");
      return `
      <section class="pack-col">
        <h3 class="pack-col-title">${escapeHtml(locField(cat.title))}</h3>
        <div class="pack-list">${list}</div>
      </section>`;
    })
    .join("");

  root.innerHTML = `
    <div class="flights-intro pack-intro">
      <div>
        <h2>${ui("packOverview")}</h2>
        <p class="flights-pax-label">${ui("packHint")}</p>
      </div>
      <div class="pack-toolbar">
        <span class="pack-progress">${ui("packProgress")} ${done}/${total}</span>
        <button type="button" class="map-btn" id="pack-reset">${ui("packReset")}</button>
      </div>
    </div>
    <div class="pack-grid">${cols}</div>`;

  root.querySelectorAll("input[data-pack-id]").forEach((input) => {
    input.addEventListener("change", () => {
      const map = loadPackChecked();
      if (input.checked) map[input.dataset.packId] = true;
      else delete map[input.dataset.packId];
      savePackChecked(map);
      renderPackPanel();
    });
  });

  root.querySelector("#pack-reset")?.addEventListener("click", () => {
    savePackChecked({});
    renderPackPanel();
  });
}

function formatMoneyHkd(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return `HK$ ${Number(n).toLocaleString(isEn() ? "en-US" : "zh-HK", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatMoneyCny(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return `CNY ${Number(n).toLocaleString(isEn() ? "en-US" : "zh-HK", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function formatMoneyKrw(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return `₩${Math.round(Number(n)).toLocaleString(isEn() ? "en-US" : "zh-HK")}`;
}

function itemToHkd(item, fx) {
  if (item.hkd != null) return Number(item.hkd);
  if (item.cny != null && fx?.cnyToHkd) return Number(item.cny) * fx.cnyToHkd;
  if (item.krw != null && fx?.krwPerHkd) return Number(item.krw) / fx.krwPerHkd;
  return null;
}

function costStatusLabel(status) {
  if (status === "paid") return ui("costPaid");
  if (status === "estimate") return ui("costEstimate");
  return ui("costTbd");
}

function renderCostPanel() {
  const root = document.getElementById("cost-content");
  if (!root || !window.COST_DATA) return;

  const data = COST_DATA;
  const fx = data.fx || { cnyToHkd: 1.08, krwPerHkd: 175 };
  const people = data.people || 1;
  const items = (data.categories || []).flatMap((c) => c.items.map((it) => ({ ...it, catId: c.id })));

  let paidHkd = 0;
  let estimateHkd = 0;
  let tbdCount = 0;
  items.forEach((it) => {
    const hkd = itemToHkd(it, fx);
    if (it.status === "paid" && hkd != null) paidHkd += hkd;
    else if (it.status === "estimate" && hkd != null) estimateHkd += hkd;
    else if (it.status === "tbd") tbdCount += 1;
  });
  const perPaid = paidHkd / people;
  const perEst = (paidHkd + estimateHkd) / people;

  const sections = (data.categories || [])
    .map((cat) => {
      const rows = cat.items
        .map((it) => {
          const hkd = itemToHkd(it, fx);
          const amountHtml =
            it.status === "tbd"
              ? `<span class="cost-tbd">${ui("costTbd")}</span>`
              : [
                  hkd != null ? `<strong>${formatMoneyHkd(hkd)}</strong>` : "",
                  it.cny != null ? `<span class="cost-fx">${formatMoneyCny(it.cny)}</span>` : "",
                  it.krw != null ? `<span class="cost-krw">${formatMoneyKrw(it.krw)}</span>` : "",
                ]
                  .filter(Boolean)
                  .join(" ");
          return `<div class="cost-row status-${escapeHtml(it.status)}">
            <div class="cost-row-main">
              <span class="cost-status">${costStatusLabel(it.status)}</span>
              <div>
                <div class="cost-name">${escapeHtml(locField(it.name))}</div>
                ${it.note ? `<div class="cost-note">${escapeHtml(locField(it.note))}</div>` : ""}
              </div>
            </div>
            <div class="cost-amount">${amountHtml}</div>
          </div>`;
        })
        .join("");
      return `<section class="cost-section">
        <h3 class="cost-section-title">${escapeHtml(locField(cat.title))}</h3>
        <div class="cost-rows">${rows}</div>
      </section>`;
    })
    .join("");

  root.innerHTML = `
    <div class="flights-intro">
      <h2>${ui("costOverview")}</h2>
      <p class="flights-pax-label">${ui("costHint")} · ${escapeHtml(locField(fx.note))}</p>
    </div>
    <div class="cost-summary">
      <div class="cost-stat">
        <span class="cost-stat-label">${ui("costPaidTotal")}</span>
        <strong class="cost-stat-value">${formatMoneyHkd(paidHkd)}</strong>
        <span class="cost-stat-sub">${ui("costPerPerson")} ${formatMoneyHkd(perPaid)}</span>
      </div>
      <div class="cost-stat estimate">
        <span class="cost-stat-label">${ui("costEstimateTotal")}</span>
        <strong class="cost-stat-value">${formatMoneyHkd(estimateHkd)}</strong>
        <span class="cost-stat-sub">${ui("costPaidPlusEst")} ${formatMoneyHkd(paidHkd + estimateHkd)} · ${ui("costPerPerson")} ${formatMoneyHkd(perEst)}</span>
      </div>
      <div class="cost-stat tbd">
        <span class="cost-stat-label">${ui("costTbdTotal")}</span>
        <strong class="cost-stat-value">${tbdCount}</strong>
        <span class="cost-stat-sub">${ui("costTbdHint")}</span>
      </div>
    </div>
    ${sections}`;
}

function applyView() {
  const mapPanel = document.getElementById("map-panel");
  const flowPanel = document.getElementById("flowchart-panel");
  const flightsPanel = document.getElementById("flights-panel");
  const bookingsPanel = document.getElementById("bookings-panel");
  const foodPanel = document.getElementById("food-panel");
  const packPanel = document.getElementById("pack-panel");
  const costPanel = document.getElementById("cost-panel");
  const restoreBtn = document.getElementById("map-restore");
  const externalLink = document.getElementById("map-open-external");
  const label = document.getElementById("map-mode-label");

  document.body.classList.toggle("view-flights", isFlightsView());
  document.body.classList.toggle("view-bookings", isBookingsView());
  document.body.classList.toggle("view-food", isFoodView());
  document.body.classList.toggle("view-pack", isPackView());
  document.body.classList.toggle("view-cost", isCostView());
  document.body.classList.toggle("view-flowchart", isFlowchartView());
  document.body.classList.toggle("view-map", isMapView());

  document.querySelectorAll("#view-tabs button[data-view]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === state.view);
    const key =
      btn.dataset.view === "map"
        ? "viewMap"
        : btn.dataset.view === "flowchart"
          ? "viewFlowchart"
          : btn.dataset.view === "bookings"
            ? "viewBookings"
            : btn.dataset.view === "food"
              ? "viewFood"
              : btn.dataset.view === "pack"
                ? "viewPack"
                : btn.dataset.view === "cost"
                  ? "viewCost"
                  : "viewFlights";
    btn.textContent = ui(key);
  });

  mapPanel?.classList.toggle("active", isMapView());
  flowPanel?.classList.toggle("active", isFlowchartView());
  flightsPanel?.classList.toggle("active", isFlightsView());
  bookingsPanel?.classList.toggle("active", isBookingsView());
  foodPanel?.classList.toggle("active", isFoodView());
  packPanel?.classList.toggle("active", isPackView());
  costPanel?.classList.toggle("active", isCostView());

  if (isMapView()) {
    externalLink.hidden = false;
    externalLink.textContent = ui("mapFullscreen");
    const myMaps = getMyMapsConfig(state.regionId);
    externalLink.href = isConfigured(myMaps.viewUrl) ? myMaps.viewUrl : "https://www.google.com/maps/d/";
    if (!state.mapFocused) label.textContent = ui("mapOverview");
  } else if (isFlowchartView()) {
    restoreBtn.hidden = true;
    externalLink.hidden = false;
    label.textContent = ui("flowchartOverview");
    externalLink.textContent = ui("flowchartFullscreen");
    externalLink.href = flowchartPage();
    const frame = document.getElementById("flowchart-frame");
    if (frame) {
      frame.title = ui("iframeFlowchart");
      const src = flowchartPage();
      const needsLoad = !frame.getAttribute("src")?.includes(src);
      if (needsLoad) {
        frame.onload = () => resizeFlowchartFrame(frame);
        frame.src = src;
      } else {
        resizeFlowchartFrame(frame);
      }
    }
  } else if (isBookingsView()) {
    restoreBtn.hidden = true;
    externalLink.hidden = true;
    label.textContent = ui("bookingsOverview");
    renderBookingsPanel();
  } else if (isCostView()) {
    restoreBtn.hidden = true;
    externalLink.hidden = true;
    label.textContent = ui("costOverview");
    renderCostPanel();
  } else if (isFoodView()) {
    restoreBtn.hidden = true;
    externalLink.hidden = true;
    label.textContent = ui("foodOverview");
    renderFoodPanel();
  } else if (isPackView()) {
    restoreBtn.hidden = true;
    externalLink.hidden = true;
    label.textContent = ui("packOverview");
    renderPackPanel();
  } else {
    restoreBtn.hidden = true;
    externalLink.hidden = true;
    label.textContent = ui("flightsOverview");
    renderFlightsPanel();
  }
}

function resizeFlowchartFrame(frame) {
  const el = frame || document.getElementById("flowchart-frame");
  if (!el) return;
  const fit = () => {
    try {
      const doc = el.contentDocument || el.contentWindow?.document;
      if (!doc) return;
      const body = doc.body;
      const html = doc.documentElement;
      const h = Math.max(
        body?.scrollHeight || 0,
        body?.offsetHeight || 0,
        html?.scrollHeight || 0,
        html?.offsetHeight || 0,
        800
      );
      el.style.height = `${h + 24}px`;
    } catch (_) {
      el.style.height = "1600px";
    }
  };
  fit();
  // Images in flowchart load late — remeasure a few times
  setTimeout(fit, 300);
  setTimeout(fit, 1000);
  setTimeout(fit, 2500);
}

function mapsHl() {
  return isEn() ? "en" : "zh-TW";
}

function placeEmbedUrl(stop) {
  const s = localizeStop(stop);
  const name = encodeURIComponent(s.name || "Pin");
  const lat = Number(stop.lat);
  const lng = Number(stop.lng);
  // Coordinate query reliably draws a red pin in the free embed iframe.
  // CID-only embeds often open place details without a clear map marker.
  return `https://maps.google.com/maps?q=${name}@${lat},${lng}&ll=${lat},${lng}&z=17&hl=${mapsHl()}&output=embed`;
}

function stopMapsUrl(stop) {
  if (stop.mapsUrl) return stop.mapsUrl;
  if (stop.cid) return `https://maps.google.com/?cid=${stop.cid}`;
  return `https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`;
}

function stopDirectionsUrl(stop) {
  return `https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}&travelmode=driving`;
}

function streetAddress(value) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  return String((isEn() ? value.en : value.zh) || value.zh || value.en || "").trim();
}

function copyAddressText(value) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  return String(value.zh || value.en || "").trim();
}

function stopStreetAddress(rawStop) {
  const own = streetAddress(rawStop.address);
  if (own) return own;
  const booking = typeof window.bookingForStop === "function" ? window.bookingForStop(rawStop.id) : null;
  return streetAddress(booking?.address);
}

function stopCopyAddress(rawStop) {
  const own = copyAddressText(rawStop.address);
  if (own) return own;
  const booking = typeof window.bookingForStop === "function" ? window.bookingForStop(rawStop.id) : null;
  const fromBooking = copyAddressText(booking?.address);
  if (fromBooking) return fromBooking;
  try {
    const q = new URL(stopMapsUrl(rawStop), "https://www.google.com").searchParams.get("query");
    if (q) return q.trim();
  } catch (_) {}
  return "";
}

function directionsUrl(stops) {
  const pts = stops.filter((s) => !s.skipMarker && !s.optional);
  if (pts.length < 2) return null;
  const origin = `${pts[0].lat},${pts[0].lng}`;
  const dest = `${pts[pts.length - 1].lat},${pts[pts.length - 1].lng}`;
  const waypoints = pts.slice(1, -1).map((s) => `${s.lat},${s.lng}`).join("|");
  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=driving`;
  if (waypoints) url += `&waypoints=${waypoints}`;
  return url;
}

function setMapFrameSrc(src, force) {
  const frame = document.getElementById("map-frame");
  if (!frame) return;
  if (!force && frame.getAttribute("src") === src) return;
  frame.src = src;
}

function applyStaticUi() {
  applyTheme();
  document.documentElement.lang = isEn() ? "en" : "zh-Hant";
  document.title = isEn()
    ? "Qinghai–Gansu Grand Loop 2026 · Interactive Trip Map"
    : "青甘大環線 2026 · 互動行程地圖";

  document.getElementById("map-restore").textContent = ui("mapRestore");
  document.getElementById("map-open-external").textContent = ui("mapFullscreen");
  document.getElementById("day-directions").textContent = ui("dayRoute");
  document.getElementById("map-frame").title = ui("iframeTitle");

  const regionQinggan = document.querySelector('[data-region="qinggan"]');
  if (regionQinggan) regionQinggan.textContent = ui("regionQinggan");

  document.querySelectorAll(".lang-tabs button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === state.lang);
  });
}

function updateMapSetupCopy() {
  const setup = document.getElementById("map-setup");
  if (!setup) return;
  const h3 = setup.querySelector("h3");
  const intro = setup.querySelector(".setup-intro");
  const note = setup.querySelector(".setup-note");
  const kmlHint = setup.querySelector(".setup-kml");
  if (h3) h3.textContent = ui("setupTitle");
  if (intro) intro.textContent = ui("setupIntro");
  if (kmlHint) kmlHint.innerHTML = ui("setupKmlQinggan");
  if (note) note.textContent = ui("setupNote");
}

function hideFocusBadge() {
  const badge = document.getElementById("map-focus-badge");
  if (badge) badge.hidden = true;
}

function showFocusBadge(stop) {
  const badge = document.getElementById("map-focus-badge");
  const nameEl = document.getElementById("map-focus-name");
  const metaEl = document.getElementById("map-focus-meta");
  const linkEl = document.getElementById("map-focus-open");
  if (!badge || !nameEl || !metaEl || !linkEl) return;

  const s = localizeStop(stop);
  nameEl.textContent = s.name;
  const bits = [s.time, stop.nameKo].filter(Boolean);
  metaEl.textContent = bits.join(" · ");
  linkEl.href = stopMapsUrl(stop);
  linkEl.textContent = ui("googleMaps");
  badge.hidden = false;
}

function showMyMapsOverview() {
  if (!isMapView()) return;
  const cfg = getMyMapsConfig(state.regionId);
  state.mapFocused = false;
  state.activeStopId = null;

  document.getElementById("map-restore").hidden = true;
  document.getElementById("map-mode-label").textContent = ui("mapOverview");
  hideFocusBadge();

  const setup = document.getElementById("map-setup");
  const frame = document.getElementById("map-frame");
  updateMapSetupCopy();

  if (!hasDedicatedMyMap(state.regionId)) {
    setup.classList.add("visible");
    frame.style.visibility = "hidden";
    frame.removeAttribute("src");
    return;
  }

  setup.classList.remove("visible");
  frame.style.visibility = "visible";
  setMapFrameSrc(cfg.embedUrl, true);
}

function renderSidebar() {
  const region = getRegion();
  const day = getDay();
  const visibleStops = day.stops.filter((s) => !s.skipMarker);
  const color = region.dayColors[state.dayIndex];
  const myMaps = getMyMapsConfig(state.regionId);

  document.getElementById("sidebar-title").textContent = `${region.name} · ${day.label}`;
  document.getElementById("sidebar-theme").textContent = day.theme;
  document.getElementById("stat-stops").textContent = `${visibleStops.length}${ui("stops")}`;
  document.getElementById("stat-region").textContent = region.dates;

  const dayHint = document.getElementById("day-hint");
  const rawDay = getDayRaw();

  const weatherEl = document.getElementById("sidebar-weather");
  const weatherTipEl = document.getElementById("sidebar-weather-tip");
  const wx = window.WEATHER_DATA?.days?.[rawDay.id || day.id];
  if (weatherEl && weatherTipEl) {
    if (wx && !isFlightsView() && !isBookingsView() && !isFoodView() && !isPackView() && !isCostView()) {
      weatherEl.hidden = false;
      weatherTipEl.hidden = false;
      weatherEl.textContent = `${ui("weatherLabel")} ${locField(wx.summary)}`;
      weatherTipEl.textContent = locField(wx.tip);
    } else {
      weatherEl.hidden = true;
      weatherTipEl.hidden = true;
      weatherEl.textContent = "";
      weatherTipEl.textContent = "";
    }
  }

  if (isFlightsView()) {
    dayHint.textContent = ui("flightsHint");
  } else if (isBookingsView()) {
    dayHint.textContent = ui("bookingsHint");
  } else if (isFoodView()) {
    dayHint.textContent = ui("foodHint");
  } else if (isPackView()) {
    dayHint.textContent = ui("packHint");
  } else if (isCostView()) {
    dayHint.textContent = ui("costHint");
  } else if (isFlowchartView()) {
    dayHint.textContent = ui("flowchartHint");
  } else if (rawDay.plans && day.planBlurb) {
    dayHint.textContent = day.planBlurb;
  } else if (!hasDedicatedMyMap(state.regionId)) {
    dayHint.textContent = ui("dayHintNoMap");
  } else if (isConfigured(myMaps.embedUrl)) {
    dayHint.textContent = uiFn("dayHint", day.label.split(" · ")[0]);
  } else {
    dayHint.textContent = "";
  }

  const planTabs = document.getElementById("plan-tabs");
  if (planTabs) {
    if (rawDay.plans) {
      planTabs.hidden = false;
      planTabs.innerHTML = "";
      ["a", "b"].forEach((pid) => {
        const plan = rawDay.plans[pid];
        if (!plan) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.dataset.plan = pid;
        btn.textContent = locField(plan.name);
        btn.classList.toggle("active", (rawDay.activePlanId || state.dayPlan) === pid);
        btn.addEventListener("click", () => setDayPlan(pid));
        planTabs.appendChild(btn);
      });
    } else {
      planTabs.hidden = true;
      planTabs.innerHTML = "";
    }
  }

  const inspirationWrap = document.getElementById("region-inspiration-wrap");
  const inspiration = document.getElementById("region-inspiration");
  const inspirationAlt = document.getElementById("region-inspiration-alt");
  const inspirationCity = document.getElementById("region-inspiration-city");
  if (inspirationWrap) {
    const show = Boolean(region.inspirationUrl || region.inspirationUrlCity);
    inspirationWrap.hidden = !show;
    if (inspiration && region.inspirationUrl) {
      inspiration.hidden = false;
      inspiration.dataset.open = region.inspirationUrl;
      inspiration.textContent = ui("inspirationLink");
    } else if (inspiration) {
      inspiration.hidden = true;
    }
    if (inspirationAlt) {
      if (region.inspirationUrlAlt) {
        inspirationAlt.hidden = false;
        inspirationAlt.dataset.open = region.inspirationUrlAlt;
        inspirationAlt.textContent = ui("inspirationAlt");
      } else {
        inspirationAlt.hidden = true;
      }
    }
    if (inspirationCity) {
      if (region.inspirationUrlCity) {
        inspirationCity.hidden = false;
        inspirationCity.dataset.open = region.inspirationUrlCity;
        inspirationCity.textContent = ui("inspirationCity");
      } else {
        inspirationCity.hidden = true;
      }
    }
    wireOpenButtons(inspirationWrap);
  }

  const openLink = document.getElementById("map-open-external");
  if (isMapView()) {
    openLink.hidden = false;
    if (hasDedicatedMyMap(state.regionId) && isConfigured(myMaps.viewUrl)) {
      openLink.href = myMaps.viewUrl;
      openLink.textContent = ui("mapFullscreen");
    } else {
      openLink.href = "https://www.google.com/maps/d/";
      openLink.textContent = ui("createMyMaps");
    }
  } else if (isFlowchartView()) {
    openLink.hidden = false;
    openLink.href = flowchartPage();
    openLink.textContent = ui("flowchartFullscreen");
  } else {
    openLink.hidden = true;
  }

  const dirEl = document.getElementById("day-directions");
  const dirLink = directionsUrl(day.stops);
  dirEl.href = dirLink || "#";
  dirEl.style.display = dirLink ? "inline" : "none";

  document.querySelectorAll(".region-tabs button[data-region]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.region === state.regionId);
  });

  const dayTabs = document.getElementById("day-tabs");
  dayTabs.innerHTML = "";
  const today = getTodayTrip();
  const todayBtn = document.createElement("button");
  todayBtn.type = "button";
  todayBtn.className = "today-tab";
  todayBtn.textContent = ui("jumpToday");
  todayBtn.title = today
    ? `青甘 Day ${today.dayIndex + 1}`
    : ui("todayOffTrip");
  todayBtn.disabled = !today;
  const onToday =
    today && state.regionId === today.regionId && state.dayIndex === today.dayIndex;
  todayBtn.classList.toggle("active", Boolean(onToday));
  todayBtn.addEventListener("click", () => jumpToToday());
  dayTabs.appendChild(todayBtn);

  TRIP_DATA.regions.find((r) => r.id === state.regionId).days.forEach((d, i) => {
    const btn = document.createElement("button");
    btn.textContent = d.label.replace(/ · .*/, "");
    btn.classList.toggle("active", i === state.dayIndex);
    if (today && today.regionId === state.regionId && today.dayIndex === i) {
      btn.classList.add("is-today");
    }
    btn.addEventListener("click", () => {
      state.dayIndex = i;
      state.activeStopId = null;
      state.mapFocused = false;
      updateUrl();
      renderAll();
    });
    dayTabs.appendChild(btn);
  });

  document.getElementById("legend").innerHTML = getRegion()
    .days.map(
      (d, i) =>
        `<span class="legend-item"><span class="legend-dot" style="background:${region.dayColors[i]}"></span>${d.label.split(" · ")[0]}</span>`
    )
    .join("");

  const list = document.getElementById("itinerary");
  list.innerHTML = "";
  let num = 0;
  day.stops.forEach((rawStop) => {
    if (rawStop.skipMarker) return;
    const stop = localizeStop(rawStop);
    num += 1;
    const booking = typeof window.bookingForStop === "function" ? window.bookingForStop(stop.id) : null;
    const badges = [
      rawStop.optional ? `<span class="stop-optional-badge">${ui("optionalBadge")}</span>` : "",
      booking ? `<span class="stop-booking-badge">${ui("bookingBadge")}</span>` : "",
    ].join("");
    const addr = stopStreetAddress(rawStop);
    const copyAddr = stopCopyAddress(rawStop);
    const el = document.createElement("div");
    el.className =
      "stop-item" +
      (state.activeStopId === stop.id ? " active" : "") +
      (rawStop.optional ? " optional" : "");
    el.dataset.id = stop.id;
    el.innerHTML = `
      <div class="stop-num" style="background:${color}">${num}</div>
      <div class="stop-body">
        <div class="stop-time">${stop.time}${badges}</div>
        <div class="stop-name">${stop.name}</div>
        ${rawStop.nameKo ? `<div class="stop-ko">${rawStop.nameKo}</div>` : ""}
        <div class="stop-desc">${stop.desc}</div>
        ${stop.transport && stop.transport !== "—" ? `<div class="stop-transport">${stop.transport}</div>` : ""}
        ${addr ? `<div class="stop-address">${escapeHtml(addr)}</div>` : ""}
        <div class="stop-actions">
          <a href="#" class="stop-focus">${ui("mapLocate")}</a>
          <a href="${stopMapsUrl(rawStop)}" target="_blank" rel="noopener">${ui("googleMaps")}</a>
          <a href="${stopDirectionsUrl(rawStop)}" target="_blank" rel="noopener">${ui("navigate")}</a>
          ${copyAddr ? `<button type="button" class="copy-btn stop-copy-addr" data-copy="${escapeHtml(copyAddr)}" title="${escapeHtml(copyAddr)}">${ui("copyAddress")}</button>` : ""}
          ${rawStop.infoUrl ? `<a href="${rawStop.infoUrl}" class="stop-info" data-open="${rawStop.infoUrl}" target="_blank" rel="noopener noreferrer">${ui("stopInfo")}</a>` : ""}
        </div>
      </div>`;
    el.addEventListener("click", (e) => {
      if (e.target.closest("a, button") && !e.target.classList.contains("stop-focus")) return;
      e.preventDefault();
      focusStop(stop.id);
    });
    list.appendChild(el);
  });
  wireOpenButtons(list);
  wireCopyButtons(list);
}

function focusStop(stopId) {
  if (!isMapView()) {
    state.view = "map";
    applyView();
  }
  const rawStop = getDayRaw().stops.find((s) => s.id === stopId);
  if (!rawStop) return;
  const stop = localizeStop(rawStop);

  state.activeStopId = stopId;
  state.mapFocused = true;

  document.getElementById("map-setup").classList.remove("visible");
  document.getElementById("map-frame").style.visibility = "visible";
  setMapFrameSrc(placeEmbedUrl(rawStop), true);

  document.getElementById("map-restore").hidden = false;
  document.getElementById("map-mode-label").textContent = `${ui("mapFocus")}${stop.name}`;
  showFocusBadge(rawStop);

  renderSidebar();
  document.querySelector(`.stop-item[data-id="${stopId}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function renderHeader() {
  const meta = getMeta();
  document.getElementById("page-title").textContent = meta.title;
  document.getElementById("page-subtitle").textContent = meta.subtitle;
  const flightsHtml = meta.flights
    .map((f) => `<span><span class="flight-code">${f.code}</span> ${f.date} · ${f.route}</span>`)
    .join("");
  const alert = window.WEATHER_DATA?.alert;
  const alertHtml = alert
    ? `<span class="weather-alert" title="${escapeHtml(locField(alert.detail))}"><strong>${ui("weatherAlertLabel")}</strong> ${escapeHtml(locField(alert.title))}</span>`
    : "";
  document.getElementById("flights-bar").innerHTML = `${flightsHtml}${alertHtml}`;
}

function renderSetupPanel() {
  updateMapSetupCopy();
}

function renderAll() {
  applyStaticUi();
  applyView();
  renderHeader();
  renderSetupPanel();
  if (isMapView() && !state.mapFocused) showMyMapsOverview();
  renderSidebar();
}

function updateUrl() {
  const url = new URL(location.href);
  url.searchParams.set("region", state.regionId);
  url.searchParams.set("day", String(state.dayIndex + 1));
  const rawDay = TRIP_DATA.regions.find((r) => r.id === state.regionId)?.days[state.dayIndex];
  if (rawDay?.plans && state.dayPlan === "b") url.searchParams.set("plan", "b");
  else url.searchParams.delete("plan");
  if (state.lang === "en") url.searchParams.set("lang", "en");
  else url.searchParams.delete("lang");
  if (state.view === "flights" || state.view === "bookings" || state.view === "food" || state.view === "pack" || state.view === "cost" || state.view === "flowchart") {
    url.searchParams.set("view", state.view);
  } else {
    url.searchParams.delete("view");
  }
  history.replaceState(null, "", url);
}

function setLang(lang) {
  state.lang = lang === "en" ? "en" : "zh";
  try {
    localStorage.setItem("trip-lang", state.lang);
  } catch (_) { /* Safari private mode */ }
  updateUrl();
  renderAll();
}

function boot() {
  document.getElementById("map-restore").addEventListener("click", () => {
    state.mapFocused = false;
    state.activeStopId = null;
    showMyMapsOverview();
    renderSidebar();
  });

  document.querySelector(".header-actions")?.addEventListener("click", (e) => {
    if (e.target.closest("#theme-toggle")) {
      e.preventDefault();
      toggleTheme();
      return;
    }
    const langBtn = e.target.closest(".lang-tabs button[data-lang]");
    if (langBtn) {
      e.preventDefault();
      setLang(langBtn.dataset.lang);
      return;
    }
    const regionBtn = e.target.closest(".region-tabs button[data-region]");
    if (regionBtn) {
      state.regionId = regionBtn.dataset.region;
      state.dayIndex = 0;
      state.activeStopId = null;
      state.mapFocused = false;
      updateUrl();
      renderAll();
    }
  });

  document.getElementById("view-tabs")?.addEventListener("click", (e) => {
    const viewBtn = e.target.closest("button[data-view]");
    if (!viewBtn) return;
    e.preventDefault();
    setView(viewBtn.dataset.view);
  });

  try {
    wireOpenButtons();
    renderAll();
  } catch (err) {
    console.error(err);
  }
}

boot();
