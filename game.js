const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const ui = {
  money: document.getElementById("money"),
  happy: document.getElementById("happy"),
  clean: document.getElementById("clean"),
  queue: document.getElementById("queue"),
  guests: document.getElementById("guests"),
  day: document.getElementById("day"),
  round: document.getElementById("round"),
  selected: document.getElementById("selected"),
  analysisStatus: document.getElementById("analysisStatus"),
  analysisNormal: document.getElementById("analysisNormal"),
  analysisCrowding: document.getElementById("analysisCrowding"),
  analysisHygiene: document.getElementById("analysisHygiene"),
  analysisSatisfaction: document.getElementById("analysisSatisfaction"),
  analysisMetricA: document.getElementById("analysisMetricA"),
  analysisMetricB: document.getElementById("analysisMetricB"),
  analysisMetricC: document.getElementById("analysisMetricC"),
  analysisLegend: document.getElementById("analysisLegend"),
  analysisHint: document.getElementById("analysisHint"),
  toast: document.getElementById("toast"),
  growthBar: document.getElementById("growthBar"),
  loadBar: document.getElementById("loadBar"),
  sceneBar: document.getElementById("sceneBar"),
  pauseBtn: document.getElementById("pauseBtn"),
  roundBtn: document.getElementById("roundBtn"),
  saveBtn: document.getElementById("saveBtn"),
  undoBtn: document.getElementById("undoBtn"),
  loadBtn: document.getElementById("loadBtn"),
  guestLog: document.getElementById("guestLog"),
  guestMoodSummary: document.getElementById("guestMoodSummary"),
  cleanerMinus: document.getElementById("cleanerMinus"),
  cleanerPlus: document.getElementById("cleanerPlus"),
  cleanerCount: document.getElementById("cleanerCount"),
  mechanicMinus: document.getElementById("mechanicMinus"),
  mechanicPlus: document.getElementById("mechanicPlus"),
  mechanicCount: document.getElementById("mechanicCount"),
  cleanerLevel: document.getElementById("cleanerLevel"),
  cleanerFatigue: document.getElementById("cleanerFatigue"),
  cleanerTraining: document.getElementById("cleanerTraining"),
  mechanicLevel: document.getElementById("mechanicLevel"),
  mechanicFatigue: document.getElementById("mechanicFatigue"),
  mechanicTraining: document.getElementById("mechanicTraining"),
  runningCost: document.getElementById("runningCost"),
  brokenCount: document.getElementById("brokenCount"),
  conditionAverage: document.getElementById("conditionAverage"),
  openRideCount: document.getElementById("openRideCount"),
  averageRidePopularity: document.getElementById("averageRidePopularity"),
  upgradedRideCount: document.getElementById("upgradedRideCount"),
  activeCleaners: document.getElementById("activeCleaners"),
  activeMechanics: document.getElementById("activeMechanics"),
  restingStaff: document.getElementById("restingStaff"),
  staffJobs: document.getElementById("staffJobs"),
  benchUses: document.getElementById("benchUses"),
  toiletUses: document.getElementById("toiletUses"),
  binCollected: document.getElementById("binCollected"),
  ratingStars: document.getElementById("ratingStars"),
  ratingScore: document.getElementById("ratingScore"),
  ratingExperience: document.getElementById("ratingExperience"),
  ratingFinance: document.getElementById("ratingFinance"),
  ratingFacilities: document.getElementById("ratingFacilities"),
  ratingScenery: document.getElementById("ratingScenery"),
  ratingTransit: document.getElementById("ratingTransit"),
  goalList: document.getElementById("goalList"),
  nextUnlock: document.getElementById("nextUnlock"),
  roundReport: document.getElementById("roundReport"),
  reportRound: document.getElementById("reportRound"),
  reportStars: document.getElementById("reportStars"),
  reportSummary: document.getElementById("reportSummary"),
  reportAchievements: document.getElementById("reportAchievements"),
  closeReportBtn: document.getElementById("closeReportBtn"),
  continueReportBtn: document.getElementById("continueReportBtn"),
  busMinus: document.getElementById("busMinus"),
  busPlus: document.getElementById("busPlus"),
  busCount: document.getElementById("busCount"),
  intervalMinus: document.getElementById("intervalMinus"),
  intervalPlus: document.getElementById("intervalPlus"),
  busInterval: document.getElementById("busInterval"),
  transitStatus: document.getElementById("transitStatus"),
  transitWaiting: document.getElementById("transitWaiting"),
  transitLoad: document.getElementById("transitLoad"),
  transitRiders: document.getElementById("transitRiders"),
  routeList: document.getElementById("routeList"),
  monorailStatus: document.getElementById("monorailStatus"),
  monorailStations: document.getElementById("monorailStations"),
  monorailRiders: document.getElementById("monorailRiders"),
  parkTrainStatus: document.getElementById("parkTrainStatus"),
  parkTrainStations: document.getElementById("parkTrainStations"),
  parkTrainRiders: document.getElementById("parkTrainRiders"),
  admissionMinus: document.getElementById("admissionMinus"),
  admissionPlus: document.getElementById("admissionPlus"),
  admissionFee: document.getElementById("admissionFee"),
  admissionRevenue: document.getElementById("admissionRevenue"),
  rideRevenue: document.getElementById("rideRevenue"),
  shopRevenue: document.getElementById("shopRevenue"),
  shopStockTotal: document.getElementById("shopStockTotal"),
  shopDeliveryStatus: document.getElementById("shopDeliveryStatus"),
  shopDemandStatus: document.getElementById("shopDemandStatus"),
  shopConversion: document.getElementById("shopConversion"),
  shopGrossProfit: document.getElementById("shopGrossProfit"),
  shopOpenStatus: document.getElementById("shopOpenStatus"),
  shopStaffStatus: document.getElementById("shopStaffStatus"),
  shopReputationStatus: document.getElementById("shopReputationStatus"),
  shopPricingSummary: document.getElementById("shopPricingSummary"),
  shopPricingStatus: document.getElementById("shopPricingStatus"),
  shopPricingAction: document.getElementById("shopPricingAction"),
  marketingStatus: document.getElementById("marketingStatus"),
  marketingFit: document.getElementById("marketingFit"),
  marketingLeads: document.getElementById("marketingLeads"),
  marketingResults: document.getElementById("marketingResults"),
  marketingHint: document.getElementById("marketingHint"),
  marketingFamily: document.getElementById("marketingFamily"),
  marketingFamilyMeta: document.getElementById("marketingFamilyMeta"),
  marketingThrill: document.getElementById("marketingThrill"),
  marketingThrillMeta: document.getElementById("marketingThrillMeta"),
  marketingScenic: document.getElementById("marketingScenic"),
  marketingScenicMeta: document.getElementById("marketingScenicMeta"),
  marketingFoodie: document.getElementById("marketingFoodie"),
  marketingFoodieMeta: document.getElementById("marketingFoodieMeta"),
  marketingCancel: document.getElementById("marketingCancel"),
  expenseTotal: document.getElementById("expenseTotal"),
  netTotal: document.getElementById("netTotal"),
  difficultyLabel: document.getElementById("difficultyLabel"),
  subsidyStatus: document.getElementById("subsidyStatus"),
  financeHint: document.getElementById("financeHint"),
  tutorialBtn: document.getElementById("tutorialBtn"),
  tutorialOverlay: document.getElementById("tutorialOverlay"),
  tutorialCloseBtn: document.getElementById("tutorialCloseBtn"),
  tutorialStepLabel: document.getElementById("tutorialStepLabel"),
  tutorialTitle: document.getElementById("tutorialTitle"),
  tutorialProgress: document.getElementById("tutorialProgress"),
  tutorialBody: document.getElementById("tutorialBody"),
  difficultyPicker: document.getElementById("difficultyPicker"),
  tutorialBackBtn: document.getElementById("tutorialBackBtn"),
  tutorialSkipBtn: document.getElementById("tutorialSkipBtn"),
  tutorialNextBtn: document.getElementById("tutorialNextBtn"),
  zoomInBtn: document.getElementById("zoomInBtn"),
  zoomOutBtn: document.getElementById("zoomOutBtn"),
  zoomResetBtn: document.getElementById("zoomResetBtn"),
  heroName: document.getElementById("heroName")
};

const TILE_W = 72;
const TILE_H = 36;
const W = 28;
const H = 28;
const SAVE_KEY = "yumeshimaParkSaveV1";
const TUTORIAL_KEY = "yumeshimaParkTutorialV1";
const DIFFICULTY_CONFIGS = {
  beginner: { label: "はじめて", initialMoney: 30000, costMultiplier: .8, graceRounds: 2, graceMultiplier: .5 },
  standard: { label: "標準", initialMoney: 24000, costMultiplier: .95, graceRounds: 1, graceMultiplier: .75 },
  challenge: { label: "挑戦", initialMoney: 18000, costMultiplier: 1, graceRounds: 0, graceMultiplier: 1 }
};
const SHOP_CONFIG = {
  capacities: { beginner: 60, standard: 45, challenge: 30 },
  deliverySize: 30,
  deliverySeconds: 8,
  autoUnitCost: 3,
  instantUnitCost: 4
};
const SHOP_MANAGEMENT_CONFIG = {
  maxLevel: 3,
  maxStaff: 3,
  hireCost: 180,
  startingReputation: 65
};
const RIDE_MANAGEMENT_CONFIG = {
  maxLevel: 3,
  startingPopularity: 55,
  policies: {
    economy: { label: "節約", upkeep: .72, wear: 1.3, failure: 1.35, threshold: 62 },
    balanced: { label: "標準", upkeep: 1, wear: 1, failure: 1, threshold: 82 },
    preventive: { label: "予防", upkeep: 1.38, wear: .68, failure: .5, threshold: 92 }
  }
};
const STAFF_MANAGEMENT_CONFIG = {
  maxLevel: 3,
  experienceThresholds: [0, 6, 16],
  restAt: 92,
  resumeAt: 32,
  trainingCosts: { cleaner: 320, mechanic: 440 },
  wages: { cleaner: 35, mechanic: 45 }
};
const MARKETING_CAMPAIGNS = {
  family: { label: "ファミリー", cost: 600, leads: 18, interval: .76, targetShare: .66 },
  thrill: { label: "絶叫ファン", cost: 800, leads: 20, interval: .72, targetShare: .68 },
  scenic: { label: "景観好き", cost: 500, leads: 16, interval: .8, targetShare: .64 },
  foodie: { label: "グルメ層", cost: 550, leads: 18, interval: .78, targetShare: .66 }
};
const GUEST_ARCHETYPES = {
  family: { label: "子ども連れ", rideBias: { carousel: 12, teacups: 9, wheel: 4, coaster: -8 }, hungerRate: 1.15, thirstRate: 1.05, souvenirBias: 1.25, fatigueRate: 1.05 },
  thrill: { label: "絶叫好き", rideBias: { coaster: 18, wheel: 7, carousel: -5, teacups: -4 }, hungerRate: .9, thirstRate: 1.2, souvenirBias: .75, fatigueRate: .85 },
  scenic: { label: "景観重視", rideBias: { wheel: 9, carousel: 5, coaster: -2 }, hungerRate: .8, thirstRate: .8, souvenirBias: 1.35, fatigueRate: .75 },
  foodie: { label: "グルメ", rideBias: { carousel: 2, teacups: 2 }, hungerRate: 1.5, thirstRate: 1, souvenirBias: .85, fatigueRate: .8 },
  relaxed: { label: "のんびり", rideBias: { carousel: 7, wheel: 5, coaster: -7 }, hungerRate: .85, thirstRate: .85, souvenirBias: 1, fatigueRate: .65 }
};
const TRANSIT_MODE_CONFIGS = {
  bus: {
    label: "バス",
    stopTool: "bus_stop",
    capacity: 12,
    vehicleCost: 1400,
    vehicleRefund: 420,
    vehicleUpkeep: 22,
    minInterval: 3,
    maxInterval: 15
  },
  monorail: {
    label: "モノレール",
    stopTool: "monorail_station",
    capacity: 24,
    vehicleUpkeep: 65,
    minInterval: 7,
    maxInterval: 14
  },
  park_train: {
    label: "園内列車",
    stopTool: "train_station",
    capacity: 18,
    vehicleUpkeep: 48,
    minInterval: 9,
    maxInterval: 16
  }
};
const TOOL_UNLOCK_STARS = { wheel: 2, coaster: 3, monorail_track: 4, monorail_station: 4, train_track: 5, train_station: 5 };
const UNLOCK_DEFINITIONS = [
  { stars: 2, label: "観覧車", tool: "wheel" },
  { stars: 3, label: "コースター", tool: "coaster" },
  { stars: 4, label: "モノレール交通", tool: "monorail_station" },
  { stars: 4, label: "名門パーク報奨 +15%" },
  { stars: 5, label: "園内列車交通", tool: "train_station" },
  { stars: 5, label: "ワールドクラス報奨 $500" }
];
const GOAL_DEFINITIONS = {
  profit: { label: "ラウンド収支を黒字に", target: 500, reward: 700, value: metrics => Math.max(0, metrics.net), format: value => `$${Math.round(value).toLocaleString()}` },
  guests: { label: "ゲストを12人迎える", target: 12, reward: 650, value: metrics => metrics.roundGuests, format: value => `${Math.floor(value)}人` },
  clean: { label: "3人以上を迎え清潔さ90%", target: 90, reward: 500, value: metrics => metrics.roundGuests >= 3 ? metrics.clean : 0, format: value => `${Math.round(value)}%` },
  satisfaction: { label: "3人以上を迎え満足度85%", target: 85, reward: 800, value: metrics => metrics.roundGuests >= 3 ? metrics.happy : 0, format: value => `${Math.round(value)}%` },
  ride_variety: { label: "3種類のライドを運営", target: 3, reward: 900, value: metrics => metrics.rideTypes, format: value => `${Math.floor(value)}種類` },
  transit: { label: "交通利用を30人まで伸ばす", target: 30, reward: 900, value: metrics => metrics.transitRiders, format: value => `${Math.floor(value)}人` }
};
const GOAL_ORDER = ["profit", "guests", "clean", "satisfaction", "ride_variety", "transit"];
const tools = {
  inspect: { cost: 0, label: "調べる" },
  path: { cost: 80, label: "通路" },
  remove: { cost: 0, label: "撤去" },
  bus_stop: { cost: 650, label: "バス停", transit: true, scenery: 2 },
  monorail_track: { cost: 220, label: "高架レール", trackMode: "monorail" },
  monorail_station: { cost: 2400, label: "モノレール駅", transit: true, transitMode: "monorail", scenery: 8 },
  train_track: { cost: 140, label: "園内線路", trackMode: "park_train" },
  train_station: { cost: 1800, label: "園内列車駅", transit: true, transitMode: "park_train", scenery: 10 },
  carousel: { cost: 1800, label: "メリーゴーランド", ride: true, cap: 7, duration: 9, appeal: 18, upkeep: 18, defaultPrice: 7, color: "#ef6f61" },
  wheel: { cost: 3200, label: "観覧車", ride: true, cap: 10, duration: 13, appeal: 27, upkeep: 28, defaultPrice: 10, color: "#49abc2" },
  coaster: { cost: 4800, label: "コースター", ride: true, cap: 12, duration: 10, appeal: 36, upkeep: 45, defaultPrice: 14, color: "#f1b84f" },
  teacups: { cost: 1400, label: "ティーカップ", ride: true, cap: 6, duration: 7, appeal: 15, upkeep: 14, defaultPrice: 6, color: "#9bcf67" },
  kiosk: { cost: 900, label: "スナック売店", shop: true, shopKind: "food", defaultPrice: 8, unitCost: 3, instantUnitCost: 4, deliverySize: 30, capacityScale: 1, staffWage: 18 },
  drink_stand: { cost: 750, label: "ドリンクスタンド", shop: true, shopKind: "drink", defaultPrice: 6, unitCost: 2, instantUnitCost: 3, deliverySize: 36, capacityScale: 1.2, staffWage: 15 },
  souvenir_shop: { cost: 1600, label: "おみやげショップ", shop: true, shopKind: "souvenir", defaultPrice: 14, unitCost: 6, instantUnitCost: 8, deliverySize: 20, capacityScale: .75, staffWage: 22 },
  bench: { cost: 180, label: "パークベンチ", amenity: "bench", scenery: 2, upkeep: 1 },
  trash_bin: { cost: 120, label: "ごみ箱", amenity: "bin", scenery: 1, upkeep: 2, maxFill: 24 },
  toilet: { cost: 1200, label: "パークトイレ", amenity: "toilet", scenery: 2, upkeep: 12 },
  tree: { cost: 120, label: "木立", scenery: 4 },
  shrub: { cost: 80, label: "低木", scenery: 3 },
  flower: { cost: 100, label: "花壇", scenery: 5 },
  palm: { cost: 180, label: "ヤシ", scenery: 6 },
  water: { cost: 160, label: "水辺", scenery: 2 },
  decor: { cost: 220, label: "装飾", scenery: 6 }
};

const colors = {
  grassA: "#85c76e",
  grassB: "#77bb66",
  path: "#f4ddb0",
  pathSide: "#dac18f",
  water: "#59b9c8",
  waterSide: "#3b91a5",
  edge: "rgba(36,49,61,.18)",
  ink: "#26313f"
};

let dpr = 1;
let camera = { x: 0, y: 0, zoom: 1 };
let mouse = { x: 0, y: 0, down: false, moved: false, mode: null, sx: 0, sy: 0, cx: 0, cy: 0, lastTile: null, painted: 0, rangeStart: null, rangeEnd: null, historyBefore: null };
let hovered = null;
let selectedTile = null;
let selectedTool = "inspect";
let analysisMode = "normal";
let selectedHero = localStorage.getItem("parkHero") || "male";
let paused = false;
let pausedBeforeReport = false;
let pausedBeforeTutorial = false;
let tutorialStep = 0;
let last = performance.now();
let spawnTimer = 0;
let incomeTimer = 0;
let expenseTimer = 0;
let toastTimer = 0;
let guestSequence = 0;
let stopSequence = 0;
let staffSequence = 0;
let transitRenderSignature = "";
let progressionRenderSignature = "";
const undoStack = [];

const state = {
  money: DIFFICULTY_CONFIGS.beginner.initialMoney,
  clean: 91,
  happy: 82,
  day: 1,
  round: 1,
  guestsServed: 0,
  sentiment: 0,
  admissionFee: 25,
  difficulty: "beginner",
  finance: {
    admissionRevenue: 0,
    rideRevenue: 0,
    shopRevenue: 0,
    maintenanceExpenses: 0,
    staffExpenses: 0,
    restockExpenses: 0,
    marketingExpenses: 0
  },
  marketing: {
    activeCampaign: null,
    remainingLeads: 0,
    attractedGuests: 0,
    refusals: 0,
    campaignsStarted: 0
  },
  staff: { cleaners: 1, mechanics: 1 },
  staffStats: { cleaningJobs: 0, repairJobs: 0 },
  staffAgents: [],
  tiles: [],
  guests: [],
  rides: [],
  buses: [],
  monorails: [],
  parkTrains: [],
  guestLog: [],
  transit: {
    activeMode: "bus",
    networks: {
      bus: {
        routeStopIds: [],
        fleet: 1,
        interval: 7,
        totalRiders: 0,
        entranceWaiting: 3,
        demandAccumulator: 0
      },
      monorail: {
        routeStopIds: [],
        fleet: 1,
        interval: 9,
        totalRiders: 0,
        entranceWaiting: 0,
        demandAccumulator: 0
      },
      park_train: {
        routeStopIds: [],
        fleet: 1,
        interval: 11,
        totalRiders: 0,
        entranceWaiting: 0,
        demandAccumulator: 0
      }
    }
  },
  progression: {
    bestStars: 1,
    unlockedTools: [],
    activeGoalIds: ["profit", "guests", "clean"],
    completedGoalIds: [],
    roundStartServed: 0,
    reports: []
  }
};

function makeTile(x, y) {
  const pond = x > 20 && y > 18 && x + y < 48;
  const baseTerrain = pond ? "water" : "grass";
  return { x, y, terrain: baseTerrain, baseTerrain, object: null, path: false, transitTrack: null, litter: 0, traffic: 0, moodTotal: 0, moodWeight: 0 };
}

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) state.tiles.push(makeTile(x, y));
}

const entrance = tileAt(2, 14);
for (let x = 2; x < 12; x++) tileAt(x, 14).path = true;
for (let y = 10; y < 19; y++) tileAt(8, y).path = true;
placeStarterObject(3, 13, "bus_stop");
placeStarterRide(11, 13, "carousel");
placeStarterRide(8, 9, "teacups");
placeStarterObject(5, 13, "kiosk");
for (const [x, y] of [[6,16],[10,16],[12,11],[4,10],[13,15],[9,18]]) placeStarterObject(x, y, "tree");
for (const [x, y] of [[5,15],[11,12],[7,17]]) placeStarterObject(x, y, "shrub");
for (const [x, y] of [[9,12],[10,15],[12,14]]) placeStarterObject(x, y, "flower");
for (const [x, y] of [[14,12],[6,9]]) placeStarterObject(x, y, "palm");
for (const [x, y] of [[7,13],[9,13],[6,15]]) placeStarterObject(x, y, "decor");

function tileAt(x, y) {
  return state.tiles[y * W + x];
}

function placeStarterRide(x, y, type) {
  const tile = tileAt(x, y);
  tile.object = createRide(type);
  state.rides.push(tile.object);
}

function createRide(type, saved = null) {
  if (!tools[type]?.ride) return null;
  return {
    type,
    queue: [],
    riders: [],
    timer: Math.max(0, Number(saved?.timer || 0)),
    totalRides: Math.max(0, Number(saved?.totalRides || 0)),
    condition: clamp(Number(saved?.condition ?? 100), 0, 100),
    broken: !!saved?.broken,
    price: clamp(Number(saved?.price ?? tools[type].defaultPrice), 0, 30),
    open: saved?.open === undefined ? true : !!saved.open,
    level: clamp(Math.round(Number(saved?.level ?? 1)), 1, RIDE_MANAGEMENT_CONFIG.maxLevel),
    popularity: clamp(Number(saved?.popularity ?? RIDE_MANAGEMENT_CONFIG.startingPopularity), 0, 100),
    maintenancePolicy: RIDE_MANAGEMENT_CONFIG.policies[saved?.maintenancePolicy] ? saved.maintenancePolicy : "balanced"
  };
}

function ridePolicy(ride) {
  return RIDE_MANAGEMENT_CONFIG.policies[ride?.maintenancePolicy] || RIDE_MANAGEMENT_CONFIG.policies.balanced;
}

function rideCapacity(ride) {
  return Math.max(1, Number(tools[ride.type]?.cap || 1) + (Number(ride.level || 1) - 1) * 2);
}

function rideDuration(ride) {
  return Math.max(3, Number(tools[ride.type]?.duration || 8) * Math.pow(.9, Number(ride.level || 1) - 1));
}

function rideEffectiveAppeal(ride) {
  return Number(tools[ride.type]?.appeal || 0) + (Number(ride.level || 1) - 1) * 5 + (Number(ride.popularity || 0) - 50) * .12;
}

function rideMaintenanceThreshold(ride) {
  return ridePolicy(ride).threshold;
}

function rideRepairTarget(ride) {
  return Math.min(98, rideMaintenanceThreshold(ride) + 8);
}

function rideMaintenanceCost(ride) {
  const openFactor = ride.open === false ? .25 : 1;
  const levelFactor = 1 + (Number(ride.level || 1) - 1) * .16;
  return Number(tools[ride.type]?.upkeep || 0) * ridePolicy(ride).upkeep * levelFactor * openFactor;
}

function rideUpgradeCost(ride) {
  const level = clamp(Math.round(Number(ride?.level || 1)), 1, RIDE_MANAGEMENT_CONFIG.maxLevel);
  if (level >= RIDE_MANAGEMENT_CONFIG.maxLevel) return 0;
  return Math.round(Number(tools[ride.type]?.cost || 1000) * (level === 1 ? .55 : .85));
}

function rideEstimatedWait(ride) {
  const groups = Math.ceil(Number(ride.queue?.length || 0) / rideCapacity(ride));
  return Math.max(0, Math.ceil((ride.riders?.length ? Number(ride.timer || 0) : 0) + groups * rideDuration(ride)));
}

function placeStarterObject(x, y, type) {
  if (tools[type]?.shop) {
    tileAt(x, y).object = createShop(type);
    return;
  }
  if (tools[type]?.transit) {
    const stop = createTransitStop("bus");
    tileAt(x, y).object = stop;
    registerTransitStop(stop);
    return;
  }
  tileAt(x, y).object = { type };
}

function shopCapacityForDifficulty(mode = state.difficulty, type = "kiosk") {
  const base = SHOP_CONFIG.capacities[mode] || SHOP_CONFIG.capacities.beginner;
  return Math.max(1, Math.round(base * Number(tools[type]?.capacityScale || 1)));
}

function createShop(type = "kiosk", saved = null) {
  if (type && typeof type === "object") {
    saved = type;
    type = saved.type || "kiosk";
  }
  if (!tools[type]?.shop) type = "kiosk";
  const legacySave = !!saved && saved.autoRestock === undefined;
  const difficultyCapacity = shopCapacityForDifficulty(state.difficulty, type);
  const maxStock = saved
    ? Math.max(1, legacySave ? Math.max(Number(saved.maxStock || 0), difficultyCapacity) : Number(saved.maxStock || difficultyCapacity))
    : difficultyCapacity;
  return {
    type,
    stock: clamp(Number(saved?.stock ?? maxStock), 0, maxStock),
    maxStock,
    price: clamp(Number(saved?.price ?? tools[type].defaultPrice), 1, 24),
    open: saved?.open === undefined ? true : !!saved.open,
    staff: clamp(Math.round(Number(saved?.staff ?? 1)), 1, SHOP_MANAGEMENT_CONFIG.maxStaff),
    level: clamp(Math.round(Number(saved?.level ?? 1)), 1, SHOP_MANAGEMENT_CONFIG.maxLevel),
    reputation: clamp(Number(saved?.reputation ?? SHOP_MANAGEMENT_CONFIG.startingReputation), 0, 100),
    autoRestock: saved?.autoRestock === undefined ? true : !!saved.autoRestock,
    deliveryTimer: Math.max(0, Number(saved?.deliveryTimer || 0)),
    pendingStock: clamp(Number(saved?.pendingStock || 0), 0, shopDeliverySize({ type })),
    sales: Math.max(0, Number(saved?.sales || 0)),
    lostSales: Math.max(0, Number(saved?.lostSales || 0)),
    visits: Math.max(0, Number(saved?.visits || 0)),
    priceRejects: Math.max(0, Number(saved?.priceRejects || 0)),
    revenue: Math.max(0, Number(saved?.revenue || 0)),
    supplyCost: Math.max(0, Number(saved?.supplyCost || 0)),
    recentInterest: Math.max(0, Number(saved?.recentInterest || 0)),
    recentSales: Math.max(0, Number(saved?.recentSales || 0)),
    recentPriceRejects: Math.max(0, Number(saved?.recentPriceRejects || 0)),
    recentToleranceTotal: Math.max(0, Number(saved?.recentToleranceTotal || 0)),
    recentToleranceWeight: Math.max(0, Number(saved?.recentToleranceWeight || 0)),
    orders: Math.max(0, Number(saved?.orders || 0)),
    deliveries: Math.max(0, Number(saved?.deliveries || 0)),
    orderBlocked: false
  };
}

function transitNetwork(mode = state.transit.activeMode) {
  return state.transit.networks[mode];
}

function createTransitStop(mode = "bus", saved = {}) {
  const parsedNumber = Number(String(saved.stopId || "").split("-").pop());
  const hasSavedNumber = Number.isFinite(parsedNumber) && parsedNumber > 0;
  if (hasSavedNumber) stopSequence = Math.max(stopSequence, parsedNumber);
  const number = hasSavedNumber ? parsedNumber : ++stopSequence;
  return {
    type: TRANSIT_MODE_CONFIGS[mode].stopTool,
    transitMode: mode,
    stopId: saved.stopId || `${mode}-${number}`,
    name: saved.name || `${TRANSIT_MODE_CONFIGS[mode].label}停 ${number}`,
    waiting: Math.max(0, Number(saved.waiting) || 0),
    waitingAccumulator: Math.max(0, Number(saved.waitingAccumulator) || 0),
    usage: Math.max(0, Number(saved.usage) || 0),
    boarded: Math.max(0, Number(saved.boarded) || 0),
    lastBoarding: Math.max(0, Number(saved.lastBoarding) || 0)
  };
}

function registerTransitStop(stop) {
  const network = transitNetwork(stop.transitMode || "bus");
  if (!network.routeStopIds.includes(stop.stopId)) network.routeStopIds.push(stop.stopId);
}

function resetTransitVehicles(mode) {
  if (mode === "monorail") state.monorails = [];
  else if (mode === "park_train") state.parkTrains = [];
  else state.buses = [];
}

function cloneTransitState() {
  return JSON.parse(JSON.stringify(state.transit));
}

function restoreTransitState(savedTransit) {
  const restoreNetwork = mode => {
    const config = TRANSIT_MODE_CONFIGS[mode];
    const savedNetwork = savedTransit?.networks?.[mode];
    const stopIds = transitStops(mode).map(tile => tile.object.stopId);
    return {
      routeStopIds: Array.isArray(savedNetwork?.routeStopIds) ? [...savedNetwork.routeStopIds] : [...stopIds],
      fleet: clamp(Math.round(Number(savedNetwork?.fleet ?? 1)), 1, mode === "bus" ? 6 : mode === "monorail" ? 2 : 1),
      interval: clamp(Number(savedNetwork?.interval ?? (mode === "bus" ? 7 : mode === "monorail" ? 9 : 11)), config.minInterval, config.maxInterval),
      totalRiders: Math.max(0, Number(savedNetwork?.totalRiders) || 0),
      entranceWaiting: clamp(Number(savedNetwork?.entranceWaiting ?? (mode === "bus" ? 3 : 0)), 0, 60),
      demandAccumulator: clamp(Number(savedNetwork?.demandAccumulator) || 0, 0, .999),
      crowdingEvents: Math.max(0, Number(savedNetwork?.crowdingEvents) || 0)
    };
  };
  state.transit = {
    activeMode: TRANSIT_MODE_CONFIGS[savedTransit?.activeMode] ? savedTransit.activeMode : "bus",
    networks: {
      bus: restoreNetwork("bus"),
      monorail: restoreNetwork("monorail"),
      park_train: restoreNetwork("park_train")
    }
  };
  syncTransitRoute("bus");
  syncTransitRoute("monorail");
  syncTransitRoute("park_train");
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(innerWidth * dpr);
  canvas.height = Math.floor(innerHeight * dpr);
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (!camera.ready) {
    camera.x = innerWidth * 0.5;
    camera.y = innerHeight * 0.18;
    camera.ready = true;
  }
}
window.addEventListener("resize", resize);
resize();

function iso(x, y, z = 0) {
  return {
    x: camera.x + (x - y) * TILE_W * 0.5 * camera.zoom,
    y: camera.y + (x + y) * TILE_H * 0.5 * camera.zoom - z * camera.zoom
  };
}

function screenToTile(px, py) {
  const sx = (px - camera.x) / camera.zoom;
  const sy = (py - camera.y) / camera.zoom;
  const x = Math.floor(sy / TILE_H + sx / TILE_W);
  const y = Math.floor(sy / TILE_H - sx / TILE_W);
  if (x < 0 || y < 0 || x >= W || y >= H) return null;
  return tileAt(x, y);
}

function setZoom(nextZoom, anchorX = innerWidth / 2, anchorY = innerHeight / 2) {
  const old = camera.zoom;
  camera.zoom = clamp(nextZoom, .45, 2.1);
  camera.x = anchorX - (anchorX - camera.x) * (camera.zoom / old);
  camera.y = anchorY - (anchorY - camera.y) * (camera.zoom / old);
}

function diamond(cx, cy, fill, stroke = colors.edge) {
  const w = TILE_W * camera.zoom;
  const h = TILE_H * camera.zoom;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + w / 2, cy + h / 2);
  ctx.lineTo(cx, cy + h);
  ctx.lineTo(cx - w / 2, cy + h / 2);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = Math.max(1, camera.zoom);
  ctx.stroke();
}

function tileHygieneRisk(tile) {
  if (!tile) return 0;
  const bin = tools[tile.object?.type]?.amenity === "bin" ? tile.object : null;
  const binRisk = bin ? Number(bin.fill || 0) / Math.max(1, Number(bin.maxFill || tools.trash_bin.maxFill || 24)) * 70 : 0;
  const nearbyLitter = neighbors(tile).reduce((sum, neighbor) => sum + Number(neighbor.litter || 0), 0) * 5;
  return clamp(Number(tile.litter || 0) * 24 + binRisk + nearbyLitter, 0, 100);
}

function tileRecentSatisfaction(tile) {
  const weight = Number(tile?.moodWeight || 0);
  return weight > .04 ? clamp(Number(tile.moodTotal || 0) / weight, 0, 100) : null;
}

function analysisDrawScale() {
  return {
    maxTraffic: Math.max(.1, ...state.tiles.map(tile => Number(tile.traffic || 0)))
  };
}

function analysisTileValue(tile, mode = analysisMode, scale = analysisDrawScale()) {
  if (mode === "crowding") return tile.path && Number(tile.traffic || 0) > .02
    ? clamp(Number(tile.traffic || 0) / scale.maxTraffic, 0, 1)
    : null;
  if (mode === "hygiene") return tile.path || Number(tile.litter || 0) > 0 || tools[tile.object?.type]?.amenity === "bin"
    ? tileHygieneRisk(tile) / 100
    : null;
  if (mode === "satisfaction") {
    const satisfaction = tileRecentSatisfaction(tile);
    return satisfaction === null ? null : satisfaction / 100;
  }
  return null;
}

function analysisTileColor(mode, value) {
  if (value === null) return null;
  if (mode === "satisfaction") {
    if (value < .6) return "rgba(239,111,97,.48)";
    if (value < .76) return "rgba(241,184,79,.38)";
    return "rgba(102,184,107,.34)";
  }
  if (value < .34) return "rgba(102,184,107,.2)";
  if (value < .68) return "rgba(241,184,79,.36)";
  return "rgba(239,111,97,.48)";
}

function drawAnalysisOverlay(tile, point, scale) {
  const value = analysisTileValue(tile, analysisMode, scale);
  const fill = analysisTileColor(analysisMode, value);
  if (!fill) return;
  diamond(point.x, point.y, fill, "rgba(255,255,255,.16)");
}

function drawWorld() {
  const grad = ctx.createLinearGradient(0, 0, 0, innerHeight);
  grad.addColorStop(0, "#bfead9");
  grad.addColorStop(1, "#dff2c8");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  const analysisScale = analysisDrawScale();
  for (const tile of state.tiles) {
    const p = iso(tile.x, tile.y);
    let fill = (tile.x + tile.y) % 2 ? colors.grassA : colors.grassB;
    if (tile.terrain === "water") fill = colors.water;
    if (tile.path) fill = colors.path;
    diamond(p.x, p.y, fill);
    if (tile.path) drawPathTrim(p.x, p.y);
    if (tile.terrain === "water") drawWater(p.x, p.y);
    drawAnalysisOverlay(tile, p, analysisScale);
    if (tile.litter > 0.5) drawLitter(p.x, p.y, tile.litter);
    if (tile.transitTrack === "monorail") drawMonorailTrack(tile);
    if (tile.transitTrack === "park_train") drawParkTrainTrack(tile);
    if (tile.object) drawObject(tile, p);
    if (isTileInRemovalRange(tile)) {
      const valid = getPlacementStatus(tile, "remove").valid;
      diamond(p.x, p.y, valid ? "rgba(239,111,97,.42)" : "rgba(120,128,136,.16)", valid ? "#d84f4f" : "rgba(38,49,63,.24)");
    }
    if (hovered === tile) drawPlacementPreview(tile, p);
  }
  drawTransitRoute();
  drawBuses();
  drawMonorails();
  drawParkTrains();
  drawPeople();
}

function drawTransitRoute() {
  const plan = getTransitRoutePlan("bus");
  if (plan.connectedStopIds.length < 1 || plan.tiles.length < 2) return;
  ctx.save();
  ctx.strokeStyle = selectedTile?.object?.transitMode === "bus"
    ? "rgba(27,126,151,.72)"
    : "rgba(27,126,151,.28)";
  ctx.lineWidth = (selectedTile?.object?.transitMode === "bus" ? 5 : 3) * camera.zoom;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.setLineDash([7 * camera.zoom, 5 * camera.zoom]);
  ctx.beginPath();
  plan.tiles.forEach((tile, index) => {
    const point = iso(tile.x, tile.y);
    const x = point.x;
    const y = point.y + TILE_H * .5 * camera.zoom;
    if (!index) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function drawMonorailTrack(tile) {
  const z = camera.zoom;
  const ground = iso(tile.x + .5, tile.y + .5);
  const elevated = iso(tile.x + .5, tile.y + .5, 30);
  ctx.save();
  ctx.strokeStyle = "rgba(38,49,63,.48)";
  ctx.lineWidth = 3 * z;
  ctx.beginPath();
  ctx.moveTo(ground.x, ground.y + 2 * z);
  ctx.lineTo(elevated.x, elevated.y + 4 * z);
  ctx.stroke();
  ctx.fillStyle = "#fff7df";
  ctx.beginPath();
  ctx.ellipse(ground.x, ground.y + 4 * z, 7 * z, 3 * z, 0, 0, Math.PI * 2);
  ctx.fill();
  for (const neighbor of neighbors(tile).filter(candidate => candidate.transitTrack === "monorail")) {
    const next = iso(neighbor.x + .5, neighbor.y + .5, 30);
    ctx.strokeStyle = "rgba(38,49,63,.28)";
    ctx.lineWidth = 8 * z;
    ctx.beginPath();
    ctx.moveTo(elevated.x, elevated.y);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
    ctx.strokeStyle = "#fff7df";
    ctx.lineWidth = 4 * z;
    ctx.stroke();
    ctx.strokeStyle = "#49abc2";
    ctx.lineWidth = 1.5 * z;
    ctx.stroke();
  }
  ctx.restore();
}

function drawParkTrainTrack(tile) {
  const z = camera.zoom;
  const center = iso(tile.x + .5, tile.y + .5, 2);
  ctx.save();
  ctx.fillStyle = "#8b6a42";
  ctx.beginPath();
  ctx.ellipse(center.x, center.y, 12 * z, 5 * z, 0, 0, Math.PI * 2);
  ctx.fill();
  for (const neighbor of neighbors(tile).filter(candidate => candidate.transitTrack === "park_train")) {
    const next = iso(neighbor.x + .5, neighbor.y + .5, 2);
    ctx.strokeStyle = "#8b6a42";
    ctx.lineWidth = 9 * z;
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
    ctx.strokeStyle = "#26313f";
    ctx.lineWidth = 4 * z;
    ctx.stroke();
    ctx.strokeStyle = "#f1b84f";
    ctx.lineWidth = 1.2 * z;
    ctx.stroke();
  }
  ctx.restore();
}

function isTileInRemovalRange(tile) {
  if (!mouse.down || mouse.mode !== "range-remove" || !mouse.rangeStart || !mouse.rangeEnd) return false;
  const minX = Math.min(mouse.rangeStart.x, mouse.rangeEnd.x);
  const maxX = Math.max(mouse.rangeStart.x, mouse.rangeEnd.x);
  const minY = Math.min(mouse.rangeStart.y, mouse.rangeEnd.y);
  const maxY = Math.max(mouse.rangeStart.y, mouse.rangeEnd.y);
  return tile.x >= minX && tile.x <= maxX && tile.y >= minY && tile.y <= maxY;
}

function drawPathTrim(x, y) {
  const w = TILE_W * camera.zoom;
  const h = TILE_H * camera.zoom;
  ctx.strokeStyle = "rgba(168,125,72,.34)";
  ctx.lineWidth = 2 * camera.zoom;
  ctx.beginPath();
  ctx.moveTo(x - w * .24, y + h * .5);
  ctx.lineTo(x, y + h * .25);
  ctx.lineTo(x + w * .24, y + h * .5);
  ctx.stroke();
}

function drawWater(x, y) {
  ctx.strokeStyle = "rgba(255,255,255,.42)";
  ctx.lineWidth = Math.max(1, camera.zoom);
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.arc(x + i * 14 * camera.zoom, y + 18 * camera.zoom, 8 * camera.zoom, .2, 2.4);
    ctx.stroke();
  }
}

function drawPlacementPreview(tile, p) {
  if (selectedTool === "inspect") {
    diamond(p.x, p.y, "rgba(255,255,255,.28)", "rgba(38,49,63,.52)");
    return;
  }
  const status = getPlacementStatus(tile, selectedTool);
  if (selectedTool === "remove") {
    diamond(p.x, p.y, status.valid ? "rgba(239,111,97,.34)" : "rgba(120,128,136,.18)", status.valid ? "#d84f4f" : "rgba(38,49,63,.32)");
    return;
  }
  if (!status.valid) {
    diamond(p.x, p.y, "rgba(239,111,97,.32)", "#d84f4f");
    return;
  }
  if (selectedTool === "path") {
    diamond(p.x, p.y, "rgba(244,221,176,.78)", "rgba(69,145,88,.9)");
    drawPathTrim(p.x, p.y);
    return;
  }
  if (selectedTool === "monorail_track") {
    diamond(p.x, p.y, "rgba(73,171,194,.18)", "rgba(69,145,88,.9)");
    drawMonorailTrack({ ...tile, transitTrack: "monorail" });
    return;
  }
  if (selectedTool === "train_track") {
    diamond(p.x, p.y, "rgba(139,106,66,.18)", "rgba(69,145,88,.9)");
    drawParkTrainTrack({ ...tile, transitTrack: "park_train" });
    return;
  }
  if (selectedTool === "water") {
    diamond(p.x, p.y, "rgba(89,185,200,.72)", "rgba(69,145,88,.9)");
    drawWater(p.x, p.y);
    return;
  }
  diamond(p.x, p.y, "rgba(99,184,107,.24)", "rgba(69,145,88,.9)");
  const preview = {
    type: selectedTool,
    queue: [],
    riders: [],
    timer: 0,
    totalRides: 0,
    condition: 100,
    broken: false
  };
  ctx.save();
  ctx.globalAlpha = .52;
  drawObject({ object: preview }, p);
  ctx.restore();
}

function drawLitter(x, y, amount) {
  ctx.fillStyle = `rgba(117,88,56,${Math.min(.5, amount / 9)})`;
  ctx.fillRect(x + 4 * camera.zoom, y + 18 * camera.zoom, 4 * camera.zoom, 3 * camera.zoom);
  ctx.fillRect(x - 12 * camera.zoom, y + 22 * camera.zoom, 3 * camera.zoom, 3 * camera.zoom);
}

function drawObject(tile, p) {
  const type = tile.object.type;
  if (tools[type]?.ride) drawRide(type, p, tile.object);
  if (type === "bus_stop") drawBusStop(p, tile.object);
  if (type === "monorail_station") drawMonorailStation(p, tile.object);
  if (type === "train_station") drawParkTrainStation(p, tile.object);
  if (tools[type]?.shop) drawKiosk(p, tile.object);
  if (type === "bench") drawBench(p, tile.object);
  if (type === "trash_bin") drawTrashBin(p, tile.object);
  if (type === "toilet") drawToilet(p, tile.object);
  if (type === "tree") drawTree(p);
  if (type === "shrub") drawShrub(p);
  if (type === "flower") drawFlowerBed(p);
  if (type === "palm") drawPalm(p);
  if (type === "decor") drawDecor(p);
}

function drawMonorailStation(p, stop = {}) {
  const z = camera.zoom;
  ctx.save();
  ctx.translate(p.x, p.y + 18 * z);
  drawSoftShadow(0, 4 * z, 31 * z, 10 * z, .16);
  ctx.fillStyle = "#26313f";
  ctx.fillRect(-23 * z, -31 * z, 4 * z, 34 * z);
  ctx.fillRect(19 * z, -31 * z, 4 * z, 34 * z);
  ctx.fillStyle = "#fff7df";
  roundRect(-31 * z, -39 * z, 62 * z, 13 * z, 3 * z);
  ctx.fill();
  ctx.strokeStyle = "#49abc2";
  ctx.lineWidth = 3 * z;
  ctx.stroke();
  ctx.fillStyle = "#ef6f61";
  roundRect(-17 * z, -25 * z, 34 * z, 8 * z, 2 * z);
  ctx.fill();
  const order = transitNetwork("monorail")?.routeStopIds.indexOf(stop.stopId) ?? -1;
  if (order >= 0) drawRideStatusBadge(String(order + 1), -36 * z, -57 * z, "#26313f");
  if (Number(stop.waiting || 0) > 0) drawRideStatusBadge(String(Math.floor(stop.waiting)), 5 * z, -57 * z, stop.waiting >= 18 ? "#d84f4f" : "#49abc2");
  ctx.restore();
}

function drawParkTrainStation(p, stop = {}) {
  const z = camera.zoom;
  ctx.save();
  ctx.translate(p.x, p.y + 18 * z);
  drawSoftShadow(0, 5 * z, 30 * z, 9 * z, .18);
  drawHouse(0, 0, "#fff7df", "#4f9e5a");
  ctx.fillStyle = "#8b6a42";
  ctx.fillRect(-30 * z, -4 * z, 60 * z, 6 * z);
  ctx.fillStyle = "#49abc2";
  ctx.beginPath();
  ctx.arc(0, -28 * z, 7 * z, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#fff7df";
  ctx.lineWidth = 1.5 * z;
  ctx.beginPath();
  ctx.moveTo(0, -28 * z);
  ctx.lineTo(0, -33 * z);
  ctx.moveTo(0, -28 * z);
  ctx.lineTo(4 * z, -26 * z);
  ctx.stroke();
  const order = transitNetwork("park_train")?.routeStopIds.indexOf(stop.stopId) ?? -1;
  if (order >= 0) drawRideStatusBadge(String(order + 1), -36 * z, -53 * z, "#26313f");
  if (Number(stop.waiting || 0) > 0) drawRideStatusBadge(String(Math.floor(stop.waiting)), 5 * z, -53 * z, stop.waiting >= 14 ? "#d84f4f" : "#4f9e5a");
  ctx.restore();
}

function drawSoftShadow(x, y, rx, ry, alpha = .18) {
  ctx.fillStyle = `rgba(38,49,63,${alpha})`;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawFlag(x, y, color, flip = 1) {
  const z = camera.zoom;
  ctx.strokeStyle = "#26313f";
  ctx.lineWidth = 1.5 * z;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - 18 * z);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - 18 * z);
  ctx.lineTo(x + flip * 13 * z, y - 14 * z);
  ctx.lineTo(x, y - 10 * z);
  ctx.closePath();
  ctx.fill();
}

function drawBulbs(points, offset = 0) {
  const z = camera.zoom;
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    ctx.fillStyle = (i + offset) % 2 ? "#fff7df" : "#f1b84f";
    ctx.beginPath();
    ctx.arc(x * z, y * z, 2.4 * z, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawRide(type, p, ride) {
  const z = camera.zoom;
  const t = performance.now() / 1000;
  ctx.save();
  ctx.translate(p.x, p.y + 12 * z);
  drawSoftShadow(0, 20 * z, 38 * z, 12 * z, .18);
  if (type === "carousel") {
    drawCylinder(0, 12 * z, 30 * z, 14 * z, "#fff7df", "#ef6f61");
    drawCylinder(0, 4 * z, 24 * z, 8 * z, "#ffd66b", "#d95b61");
    ctx.fillStyle = "#fff7df";
    ctx.beginPath();
    ctx.moveTo(0, -43 * z);
    ctx.lineTo(36 * z, -5 * z);
    ctx.lineTo(-36 * z, -5 * z);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#ef6f61";
    ctx.beginPath();
    ctx.moveTo(0, -43 * z);
    ctx.lineTo(14 * z, -5 * z);
    ctx.lineTo(-14 * z, -5 * z);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = colors.edge;
    ctx.stroke();
    ctx.strokeStyle = "#fff7df";
    ctx.lineWidth = 2 * z;
    ctx.beginPath();
    ctx.moveTo(0, -39 * z);
    ctx.lineTo(0, 7 * z);
    ctx.stroke();
    drawFlag(0, -43 * z, "#49abc2", 1);
    for (let i = 0; i < 6; i++) {
      const a = t * 1.6 + i;
      const x = Math.cos(a) * 22 * z;
      const y = -1 * z + Math.sin(a) * 6 * z;
      ctx.strokeStyle = "#fff7df";
      ctx.lineWidth = 1.5 * z;
      ctx.beginPath();
      ctx.moveTo(x, -16 * z);
      ctx.lineTo(x, y + 10 * z);
      ctx.stroke();
      ctx.fillStyle = i % 2 ? "#49abc2" : "#9bcf67";
      roundRect(x - 6 * z, y + 4 * z, 12 * z, 8 * z, 4 * z);
      ctx.fill();
      ctx.fillStyle = "#fff7df";
      ctx.fillRect(x - 3 * z, y + 1 * z, 6 * z, 5 * z);
    }
  } else if (type === "wheel") {
    drawCylinder(0, 18 * z, 26 * z, 11 * z, "#fff7df", "#49abc2");
    ctx.strokeStyle = "#26313f";
    ctx.lineWidth = 4 * z;
    ctx.beginPath();
    ctx.moveTo(-22 * z, 12 * z);
    ctx.lineTo(0, -28 * z);
    ctx.lineTo(22 * z, 12 * z);
    ctx.stroke();
    ctx.strokeStyle = "#26313f";
    ctx.lineWidth = 3 * z;
    ctx.beginPath();
    ctx.arc(0, -30 * z, 35 * z, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "#fff7df";
    ctx.lineWidth = 1.5 * z;
    ctx.beginPath();
    ctx.arc(0, -30 * z, 28 * z, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 8; i++) {
      const a = t * .55 + i * Math.PI / 4;
      ctx.beginPath();
      ctx.moveTo(0, -30 * z);
      ctx.lineTo(Math.cos(a) * 35 * z, -30 * z + Math.sin(a) * 35 * z);
      ctx.stroke();
      ctx.fillStyle = i % 2 ? "#ef6f61" : "#f1b84f";
      roundRect(Math.cos(a) * 35 * z - 6 * z, -30 * z + Math.sin(a) * 35 * z - 5 * z, 12 * z, 9 * z, 3 * z);
      ctx.fill();
    }
    drawFlag(-25 * z, -3 * z, "#ef6f61", -1);
    drawFlag(25 * z, -3 * z, "#f1b84f", 1);
  } else if (type === "coaster") {
    drawHouse(0, 5 * z, "#fff7df", "#f1b84f");
    ctx.strokeStyle = "#ef6f61";
    ctx.lineWidth = 7 * z;
    ctx.beginPath();
    ctx.moveTo(-36 * z, -4 * z);
    ctx.bezierCurveTo(-18 * z, -52 * z, 20 * z, -52 * z, 38 * z, -4 * z);
    ctx.stroke();
    ctx.strokeStyle = "#fff7df";
    ctx.lineWidth = 2 * z;
    ctx.stroke();
    for (const x of [-28, -14, 14, 28]) {
      ctx.strokeStyle = "#26313f";
      ctx.lineWidth = 2 * z;
      ctx.beginPath();
      ctx.moveTo(x * z, -5 * z);
      ctx.lineTo(x * .55 * z, 16 * z);
      ctx.stroke();
    }
    const carX = Math.sin(t * 1.4) * 30 * z;
    ctx.fillStyle = "#26313f";
    roundRect(carX - 10 * z, -32 * z + Math.cos(t * 1.4) * 16 * z, 20 * z, 9 * z, 4 * z);
    ctx.fill();
    ctx.fillStyle = "#49abc2";
    ctx.fillRect(carX - 6 * z, -30 * z + Math.cos(t * 1.4) * 16 * z, 12 * z, 4 * z);
  } else if (type === "teacups") {
    drawCylinder(0, 13 * z, 32 * z, 11 * z, "#fff7df", "#9bcf67");
    drawBulbs([[-23, 8],[-12, 4],[0, 2],[12, 4],[23, 8]], Math.floor(t * 4));
    for (let i = 0; i < 4; i++) {
      const a = t * 1.8 + i * Math.PI / 2;
      drawCup(Math.cos(a) * 19 * z, 6 * z + Math.sin(a) * 8 * z, i % 2 ? "#ef6f61" : "#49abc2");
    }
    drawFlag(0, -4 * z, "#f1b84f", 1);
  }
  if (ride.open === false) drawRideStatusBadge("休止", -31 * z, -64 * z, "#596574");
  else if (ride.broken) drawRideStatusBadge("故障", -31 * z, -64 * z, "#d84f4f");
  if (ride.queue.length) drawQueueBadge(ride.queue.length, -30 * z, -42 * z);
  ctx.restore();
}

function drawCylinder(x, y, rx, h, top, side) {
  ctx.fillStyle = side;
  ctx.fillRect(x - rx, y - h / 2, rx * 2, h);
  ctx.fillStyle = top;
  ctx.beginPath();
  ctx.ellipse(x, y - h / 2, rx, h / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = colors.edge;
  ctx.stroke();
}

function drawHouse(x, y, wall, roof) {
  const z = camera.zoom;
  ctx.fillStyle = wall;
  roundRect(x - 24 * z, y - 18 * z, 48 * z, 28 * z, 3 * z);
  ctx.fill();
  ctx.fillStyle = roof;
  ctx.beginPath();
  ctx.moveTo(x - 30 * z, y - 18 * z);
  ctx.lineTo(x, y - 42 * z);
  ctx.lineTo(x + 30 * z, y - 18 * z);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = colors.edge;
  ctx.stroke();
}

function drawCup(x, y, color) {
  const z = camera.zoom;
  ctx.fillStyle = "rgba(38,49,63,.14)";
  ctx.beginPath();
  ctx.ellipse(x, y + 5 * z, 11 * z, 4 * z, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, 9 * z, 6 * z, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff7df";
  ctx.beginPath();
  ctx.ellipse(x, y - 2 * z, 6 * z, 3 * z, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawKiosk(p, kiosk = {}) {
  const z = camera.zoom;
  const kind = tools[kiosk.type]?.shopKind || "food";
  const palette = kind === "drink"
    ? { roof: "#49abc2", stripe: "#fff7df", counter: "#79cfcc", flag: "#1b7e97" }
    : kind === "souvenir"
      ? { roof: "#8e6fb5", stripe: "#fff7df", counter: "#ef6f61", flag: "#f1b84f" }
      : { roof: "#ef6f61", stripe: "#fff7df", counter: "#f1b84f", flag: "#f1b84f" };
  ctx.save();
  ctx.translate(p.x, p.y + 18 * z);
  drawSoftShadow(0, 8 * z, 30 * z, 10 * z, .16);
  drawHouse(0, 0, "#fff7df", palette.roof);
  ctx.fillStyle = palette.roof;
  roundRect(-20 * z, -14 * z, 40 * z, 8 * z, 3 * z);
  ctx.fill();
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i % 2 ? palette.stripe : palette.roof;
    ctx.fillRect((-20 + i * 8) * z, -14 * z, 8 * z, 8 * z);
  }
  ctx.fillStyle = palette.counter;
  ctx.fillRect(-13 * z, -10 * z, 26 * z, 10 * z);
  ctx.fillStyle = "#26313f";
  ctx.fillRect(4 * z, -2 * z, 8 * z, 12 * z);
  drawFlag(-24 * z, -14 * z, palette.flag, -1);
  ctx.fillStyle = "#fff7df";
  ctx.font = `900 ${(kind === "souvenir" ? 9 : 12) * z}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(kind === "drink" ? "D" : kind === "souvenir" ? "GIFT" : "S", 0, -27 * z);
  const stock = Number(kiosk.stock ?? shopCapacityForDifficulty(state.difficulty, kiosk.type));
  const maxStock = Number(kiosk.maxStock ?? shopCapacityForDifficulty(state.difficulty, kiosk.type));
  if (!kiosk.open) {
    drawRideStatusBadge("休業", -17 * z, -49 * z, "#596574");
  } else if (stock <= 0) {
    drawRideStatusBadge("売切", -17 * z, -49 * z, "#d84f4f");
  } else if (Number(kiosk.pendingStock || 0) > 0) {
    drawRideStatusBadge("配送", -17 * z, -49 * z, "#1b7e97");
  } else if (stock <= maxStock * .2) {
    drawRideStatusBadge("残少", -17 * z, -49 * z, "#b47a16");
  }
  ctx.restore();
}

function drawBench(p) {
  const z = camera.zoom;
  ctx.save();
  ctx.translate(p.x, p.y + 22 * z);
  drawSoftShadow(0, 1 * z, 24 * z, 7 * z, .15);
  ctx.strokeStyle = "#26313f";
  ctx.lineWidth = 3 * z;
  ctx.beginPath();
  ctx.moveTo(-18 * z, -5 * z);
  ctx.lineTo(-16 * z, 5 * z);
  ctx.moveTo(18 * z, -5 * z);
  ctx.lineTo(16 * z, 5 * z);
  ctx.stroke();
  ctx.fillStyle = "#8b6a42";
  roundRect(-25 * z, -10 * z, 50 * z, 8 * z, 2 * z);
  ctx.fill();
  ctx.fillStyle = "#49abc2";
  roundRect(-24 * z, -23 * z, 48 * z, 9 * z, 3 * z);
  ctx.fill();
  ctx.strokeStyle = "rgba(38,49,63,.28)";
  ctx.lineWidth = 1.5 * z;
  ctx.stroke();
  ctx.restore();
}

function drawTrashBin(p, bin = {}) {
  const z = camera.zoom;
  ctx.save();
  ctx.translate(p.x, p.y + 22 * z);
  drawSoftShadow(0, 1 * z, 13 * z, 5 * z, .15);
  ctx.fillStyle = "#3f8750";
  roundRect(-10 * z, -24 * z, 20 * z, 26 * z, 4 * z);
  ctx.fill();
  ctx.fillStyle = "#f1b84f";
  roundRect(-12 * z, -27 * z, 24 * z, 6 * z, 3 * z);
  ctx.fill();
  ctx.fillStyle = "#fff7df";
  ctx.beginPath();
  ctx.arc(0, -13 * z, 4 * z, 0, Math.PI * 2);
  ctx.fill();
  const fill = Number(bin.fill || 0);
  const maxFill = Number(bin.maxFill || tools.trash_bin.maxFill);
  if (fill >= maxFill * .8) drawRideStatusBadge("満杯", -17 * z, -50 * z, "#d84f4f");
  ctx.restore();
}

function drawToilet(p) {
  const z = camera.zoom;
  ctx.save();
  ctx.translate(p.x, p.y + 18 * z);
  drawSoftShadow(0, 8 * z, 31 * z, 10 * z, .16);
  drawHouse(0, 0, "#fff7df", "#49abc2");
  ctx.fillStyle = "#ef6f61";
  roundRect(-17 * z, -12 * z, 34 * z, 14 * z, 3 * z);
  ctx.fill();
  ctx.fillStyle = "#fff7df";
  ctx.font = `bold ${10 * z}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("WC", 0, -2 * z);
  ctx.fillStyle = "#26313f";
  ctx.fillRect(-18 * z, 2 * z, 13 * z, 8 * z);
  ctx.fillRect(5 * z, 2 * z, 13 * z, 8 * z);
  drawFlag(24 * z, -14 * z, "#f1b84f", 1);
  ctx.restore();
}

function drawBusStop(p, stop = {}) {
  const z = camera.zoom;
  ctx.save();
  ctx.translate(p.x, p.y + 20 * z);
  drawSoftShadow(0, 2 * z, 24 * z, 7 * z, .16);
  ctx.fillStyle = "#26313f";
  ctx.fillRect(-19 * z, -27 * z, 4 * z, 30 * z);
  ctx.fillRect(15 * z, -27 * z, 4 * z, 30 * z);
  ctx.fillStyle = "#49abc2";
  ctx.beginPath();
  ctx.moveTo(-25 * z, -27 * z);
  ctx.lineTo(0, -42 * z);
  ctx.lineTo(25 * z, -27 * z);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(38,49,63,.35)";
  ctx.lineWidth = 1.5 * z;
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,.72)";
  roundRect(-16 * z, -24 * z, 32 * z, 17 * z, 4 * z);
  ctx.fill();
  ctx.fillStyle = "#ef6f61";
  roundRect(-11 * z, -5 * z, 22 * z, 6 * z, 3 * z);
  ctx.fill();
  ctx.fillStyle = "#f1b84f";
  ctx.beginPath();
  ctx.arc(24 * z, -31 * z, 7 * z, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#26313f";
  ctx.font = `${8 * z}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("BUS", 24 * z, -28 * z);
  const order = transitNetwork(stop.transitMode || "bus")?.routeStopIds.indexOf(stop.stopId) ?? -1;
  if (order >= 0) {
    ctx.fillStyle = "#26313f";
    ctx.beginPath();
    ctx.arc(-20 * z, -34 * z, 9 * z, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff8df";
    ctx.font = `bold ${9 * z}px sans-serif`;
    ctx.fillText(String(order + 1), -20 * z, -31 * z);
  }
  if (Number(stop.waiting || 0) > 0) drawRideStatusBadge(String(Math.floor(stop.waiting)), -17 * z, -55 * z, stop.waiting >= 10 ? "#d84f4f" : "#49abc2");
  ctx.restore();
}

function drawTree(p) {
  const z = camera.zoom;
  ctx.save();
  ctx.translate(p.x, p.y + 18 * z);
  drawSoftShadow(0, -1 * z, 18 * z, 7 * z, .14);
  ctx.fillStyle = "#8b6a42";
  ctx.fillRect(-4 * z, -18 * z, 8 * z, 24 * z);
  for (const [x, y, r, c] of [[0,-34,17,"#4f9e5a"],[-12,-26,13,"#66b86b"],[12,-25,14,"#78c46c"]]) {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x * z, y * z, r * z, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,.24)";
    ctx.beginPath();
    ctx.arc((x - r * .25) * z, (y - r * .28) * z, r * .28 * z, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawShrub(p) {
  const z = camera.zoom;
  ctx.save();
  ctx.translate(p.x, p.y + 21 * z);
  drawSoftShadow(0, 0, 19 * z, 6 * z, .14);
  for (const [x, y, r, c] of [[-12,-4,9,"#4f9e5a"],[0,-8,11,"#66b86b"],[12,-4,9,"#78c46c"],[-2,0,8,"#3f8750"]]) {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x * z, y * z, r * z, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "rgba(255,255,255,.28)";
  ctx.beginPath();
  ctx.arc(-5 * z, -12 * z, 4 * z, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawFlowerBed(p) {
  const z = camera.zoom;
  ctx.save();
  ctx.translate(p.x, p.y + 22 * z);
  drawSoftShadow(0, 1 * z, 20 * z, 6 * z, .13);
  drawCylinder(0, 1 * z, 20 * z, 6 * z, "#7bbd68", "#5a9a55");
  const blooms = [
    [-11,-4,"#ef6f61"],[-3,-8,"#f1b84f"],[7,-7,"#49abc2"],
    [13,-2,"#ef6f61"],[-7,2,"#fff7df"],[3,1,"#f1b84f"]
  ];
  for (const [x, y, c] of blooms) {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x * z, y * z, 3.2 * z, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff7df";
    ctx.beginPath();
    ctx.arc(x * z, y * z, 1.1 * z, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawPalm(p) {
  const z = camera.zoom;
  ctx.save();
  ctx.translate(p.x, p.y + 20 * z);
  drawSoftShadow(0, 2 * z, 17 * z, 6 * z, .15);
  ctx.strokeStyle = "#9a7143";
  ctx.lineWidth = 6 * z;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 4 * z);
  ctx.quadraticCurveTo(6 * z, -18 * z, 0, -34 * z);
  ctx.stroke();
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI * .95 + i * Math.PI / 3.1;
    const len = (19 + (i % 2) * 5) * z;
    ctx.strokeStyle = i % 2 ? "#66b86b" : "#4f9e5a";
    ctx.lineWidth = 5 * z;
    ctx.beginPath();
    ctx.moveTo(0, -36 * z);
    ctx.quadraticCurveTo(Math.cos(a) * len * .55, -36 * z + Math.sin(a) * len * .55, Math.cos(a) * len, -36 * z + Math.sin(a) * len);
    ctx.stroke();
  }
  ctx.fillStyle = "#f1b84f";
  ctx.beginPath();
  ctx.arc(2 * z, -31 * z, 4 * z, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawDecor(p) {
  const z = camera.zoom;
  ctx.save();
  ctx.translate(p.x, p.y + 19 * z);
  ctx.strokeStyle = "#26313f";
  ctx.lineWidth = 2 * z;
  ctx.beginPath();
  ctx.moveTo(-16 * z, -2 * z);
  ctx.lineTo(-16 * z, -22 * z);
  ctx.lineTo(15 * z, -18 * z);
  ctx.stroke();
  ctx.fillStyle = "#ef6f61";
  ctx.beginPath();
  ctx.moveTo(-16 * z, -22 * z);
  ctx.lineTo(-5 * z, -19 * z);
  ctx.lineTo(-16 * z, -16 * z);
  ctx.fill();
  ctx.fillStyle = "#f1b84f";
  ctx.beginPath();
  ctx.arc(14 * z, -21 * z, 7 * z, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawQueueBadge(value, x, y) {
  ctx.fillStyle = "#26313f";
  roundRect(x, y, 26 * camera.zoom, 18 * camera.zoom, 8 * camera.zoom);
  ctx.fill();
  ctx.fillStyle = "#fff8df";
  ctx.font = `${11 * camera.zoom}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(value, x + 13 * camera.zoom, y + 13 * camera.zoom);
}

function drawRideStatusBadge(value, x, y, color) {
  ctx.fillStyle = color;
  roundRect(x, y, 34 * camera.zoom, 18 * camera.zoom, 7 * camera.zoom);
  ctx.fill();
  ctx.fillStyle = "#fff8df";
  ctx.font = `bold ${9 * camera.zoom}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(value, x + 17 * camera.zoom, y + 13 * camera.zoom);
}

function drawPeople() {
  const people = [
    ...state.guests.map((person, index) => ({ kind: "guest", person, index })),
    ...state.staffAgents.map(person => ({ kind: "staff", person, index: 0 }))
  ].sort((a, b) => (a.person.pos.x + a.person.pos.y) - (b.person.pos.x + b.person.pos.y));
  for (const entry of people) {
    const p = iso(entry.person.pos.x + .5, entry.person.pos.y + .5, entry.kind === "staff" ? 10 : 8);
    if (entry.kind === "staff") drawStaffMember(p.x, p.y, entry.person);
    else drawGuest(p.x, p.y, entry.person, entry.index);
  }
}

function drawStaffMember(x, y, agent) {
  const z = camera.zoom;
  const cleaner = agent.role === "cleaner";
  const uniform = cleaner ? "#49abc2" : "#f1b84f";
  const working = ["cleaning", "repairing"].includes(agent.state);
  ctx.save();
  ctx.translate(x, y);
  drawSoftShadow(0, 11 * z, 9 * z, 3 * z, .16);
  ctx.strokeStyle = "#26313f";
  ctx.lineWidth = 2 * z;
  ctx.beginPath();
  ctx.moveTo(-3 * z, 5 * z);
  ctx.lineTo(-5 * z, 12 * z);
  ctx.moveTo(3 * z, 5 * z);
  ctx.lineTo(5 * z, 12 * z);
  ctx.stroke();
  ctx.fillStyle = uniform;
  roundRect(-7 * z, -8 * z, 14 * z, 16 * z, 5 * z);
  ctx.fill();
  ctx.fillStyle = "#f4c9a4";
  ctx.beginPath();
  ctx.arc(0, -13 * z, 6 * z, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#26313f";
  ctx.beginPath();
  ctx.arc(0, -16 * z, 6 * z, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = uniform;
  ctx.fillRect(-7 * z, -18 * z, 14 * z, 3 * z);
  if (cleaner) {
    ctx.strokeStyle = "#8b6a42";
    ctx.lineWidth = 2 * z;
    ctx.beginPath();
    ctx.moveTo(7 * z, -4 * z);
    ctx.lineTo(12 * z, 10 * z);
    ctx.stroke();
    ctx.fillStyle = "#66b86b";
    ctx.fillRect(8 * z, 8 * z, 9 * z, 4 * z);
  } else {
    ctx.strokeStyle = "#7b8790";
    ctx.lineWidth = 3 * z;
    ctx.beginPath();
    ctx.moveTo(7 * z, -2 * z);
    ctx.lineTo(13 * z, 6 * z);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(7 * z, -3 * z, 3 * z, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (working) drawRideStatusBadge(cleaner ? "清掃" : "整備", -17 * z, -41 * z, cleaner ? "#1b7e97" : "#b47a16");
  if (agent.state === "resting") drawRideStatusBadge("休憩", -17 * z, -41 * z, "#64727c");
  ctx.restore();
}

function transitVehicleSegment(vehicle, route) {
  const distance = Number(vehicle?.distance);
  if (route.length < 2 || !Number.isFinite(distance)) return null;
  const baseIndex = Math.floor(distance);
  const index = ((baseIndex % route.length) + route.length) % route.length;
  const nextIndex = (index + 1) % route.length;
  const from = route[index];
  const to = route[nextIndex];
  if (!from || !to) return null;
  return { from, to, progress: distance - baseIndex };
}

function drawBuses() {
  const route = getBusRoute();
  for (const bus of state.buses) {
    const segment = transitVehicleSegment(bus, route);
    if (!segment) continue;
    const { from, to, progress } = segment;
    const x = from.x + (to.x - from.x) * progress + .5;
    const y = from.y + (to.y - from.y) * progress + .5;
    const p = iso(x, y, 9);
    drawBus(p.x, p.y, to.x - from.x, to.y - from.y, bus);
  }
}

function drawMonorails() {
  const route = getTransitRoutePlan("monorail").tiles;
  for (const train of state.monorails) {
    const segment = transitVehicleSegment(train, route);
    if (!segment) continue;
    const { from, to, progress } = segment;
    const x = from.x + (to.x - from.x) * progress + .5;
    const y = from.y + (to.y - from.y) * progress + .5;
    const p = iso(x, y, 36);
    drawMonorailVehicle(p.x, p.y, to.x - from.x, to.y - from.y, train);
  }
}

function drawMonorailVehicle(x, y, dx, dy, train) {
  const z = camera.zoom;
  const horizontal = Math.abs(dx) >= Math.abs(dy);
  ctx.save();
  ctx.translate(x, y);
  drawSoftShadow(0, 12 * z, 24 * z, 5 * z, .2);
  ctx.fillStyle = "#fff7df";
  roundRect(-25 * z, -10 * z, 50 * z, 18 * z, 7 * z);
  ctx.fill();
  ctx.strokeStyle = "#26313f";
  ctx.lineWidth = 1.5 * z;
  ctx.stroke();
  ctx.fillStyle = "#49abc2";
  roundRect(-18 * z, -7 * z, 28 * z, 7 * z, 2 * z);
  ctx.fill();
  ctx.fillStyle = "#ef6f61";
  ctx.fillRect(horizontal ? -25 * z : 19 * z, 1 * z, 6 * z, 4 * z);
  ctx.fillStyle = "#26313f";
  ctx.fillRect(-5 * z, 8 * z, 10 * z, 5 * z);
  if (train.passengers > 0) drawRideStatusBadge(String(train.passengers), 7 * z, -27 * z, train.passengers >= TRANSIT_MODE_CONFIGS.monorail.capacity ? "#d84f4f" : "#26313f");
  ctx.restore();
}

function drawParkTrains() {
  const route = getTransitRoutePlan("park_train").tiles;
  for (const train of state.parkTrains) {
    const segment = transitVehicleSegment(train, route);
    if (!segment) continue;
    const { from, to, progress } = segment;
    const x = from.x + (to.x - from.x) * progress + .5;
    const y = from.y + (to.y - from.y) * progress + .5;
    const p = iso(x, y, 7);
    drawParkTrainVehicle(p.x, p.y, to.x - from.x, to.y - from.y, train);
  }
}

function drawParkTrainVehicle(x, y, dx, dy, train) {
  const z = camera.zoom;
  const horizontal = Math.abs(dx) >= Math.abs(dy);
  ctx.save();
  ctx.translate(x, y);
  drawSoftShadow(0, 8 * z, 26 * z, 6 * z, .22);
  ctx.fillStyle = "#ef6f61";
  roundRect(-23 * z, -10 * z, 28 * z, 17 * z, 4 * z);
  ctx.fill();
  ctx.fillStyle = "#26313f";
  ctx.fillRect((horizontal ? -18 : -2) * z, -19 * z, 8 * z, 11 * z);
  ctx.fillStyle = "#f1b84f";
  ctx.beginPath();
  ctx.arc((horizontal ? 7 : 10) * z, -4 * z, 7 * z, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff7df";
  roundRect(7 * z, -8 * z, 26 * z, 14 * z, 3 * z);
  ctx.fill();
  ctx.strokeStyle = "#4f9e5a";
  ctx.lineWidth = 3 * z;
  ctx.stroke();
  ctx.fillStyle = "#26313f";
  for (const wheelX of [-15, 0, 14, 27]) {
    ctx.beginPath();
    ctx.arc(wheelX * z, 7 * z, 3 * z, 0, Math.PI * 2);
    ctx.fill();
  }
  if (train.passengers > 0) drawRideStatusBadge(String(train.passengers), 8 * z, -28 * z, train.passengers >= TRANSIT_MODE_CONFIGS.park_train.capacity ? "#d84f4f" : "#4f9e5a");
  ctx.restore();
}

function drawBus(x, y, dx, dy, bus = {}) {
  const z = camera.zoom;
  const horizontal = Math.abs(dx) >= Math.abs(dy);
  ctx.save();
  ctx.translate(x, y + 8 * z);
  drawSoftShadow(0, 8 * z, 18 * z, 5 * z, .22);
  ctx.fillStyle = "#f1b84f";
  roundRect(-18 * z, -11 * z, 36 * z, 18 * z, 6 * z);
  ctx.fill();
  ctx.fillStyle = "#fff7df";
  ctx.fillRect(-11 * z, -7 * z, 8 * z, 6 * z);
  ctx.fillRect(0, -7 * z, 8 * z, 6 * z);
  ctx.fillStyle = "#ef6f61";
  ctx.fillRect(horizontal ? -18 * z : 13 * z, -2 * z, 5 * z, 5 * z);
  ctx.fillStyle = "#26313f";
  ctx.beginPath();
  ctx.arc(-10 * z, 7 * z, 3 * z, 0, Math.PI * 2);
  ctx.arc(11 * z, 7 * z, 3 * z, 0, Math.PI * 2);
  ctx.fill();
  if (Number(bus.passengers || 0) > 0) {
    ctx.fillStyle = bus.passengers >= TRANSIT_MODE_CONFIGS.bus.capacity ? "#d84f4f" : "#26313f";
    ctx.beginPath();
    ctx.arc(16 * z, -13 * z, 7 * z, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff8df";
    ctx.font = `bold ${7 * z}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(String(bus.passengers), 16 * z, -10.5 * z);
  }
  ctx.restore();
}

function drawGuest(x, y, guest, index) {
  const z = camera.zoom;
  const bob = Math.sin(performance.now() / 240 + index) * 1.2 * z;
  drawSoftShadow(x, y + 14 * z, 7 * z, 3 * z, .2);
  ctx.fillStyle = "#26313f";
  ctx.fillRect(x - 2 * z, y + 4 * z + bob, 4 * z, 10 * z);
  ctx.fillStyle = guest.color;
  roundRect(x - 5 * z, y - 1 * z + bob, 10 * z, 12 * z, 4 * z);
  ctx.fill();
  ctx.fillStyle = "#ffd7a8";
  ctx.beginPath();
  ctx.arc(x, y - 6 * z + bob, 5 * z, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = guest.archetype === "thrill" || index % 3 === 0 ? "#f1b84f" : "#26313f";
  ctx.beginPath();
  ctx.ellipse(x, y - 10 * z + bob, 6 * z, 3 * z, 0, 0, Math.PI * 2);
  ctx.fill();
  if (guest.archetype === "foodie" || index % 4 === 0) {
    ctx.fillStyle = "#fff7df";
    ctx.beginPath();
    ctx.arc(x + 6 * z, y + 3 * z + bob, 3 * z, 0, Math.PI * 2);
    ctx.fill();
  }
  if (guest.archetype === "family") {
    ctx.fillStyle = "#26313f";
    ctx.fillRect(x + 7 * z, y + 7 * z + bob, 3 * z, 7 * z);
    ctx.fillStyle = "#9bcf67";
    roundRect(x + 5 * z, y + 2 * z + bob, 7 * z, 8 * z, 3 * z);
    ctx.fill();
    ctx.fillStyle = "#ffd7a8";
    ctx.beginPath();
    ctx.arc(x + 8.5 * z, y - 1 * z + bob, 3.5 * z, 0, Math.PI * 2);
    ctx.fill();
  }
  if (guest.archetype === "scenic") {
    ctx.fillStyle = "#26313f";
    roundRect(x + 3 * z, y + 1 * z + bob, 6 * z, 5 * z, 1 * z);
    ctx.fill();
    ctx.fillStyle = "#80d5df";
    ctx.beginPath();
    ctx.arc(x + 6 * z, y + 3.5 * z + bob, 1.5 * z, 0, Math.PI * 2);
    ctx.fill();
  }
  if (guest.thoughtTimer > 0 && guest.thought) {
    drawGuestBubble(x, y - 25 * z + bob, guest.thought.short, guest.thought.tone);
  }
}

function drawGuestBubble(x, y, text, tone = "neutral") {
  const z = camera.zoom;
  const label = String(text).slice(0, 9);
  ctx.save();
  ctx.font = `bold ${9 * z}px sans-serif`;
  ctx.textAlign = "center";
  const width = Math.max(42 * z, ctx.measureText(label).width + 14 * z);
  const height = 20 * z;
  ctx.fillStyle = tone === "negative" ? "rgba(255,239,232,.96)" : tone === "positive" ? "rgba(238,250,225,.96)" : "rgba(255,252,242,.96)";
  ctx.strokeStyle = tone === "negative" ? "#d84f4f" : tone === "positive" ? "#4c965c" : "rgba(38,49,63,.36)";
  ctx.lineWidth = Math.max(1, z);
  roundRect(x - width / 2, y - height, width, height, 5 * z);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x - 3 * z, y);
  ctx.lineTo(x, y + 5 * z);
  ctx.lineTo(x + 3 * z, y);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#26313f";
  ctx.fillText(label, x, y - 6 * z);
  ctx.restore();
}

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}

function staffLevelForExperience(experience) {
  const xp = Math.max(0, Number(experience || 0));
  if (xp >= STAFF_MANAGEMENT_CONFIG.experienceThresholds[2]) return 3;
  if (xp >= STAFF_MANAGEMENT_CONFIG.experienceThresholds[1]) return 2;
  return 1;
}

function createStaffAgent(role, saved = {}) {
  const savedId = Math.max(0, Math.floor(Number(saved.id || 0)));
  const id = savedId > staffSequence ? savedId : staffSequence + 1;
  staffSequence = Math.max(staffSequence, id);
  const experience = Math.max(0, Number(saved.experience ?? saved.jobsCompleted ?? 0));
  const level = clamp(Math.max(Math.round(Number(saved.level || 1)), staffLevelForExperience(experience)), 1, STAFF_MANAGEMENT_CONFIG.maxLevel);
  const fatigue = clamp(Number(saved.fatigue || 0), 0, 100);
  return {
    id,
    role,
    tile: entrance,
    pos: { x: entrance.x, y: entrance.y },
    path: [],
    target: null,
    state: (saved.resting && fatigue > STAFF_MANAGEMENT_CONFIG.resumeAt) || fatigue >= STAFF_MANAGEMENT_CONFIG.restAt ? "resting" : "idle",
    speed: role === "cleaner" ? 1.08 : 1.02,
    patrolStep: id * 3,
    jobsCompleted: Math.max(0, Number(saved.jobsCompleted || 0)),
    experience,
    level,
    fatigue
  };
}

function staffEfficiency(agent) {
  const levelBoost = 1 + (clamp(Number(agent?.level || 1), 1, STAFF_MANAGEMENT_CONFIG.maxLevel) - 1) * .2;
  const fatigueFactor = Math.max(.55, 1 - clamp(Number(agent?.fatigue || 0), 0, 100) * .0045);
  return levelBoost * fatigueFactor;
}

function staffWage(agent) {
  const base = STAFF_MANAGEMENT_CONFIG.wages[agent?.role] || 0;
  return base * (1 + (clamp(Number(agent?.level || 1), 1, STAFF_MANAGEMENT_CONFIG.maxLevel) - 1) * .18);
}

function staffTeam(role) {
  return state.staffAgents.filter(agent => agent.role === role);
}

function staffTeamStats(role) {
  const team = staffTeam(role);
  return {
    count: team.length,
    averageLevel: team.length ? team.reduce((sum, agent) => sum + Number(agent.level || 1), 0) / team.length : 0,
    averageFatigue: team.length ? team.reduce((sum, agent) => sum + Number(agent.fatigue || 0), 0) / team.length : 0,
    resting: team.filter(agent => agent.state === "resting").length
  };
}

function staffTrainingCandidate(role) {
  return staffTeam(role)
    .filter(agent => Number(agent.level || 1) < STAFF_MANAGEMENT_CONFIG.maxLevel)
    .sort((a, b) => Number(a.level || 1) - Number(b.level || 1)
      || Number(a.experience || 0) - Number(b.experience || 0)
      || Number(a.fatigue || 0) - Number(b.fatigue || 0))[0] || null;
}

function staffTrainingCost(role) {
  const candidate = staffTrainingCandidate(role);
  return candidate ? STAFF_MANAGEMENT_CONFIG.trainingCosts[role] * Number(candidate.level || 1) : 0;
}

function parkStaffWageTotal() {
  return ["cleaner", "mechanic"].reduce((sum, role) => {
    const desired = role === "cleaner" ? state.staff.cleaners : state.staff.mechanics;
    const team = staffTeam(role).slice(0, desired);
    const missing = Math.max(0, desired - team.length);
    return sum + team.reduce((teamSum, agent) => teamSum + staffWage(agent), 0)
      + missing * STAFF_MANAGEMENT_CONFIG.wages[role];
  }, 0);
}

function syncStaffAgents() {
  const desired = { cleaner: state.staff.cleaners, mechanic: state.staff.mechanics };
  for (const role of ["cleaner", "mechanic"]) {
    const current = state.staffAgents.filter(agent => agent.role === role);
    while (current.length < desired[role]) {
      const agent = createStaffAgent(role);
      state.staffAgents.push(agent);
      current.push(agent);
    }
    while (current.length > desired[role]) {
      const removed = current.pop();
      state.staffAgents = state.staffAgents.filter(agent => agent !== removed);
    }
  }
}

function staffTaskPath(agent, workTile) {
  if (!workTile) return null;
  if (agent.tile === workTile) return [];
  const path = findPath(agent.tile, workTile);
  return path.length ? path : null;
}

function findStaffTask(agent) {
  const claimed = new Set(state.staffAgents
    .filter(other => other !== agent && other.target)
    .map(other => other.target.key));
  const candidates = [];
  if (agent.role === "cleaner") {
    for (const tile of state.tiles) {
      if (tile.litter > .12) {
        const workTile = tile.path ? tile : nearestPathForTile(tile);
        candidates.push({ key: `litter:${key(tile)}`, kind: "litter", tile, workTile, urgency: tile.litter * 8 });
      }
      if (tools[tile.object?.type]?.amenity === "bin" && Number(tile.object.fill || 0) > .12) {
        candidates.push({
          key: `bin:${key(tile)}`,
          kind: "bin",
          tile,
          object: tile.object,
          workTile: nearestPathForTile(tile),
          urgency: Number(tile.object.fill || 0) * 4
        });
      }
    }
  } else {
    for (const tile of state.tiles) {
      const ride = tile.object;
      if (!tools[ride?.type]?.ride || (!ride.broken && Number(ride.condition ?? 100) >= rideMaintenanceThreshold(ride))) continue;
      candidates.push({
        key: `ride:${key(tile)}`,
        kind: "ride",
        tile,
        object: ride,
        workTile: nearestPathForTile(tile),
        urgency: ride.broken ? 1000 : (100 - Number(ride.condition ?? 100)) * (ride.maintenancePolicy === "preventive" ? 1.25 : 1)
      });
    }
  }
  const reachable = candidates
    .filter(candidate => !claimed.has(candidate.key))
    .map(candidate => ({ ...candidate, route: staffTaskPath(agent, candidate.workTile) }))
    .filter(candidate => candidate.route !== null)
    .sort((a, b) => {
      const scoreA = a.urgency - a.route.length * .8;
      const scoreB = b.urgency - b.route.length * .8;
      return scoreB - scoreA;
    });
  return reachable[0] || null;
}

function staffTaskIsValid(target) {
  if (!target) return false;
  if (target.kind === "litter") return target.tile.litter > .05;
  if (target.kind === "bin") return target.tile.object === target.object && Number(target.object.fill || 0) > .05;
  if (target.kind === "ride") {
    return target.tile.object === target.object && (target.object.broken || Number(target.object.condition ?? 100) < rideRepairTarget(target.object));
  }
  return false;
}

function assignStaffTask(agent) {
  const task = findStaffTask(agent);
  if (!task) return false;
  agent.target = task;
  agent.path = task.route;
  agent.state = agent.path.length ? "walking" : (agent.role === "cleaner" ? "cleaning" : "repairing");
  return true;
}

function sendStaffOnPatrol(agent) {
  const paths = state.tiles.filter(tile => tile.path && (tile === agent.tile || findPath(agent.tile, tile).length));
  if (!paths.length) return;
  agent.patrolStep++;
  const destination = paths[(agent.id * 7 + agent.patrolStep * 5) % paths.length];
  agent.path = destination === agent.tile ? [] : findPath(agent.tile, destination);
  agent.state = agent.path.length ? "patrolling" : "idle";
}

function moveStaffAgent(agent, dt) {
  let travel = agent.speed * staffEfficiency(agent) * dt;
  while (agent.path.length && travel > 0) {
    const next = agent.path[0];
    const dx = next.x - agent.pos.x;
    const dy = next.y - agent.pos.y;
    const distance = Math.hypot(dx, dy);
    if (distance <= travel) {
      agent.pos.x = next.x;
      agent.pos.y = next.y;
      agent.tile = next;
      agent.path.shift();
      travel -= distance;
    } else {
      agent.pos.x += dx / distance * travel;
      agent.pos.y += dy / distance * travel;
      travel = 0;
    }
  }
  if (!agent.path.length && agent.target) {
    agent.state = agent.role === "cleaner" ? "cleaning" : "repairing";
  } else if (!agent.path.length) {
    agent.state = "idle";
  }
}

function finishStaffTask(agent) {
  if (agent.role === "cleaner") state.staffStats.cleaningJobs++;
  else state.staffStats.repairJobs++;
  agent.jobsCompleted++;
  agent.experience = Math.max(0, Number(agent.experience || 0)) + 1;
  const previousLevel = Number(agent.level || 1);
  agent.level = Math.max(previousLevel, staffLevelForExperience(agent.experience));
  if (agent.level > previousLevel) toast(`${agent.role === "cleaner" ? "清掃員" : "整備員"}がLv.${agent.level}に成長しました`);
  agent.target = null;
  agent.path = [];
  agent.state = "idle";
}

function abandonStaffTask(agent) {
  agent.target = null;
  agent.path = [];
  agent.state = "idle";
}

function workStaffTask(agent, dt) {
  const target = agent.target;
  if (!staffTaskIsValid(target)) {
    if (target?.kind === "litter") target.tile.litter = 0;
    if (target?.kind === "bin" && target.object) target.object.fill = 0;
    finishStaffTask(agent);
    return;
  }
  const work = dt * staffEfficiency(agent);
  if (target.kind === "litter") {
    target.tile.litter = Math.max(0, target.tile.litter - work * 2.4);
  } else if (target.kind === "bin") {
    target.object.fill = Math.max(0, Number(target.object.fill || 0) - work * 4.5);
  } else {
    target.object.condition = clamp(Number(target.object.condition ?? 100) + work * 7.5, 0, 100);
    if (target.object.broken && target.object.condition >= 55) target.object.broken = false;
  }
  if (!staffTaskIsValid(target)) finishStaffTask(agent);
}

function updateStaffAgents(dt) {
  syncStaffAgents();
  for (const agent of state.staffAgents) {
    if (!agent.tile?.path) {
      agent.tile = entrance;
      agent.pos = { x: entrance.x, y: entrance.y };
      agent.path = [];
      agent.target = null;
      agent.state = "idle";
    }
    if (agent.state === "resting") {
      agent.fatigue = Math.max(0, Number(agent.fatigue || 0) - dt * 14);
      if (agent.fatigue <= STAFF_MANAGEMENT_CONFIG.resumeAt) agent.state = "idle";
      continue;
    }
    const working = ["cleaning", "repairing"].includes(agent.state);
    const moving = agent.path.length > 0;
    const fatigueRate = working ? 5.5 : moving ? (agent.target ? 1.4 : .65) : -7;
    agent.fatigue = clamp(Number(agent.fatigue || 0) + dt * fatigueRate, 0, 100);
    if (agent.fatigue >= STAFF_MANAGEMENT_CONFIG.restAt) {
      abandonStaffTask(agent);
      agent.state = "resting";
      continue;
    }
    if (agent.path.some(tile => !tile.path)) abandonStaffTask(agent);
    if (agent.target && !staffTaskIsValid(agent.target)) abandonStaffTask(agent);
    if (["cleaning", "repairing"].includes(agent.state) && agent.target) {
      workStaffTask(agent, dt);
      continue;
    }
    if (agent.path.length) {
      moveStaffAgent(agent, dt);
      continue;
    }
    if (!assignStaffTask(agent)) sendStaffOnPatrol(agent);
  }
}

function shopTiles() {
  return state.tiles.filter(tile => tools[tile.object?.type]?.shop);
}

function shopReorderPoint(shop) {
  return Math.max(6, Math.ceil(Number(shop.maxStock || shopCapacityForDifficulty(state.difficulty, shop.type)) * .2));
}

function shopDeliverySize(shop) {
  return Math.max(1, Number(tools[shop?.type]?.deliverySize || SHOP_CONFIG.deliverySize));
}

function shopUnitCost(shop, instant = false) {
  const tool = tools[shop?.type] || tools.kiosk;
  return Math.max(1, Number(instant ? tool.instantUnitCost : tool.unitCost) || (instant ? SHOP_CONFIG.instantUnitCost : SHOP_CONFIG.autoUnitCost));
}

function shopStaffWage(shop) {
  return Math.max(0, Number(tools[shop?.type]?.staffWage || 0));
}

function shopUpgradeCost(shop) {
  const level = clamp(Math.round(Number(shop?.level || 1)), 1, SHOP_MANAGEMENT_CONFIG.maxLevel);
  if (level >= SHOP_MANAGEMENT_CONFIG.maxLevel) return 0;
  return Math.round(Number(tools[shop.type]?.cost || 900) * (level === 1 ? .65 : 1.05));
}

function shopCapacityAtLevel(shop, level = Number(shop?.level || 1)) {
  const base = shopCapacityForDifficulty(state.difficulty, shop?.type || "kiosk");
  return Math.round(base * (1 + (clamp(level, 1, SHOP_MANAGEMENT_CONFIG.maxLevel) - 1) * .2));
}

function placeShopOrder(shop, options = {}) {
  if (!shop || Number(shop.pendingStock || 0) > 0) return false;
  const maxStock = Number(shop.maxStock || shopCapacityForDifficulty(state.difficulty, shop.type));
  const missing = Math.max(0, maxStock - Number(shop.stock || 0));
  const quantity = Math.min(shopDeliverySize(shop), missing);
  if (!quantity) return false;
  const cost = quantity * shopUnitCost(shop);
  if (state.money < cost) {
    shop.orderBlocked = true;
    if (!options.silent) toast("自動発注の仕入れ資金が足りません");
    return false;
  }
  state.money -= cost;
  state.finance.restockExpenses += cost;
  shop.supplyCost = Number(shop.supplyCost || 0) + cost;
  shop.pendingStock = quantity;
  shop.deliveryTimer = SHOP_CONFIG.deliverySeconds;
  shop.orders = Number(shop.orders || 0) + 1;
  shop.orderBlocked = false;
  if (!options.silent) toast(`${quantity}個を発注しました。${SHOP_CONFIG.deliverySeconds}秒後に届きます`);
  return true;
}

function updateShops(dt) {
  for (const tile of shopTiles()) {
    const shop = tile.object;
    const demandDecay = Math.exp(-dt / 45);
    shop.recentInterest = Number(shop.recentInterest || 0) * demandDecay;
    shop.recentSales = Number(shop.recentSales || 0) * demandDecay;
    shop.recentPriceRejects = Number(shop.recentPriceRejects || 0) * demandDecay;
    shop.recentToleranceTotal = Number(shop.recentToleranceTotal || 0) * demandDecay;
    shop.recentToleranceWeight = Number(shop.recentToleranceWeight || 0) * demandDecay;
    if (Number(shop.pendingStock || 0) > 0) {
      const previousSecond = Math.ceil(Number(shop.deliveryTimer || 0));
      shop.deliveryTimer = Math.max(0, Number(shop.deliveryTimer || 0) - dt);
      if (shop.deliveryTimer <= 0) {
        shop.stock = Math.min(Number(shop.maxStock || shopCapacityForDifficulty(state.difficulty, shop.type)), Number(shop.stock || 0) + Number(shop.pendingStock || 0));
        shop.pendingStock = 0;
        shop.deliveries = Number(shop.deliveries || 0) + 1;
        shop.orderBlocked = false;
        if (selectedTile?.object === shop) inspect(selectedTile);
      } else if (selectedTile?.object === shop && Math.ceil(shop.deliveryTimer) !== previousSecond) {
        inspect(selectedTile);
      }
    }
    if (shop.autoRestock && Number(shop.pendingStock || 0) <= 0 && Number(shop.stock || 0) <= shopReorderPoint(shop)) {
      placeShopOrder(shop, { silent: true });
    }
  }
}

function activeMarketingCampaign() {
  const type = state.marketing?.activeCampaign;
  return MARKETING_CAMPAIGNS[type] && Number(state.marketing.remainingLeads || 0) > 0
    ? { type, ...MARKETING_CAMPAIGNS[type] }
    : null;
}

function marketingFit(type) {
  const rides = state.rides.filter(ride => ride.open !== false && !ride.broken);
  const amenities = state.tiles.map(tile => tile.object).filter(object => tools[object?.type]?.amenity);
  const shops = shopTiles().map(tile => tile.object).filter(shop => shop.open !== false);
  if (type === "family") {
    const gentleRides = rides.filter(ride => ["carousel", "teacups", "wheel"].includes(ride.type)).length;
    const toilets = amenities.filter(object => object.type === "toilet").length;
    const benches = amenities.filter(object => object.type === "bench").length;
    return clamp(gentleRides * 23 + toilets * 14 + benches * 5 + state.clean * .24, 0, 100);
  }
  if (type === "thrill") {
    const thrillRides = rides.filter(ride => ride.type === "coaster").length;
    const wheels = rides.filter(ride => ride.type === "wheel").length;
    const popularity = rides.length ? rides.reduce((sum, ride) => sum + Number(ride.popularity ?? 55), 0) / rides.length : 0;
    return clamp(thrillRides * 48 + wheels * 14 + popularity * .38, 0, 100);
  }
  if (type === "scenic") {
    const scenicRides = rides.filter(ride => ["wheel", "carousel"].includes(ride.type)).length;
    const plantTypes = new Set(state.tiles.map(tile => tile.object?.type).filter(typeName => ["tree", "shrub", "flower", "palm"].includes(typeName))).size;
    return clamp(sceneryScore() * .48 + scenicRides * 9 + plantTypes * 7, 0, 100);
  }
  if (type === "foodie") {
    const shopKinds = new Set(shops.map(shop => shopKind(shop))).size;
    const stockRatio = shops.length
      ? shops.reduce((sum, shop) => sum + Math.min(1, Number(shop.stock || 0) / Math.max(1, Number(shop.maxStock || 1))), 0) / shops.length
      : 0;
    const reputation = shops.length
      ? shops.reduce((sum, shop) => sum + Number(shop.reputation ?? SHOP_MANAGEMENT_CONFIG.startingReputation), 0) / shops.length
      : 0;
    return clamp(shopKinds * 23 + stockRatio * 18 + reputation * .2, 0, 100);
  }
  return 0;
}

function marketingFitHint(type, fit = marketingFit(type)) {
  if (!MARKETING_CAMPAIGNS[type]) return "客層を選んで集客を始めましょう。";
  if (fit >= 75) return "設備との相性は良好です。高い満足と売上を期待できます。";
  if (fit >= 50) return "受け入れ可能です。関連設備を増やすと満足度が安定します。";
  const hints = {
    family: "穏やかな遊具、トイレ、ベンチ、清潔さを整えましょう。",
    thrill: "コースターや観覧車と、人気の高いライドが必要です。",
    scenic: "植物の種類と景観値、景色を楽しめるライドを増やしましょう。",
    foodie: "飲食店の種類、在庫、評判を整えてから宣伝しましょう。"
  };
  return hints[type];
}

function chooseGuestArchetype(campaignType = state.marketing?.activeCampaign) {
  const campaign = MARKETING_CAMPAIGNS[campaignType];
  if (campaign && Number(state.marketing?.remainingLeads || 0) > 0 && Math.random() < campaign.targetShare) return campaignType;
  const archetypeKeys = Object.keys(GUEST_ARCHETYPES);
  return archetypeKeys[Math.floor(Math.random() * archetypeKeys.length)];
}

function updateAnalysisSignals(dt) {
  const decay = Math.exp(-dt / 35);
  for (const tile of state.tiles) {
    tile.traffic = Math.max(0, Number(tile.traffic || 0) * decay);
    tile.moodTotal = Math.max(0, Number(tile.moodTotal || 0) * decay);
    tile.moodWeight = Math.max(0, Number(tile.moodWeight || 0) * decay);
  }
  for (const guest of state.guests) {
    if (!guest.tile || guest.done) continue;
    guest.tile.moodTotal += clamp(Number(guest.satisfaction ?? 72), 0, 100) * dt;
    guest.tile.moodWeight += dt;
  }
}

function update(dt) {
  if (paused) return;
  spawnTimer += dt;
  incomeTimer += dt;
  expenseTimer += dt;
  const attraction = state.rides.reduce((sum, r) => sum + tools[r.type].appeal, 0);
  const transitStops = busStops().length;
  const admissionPressure = Math.max(0, state.admissionFee - 25) * .045;
  const campaignInterval = activeMarketingCampaign()?.interval || 1;
  const interval = Math.max(.65, (3.6 - attraction / 42 - state.round * .08 - transitStops * .14 + admissionPressure) * campaignInterval);
  if (spawnTimer > interval && state.guests.length < 12 + state.round * 5) {
    spawnTimer = 0;
    spawnGuest();
  }
  updateBuses(dt);
  updateMonorails(dt);
  updateParkTrains(dt);
  updateShops(dt);
  for (const ride of state.rides) updateRide(ride, dt);
  updateStaffAgents(dt);
  for (const guest of state.guests) updateGuest(guest, dt);
  updateAnalysisSignals(dt);
  if (incomeTimer > 3.2) {
    incomeTimer = 0;
    const looseLitter = state.tiles.reduce((sum, tile) => sum + Number(tile.litter || 0), 0);
    const cleanerCoverage = staffTeam("cleaner")
      .filter(agent => agent.state !== "resting")
      .reduce((sum, agent) => sum + staffEfficiency(agent), 0);
    state.clean = clamp(
      state.clean - state.guests.length * .075 - looseLitter * .04 + sceneryScore() * .002 + cleanerCoverage * .65,
      20,
      100
    );
  }
  if (expenseTimer > 8) {
    expenseTimer = 0;
    const costs = operatingCostBreakdown();
    state.money -= costs.total;
    state.finance.maintenanceExpenses += costs.maintenance + costs.transit;
    state.finance.staffExpenses += costs.staff;
    if (state.money < 0) state.sentiment = clamp(state.sentiment - 1.5, -20, 20);
  }
  state.guests = state.guests.filter(g => !g.done);
  computeStats();
}

function operatingCostBreakdown() {
  const rideMaintenance = state.rides.reduce((sum, ride) => sum + rideMaintenanceCost(ride), 0);
  const amenityMaintenance = state.tiles.reduce((sum, tile) => {
    const tool = tools[tile.object?.type];
    return sum + (tool?.amenity ? Number(tool.upkeep || 0) : 0);
  }, 0);
  const baseMaintenance = rideMaintenance + amenityMaintenance;
  const baseParkStaff = parkStaffWageTotal();
  const baseShopStaff = shopTiles().reduce((sum, tile) => {
    const shop = tile.object;
    return sum + (shop.open ? Number(shop.staff || 1) * shopStaffWage(shop) : 0);
  }, 0);
  const baseStaff = baseParkStaff + baseShopStaff;
  const busNetwork = transitNetwork("bus");
  const busConfig = TRANSIT_MODE_CONFIGS.bus;
  const frequencyPremium = Math.max(0, 8 - busNetwork.interval) * 5;
  const monorailNetwork = transitNetwork("monorail");
  const monorailConfig = TRANSIT_MODE_CONFIGS.monorail;
  const railTiles = state.tiles.filter(tile => tile.transitTrack === "monorail").length;
  const monorailRunning = getTransitRoutePlan("monorail").connectedStopIds.length >= 2;
  const monorail = transitStops("monorail").length * 18 + railTiles * 2
    + (monorailRunning ? monorailNetwork.fleet * monorailConfig.vehicleUpkeep : 0);
  const parkTrainNetwork = transitNetwork("park_train");
  const parkTrainConfig = TRANSIT_MODE_CONFIGS.park_train;
  const trainTrackTiles = state.tiles.filter(tile => tile.transitTrack === "park_train").length;
  const parkTrainRunning = getTransitRoutePlan("park_train").connectedStopIds.length >= 2;
  const parkTrain = transitStops("park_train").length * 14 + trainTrackTiles * 1.5
    + (parkTrainRunning ? parkTrainNetwork.fleet * parkTrainConfig.vehicleUpkeep : 0);
  const baseTransit = busStops().length * 6 + busNetwork.fleet * busConfig.vehicleUpkeep + frequencyPremium + monorail + parkTrain;
  const factor = difficultyCostFactor();
  const maintenance = baseMaintenance * factor;
  const staff = baseStaff * factor;
  const transit = baseTransit * factor;
  return {
    maintenance,
    staff,
    parkStaff: baseParkStaff * factor,
    shopStaff: baseShopStaff * factor,
    transit,
    factor,
    baseTotal: Math.round(baseMaintenance + baseStaff + baseTransit),
    total: Math.round(maintenance + staff + transit)
  };
}

function difficultyCostFactor() {
  const config = DIFFICULTY_CONFIGS[state.difficulty] || DIFFICULTY_CONFIGS.beginner;
  const grace = state.round <= config.graceRounds ? config.graceMultiplier : 1;
  return config.costMultiplier * grace;
}

function operatingCost() {
  return operatingCostBreakdown().total;
}

function updateBuses(dt) {
  const network = transitNetwork("bus");
  const config = TRANSIT_MODE_CONFIGS.bus;
  const plan = getTransitRoutePlan("bus");
  updateTransitDemand(network, dt);
  if (!plan.connectedStopIds.length || plan.tiles.length < 2 || network.fleet <= 0) {
    state.buses = [];
    return;
  }
  syncBusFleet(network, plan);
  const speed = clamp(plan.tiles.length / Math.max(1, network.interval * network.fleet), .75, 3.4);
  for (const bus of state.buses) {
    const oldIndex = Math.floor(bus.distance) % plan.tiles.length;
    bus.distance = (bus.distance + dt * speed) % plan.tiles.length;
    const nextIndex = Math.floor(bus.distance) % plan.tiles.length;
    if (nextIndex !== oldIndex) {
      const markers = plan.markers.get(nextIndex) || [];
      for (const marker of markers) serviceTransitMarker(bus, marker, network, config);
    }
  }
}

function updateMonorails(dt) {
  const mode = "monorail";
  const network = transitNetwork(mode);
  const config = TRANSIT_MODE_CONFIGS[mode];
  const plan = getTransitRoutePlan(mode);
  network.fleet = state.progression.bestStars >= 5 ? 2 : 1;
  updateRailDemand(mode, network, dt);
  if (plan.connectedStopIds.length < 2 || plan.tiles.length < 2) {
    state.monorails = [];
    return;
  }
  syncMonorailFleet(network, plan);
  const speed = clamp(plan.tiles.length / Math.max(1, network.interval * network.fleet), .9, 4);
  for (const train of state.monorails) {
    const oldIndex = Math.floor(train.distance) % plan.tiles.length;
    train.distance = (train.distance + dt * speed) % plan.tiles.length;
    const nextIndex = Math.floor(train.distance) % plan.tiles.length;
    if (nextIndex !== oldIndex) {
      for (const marker of plan.markers.get(nextIndex) || []) serviceTransitMarker(train, marker, network, config, mode);
    }
  }
}

function updateParkTrains(dt) {
  const mode = "park_train";
  const network = transitNetwork(mode);
  const config = TRANSIT_MODE_CONFIGS[mode];
  const plan = getTransitRoutePlan(mode);
  network.fleet = 1;
  updateRailDemand(mode, network, dt);
  if (plan.connectedStopIds.length < 2 || plan.tiles.length < 2) {
    state.parkTrains = [];
    return;
  }
  syncParkTrainFleet(network, plan);
  const speed = clamp(plan.tiles.length / Math.max(1, network.interval), .6, 2.2);
  for (const train of state.parkTrains) {
    const oldIndex = Math.floor(train.distance) % plan.tiles.length;
    train.distance = (train.distance + dt * speed) % plan.tiles.length;
    const nextIndex = Math.floor(train.distance) % plan.tiles.length;
    if (nextIndex !== oldIndex) {
      for (const marker of plan.markers.get(nextIndex) || []) serviceTransitMarker(train, marker, network, config, mode);
    }
  }
}

function syncParkTrainFleet(network, plan) {
  const signature = `${network.routeStopIds.join("|")}:${plan.tiles.length}:${network.fleet}`;
  if (state.parkTrains.length === network.fleet && state.parkTrains.every(train => train.routeSignature === signature)) return;
  state.parkTrains = Array.from({ length: network.fleet }, (_, index) => ({
    id: `park-train-${index + 1}`,
    distance: plan.tiles.length * index / Math.max(1, network.fleet),
    passengers: 0,
    lastStopId: null,
    routeSignature: signature
  }));
}

function syncMonorailFleet(network, plan) {
  const signature = `${network.routeStopIds.join("|")}:${plan.tiles.length}:${network.fleet}`;
  if (state.monorails.length === network.fleet && state.monorails.every(train => train.routeSignature === signature)) return;
  state.monorails = Array.from({ length: network.fleet }, (_, index) => ({
    id: `monorail-${index + 1}`,
    distance: plan.tiles.length * index / Math.max(1, network.fleet),
    passengers: 0,
    lastStopId: null,
    routeSignature: signature
  }));
}

function updateRailDemand(mode, network, dt) {
  const stations = transitStops(mode);
  for (const stationTile of stations) {
    const station = stationTile.object;
    station.waitingAccumulator = Number(station.waitingAccumulator || 0) + dt * (.08 + state.guests.length * .004 + state.round * .003);
    while (station.waitingAccumulator >= 1) {
      station.waitingAccumulator--;
      station.waiting = Math.min(48, Number(station.waiting || 0) + 1);
    }
  }
  network.demandAccumulator = (Number(network.demandAccumulator) + dt) % 1;
}

function syncBusFleet(network, plan) {
  const signature = `${network.routeStopIds.join("|")}:${plan.tiles.length}:${network.fleet}`;
  if (state.buses.length === network.fleet && state.buses.every(bus => bus.routeSignature === signature)) return;
  state.buses = Array.from({ length: network.fleet }, (_, index) => ({
    id: `bus-${index + 1}`,
    distance: plan.tiles.length * index / Math.max(1, network.fleet),
    passengers: 0,
    lastStopId: null,
    routeSignature: signature
  }));
}

function updateTransitDemand(network, dt) {
  const attraction = state.rides.reduce((sum, ride) => sum + tools[ride.type].appeal, 0);
  network.demandAccumulator += dt * (.34 + state.round * .025 + attraction * .0025);
  while (network.demandAccumulator >= 1) {
    network.demandAccumulator--;
    network.entranceWaiting = Math.min(60, network.entranceWaiting + 1);
  }
  for (const stop of busStops()) {
    stop.waitingAccumulator = Number(stop.waitingAccumulator || 0) + dt * (.055 + state.guests.length * .0035 + state.round * .004);
    while (stop.waitingAccumulator >= 1) {
      stop.waitingAccumulator--;
      stop.waiting = Math.min(40, Number(stop.waiting || 0) + 1);
    }
  }
}

function serviceTransitMarker(bus, marker, network, config, mode = "bus") {
  if (marker.kind === "entrance") {
    bus.passengers = 0;
    const boarded = Math.min(config.capacity, Math.floor(network.entranceWaiting));
    network.entranceWaiting -= boarded;
    bus.passengers = boarded;
    network.totalRiders += boarded;
    if (network.entranceWaiting > 0 && boarded >= config.capacity) network.crowdingEvents = Number(network.crowdingEvents || 0) + 1;
    return;
  }
  const stopTile = transitStops(mode).find(candidate => candidate.object.stopId === marker.stopId);
  const stop = stopTile?.object;
  if (!stop) return;
  const alighting = Math.min(bus.passengers, Math.max(1, Math.round(bus.passengers * (.45 + Math.random() * .25))));
  bus.passengers -= alighting;
  stop.usage += alighting;
  const startTile = nearestPathForTile(stopTile) || entrance;
  for (let i = 0; i < alighting && state.guests.length < 18 + state.round * 6; i++) spawnGuestAt(startTile);
  const boarded = Math.min(Math.floor(stop.waiting), config.capacity - bus.passengers);
  stop.waiting -= boarded;
  stop.boarded += boarded;
  stop.usage += boarded;
  stop.lastBoarding = boarded;
  bus.passengers += boarded;
  bus.lastStopId = stop.stopId;
  network.totalRiders += boarded;
  if (stop.waiting > 0 && bus.passengers >= config.capacity) network.crowdingEvents = Number(network.crowdingEvents || 0) + 1;
}

function spawnGuest() {
  spawnGuestAt(entrance);
}

function spawnGuestAt(startTile) {
  const campaign = activeMarketingCampaign();
  const campaignType = campaign?.type || null;
  const archetype = chooseGuestArchetype(campaignType);
  if (campaign) {
    state.marketing.remainingLeads = Math.max(0, Number(state.marketing.remainingLeads || 0) - 1);
    if (state.marketing.remainingLeads <= 0) state.marketing.activeCampaign = null;
  }
  const refusalChance = clamp((state.admissionFee - 20) * .014, 0, .72);
  if (Math.random() < refusalChance) {
    if (campaign) state.marketing.refusals = Math.max(0, Number(state.marketing.refusals || 0)) + 1;
    addGuestLog("来園希望", "入園料が高くて今日は見送った", "negative");
    return false;
  }
  const color = ["#ef6f61", "#49abc2", "#f1b84f", "#7acb72", "#8e6fb5"][Math.floor(Math.random() * 5)];
  const profile = GUEST_ARCHETYPES[archetype];
  const campaignMatch = campaignType === archetype;
  const campaignFit = campaignMatch ? marketingFit(campaignType) : null;
  const guest = {
    id: ++guestSequence,
    pos: { x: startTile.x, y: startTile.y },
    tile: startTile,
    path: [],
    baseSpeed: (archetype === "family" ? .82 : .95) + Math.random() * .28,
    goal: null,
    goalType: "ride",
    state: "walking",
    patience: (archetype === "family" ? 18 : 22) + Math.random() * 18,
    color,
    archetype,
    profile,
    spent: false,
    budget: (archetype === "family" ? 48 : 28) + Math.random() * 54,
    priceSensitivity: .65 + Math.random() * .8,
    hunger: (archetype === "foodie" ? 52 : 24) + Math.random() * 18,
    thirst: (archetype === "thrill" ? 38 : 22) + Math.random() * 20,
    souvenirDesire: (archetype === "scenic" || archetype === "family" ? 24 : 12) + Math.random() * 18,
    purchases: { food: false, drink: false, souvenir: false },
    fatigue: (archetype === "family" ? 24 : 12) + Math.random() * 36,
    restroomNeed: (archetype === "family" ? 32 : 20) + Math.random() * 40,
    satisfaction: campaignFit === null ? 72 : clamp(66 + (campaignFit - 50) * .24, 54, 82),
    campaignType,
    thought: null,
    thoughtTimer: 0,
    thoughtCooldown: 1 + Math.random() * 3
  };
  guest.goal = chooseRide(guest);
  const goal = guest.goal;
  guest.path = goal ? findPath(startTile, nearestPath(goal)) : [];
  if (!goal) guestThought(guest, "遊べるライドへ行けない", "遊具へ行けない", "negative", true);
  state.money += state.admissionFee;
  state.finance.admissionRevenue += state.admissionFee;
  state.guests.push(guest);
  startTile.traffic = Number(startTile.traffic || 0) + .5;
  if (campaign) state.marketing.attractedGuests = Math.max(0, Number(state.marketing.attractedGuests || 0)) + 1;
  if (campaignMatch && campaignFit < 50) {
    guestThought(guest, `${MARKETING_CAMPAIGNS[campaignType].label}向けと聞いたけれど設備が物足りない`, "期待と違う", "negative", true);
  } else if (campaignMatch && campaignFit >= 75) {
    guestThought(guest, `${MARKETING_CAMPAIGNS[campaignType].label}向けの充実したパークでうれしい`, "期待どおり", "positive", true);
  }
  return true;
}

function chooseRide(guest = null) {
  const origin = guest?.tile || entrance;
  const reachable = state.rides.filter(ride => {
    const pathTile = nearestPath(ride);
    const price = Number(ride.price ?? tools[ride.type].defaultPrice);
    return ride.open !== false && !ride.broken && price <= Number(guest?.budget ?? Infinity)
      && pathTile && (pathTile === origin || findPath(origin, pathTile).length);
  });
  if (!reachable.length) return null;
  const sorted = reachable.sort((a, b) => {
    const sensitivity = guest?.priceSensitivity || 1;
    const profile = guest?.profile || { rideBias: {} };
    const score = ride => rideEffectiveAppeal(ride)
      + Number(profile.rideBias?.[ride.type] || 0)
      + (guest?.archetype === "scenic" ? localSceneryScore(ride) * 1.2 : 0)
      - ride.queue.length * (guest?.archetype === "family" ? 5.5 : 4)
      - Number(ride.price ?? tools[ride.type].defaultPrice) * sensitivity
      - Number(guest?.fatigue || 0) * tools[ride.type].duration * .006
      - Number(guest?.hunger || 0) * .035;
    const scoreA = score(a);
    const scoreB = score(b);
    return scoreB - scoreA;
  });
  return sorted[Math.floor(Math.random() * Math.min(3, sorted.length))];
}

function localSceneryScore(object) {
  const origin = state.tiles.find(tile => tile.object === object);
  if (!origin) return 0;
  return state.tiles.reduce((sum, tile) => {
    const distance = Math.abs(tile.x - origin.x) + Math.abs(tile.y - origin.y);
    return distance <= 3 ? sum + (tools[tile.object?.type]?.scenery || 0) + (tile.terrain === "water" ? 1 : 0) : sum;
  }, 0);
}

function shopKind(shop) {
  return tools[shop?.type]?.shopKind || "food";
}

function guestPurchased(guest, kind) {
  return !!guest?.purchases?.[kind] || (kind === "food" && !!guest?.spent);
}

function desiredShopKind(guest) {
  const needs = [
    { kind: "drink", score: Number(guest?.thirst || 0), threshold: 64 },
    { kind: "food", score: Number(guest?.hunger || 0), threshold: 66 },
    { kind: "souvenir", score: Number(guest?.souvenirDesire || 0), threshold: 68 }
  ].filter(need => need.score >= need.threshold && !guestPurchased(guest, need.kind));
  needs.sort((a, b) => (b.score - b.threshold) - (a.score - a.threshold));
  return needs[0]?.kind || null;
}

function shopKindLabel(kind) {
  return kind === "drink" ? "ドリンク" : kind === "souvenir" ? "おみやげ" : "スナック";
}

function routeGuestToShop(guest, kind, announce = true) {
  const choice = chooseShop(guest, kind);
  if (!choice) return false;
  guest.goal = choice.tile.object;
  guest.goalType = "shop";
  guest.goalShopKind = kind;
  guest.path = findPath(guest.tile, choice.pathTile);
  if (announce) {
    const message = kind === "drink"
      ? "のどが渇いたのでドリンクを買おう"
      : kind === "souvenir"
        ? "思い出におみやげを選ぼう"
        : "おなかが空いたのでスナックを買おう";
    guestThought(guest, message, `${shopKindLabel(kind)}へ`, "neutral");
  }
  return true;
}

function chooseShop(guest, preferredKind = null) {
  const choices = state.tiles
    .filter(tile => tools[tile.object?.type]?.shop
      && tile.object.open !== false
      && (!preferredKind || shopKind(tile.object) === preferredKind)
      && tile.object !== guest?.shopRejected
      && Number(tile.object.stock ?? 0) > 0)
    .map(tile => ({
      tile,
      pathTile: nearestPathForTile(tile),
      demand: state.guests.filter(candidate => candidate !== guest && candidate.goalType === "shop" && candidate.goal === tile.object).length,
      staff: Math.max(1, Number(tile.object.staff || 1)),
      reputation: clamp(Number(tile.object.reputation ?? SHOP_MANAGEMENT_CONFIG.startingReputation), 0, 100),
      stockRatio: Number(tile.object.stock || 0) / Math.max(1, Number(tile.object.maxStock || shopCapacityForDifficulty())),
      pricePressure: Number(tile.object.price ?? tools[tile.object.type].defaultPrice) / Math.max(1, shopPriceTolerance(guest, tile.object))
    }))
    .filter(choice => choice.pathTile && (choice.pathTile === guest.tile || findPath(guest.tile, choice.pathTile).length));
  const score = choice => Math.abs(choice.tile.x - guest.tile.x) + Math.abs(choice.tile.y - guest.tile.y)
    + choice.demand * 3 / choice.staff - choice.stockRatio * 4 + choice.pricePressure * 3 - choice.reputation * .025;
  choices.sort((a, b) => score(a) - score(b));
  return choices[0] || null;
}

function shopPriceTolerance(guest, shop = { type: "kiosk" }) {
  const kind = shopKind(shop);
  const need = kind === "drink" ? guest?.thirst : kind === "souvenir" ? guest?.souvenirDesire : guest?.hunger;
  const needPremium = clamp((Number(need || 0) - 55) * .08, 0, 4);
  const archetypePremium = kind === "food" && guest?.archetype === "foodie"
    ? 2
    : kind === "souvenir" && ["family", "scenic"].includes(guest?.archetype)
      ? 2
      : kind === "drink" && guest?.archetype === "thrill"
        ? 1
        : 0;
  const sensitivityPenalty = (Number(guest?.priceSensitivity || 1) - 1) * 4;
  const servicePremium = (Number(shop.level || 1) - 1) * 1.25
    + (Number(shop.staff || 1) - 1) * .5
    + (Number(shop.reputation ?? SHOP_MANAGEMENT_CONFIG.startingReputation) - SHOP_MANAGEMENT_CONFIG.startingReputation) * .025;
  return clamp(Math.round(tools[shop.type]?.defaultPrice + needPremium + archetypePremium + servicePremium - sensitivityPenalty), 3, 22);
}

function shopRecommendedPrice(shop) {
  if (!tools[shop?.type]?.shop) return 0;
  const weight = Number(shop.recentToleranceWeight || 0);
  const observed = weight >= .5
    ? Number(shop.recentToleranceTotal || 0) / Math.max(.01, weight)
    : Number(tools[shop.type].defaultPrice);
  return clamp(Math.max(shopUnitCost(shop) + 1, Math.floor(observed)), 1, 24);
}

function shopPricingDiagnosis(shop) {
  if (!tools[shop?.type]?.shop) return { status: "unknown", label: "--", recommended: 0, unitProfit: 0, rejectionRate: 0 };
  const price = Number(shop.price ?? tools[shop.type].defaultPrice);
  const recommended = shopRecommendedPrice(shop);
  const rejectionRate = Number(shop.recentPriceRejects || 0) / Math.max(.5, Number(shop.recentInterest || 0));
  const status = price > recommended
    ? "high"
    : price < recommended - 1
      ? "low"
      : "fair";
  return {
    status,
    label: status === "high" ? "高め" : status === "low" ? "お買い得" : "適正",
    recommended,
    unitProfit: price - shopUnitCost(shop),
    rejectionRate
  };
}

function shopPricingIssues() {
  return shopTiles()
    .map(tile => ({ tile, diagnosis: shopPricingDiagnosis(tile.object) }))
    .filter(entry => entry.tile.object.open !== false && entry.diagnosis.status === "high")
    .sort((a, b) => {
      const gapA = Number(a.tile.object.price || 0) - a.diagnosis.recommended;
      const gapB = Number(b.tile.object.price || 0) - b.diagnosis.recommended;
      return gapB - gapA || b.diagnosis.rejectionRate - a.diagnosis.rejectionRate;
    });
}

function shopPerformance(shop) {
  const visits = Number(shop?.visits || 0);
  const sales = Number(shop?.sales || 0);
  const priceRejects = Number(shop?.priceRejects || 0);
  const lostSales = Number(shop?.lostSales || 0);
  const conversion = visits > 0 ? sales / visits : 0;
  const grossProfit = Number(shop?.revenue || 0) - Number(shop?.supplyCost || 0);
  const recentInterest = Number(shop?.recentInterest || 0);
  const pricing = shopPricingDiagnosis(shop);
  let insight = "来店データを集めています";
  let warning = false;
  if (lostSales >= 3 && lostSales > priceRejects) {
    insight = "品切れ損失が多めです。在庫と自動発注を確認";
    warning = true;
  } else if (pricing.status === "high" && (Number(shop.recentPriceRejects || 0) >= .5 || priceRejects >= 3)) {
    insight = `商品価格が高めです。推奨 $${pricing.recommended} にすると価格離脱を減らせます`;
    warning = true;
  } else if (pricing.status === "fair" && Number(shop.recentPriceRejects || 0) >= .5) {
    insight = `推奨価格 $${pricing.recommended} に調整済みです。次の来店反応を観察しましょう`;
  } else if (visits >= 5 && conversion >= .82 && recentInterest >= 3 && Number(shop.price || 0) < 15) {
    insight = "需要と成約率が好調です。$1値上げの余地あり";
  } else if (visits >= 3) {
    insight = "価格と在庫のバランスは安定しています";
  }
  return { visits, sales, priceRejects, lostSales, conversion, grossProfit, recentInterest, insight, warning, pricing };
}

function chooseAmenity(guest, amenityType) {
  const choices = state.tiles
    .filter(tile => tools[tile.object?.type]?.amenity === amenityType)
    .map(tile => ({ tile, pathTile: nearestPathForTile(tile) }))
    .filter(choice => choice.pathTile && (choice.pathTile === guest.tile || findPath(guest.tile, choice.pathTile).length));
  choices.sort((a, b) => {
    const distanceA = Math.abs(a.tile.x - guest.tile.x) + Math.abs(a.tile.y - guest.tile.y);
    const distanceB = Math.abs(b.tile.x - guest.tile.x) + Math.abs(b.tile.y - guest.tile.y);
    return distanceA - distanceB;
  });
  return choices[0] || null;
}

function routeGuestToAmenity(guest, amenityType, thought) {
  const choice = chooseAmenity(guest, amenityType);
  if (!choice) return false;
  guest.goal = choice.tile.object;
  guest.goalType = amenityType;
  guest.path = findPath(guest.tile, choice.pathTile);
  guestThought(guest, thought.message, thought.short, "neutral");
  return true;
}

function beginAmenityUse(guest) {
  if (!guest.goal || !["bench", "toilet"].includes(guest.goalType)) return false;
  guest.goal.usage = Number(guest.goal.usage || 0) + 1;
  guest.state = guest.goalType === "bench" ? "resting" : "restroom";
  guest.amenityTimer = guest.goalType === "bench" ? 4 : 3;
  guestThought(
    guest,
    guest.goalType === "bench" ? "ベンチでひと休みできて助かった" : "トイレが近くにあって安心した",
    guest.goalType === "bench" ? "ひと休み" : "すっきり",
    "positive",
    true
  );
  return true;
}

function dropLitter(tile, amount) {
  if (!tile || amount <= 0) return false;
  const bins = state.tiles
    .filter(candidate => tools[candidate.object?.type]?.amenity === "bin")
    .map(candidate => ({
      tile: candidate,
      distance: Math.abs(candidate.x - tile.x) + Math.abs(candidate.y - tile.y)
    }))
    .filter(candidate => candidate.distance <= 3 && Number(candidate.tile.object.fill || 0) < Number(candidate.tile.object.maxFill || tools.trash_bin.maxFill))
    .sort((a, b) => a.distance - b.distance);
  const bin = bins[0]?.tile.object;
  if (bin) {
    const available = Number(bin.maxFill || tools.trash_bin.maxFill) - Number(bin.fill || 0);
    const collected = Math.min(amount, available);
    bin.fill = Number(bin.fill || 0) + collected;
    bin.collected = Number(bin.collected || 0) + collected;
    bin.usage = Number(bin.usage || 0) + 1;
    if (collected >= amount) return true;
    tile.litter += amount - collected;
    return false;
  }
  tile.litter += amount;
  return false;
}

function nearestPath(ride) {
  const tile = state.tiles.find(t => t.object === ride);
  const n = neighbors(tile).find(t => t.path);
  return n || null;
}

function updateGuest(g, dt) {
  const profile = g.profile || GUEST_ARCHETYPES[g.archetype] || GUEST_ARCHETYPES.relaxed;
  g.thoughtTimer = Math.max(0, Number(g.thoughtTimer || 0) - dt);
  g.thoughtCooldown = Math.max(0, Number(g.thoughtCooldown || 0) - dt);
  g.hunger = clamp(Number(g.hunger || 0) + dt * profile.hungerRate, 0, 100);
  g.thirst = clamp(Number(g.thirst || 0) + dt * Number(profile.thirstRate || .9), 0, 100);
  g.souvenirDesire = clamp(Number(g.souvenirDesire || 0) + dt * .035 * Number(profile.souvenirBias || 1), 0, 100);
  g.fatigue = clamp(Number(g.fatigue || 0) + dt * profile.fatigueRate * (g.state === "queued" ? 1.35 : 1), 0, 100);
  g.restroomNeed = clamp(Number(g.restroomNeed || 0) + dt * (g.archetype === "family" ? .8 : .65), 0, 100);

  if (g.state === "resting" || g.state === "restroom") {
    g.amenityTimer = Math.max(0, Number(g.amenityTimer || 0) - dt);
    if (g.state === "resting") g.fatigue = Math.max(5, g.fatigue - dt * 18);
    else g.restroomNeed = Math.max(0, g.restroomNeed - dt * 34);
    if (g.amenityTimer <= 0) {
      if (g.state === "resting") g.satisfaction = clamp(g.satisfaction + 5, 0, 100);
      else g.satisfaction = clamp(g.satisfaction + 4, 0, 100);
      g.goal = null;
      g.goalType = null;
      routeGuestToRideOrExit(g);
    }
    return;
  }

  if (g.state === "queued" || g.state === "riding") {
    g.patience -= dt;
    if (g.state === "queued" && g.patience < 0) {
      const i = g.goal.queue.indexOf(g);
      if (i >= 0) g.goal.queue.splice(i, 1);
      state.sentiment = clamp(state.sentiment - 3, -20, 20);
      g.satisfaction -= g.archetype === "family" ? 12 : 9;
      guestThought(g, "待ち時間が長すぎて疲れた", "待ち時間が長い", "negative", true);
      g.path = findPath(g.tile, entrance);
      g.state = "leaving";
    }
    return;
  }

  if (g.state === "walking" && g.goalType !== "toilet" && g.restroomNeed >= 70) {
    const routed = routeGuestToAmenity(g, "toilet", { message: "そろそろトイレを探そう", short: "トイレへ" });
    if (!routed && g.restroomNeed >= 86) {
      if (guestThought(g, "近くにトイレが見つからない", "トイレがない", "negative")) g.satisfaction -= 6;
    }
  }

  if (g.state === "walking" && !["toilet", "bench"].includes(g.goalType) && g.fatigue >= 72) {
    routeGuestToAmenity(g, "bench", { message: "少しベンチで休憩しよう", short: "休憩しよう" });
  }

  if (g.fatigue >= 94 && g.state !== "leaving" && g.goalType !== "bench") {
    g.state = "leaving";
    g.goal = null;
    g.goalType = null;
    g.path = findPath(g.tile, entrance);
    g.satisfaction -= 8;
    guestThought(g, "疲れたので休める場所がほしい", "休憩したい", "negative", true);
  }

  if (g.state === "walking" && !["shop", "bench", "toilet"].includes(g.goalType)) {
    const desiredKind = desiredShopKind(g);
    if (desiredKind && !routeGuestToShop(g, desiredKind) && [g.hunger, g.thirst, g.souvenirDesire].some(value => Number(value || 0) >= 82)) {
      const deliveryPending = shopTiles().some(tile => shopKind(tile.object) === desiredKind && Number(tile.object.pendingStock || 0) > 0);
      guestThought(
        g,
        deliveryPending ? `${shopKindLabel(desiredKind)}が配送中なので少し待とう` : `${shopKindLabel(desiredKind)}を買える店が見つからない`,
        deliveryPending ? "商品を配送中" : `${shopKindLabel(desiredKind)}がない`,
        deliveryPending ? "neutral" : "negative"
      );
      g.satisfaction -= dt * (deliveryPending ? .04 : .15);
    }
  }

  if (!g.path.length) {
    if (g.state === "leaving") { g.done = true; return; }
    if (g.goalType === "shop" && g.goal) {
      const desiredKind = g.goalShopKind || shopKind(g.goal);
      const purchased = buyFromShop(g, g.goal);
      const alternative = !purchased && !guestPurchased(g, desiredKind) ? chooseShop(g, desiredKind) : null;
      if (alternative) {
        g.goal = alternative.tile.object;
        g.goalType = "shop";
        g.goalShopKind = desiredKind;
        g.path = findPath(g.tile, alternative.pathTile);
      } else {
        g.shopRejected = null;
        g.goalShopKind = null;
        routeGuestToRideOrExit(g);
      }
    } else if (["bench", "toilet"].includes(g.goalType) && g.goal) {
      beginAmenityUse(g);
    } else if (g.goal) {
      if (g.goal.broken || g.goal.open === false) {
        guestThought(g, g.goal.broken ? "目当てのライドが故障している" : "目当てのライドが運休している", g.goal.broken ? "故障している" : "運休している", g.goal.broken ? "negative" : "neutral", true);
        routeGuestToRideOrExit(g);
        return;
      }
      g.goal.queue.push(g);
      g.state = "queued";
      dropLitter(g.tile, Math.random() * .4);
    } else {
      g.path = findPath(g.tile, entrance);
      g.state = "leaving";
    }
    return;
  }
  const next = g.path[0];
  const dx = next.x - g.pos.x;
  const dy = next.y - g.pos.y;
  const dist = Math.hypot(dx, dy);
  const speed = g.baseSpeed * clamp(1 - g.fatigue * .0045, .52, 1);
  const step = speed * dt;
  if (dist <= step) {
    g.pos.x = next.x;
    g.pos.y = next.y;
    g.tile = next;
    next.traffic = Number(next.traffic || 0) + 1;
    g.path.shift();
  } else {
    g.pos.x += dx / dist * step;
    g.pos.y += dy / dist * step;
  }
  const impulseKind = desiredShopKind(g);
  if (impulseKind && Math.random() < .003) {
    const shop = neighbors(g.tile).find(t => tools[t.object?.type]?.shop && shopKind(t.object) === impulseKind)?.object;
    if (shop) buyFromShop(g, shop);
  }
  if (g.archetype === "scenic" && localTileScenery(g.tile) < 5) {
    if (guestThought(g, "この辺りにもっと緑や花がほしい", "景色が寂しい", "negative")) g.satisfaction -= 4;
  }
  if (g.archetype === "family" && state.clean < 64) {
    if (guestThought(g, "子どもと歩くには通路が汚れている", "通路が汚い", "negative")) g.satisfaction -= 5;
  }
}

function localTileScenery(origin) {
  return state.tiles.reduce((sum, tile) => {
    const distance = Math.abs(tile.x - origin.x) + Math.abs(tile.y - origin.y);
    return distance <= 2 ? sum + (tools[tile.object?.type]?.scenery || 0) + (tile.terrain === "water" ? 1 : 0) : sum;
  }, 0);
}

function buyFromShop(guest, shop) {
  const kind = shopKind(shop);
  if (guestPurchased(guest, kind)) return false;
  if (guest.shopRejected === shop) return false;
  if (shop.open === false) {
    guest.shopRejected = shop;
    guestThought(guest, `${tools[shop.type].label}は休業中だった`, "休業中", "neutral", true);
    return false;
  }
  const stock = Number(shop.stock ?? 0);
  const price = Number(shop.price ?? tools[shop.type].defaultPrice);
  const tolerance = shopPriceTolerance(guest, shop);
  shop.visits = Number(shop.visits || 0) + 1;
  shop.recentInterest = Number(shop.recentInterest || 0) + 1;
  if (stock <= 0) {
    shop.lostSales = Number(shop.lostSales || 0) + 1;
    shop.reputation = clamp(Number(shop.reputation ?? SHOP_MANAGEMENT_CONFIG.startingReputation) - 1.2, 0, 100);
    guest.satisfaction -= 7;
    state.sentiment = clamp(state.sentiment - .3, -20, 20);
    guest.shopRejected = shop;
    guestThought(guest, "売店の商品が売り切れていた", "売り切れだ", "negative", true);
    return false;
  }
  shop.recentToleranceTotal = Number(shop.recentToleranceTotal || 0) + tolerance;
  shop.recentToleranceWeight = Number(shop.recentToleranceWeight || 0) + 1;
  if (price > guest.budget || price > tolerance) {
    shop.priceRejects = Number(shop.priceRejects || 0) + 1;
    shop.recentPriceRejects = Number(shop.recentPriceRejects || 0) + 1;
    shop.reputation = clamp(Number(shop.reputation ?? SHOP_MANAGEMENT_CONFIG.startingReputation) - .8, 0, 100);
    guest.shopRejected = shop;
    guest.satisfaction -= 5;
    guestThought(guest, `商品が高い。${tools[shop.type].label}なら $${tolerance} くらいがいい`, `$${tolerance}希望`, "negative", true);
    return false;
  }
  shop.stock--;
  shop.sales = Number(shop.sales || 0) + 1;
  shop.recentSales = Number(shop.recentSales || 0) + 1;
  shop.revenue = Number(shop.revenue || 0) + price;
  guest.purchases ||= { food: !!guest.spent, drink: false, souvenir: false };
  guest.purchases[kind] = true;
  if (kind === "food") guest.spent = true;
  guest.shopRejected = null;
  guest.budget -= price;
  if (kind === "drink") guest.thirst = Math.max(5, Number(guest.thirst || 0) - 66);
  else if (kind === "souvenir") guest.souvenirDesire = Math.max(0, Number(guest.souvenirDesire || 0) - 82);
  else guest.hunger = Math.max(8, Number(guest.hunger || 0) - 58);
  state.money += price;
  state.finance.shopRevenue += price;
  const qualityBonus = (Number(shop.level || 1) - 1) * .12 + (Number(shop.staff || 1) - 1) * .06;
  const value = clamp(.35 + qualityBonus - Math.max(0, price - tools[shop.type].defaultPrice) * .06, -.25, .65);
  shop.reputation = clamp(Number(shop.reputation ?? SHOP_MANAGEMENT_CONFIG.startingReputation) + (value >= 0 ? .6 + qualityBonus : -.35), 0, 100);
  state.sentiment = clamp(state.sentiment + value, -20, 20);
  guest.satisfaction += value >= 0 ? 5 : -3;
  const positiveMessage = kind === "drink" ? "冷たいドリンクで元気が出た" : kind === "souvenir" ? "すてきな思い出を持ち帰れそう" : "おいしくて値段もちょうどいい";
  const positiveShort = kind === "drink" ? "すっきり" : kind === "souvenir" ? "いい思い出" : "おいしい";
  guestThought(guest, value >= 0 ? positiveMessage : `${shopKindLabel(kind)}は良いけれど少し高い`, value >= 0 ? positiveShort : "少し高い", value >= 0 ? "positive" : "negative", true);
  if (shop.autoRestock && Number(shop.stock || 0) <= shopReorderPoint(shop)) placeShopOrder(shop, { silent: true });
  return true;
}

function routeGuestToRideOrExit(guest) {
  const ride = chooseRide(guest);
  guest.goal = ride;
  guest.goalType = ride ? "ride" : null;
  guest.state = ride ? "walking" : "leaving";
  guest.path = ride ? findPath(guest.tile, nearestPath(ride)) : findPath(guest.tile, entrance);
  if (!ride) {
    guest.satisfaction -= 7;
    guestThought(guest, "予算内で乗れるライドがない", "乗れる遊具がない", "negative");
  }
}

function updateRide(ride, dt) {
  ride.condition = clamp(Number(ride.condition ?? 100), 0, 100);
  ride.broken = !!ride.broken;
  if (ride.broken) return;
  if (ride.open === false && !ride.riders.length) return;
  const policy = ridePolicy(ride);
  const debtPenalty = state.money < 0 ? 1.8 : 1;
  const wear = (.04 + (tools[ride.type].upkeep || 10) * .0015) * debtPenalty * policy.wear;
  const underMaintenance = state.staffAgents.some(agent => agent.role === "mechanic" && agent.target?.object === ride);
  ride.condition = clamp(ride.condition - dt * wear / (underMaintenance ? 1.8 : 1), 0, 100);
  const failureRisk = ride.condition < 45 ? (45 - ride.condition) * .00075 * policy.failure : 0;
  if (ride.condition <= 10 || Math.random() < dt * failureRisk) {
    ride.broken = true;
    ride.popularity = clamp(Number(ride.popularity ?? RIDE_MANAGEMENT_CONFIG.startingPopularity) - 5, 0, 100);
    const rideTile = state.tiles.find(t => t.object === ride);
    for (const guest of ride.riders) {
      guest.state = "leaving";
      guest.goal = null;
      guest.goalType = null;
      guest.tile = nearestPathForTile(rideTile) || entrance;
      guest.pos = { x: guest.tile.x, y: guest.tile.y };
      guest.path = findPath(guest.tile, entrance);
      guest.satisfaction -= 15;
      guestThought(guest, "乗っていたライドが故障した", "故障で中止", "negative", true);
    }
    for (const guest of ride.queue) guestThought(guest, "並んでいたライドが故障した", "故障した", "negative", true);
    ride.riders = [];
    state.sentiment = clamp(state.sentiment - 3, -20, 20);
    return;
  }
  ride.timer -= dt;
  if (ride.timer <= 0 && ride.riders.length) {
    for (const guest of ride.riders) {
      guest.state = "walking";
      guest.path = [];
      guest.goal = null;
      guest.goalType = null;
      guest.patience = 30;
      dropLitter(guest.tile, Math.random() * .55);
      state.guestsServed++;
      const fairPrice = tools[ride.type].defaultPrice + (Number(ride.level || 1) - 1) * 2;
      const value = clamp(1.5 + (Number(ride.level || 1) - 1) * .18 - Math.max(0, ride.price - fairPrice) * .16, -.8, 1.85);
      state.sentiment = clamp(
        state.sentiment + value,
        -20,
        20
      );
      const preference = Number(guest.profile?.rideBias?.[ride.type] || 0);
      guest.satisfaction = clamp(guest.satisfaction + value * 4 + preference * .25, 0, 100);
      ride.popularity = clamp(Number(ride.popularity ?? RIDE_MANAGEMENT_CONFIG.startingPopularity) + (value >= 0 ? .35 : -.55), 0, 100);
      guest.souvenirDesire = clamp(Number(guest.souvenirDesire || 0) + 18 * Number(guest.profile?.souvenirBias || 1), 0, 100);
      if (value < 0) guestThought(guest, "楽しかったけれど乗車料金が高い", "料金が高い", "negative", true);
      else if (guest.archetype === "thrill" && ride.type === "coaster") guestThought(guest, "このコースターは最高にスリル満点", "最高の絶叫", "positive", true);
      else if (guest.archetype === "scenic" && localSceneryScore(ride) >= 12) guestThought(guest, "ライドから見る景色がきれい", "景色がきれい", "positive", true);
      else guestThought(guest, `${tools[ride.type].label}が楽しかった`, "楽しかった", "positive", true);

      const desiredKind = desiredShopKind(guest);
      if (desiredKind) routeGuestToShop(guest, desiredKind, false);
      if (!guest.goal && guest.restroomNeed >= 70) {
        routeGuestToAmenity(guest, "toilet", { message: "ライドの後にトイレへ寄ろう", short: "トイレへ" });
      }
      if (!guest.goal && guest.fatigue >= 72) {
        routeGuestToAmenity(guest, "bench", { message: "遊んだ後はベンチでひと休み", short: "休憩しよう" });
      }
      if (!guest.path.length && !guest.goal) {
        guest.state = "leaving";
        guest.path = findPath(guest.tile, entrance);
      }
    }
    ride.riders = [];
    ride.totalRides++;
    ride.condition = clamp(ride.condition - .7 - tools[ride.type].upkeep * .018, 0, 100);
  }
  if (ride.open !== false && !ride.riders.length && ride.queue.length) {
    const cap = rideCapacity(ride);
    ride.riders = ride.queue.splice(0, cap);
    const rideTile = state.tiles.find(t => t.object === ride);
    for (const guest of ride.riders) {
      guest.state = "riding";
      guest.tile = rideTile;
      guest.pos = { x: rideTile.x, y: rideTile.y };
      const price = Number(ride.price ?? tools[ride.type].defaultPrice);
      guest.budget = Math.max(0, Number(guest.budget ?? 50) - price);
      state.money += price;
      state.finance.rideRevenue += price;
    }
    ride.timer = rideDuration(ride);
  }
}

function findPath(start, goal) {
  if (!start || !goal) return [];
  const q = [start];
  const came = new Map([[key(start), null]]);
  while (q.length) {
    const cur = q.shift();
    if (cur === goal) break;
    for (const n of neighbors(cur)) {
      if (!n.path || came.has(key(n))) continue;
      came.set(key(n), cur);
      q.push(n);
    }
  }
  if (!came.has(key(goal))) return [];
  const out = [];
  let cur = goal;
  while (cur && cur !== start) {
    out.unshift(cur);
    cur = came.get(key(cur));
  }
  return out;
}

function neighbors(t) {
  return [[1,0],[-1,0],[0,1],[0,-1]]
    .map(([dx, dy]) => {
      const x = t.x + dx, y = t.y + dy;
      return x >= 0 && y >= 0 && x < W && y < H ? tileAt(x, y) : null;
    }).filter(Boolean);
}

function key(t) { return `${t.x},${t.y}`; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

function busStops() {
  return transitStops("bus");
}

function transitStops(mode = "bus") {
  return state.tiles.filter(tile => tile.object?.transitMode === mode
    || (mode === "bus" && tile.object?.type === "bus_stop"));
}

function syncTransitRoute(mode = "bus") {
  const network = transitNetwork(mode);
  const availableIds = new Set(transitStops(mode).map(tile => tile.object.stopId));
  network.routeStopIds = network.routeStopIds.filter(stopId => availableIds.has(stopId));
}

function routeStops(mode = "bus") {
  syncTransitRoute(mode);
  const stopsById = new Map(transitStops(mode).map(tile => [tile.object.stopId, tile]));
  return transitNetwork(mode).routeStopIds.map(stopId => stopsById.get(stopId)).filter(Boolean);
}

function nearestPathForTile(tile) {
  return neighbors(tile).find(t => t.path) || null;
}

function nearestTrackForTile(tile, mode = "monorail") {
  return neighbors(tile).find(candidate => candidate.transitTrack === mode) || null;
}

function findTrackPath(start, goal, mode = "monorail") {
  if (!start || !goal) return [];
  const queue = [start];
  const came = new Map([[key(start), null]]);
  while (queue.length) {
    const current = queue.shift();
    if (current === goal) break;
    for (const neighbor of neighbors(current)) {
      if (neighbor.transitTrack !== mode || came.has(key(neighbor))) continue;
      came.set(key(neighbor), current);
      queue.push(neighbor);
    }
  }
  if (!came.has(key(goal))) return [];
  const path = [];
  let current = goal;
  while (current && current !== start) {
    path.unshift(current);
    current = came.get(key(current));
  }
  return path;
}

function getRailRoutePlan(mode) {
  const orderedStops = routeStops(mode);
  const markers = new Map();
  if (orderedStops.length < 2) return { tiles: [], markers, connectedStopIds: [], signature: `${mode}:empty` };
  const firstTarget = nearestTrackForTile(orderedStops[0], mode);
  if (!firstTarget) return { tiles: [], markers, connectedStopIds: [], signature: `${mode}:disconnected` };
  const tiles = [firstTarget];
  const connectedStopIds = [orderedStops[0].object.stopId];
  let current = firstTarget;
  for (let index = 1; index < orderedStops.length; index++) {
    const stopTile = orderedStops[index];
    const target = nearestTrackForTile(stopTile, mode);
    const segment = target === current ? [] : findTrackPath(current, target, mode);
    if (!target || (target !== current && !segment.length)) continue;
    for (const tile of segment) tiles.push(tile);
    const markerIndex = tiles.length - 1;
    const markerList = markers.get(markerIndex) || [];
    markerList.push({ kind: "stop", stopId: stopTile.object.stopId });
    markers.set(markerIndex, markerList);
    connectedStopIds.push(stopTile.object.stopId);
    current = target;
  }
  if (connectedStopIds.length < 2) return { tiles: [], markers: new Map(), connectedStopIds, signature: `${mode}:single` };
  const returnSegment = current === firstTarget ? [] : findTrackPath(current, firstTarget, mode);
  if (current !== firstTarget && !returnSegment.length) return { tiles: [], markers: new Map(), connectedStopIds: [], signature: `${mode}:open` };
  for (const tile of returnSegment) tiles.push(tile);
  const firstMarkerIndex = Math.max(0, tiles.lastIndexOf(firstTarget));
  const firstMarkers = markers.get(firstMarkerIndex) || [];
  firstMarkers.push({ kind: "stop", stopId: orderedStops[0].object.stopId });
  markers.set(firstMarkerIndex, firstMarkers);
  return {
    tiles,
    markers,
    connectedStopIds,
    signature: `${mode}:${connectedStopIds.join("|")}:${tiles.map(key).join(";")}`
  };
}

function getTransitRoutePlan(mode = "bus") {
  if (mode !== "bus") return getRailRoutePlan(mode);
  const tiles = [entrance];
  const markers = new Map();
  const connectedStopIds = [];
  let current = entrance;
  for (const stopTile of routeStops(mode)) {
    const target = nearestPathForTile(stopTile);
    if (!target) continue;
    const segment = target === current ? [] : findPath(current, target);
    if (target !== current && !segment.length) continue;
    for (const tile of segment) tiles.push(tile);
    const markerIndex = tiles.length - 1;
    const markerList = markers.get(markerIndex) || [];
    markerList.push({ kind: "stop", stopId: stopTile.object.stopId });
    markers.set(markerIndex, markerList);
    connectedStopIds.push(stopTile.object.stopId);
    current = target;
  }
  if (current !== entrance) {
    const returnSegment = findPath(current, entrance);
    for (const tile of returnSegment) tiles.push(tile);
  }
  const entranceIndex = Math.max(0, tiles.lastIndexOf(entrance));
  const entranceMarkers = markers.get(entranceIndex) || [];
  entranceMarkers.push({ kind: "entrance" });
  markers.set(entranceIndex, entranceMarkers);
  return {
    tiles,
    markers,
    connectedStopIds,
    signature: `${mode}:${connectedStopIds.join("|")}:${tiles.map(key).join(";")}`
  };
}

function getBusRoute() {
  return getTransitRoutePlan("bus").tiles;
}

function sceneryScore() {
  return state.tiles.reduce((sum, t) => sum + (tools[t.object?.type]?.scenery || 0) + (t.terrain === "water" ? 1 : 0), 0);
}

function snapshotObject(object) {
  if (!object) return null;
  const saved = { type: object.type };
  if (tools[object.type]?.transit) {
    saved.transitMode = object.transitMode || "bus";
    saved.stopId = object.stopId;
    saved.name = object.name;
    saved.waiting = Number(object.waiting) || 0;
    saved.waitingAccumulator = Number(object.waitingAccumulator) || 0;
    saved.usage = Number(object.usage) || 0;
    saved.boarded = Number(object.boarded) || 0;
    saved.lastBoarding = Number(object.lastBoarding) || 0;
  } else if (tools[object.type]?.ride) {
    saved.timer = object.timer || 0;
    saved.totalRides = object.totalRides || 0;
    saved.condition = Number(object.condition ?? 100);
    saved.broken = !!object.broken;
    saved.price = Number(object.price ?? tools[object.type].defaultPrice);
    saved.open = object.open !== false;
    saved.level = clamp(Math.round(Number(object.level || 1)), 1, RIDE_MANAGEMENT_CONFIG.maxLevel);
    saved.popularity = clamp(Number(object.popularity ?? RIDE_MANAGEMENT_CONFIG.startingPopularity), 0, 100);
    saved.maintenancePolicy = RIDE_MANAGEMENT_CONFIG.policies[object.maintenancePolicy] ? object.maintenancePolicy : "balanced";
  } else if (tools[object.type]?.shop) {
    saved.stock = Number(object.stock ?? shopCapacityForDifficulty(state.difficulty, object.type));
    saved.maxStock = Number(object.maxStock ?? shopCapacityForDifficulty(state.difficulty, object.type));
    saved.price = Number(object.price ?? tools[object.type].defaultPrice);
    saved.open = object.open !== false;
    saved.staff = clamp(Math.round(Number(object.staff || 1)), 1, SHOP_MANAGEMENT_CONFIG.maxStaff);
    saved.level = clamp(Math.round(Number(object.level || 1)), 1, SHOP_MANAGEMENT_CONFIG.maxLevel);
    saved.reputation = clamp(Number(object.reputation ?? SHOP_MANAGEMENT_CONFIG.startingReputation), 0, 100);
    saved.autoRestock = !!object.autoRestock;
    saved.deliveryTimer = Number(object.deliveryTimer || 0);
    saved.pendingStock = Number(object.pendingStock || 0);
    saved.sales = Number(object.sales || 0);
    saved.lostSales = Number(object.lostSales || 0);
    saved.visits = Number(object.visits || 0);
    saved.priceRejects = Number(object.priceRejects || 0);
    saved.revenue = Number(object.revenue || 0);
    saved.supplyCost = Number(object.supplyCost || 0);
    saved.recentInterest = Number(object.recentInterest || 0);
    saved.recentSales = Number(object.recentSales || 0);
    saved.recentPriceRejects = Number(object.recentPriceRejects || 0);
    saved.recentToleranceTotal = Number(object.recentToleranceTotal || 0);
    saved.recentToleranceWeight = Number(object.recentToleranceWeight || 0);
    saved.orders = Number(object.orders || 0);
    saved.deliveries = Number(object.deliveries || 0);
  } else if (tools[object.type]?.amenity) {
    saved.usage = Number(object.usage || 0);
    saved.fill = Number(object.fill || 0);
    saved.collected = Number(object.collected || 0);
    saved.maxFill = Number(object.maxFill || tools[object.type].maxFill || 0);
  }
  return saved;
}

function restoreObject(saved) {
  if (!saved || !tools[saved.type]) return null;
  if (tools[saved.type].transit) return createTransitStop(saved.transitMode || "bus", saved);
  if (tools[saved.type].ride) {
    return createRide(saved.type, saved);
  }
  if (tools[saved.type].shop) {
    return createShop(saved.type, saved);
  }
  if (tools[saved.type].amenity) {
    const maxFill = Number(saved.maxFill || tools[saved.type].maxFill || 0);
    return {
      type: saved.type,
      usage: Math.max(0, Number(saved.usage || 0)),
      fill: clamp(Number(saved.fill || 0), 0, maxFill || 0),
      collected: Math.max(0, Number(saved.collected || 0)),
      ...(maxFill ? { maxFill } : {})
    };
  }
  return { type: saved.type };
}

function rebuildRideList() {
  state.rides = state.tiles
    .map(tile => tile.object)
    .filter(object => tools[object?.type]?.ride);
}

function getManagementMetrics() {
  const revenue = state.finance.admissionRevenue + state.finance.rideRevenue + state.finance.shopRevenue;
  const expenses = state.finance.maintenanceExpenses + state.finance.staffExpenses + state.finance.restockExpenses + state.finance.marketingExpenses;
  const busNetwork = transitNetwork("bus");
  const monorailNetwork = transitNetwork("monorail");
  const parkTrainNetwork = transitNetwork("park_train");
  const busRoutePlan = getTransitRoutePlan("bus");
  const monorailRoutePlan = getTransitRoutePlan("monorail");
  const parkTrainRoutePlan = getTransitRoutePlan("park_train");
  const monorailWaiting = transitStops("monorail").reduce((sum, tile) => sum + Number(tile.object.waiting || 0), 0);
  const parkTrainWaiting = transitStops("park_train").reduce((sum, tile) => sum + Number(tile.object.waiting || 0), 0);
  return {
    revenue,
    expenses,
    net: revenue - expenses,
    happy: state.happy,
    clean: state.clean,
    rides: state.rides.length,
    rideTypes: new Set(state.rides.map(ride => ride.type)).size,
    amenities: state.tiles.filter(tile => tools[tile.object?.type]?.amenity).length,
    scenery: sceneryScore(),
    connectedStops: busRoutePlan.connectedStopIds.length + monorailRoutePlan.connectedStopIds.length + parkTrainRoutePlan.connectedStopIds.length,
    transitRiders: Number(busNetwork.totalRiders || 0) + Number(monorailNetwork.totalRiders || 0) + Number(parkTrainNetwork.totalRiders || 0),
    transitWaiting: Number(busNetwork.entranceWaiting || 0)
      + busStops().reduce((sum, tile) => sum + Number(tile.object.waiting || 0), 0) + monorailWaiting + parkTrainWaiting,
    busFleet: busNetwork.fleet + monorailNetwork.fleet + parkTrainNetwork.fleet,
    transitCapacity: busNetwork.fleet * TRANSIT_MODE_CONFIGS.bus.capacity
      + monorailNetwork.fleet * TRANSIT_MODE_CONFIGS.monorail.capacity
      + parkTrainNetwork.fleet * TRANSIT_MODE_CONFIGS.park_train.capacity,
    roundGuests: Math.max(0, state.guestsServed - Number(state.progression.roundStartServed || 0))
  };
}

function calculateParkRating(metrics = getManagementMetrics()) {
  const experience = clamp(metrics.happy * .22 + metrics.clean * .13, 0, 35);
  const finance = clamp(metrics.net >= 0 ? 6 + metrics.net / 100 : 6 + metrics.net / 250, 0, 20);
  const facilities = clamp(metrics.rideTypes * 3 + metrics.rides * .8 + Math.min(3, metrics.amenities * .5) + Math.min(4, metrics.roundGuests * .25), 0, 15);
  const scenery = clamp(metrics.scenery * .14, 0, 15);
  const healthyTransit = metrics.transitWaiting <= metrics.transitCapacity ? 2 : 0;
  const transit = clamp(metrics.connectedStops * 2 + metrics.busFleet + Math.min(7, metrics.transitRiders * .05) + healthyTransit, 0, 15);
  const score = clamp(experience + finance + facilities + scenery + transit, 0, 100);
  const stars = score >= 90 ? 5 : score >= 77 ? 4 : score >= 62 ? 3 : score >= 45 ? 2 : 1;
  return {
    score,
    stars,
    components: { experience, finance, facilities, scenery, transit }
  };
}

function starText(stars) {
  return `${"★".repeat(stars)}${"☆".repeat(5 - stars)}`;
}

function restoreProgressionState(savedProgression) {
  const hasSavedProgression = !!savedProgression && typeof savedProgression === "object";
  const completed = Array.isArray(savedProgression?.completedGoalIds)
    ? savedProgression.completedGoalIds.filter(goalId => GOAL_DEFINITIONS[goalId])
    : [];
  const active = Array.isArray(savedProgression?.activeGoalIds)
    ? savedProgression.activeGoalIds.filter(goalId => GOAL_DEFINITIONS[goalId] && !completed.includes(goalId)).slice(0, 3)
    : ["profit", "guests", "clean"];
  for (const goalId of GOAL_ORDER) {
    if (active.length >= 3) break;
    if (!completed.includes(goalId) && !active.includes(goalId)) active.push(goalId);
  }
  state.progression = {
    bestStars: clamp(Math.round(Number(savedProgression?.bestStars) || 1), 1, 5),
    unlockedTools: Array.isArray(savedProgression?.unlockedTools)
      ? savedProgression.unlockedTools.filter(toolName => tools[toolName])
      : [],
    activeGoalIds: active,
    completedGoalIds: completed,
    roundStartServed: Math.max(0, Number(savedProgression?.roundStartServed) || 0),
    reports: Array.isArray(savedProgression?.reports) ? savedProgression.reports.slice(0, 8) : []
  };
  const rating = calculateParkRating();
  if (!hasSavedProgression) {
    state.progression.bestStars = rating.stars;
    state.progression.roundStartServed = state.guestsServed;
  }
  reconcileParkUnlocks(rating, false);
}

function reconcileParkUnlocks(rating, announce = false) {
  const previousBest = state.progression.bestStars;
  state.progression.bestStars = Math.max(previousBest, rating.stars);
  const newUnlocks = [];
  for (const [toolName, requiredStars] of Object.entries(TOOL_UNLOCK_STARS)) {
    const alreadyBuilt = state.tiles.some(tile => tile.object?.type === toolName
      || (tools[toolName]?.trackMode && tile.transitTrack === tools[toolName].trackMode));
    if ((state.progression.bestStars >= requiredStars || alreadyBuilt) && !state.progression.unlockedTools.includes(toolName)) {
      state.progression.unlockedTools.push(toolName);
      newUnlocks.push(tools[toolName].label);
    }
  }
  for (const unlock of UNLOCK_DEFINITIONS) {
    if (unlock.stars > previousBest && unlock.stars <= state.progression.bestStars && !unlock.tool) newUnlocks.push(unlock.label);
  }
  updateToolLocks();
  if (announce && newUnlocks.length) toast(`新解禁: ${newUnlocks.join("・")}`);
  return newUnlocks;
}

function isToolUnlocked(toolName) {
  const requiredStars = TOOL_UNLOCK_STARS[toolName] || 1;
  return requiredStars <= 1 || state.progression.unlockedTools.includes(toolName);
}

function updateToolLocks() {
  document.querySelectorAll("[data-tool]").forEach(button => {
    const toolName = button.dataset.tool;
    const requiredStars = TOOL_UNLOCK_STARS[toolName] || 1;
    const locked = !isToolUnlocked(toolName);
    if (!button.dataset.baseTitle) button.dataset.baseTitle = button.title || tools[toolName]?.label || "";
    button.disabled = locked;
    button.classList.toggle("locked", locked);
    button.title = locked ? `評価${requiredStars}で解禁` : button.dataset.baseTitle;
  });
}

function goalStatus(goalId, metrics = getManagementMetrics()) {
  const goal = GOAL_DEFINITIONS[goalId];
  const value = goal ? Number(goal.value(metrics)) || 0 : 0;
  return {
    goalId,
    goal,
    value,
    progress: goal ? clamp(value / goal.target, 0, 1) : 0,
    complete: !!goal && value >= goal.target
  };
}

function renderProgressionPanel(rating, metrics) {
  ui.ratingStars.textContent = starText(rating.stars);
  ui.ratingStars.setAttribute("aria-label", `${rating.stars}つ星`);
  ui.ratingScore.textContent = `${Math.round(rating.score)}点`;
  ui.ratingExperience.textContent = Math.round(rating.components.experience);
  ui.ratingFinance.textContent = Math.round(rating.components.finance);
  ui.ratingFacilities.textContent = Math.round(rating.components.facilities);
  ui.ratingScenery.textContent = Math.round(rating.components.scenery);
  ui.ratingTransit.textContent = Math.round(rating.components.transit);
  const goals = state.progression.activeGoalIds.map(goalId => goalStatus(goalId, metrics));
  const goalHtml = goals.length
    ? goals.map(status => `<div class="goal-row${status.complete ? " complete" : ""}"><span>${status.goal.label}</span><b>${status.goal.format(status.value)} / ${status.goal.format(status.goal.target)}</b><div class="goal-progress"><i style="width:${Math.round(status.progress * 100)}%"></i></div></div>`).join("")
    : '<span class="route-empty">すべての経営目標を達成しました</span>';
  const nextUnlock = UNLOCK_DEFINITIONS.find(unlock => unlock.stars > state.progression.bestStars);
  const nextUnlockText = nextUnlock ? `評価${nextUnlock.stars}: ${nextUnlock.label}` : "全ランク解禁済み";
  const signature = `${goalHtml}:${nextUnlockText}`;
  if (signature !== progressionRenderSignature) {
    ui.goalList.innerHTML = goalHtml;
    ui.nextUnlock.textContent = nextUnlockText;
    progressionRenderSignature = signature;
  }
}

function saveGame() {
  const save = {
    version: 1,
    savedAt: Date.now(),
    selectedHero,
    analysisMode,
    money: state.money,
    clean: state.clean,
    happy: state.happy,
    day: state.day,
    round: state.round,
    guestsServed: state.guestsServed,
    sentiment: state.sentiment,
    admissionFee: state.admissionFee,
    difficulty: state.difficulty,
    finance: { ...state.finance },
    marketing: { ...state.marketing },
    guestLog: state.guestLog,
    staff: { ...state.staff },
    staffStats: { ...state.staffStats },
    staffRoster: state.staffAgents.map(agent => ({
      id: agent.id,
      role: agent.role,
      jobsCompleted: agent.jobsCompleted,
      experience: agent.experience,
      level: agent.level,
      fatigue: agent.fatigue,
      resting: agent.state === "resting"
    })),
    transit: cloneTransitState(),
    progression: JSON.parse(JSON.stringify(state.progression)),
    tiles: state.tiles.map(tile => ({
      terrain: tile.terrain,
      path: tile.path,
      transitTrack: tile.transitTrack,
      litter: tile.litter,
      traffic: tile.traffic,
      moodTotal: tile.moodTotal,
      moodWeight: tile.moodWeight,
      object: snapshotObject(tile.object)
    }))
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  toast("パークをセーブしました");
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) {
    toast("セーブデータがありません");
    return;
  }
  try {
    const save = JSON.parse(raw);
    if (save.version !== 1 || !Array.isArray(save.tiles) || save.tiles.length !== state.tiles.length) {
      toast("このセーブデータは読み込めません");
      return;
    }
    state.money = Number(save.money) || 0;
    state.clean = clamp(Number(save.clean) || 80, 0, 100);
    state.happy = clamp(Number(save.happy) || 80, 0, 100);
    state.day = Math.max(1, Number(save.day) || 1);
    state.round = Math.max(1, Number(save.round) || 1);
    state.guestsServed = Math.max(0, Number(save.guestsServed) || 0);
    state.sentiment = clamp(Number(save.sentiment) || 0, -20, 20);
    state.admissionFee = clamp(Number(save.admissionFee ?? 25), 0, 75);
    state.difficulty = DIFFICULTY_CONFIGS[save.difficulty] ? save.difficulty : "standard";
    analysisMode = ["normal", "crowding", "hygiene", "satisfaction"].includes(save.analysisMode) ? save.analysisMode : "normal";
    state.finance = {
      admissionRevenue: Math.max(0, Number(save.finance?.admissionRevenue) || 0),
      rideRevenue: Math.max(0, Number(save.finance?.rideRevenue) || 0),
      shopRevenue: Math.max(0, Number(save.finance?.shopRevenue) || 0),
      maintenanceExpenses: Math.max(0, Number(save.finance?.maintenanceExpenses) || 0),
      staffExpenses: Math.max(0, Number(save.finance?.staffExpenses) || 0),
      restockExpenses: Math.max(0, Number(save.finance?.restockExpenses) || 0),
      marketingExpenses: Math.max(0, Number(save.finance?.marketingExpenses) || 0)
    };
    const savedCampaign = MARKETING_CAMPAIGNS[save.marketing?.activeCampaign] ? save.marketing.activeCampaign : null;
    state.marketing = {
      activeCampaign: savedCampaign,
      remainingLeads: savedCampaign ? Math.max(0, Number(save.marketing?.remainingLeads) || 0) : 0,
      attractedGuests: Math.max(0, Number(save.marketing?.attractedGuests) || 0),
      refusals: Math.max(0, Number(save.marketing?.refusals) || 0),
      campaignsStarted: Math.max(0, Number(save.marketing?.campaignsStarted) || 0)
    };
    state.guestLog = Array.isArray(save.guestLog)
      ? save.guestLog.slice(0, 6).map(entry => ({
        label: String(entry.label || "ゲスト"),
        message: String(entry.message || ""),
        tone: ["positive", "negative", "neutral"].includes(entry.tone) ? entry.tone : "neutral",
        day: Math.max(1, Number(entry.day) || 1)
      }))
      : [];
    state.staff = {
      cleaners: clamp(Number(save.staff?.cleaners ?? 1), 0, 12),
      mechanics: clamp(Number(save.staff?.mechanics ?? 1), 0, 12)
    };
    state.staffStats = {
      cleaningJobs: Math.max(0, Number(save.staffStats?.cleaningJobs) || 0),
      repairJobs: Math.max(0, Number(save.staffStats?.repairJobs) || 0)
    };
    staffSequence = 0;
    state.staffAgents = [];
    const savedRoster = Array.isArray(save.staffRoster) ? save.staffRoster : [];
    const remainingStaff = { cleaner: state.staff.cleaners, mechanic: state.staff.mechanics };
    savedRoster.forEach(agent => {
      const role = agent?.role;
      if (!remainingStaff[role]) return;
      state.staffAgents.push(createStaffAgent(role, agent));
      remainingStaff[role]--;
    });
    state.guests = [];
    state.buses = [];
    state.monorails = [];
    state.parkTrains = [];
    spawnTimer = 0;
    incomeTimer = 0;
    expenseTimer = 0;
    stopSequence = 0;
    save.tiles.forEach((savedTile, index) => {
      const tile = state.tiles[index];
      tile.terrain = savedTile.terrain === "water" ? "water" : "grass";
      tile.path = !!savedTile.path;
      tile.transitTrack = ["monorail", "park_train"].includes(savedTile.transitTrack) ? savedTile.transitTrack : null;
      tile.litter = Math.max(0, Number(savedTile.litter) || 0);
      tile.traffic = Math.max(0, Number(savedTile.traffic) || 0);
      tile.moodTotal = Math.max(0, Number(savedTile.moodTotal) || 0);
      tile.moodWeight = Math.max(0, Number(savedTile.moodWeight) || 0);
      tile.object = restoreObject(savedTile.object);
    });
    restoreTransitState(save.transit);
    transitRenderSignature = "";
    rebuildRideList();
    syncStaffAgents();
    restoreProgressionState(save.progression);
    progressionRenderSignature = "";
    undoStack.length = 0;
    updateUndoButton();
    if (save.selectedHero) applyHeroSelection(save.selectedHero, true);
    inspect(entrance);
    renderGuestLog();
    computeStats();
    toast("パークをロードしました");
  } catch {
    toast("セーブデータの読み込みに失敗しました");
  }
}

function computeStats() {
  const queue = state.rides.reduce((sum, r) => sum + r.queue.length, 0);
  const rides = state.rides.length;
  const broken = state.rides.filter(ride => ride.broken).length;
  const averageCondition = rides
    ? state.rides.reduce((sum, ride) => sum + Number(ride.condition ?? 100), 0) / rides
    : 100;
  const scene = sceneryScore();
  const transit = busStops().length + transitStops("monorail").length + transitStops("park_train").length;
  const transitNetworkState = transitNetwork("bus");
  const monorailNetworkState = transitNetwork("monorail");
  const parkTrainNetworkState = transitNetwork("park_train");
  const transitWaiting = transitNetworkState.entranceWaiting
    + transitStops("bus").reduce((sum, tile) => sum + Number(tile.object.waiting || 0), 0)
    + transitStops("monorail").reduce((sum, tile) => sum + Number(tile.object.waiting || 0), 0)
    + transitStops("park_train").reduce((sum, tile) => sum + Number(tile.object.waiting || 0), 0);
  const transitCapacity = transitNetworkState.fleet * TRANSIT_MODE_CONFIGS.bus.capacity
    + monorailNetworkState.fleet * TRANSIT_MODE_CONFIGS.monorail.capacity
    + parkTrainNetworkState.fleet * TRANSIT_MODE_CONFIGS.park_train.capacity;
  const transitCrowdingPenalty = Math.max(0, transitWaiting - transitCapacity) * .08;
  const served = state.guestsServed;
  const averageGuestSatisfaction = state.guests.length
    ? state.guests.reduce((sum, guest) => sum + clamp(Number(guest.satisfaction ?? 72), 0, 100), 0) / state.guests.length
    : 72;
  const admissionPenalty = Math.max(0, state.admissionFee - 25) * .45;
  const debtPenalty = state.money < 0 ? 8 : 0;
  const joy = 44 + rides * 4 + scene * .18 + transit * 1.6 + served * .04 + state.clean * .12
    + state.staff.cleaners * .7 + state.staff.mechanics * .45 + state.sentiment + (averageGuestSatisfaction - 72) * .18
    - queue * 1.8 - broken * 6 - admissionPenalty - debtPenalty - transitCrowdingPenalty;
  state.happy = clamp(joy, 18, 100);
  const revenue = state.finance.admissionRevenue + state.finance.rideRevenue + state.finance.shopRevenue;
  const expenses = state.finance.maintenanceExpenses + state.finance.staffExpenses + state.finance.restockExpenses + state.finance.marketingExpenses;
  const net = revenue - expenses;
  ui.money.textContent = `$${Math.round(state.money).toLocaleString()}`;
  ui.happy.textContent = `${Math.round(state.happy)}%`;
  ui.clean.textContent = `${Math.round(state.clean)}%`;
  ui.queue.textContent = queue;
  ui.guests.textContent = state.guests.length;
  const hungryGuests = state.guests.filter(guest => guest.hunger >= 66).length;
  const thirstyGuests = state.guests.filter(guest => Number(guest.thirst || 0) >= 64).length;
  const tiredGuests = state.guests.filter(guest => guest.fatigue >= 72).length;
  const restroomGuests = state.guests.filter(guest => Number(guest.restroomNeed || 0) >= 70).length;
  ui.guestMoodSummary.textContent = restroomGuests
    ? `トイレ待ち ${restroomGuests}人`
    : thirstyGuests
      ? `のどの渇き ${thirstyGuests}人`
    : hungryGuests
    ? `空腹 ${hungryGuests}人`
    : tiredGuests
      ? `疲労 ${tiredGuests}人`
      : state.guests.length
        ? `平均満足 ${Math.round(averageGuestSatisfaction)}%`
        : "園内を観察中";
  ui.day.textContent = state.day;
  ui.round.textContent = state.round;
  ui.cleanerCount.textContent = state.staff.cleaners;
  ui.mechanicCount.textContent = state.staff.mechanics;
  const cleanerTeamStats = staffTeamStats("cleaner");
  const mechanicTeamStats = staffTeamStats("mechanic");
  const cleanerTrainingCost = staffTrainingCost("cleaner");
  const mechanicTrainingCost = staffTrainingCost("mechanic");
  const cleanerLevelText = Number.isInteger(cleanerTeamStats.averageLevel) ? cleanerTeamStats.averageLevel.toFixed(0) : cleanerTeamStats.averageLevel.toFixed(1);
  const mechanicLevelText = Number.isInteger(mechanicTeamStats.averageLevel) ? mechanicTeamStats.averageLevel.toFixed(0) : mechanicTeamStats.averageLevel.toFixed(1);
  ui.cleanerLevel.textContent = cleanerTeamStats.count ? `Lv.${cleanerLevelText}` : "--";
  ui.cleanerFatigue.textContent = cleanerTeamStats.count ? `${Math.round(cleanerTeamStats.averageFatigue)}%` : "--";
  ui.cleanerTraining.textContent = cleanerTrainingCost ? `研修 $${cleanerTrainingCost}` : (cleanerTeamStats.count ? "研修完了" : "雇用が必要");
  ui.cleanerTraining.disabled = cleanerTrainingCost <= 0;
  ui.mechanicLevel.textContent = mechanicTeamStats.count ? `Lv.${mechanicLevelText}` : "--";
  ui.mechanicFatigue.textContent = mechanicTeamStats.count ? `${Math.round(mechanicTeamStats.averageFatigue)}%` : "--";
  ui.mechanicTraining.textContent = mechanicTrainingCost ? `研修 $${mechanicTrainingCost}` : (mechanicTeamStats.count ? "研修完了" : "雇用が必要");
  ui.mechanicTraining.disabled = mechanicTrainingCost <= 0;
  ui.runningCost.textContent = `$${operatingCost().toLocaleString()} / 精算`;
  ui.admissionFee.textContent = `$${state.admissionFee}`;
  ui.admissionRevenue.textContent = `$${Math.round(state.finance.admissionRevenue).toLocaleString()}`;
  ui.rideRevenue.textContent = `$${Math.round(state.finance.rideRevenue).toLocaleString()}`;
  ui.shopRevenue.textContent = `$${Math.round(state.finance.shopRevenue).toLocaleString()}`;
  const shops = shopTiles().map(tile => tile.object);
  const totalShopStock = shops.reduce((sum, shop) => sum + Number(shop.stock || 0), 0);
  const totalShopCapacity = shops.reduce((sum, shop) => sum + Number(shop.maxStock || 0), 0);
  const pendingDeliveries = shops.filter(shop => Number(shop.pendingStock || 0) > 0);
  const blockedOrders = shops.filter(shop => shop.orderBlocked).length;
  ui.shopStockTotal.textContent = `${Math.floor(totalShopStock)} / ${Math.floor(totalShopCapacity)}`;
  ui.shopDeliveryStatus.textContent = pendingDeliveries.length
    ? `配送中 ${pendingDeliveries.length}件`
    : blockedOrders
      ? `資金不足 ${blockedOrders}店`
      : "配送待ちなし";
  const shopPerformanceTotals = shops.reduce((total, shop) => {
    const performance = shopPerformance(shop);
    total.visits += performance.visits;
    total.sales += performance.sales;
    total.grossProfit += performance.grossProfit;
    total.recentInterest += performance.recentInterest;
    return total;
  }, { visits: 0, sales: 0, grossProfit: 0, recentInterest: 0 });
  const shopConversion = shopPerformanceTotals.visits > 0
    ? shopPerformanceTotals.sales / shopPerformanceTotals.visits
    : null;
  ui.shopDemandStatus.textContent = !shops.length
    ? "売店なし"
    : shopPerformanceTotals.recentInterest >= 8
      ? "強い"
      : shopPerformanceTotals.recentInterest >= 3
        ? "安定"
        : "静か";
  ui.shopConversion.textContent = shopConversion === null ? "--" : `${Math.round(shopConversion * 100)}%`;
  ui.shopConversion.className = shopConversion !== null && shopConversion < .6 ? "warning" : "";
  ui.shopGrossProfit.textContent = `${shopPerformanceTotals.grossProfit >= 0 ? "+" : "-"}$${Math.abs(Math.round(shopPerformanceTotals.grossProfit)).toLocaleString()}`;
  ui.shopGrossProfit.className = shopPerformanceTotals.grossProfit >= 0 ? "positive" : "warning";
  const openShops = shops.filter(shop => shop.open !== false);
  const totalShopStaff = openShops.reduce((sum, shop) => sum + Number(shop.staff || 1), 0);
  const averageShopReputation = shops.length
    ? shops.reduce((sum, shop) => sum + Number(shop.reputation ?? SHOP_MANAGEMENT_CONFIG.startingReputation), 0) / shops.length
    : 0;
  ui.shopOpenStatus.textContent = `営業 ${openShops.length} / ${shops.length}`;
  ui.shopStaffStatus.textContent = `店員 ${totalShopStaff}人`;
  ui.shopReputationStatus.textContent = shops.length ? `平均評判 ${Math.round(averageShopReputation)}` : "評判 --";
  const pricingIssues = shopPricingIssues();
  ui.shopPricingStatus.textContent = pricingIssues.length ? `${pricingIssues.length}店が高め` : shops.length ? "全店適正" : "売店なし";
  ui.shopPricingSummary.classList.toggle("warning", pricingIssues.length > 0);
  ui.shopPricingAction.disabled = pricingIssues.length === 0;
  ui.shopPricingAction.textContent = pricingIssues.length ? `${pricingIssues.length}店を確認` : "高値店なし";
  ui.expenseTotal.textContent = `$${Math.round(expenses).toLocaleString()}`;
  ui.netTotal.textContent = `${net >= 0 ? "+" : "-"}$${Math.abs(Math.round(net)).toLocaleString()}`;
  ui.netTotal.classList.toggle("negative", net < 0);
  const difficulty = DIFFICULTY_CONFIGS[state.difficulty] || DIFFICULTY_CONFIGS.beginner;
  const costFactor = difficultyCostFactor();
  const costReduction = Math.round((1 - costFactor) * 100);
  ui.difficultyLabel.textContent = difficulty.label;
  ui.subsidyStatus.textContent = costReduction > 0 ? `運営費 ${costReduction}%軽減` : "補助なし";
  ui.subsidyStatus.style.color = costReduction > 0 ? "var(--green)" : "var(--muted)";
  const currentCost = operatingCost();
  let financeHint = state.round <= difficulty.graceRounds
    ? `序盤補助中です。建て急がず、収入が支出を上回るか観察しましょう。`
    : "収支は安定しています。需要を見ながら少しずつ拡張しましょう。";
  let financeWarning = false;
  if (state.money < currentCost * 5) {
    financeHint = "資金が少なくなっています。新規建設を止め、不要なスタッフや交通費を見直しましょう。";
    financeWarning = true;
  } else if (net < -currentCost) {
    financeHint = "今ラウンドは赤字です。入園料は$20〜30を目安にし、稼働していない設備の追加を控えましょう。";
    financeWarning = true;
  } else if (expenses > revenue && revenue > 0) {
    financeHint = "支出が売上を上回っています。次の建設前に料金・行列・スタッフ稼働を確認しましょう。";
    financeWarning = true;
  }
  const soldOutWithoutDelivery = shops.filter(shop => Number(shop.stock || 0) <= 0 && Number(shop.pendingStock || 0) <= 0).length;
  if (soldOutWithoutDelivery) {
    financeHint = `売り切れの売店が${soldOutWithoutDelivery}店あります。売店を調べて発注するか、自動発注をオンにしましょう。`;
    financeWarning = true;
  }
  const activeCampaignState = activeMarketingCampaign();
  if (activeCampaignState && marketingFit(activeCampaignState.type) < 50) {
    financeHint = `${activeCampaignState.label}向け広告に対して設備が不足しています。満足度低下に注意しましょう。`;
    financeWarning = true;
  }
  ui.financeHint.textContent = financeHint;
  ui.financeHint.classList.toggle("warning", financeWarning);
  renderAnalysisPanel();
  renderMarketingPanel();
  ui.brokenCount.textContent = broken;
  ui.conditionAverage.textContent = `${Math.round(averageCondition)}%`;
  const openRides = state.rides.filter(ride => ride.open !== false).length;
  const averageRidePopularity = rides
    ? state.rides.reduce((sum, ride) => sum + Number(ride.popularity ?? RIDE_MANAGEMENT_CONFIG.startingPopularity), 0) / rides
    : 0;
  const upgradedRides = state.rides.filter(ride => Number(ride.level || 1) > 1).length;
  ui.openRideCount.textContent = `${openRides} / ${rides}`;
  ui.averageRidePopularity.textContent = rides ? Math.round(averageRidePopularity) : "--";
  ui.upgradedRideCount.textContent = upgradedRides;
  ui.activeCleaners.textContent = state.staffAgents.filter(agent => agent.role === "cleaner" && agent.state === "cleaning").length;
  ui.activeMechanics.textContent = state.staffAgents.filter(agent => agent.role === "mechanic" && agent.state === "repairing").length;
  ui.restingStaff.textContent = state.staffAgents.filter(agent => agent.state === "resting").length;
  ui.staffJobs.textContent = Math.floor(state.staffStats.cleaningJobs + state.staffStats.repairJobs);
  const amenities = state.tiles.map(tile => tile.object).filter(object => tools[object?.type]?.amenity);
  ui.benchUses.textContent = Math.floor(amenities.filter(object => object.type === "bench").reduce((sum, object) => sum + Number(object.usage || 0), 0));
  ui.toiletUses.textContent = Math.floor(amenities.filter(object => object.type === "toilet").reduce((sum, object) => sum + Number(object.usage || 0), 0));
  ui.binCollected.textContent = Math.floor(amenities.filter(object => object.type === "trash_bin").reduce((sum, object) => sum + Number(object.collected || 0), 0));
  ui.growthBar.style.width = `${clamp((rides * 16 + transit * 7 + served * .22), 4, 100)}%`;
  ui.loadBar.style.width = `${clamp(queue * 8 + state.guests.length * 2, 5, 100)}%`;
  ui.sceneBar.style.width = `${clamp(scene * 2, 7, 100)}%`;
  renderTransitPanel();
  const managementMetrics = getManagementMetrics();
  renderProgressionPanel(calculateParkRating(managementMetrics), managementMetrics);
}

function analysisTileLabel(tile) {
  if (!tile) return "--";
  if (tile === entrance) return "入口";
  if (tile.object?.type && tools[tile.object.type]?.label) return tools[tile.object.type].label;
  if (tile.path) return `通路 ${tile.x},${tile.y}`;
  return `区画 ${tile.x},${tile.y}`;
}

function getAnalysisMetrics(mode = analysisMode) {
  if (mode === "crowding") {
    const paths = state.tiles.filter(tile => tile.path && Number(tile.traffic || 0) > .02);
    const hottest = [...paths].sort((a, b) => Number(b.traffic || 0) - Number(a.traffic || 0))[0] || null;
    const maxTraffic = Number(hottest?.traffic || 0);
    return {
      hotspot: analysisTileLabel(hottest),
      warnings: maxTraffic > 0 ? paths.filter(tile => Number(tile.traffic || 0) >= maxTraffic * .65).length : 0,
      indicator: `通行 ${Math.round(paths.reduce((sum, tile) => sum + Number(tile.traffic || 0), 0))}`,
      hint: maxTraffic > 8 ? "赤い通路の分岐を増やし、人気施設への流れを分散しましょう。" : "通行量は安定しています。赤くなる区画を観察しましょう。"
    };
  }
  if (mode === "hygiene") {
    const ranked = state.tiles.map(tile => ({ tile, risk: tileHygieneRisk(tile) })).filter(entry => entry.risk > 0).sort((a, b) => b.risk - a.risk);
    return {
      hotspot: analysisTileLabel(ranked[0]?.tile),
      warnings: ranked.filter(entry => entry.risk >= 35).length,
      indicator: `清潔 ${Math.round(state.clean)}%`,
      hint: ranked.some(entry => entry.risk >= 60) ? "赤い区画のごみ箱を増やすか、清掃員の負荷を見直しましょう。" : "衛生状態は安定しています。黄色い区画を早めに整備しましょう。"
    };
  }
  if (mode === "satisfaction") {
    const sampled = state.tiles.map(tile => ({ tile, satisfaction: tileRecentSatisfaction(tile) })).filter(entry => entry.satisfaction !== null).sort((a, b) => a.satisfaction - b.satisfaction);
    const average = state.guests.length
      ? state.guests.reduce((sum, guest) => sum + clamp(Number(guest.satisfaction ?? 72), 0, 100), 0) / state.guests.length
      : 72;
    return {
      hotspot: analysisTileLabel(sampled[0]?.tile),
      warnings: sampled.filter(entry => entry.satisfaction < 60).length,
      indicator: `平均 ${Math.round(average)}%`,
      hint: sampled.some(entry => entry.satisfaction < 60) ? "赤い区画の待ち時間、景観、売店、休憩施設を確認しましょう。" : "ゲスト体験は安定しています。黄色い区画の感想に注目しましょう。"
    };
  }
  return {
    hotspot: "マップ全体",
    warnings: state.rides.filter(ride => ride.broken).length + state.tiles.filter(tile => tile.litter > .5).length,
    indicator: `満足 ${Math.round(state.happy)}%`,
    hint: "分析モードを選ぶとマップ上の運営課題を確認できます。"
  };
}

function renderAnalysisPanel() {
  const modes = {
    normal: ["通常表示", ui.analysisNormal],
    crowding: ["混雑ヒートマップ", ui.analysisCrowding],
    hygiene: ["衛生ヒートマップ", ui.analysisHygiene],
    satisfaction: ["満足度ヒートマップ", ui.analysisSatisfaction]
  };
  for (const [mode, [, button]] of Object.entries(modes)) {
    button.classList.toggle("active", analysisMode === mode);
    button.setAttribute("aria-selected", analysisMode === mode ? "true" : "false");
  }
  const metrics = getAnalysisMetrics(analysisMode);
  ui.analysisStatus.textContent = modes[analysisMode][0];
  ui.analysisMetricA.textContent = metrics.hotspot;
  ui.analysisMetricB.textContent = metrics.warnings;
  ui.analysisMetricC.textContent = metrics.indicator;
  ui.analysisHint.textContent = metrics.hint;
  ui.analysisLegend.hidden = analysisMode === "normal";
}

function setAnalysisMode(mode) {
  if (!["normal", "crowding", "hygiene", "satisfaction"].includes(mode)) return false;
  analysisMode = mode;
  renderAnalysisPanel();
  return true;
}

function renderMarketingPanel() {
  const active = activeMarketingCampaign();
  const buttonEntries = [
    ["family", ui.marketingFamily, ui.marketingFamilyMeta],
    ["thrill", ui.marketingThrill, ui.marketingThrillMeta],
    ["scenic", ui.marketingScenic, ui.marketingScenicMeta],
    ["foodie", ui.marketingFoodie, ui.marketingFoodieMeta]
  ];
  for (const [type, button, meta] of buttonEntries) {
    const config = MARKETING_CAMPAIGNS[type];
    const fit = Math.round(marketingFit(type));
    meta.textContent = `$${config.cost}・適合${fit}`;
    button.classList.toggle("active", active?.type === type);
    button.setAttribute("aria-pressed", active?.type === type ? "true" : "false");
    button.disabled = state.money < config.cost;
  }
  ui.marketingStatus.textContent = active ? `${active.label}向け配信中` : "未実施";
  ui.marketingFit.textContent = active ? `${Math.round(marketingFit(active.type))}%` : "--";
  ui.marketingLeads.textContent = active ? `${Math.ceil(state.marketing.remainingLeads)}人分` : "0";
  ui.marketingResults.textContent = `${Math.floor(state.marketing.attractedGuests)} / 見送${Math.floor(state.marketing.refusals)}`;
  ui.marketingHint.textContent = active ? marketingFitHint(active.type) : "客層を選んで集客を始めましょう。";
  ui.marketingHint.classList.toggle("warning", !!active && marketingFit(active.type) < 50);
  ui.marketingCancel.disabled = !active;
}

function renderTransitPanel() {
  const network = transitNetwork("bus");
  const config = TRANSIT_MODE_CONFIGS.bus;
  const stops = busStops();
  const plan = getTransitRoutePlan("bus");
  const routedIds = new Set(network.routeStopIds);
  const connectedIds = new Set(plan.connectedStopIds);
  const waiting = Math.floor(network.entranceWaiting + stops.reduce((sum, tile) => sum + Number(tile.object.waiting || 0), 0));
  const passengers = state.buses.reduce((sum, bus) => sum + Number(bus.passengers || 0), 0);
  const availableSeats = Math.max(1, state.buses.length * config.capacity);
  const load = state.buses.length ? Math.round(passengers / availableSeats * 100) : 0;
  const disconnected = network.routeStopIds.filter(stopId => !connectedIds.has(stopId)).length;
  const status = !stops.length
    ? "バス停なし"
    : !network.routeStopIds.length
      ? "路線未設定"
      : disconnected
        ? `未接続 ${disconnected}か所`
        : waiting >= config.capacity * Math.max(1, network.fleet)
          ? "混雑中"
          : "運行中";
  ui.transitStatus.textContent = status;
  ui.busCount.textContent = network.fleet;
  ui.busInterval.textContent = `${network.interval}秒`;
  ui.transitWaiting.textContent = `${waiting}人`;
  ui.transitLoad.textContent = `${load}%`;
  ui.transitRiders.textContent = `${Math.floor(network.totalRiders)}人`;
  ui.busMinus.disabled = network.fleet <= 1;
  ui.busPlus.disabled = network.fleet >= 6;
  ui.intervalMinus.disabled = network.interval <= config.minInterval;
  ui.intervalPlus.disabled = network.interval >= config.maxInterval;

  const ordered = routeStops("bus");
  const unrouted = stops.filter(tile => !routedIds.has(tile.object.stopId));
  const rows = [
    ...ordered.map((tile, index) => {
      const stop = tile.object;
      const congested = stop.waiting >= config.capacity;
      const connection = connectedIds.has(stop.stopId) ? "" : "・通路未接続";
      return `<button class="route-stop-row${congested ? " congested" : ""}" data-stop-id="${stop.stopId}"><b>${index + 1}</b><span>${stop.name}</span><small>待${Math.floor(stop.waiting)}・利用${Math.floor(stop.usage)}${connection}</small></button>`;
    }),
    ...unrouted.map(tile => {
      const stop = tile.object;
      return `<button class="route-stop-row not-in-route" data-stop-id="${stop.stopId}"><b>＋</b><span>${stop.name}</span><small>路線外・利用${Math.floor(stop.usage)}</small></button>`;
    })
  ];
  const html = rows.length ? rows.join("") : '<span class="route-empty">バス停を通路の隣に建設してください</span>';
  const signature = `${status}:${network.fleet}:${network.interval}:${waiting}:${load}:${network.totalRiders}:${html}`;
  if (signature !== transitRenderSignature) {
    ui.routeList.innerHTML = html;
    transitRenderSignature = signature;
  }
  const monorailNetwork = transitNetwork("monorail");
  const stations = transitStops("monorail");
  const monorailPlan = getTransitRoutePlan("monorail");
  const monorailWaiting = stations.reduce((sum, tile) => sum + Number(tile.object.waiting || 0), 0);
  ui.monorailStatus.textContent = !isToolUnlocked("monorail_station")
    ? "評価4で解禁"
    : stations.length < 2
      ? "駅を2か所建設"
      : monorailPlan.connectedStopIds.length < 2
        ? "レール未接続"
        : monorailWaiting >= TRANSIT_MODE_CONFIGS.monorail.capacity * monorailNetwork.fleet
          ? "混雑中"
          : `${monorailNetwork.fleet}編成で運行中`;
  ui.monorailStations.textContent = stations.length;
  ui.monorailRiders.textContent = Math.floor(monorailNetwork.totalRiders);
  const parkTrainNetwork = transitNetwork("park_train");
  const parkTrainStations = transitStops("park_train");
  const parkTrainPlan = getTransitRoutePlan("park_train");
  const parkTrainWaiting = parkTrainStations.reduce((sum, tile) => sum + Number(tile.object.waiting || 0), 0);
  ui.parkTrainStatus.textContent = !isToolUnlocked("train_station")
    ? "評価5で解禁"
    : parkTrainStations.length < 2
      ? "駅を2か所建設"
      : parkTrainPlan.connectedStopIds.length < 2
        ? "線路未接続"
        : parkTrainWaiting >= TRANSIT_MODE_CONFIGS.park_train.capacity
          ? "混雑中"
          : "1編成で運行中";
  ui.parkTrainStations.textContent = parkTrainStations.length;
  ui.parkTrainRiders.textContent = Math.floor(parkTrainNetwork.totalRiders);
}

function getPlacementStatus(tile, toolName = selectedTool) {
  if (!tile) return { valid: false, reason: "マップ外です" };
  if (toolName === "inspect") return { valid: true };
  if (toolName === "remove") {
    const removable = !!tile.object || !!tile.transitTrack || (tile.path && tile !== entrance) || tile.terrain !== tile.baseTerrain;
    return { valid: removable, reason: removable ? "" : "撤去できる物がありません" };
  }
  const tool = tools[toolName];
  if (!tool) return { valid: false, reason: "未対応のツールです" };
  if (!isToolUnlocked(toolName)) return { valid: false, reason: `パーク評価${TOOL_UNLOCK_STARS[toolName]}で解禁されます` };
  if (state.money < tool.cost) return { valid: false, reason: "資金が足りません" };
  if (toolName === "path") {
    const valid = tile.terrain !== "water" && !tile.object && !tile.path;
    return { valid, reason: valid ? "" : "通路には空いた土地が必要です" };
  }
  if (toolName === "monorail_track") {
    const valid = tile.terrain !== "water" && !tile.object && !tile.transitTrack;
    return { valid, reason: valid ? "" : "高架レールには水辺ではない空き上空が必要です" };
  }
  if (toolName === "train_track") {
    const valid = tile.terrain !== "water" && !tile.object && !tile.path && !tile.transitTrack;
    return { valid, reason: valid ? "" : "園内線路には空いた芝生が必要です" };
  }
  if (toolName === "bus_stop") {
    const clear = !tile.object && !tile.path && tile.terrain !== "water";
    if (!clear) return { valid: false, reason: "バス停には空いた芝生が必要です" };
    const connected = !!nearestPathForTile(tile);
    return { valid: connected, reason: connected ? "" : "バス停は通路の隣に置いてください" };
  }
  if (toolName === "monorail_station") {
    const clear = !tile.object && !tile.path && !tile.transitTrack && tile.terrain !== "water";
    if (!clear) return { valid: false, reason: "駅には空いた芝生が必要です" };
    const connectedToPath = neighbors(tile).some(neighbor => neighbor.path);
    const connectedToRail = neighbors(tile).some(neighbor => neighbor.transitTrack === "monorail");
    return {
      valid: connectedToPath && connectedToRail,
      reason: connectedToPath ? "駅は高架レールの隣に置いてください" : "駅は通路と高架レールの隣に置いてください"
    };
  }
  if (toolName === "train_station") {
    const clear = !tile.object && !tile.path && !tile.transitTrack && tile.terrain !== "water";
    if (!clear) return { valid: false, reason: "園内列車駅には空いた芝生が必要です" };
    const connectedToPath = neighbors(tile).some(neighbor => neighbor.path);
    const connectedToRail = neighbors(tile).some(neighbor => neighbor.transitTrack === "park_train");
    return {
      valid: connectedToPath && connectedToRail,
      reason: connectedToPath ? "駅は園内線路の隣に置いてください" : "駅は通路と園内線路の隣に置いてください"
    };
  }
  if (toolName === "water") {
    const valid = !tile.object && !tile.path && tile.terrain !== "water";
    return { valid, reason: valid ? "" : "水辺には空いた土地が必要です" };
  }
  if (tool.amenity || tool.shop) {
    const clear = !tile.object && !tile.path && tile.terrain !== "water";
    if (!clear) return { valid: false, reason: "施設には空いた芝生が必要です" };
    const connected = !!nearestPathForTile(tile);
    return { valid: connected, reason: connected ? "" : "施設は通路の隣に置いてください" };
  }
  const valid = !tile.object && !tile.path && tile.terrain !== "water";
  return { valid, reason: valid ? "" : "空いた芝生に配置してください" };
}

function captureHistoryState() {
  return {
    money: state.money,
    finance: { ...state.finance },
    transit: cloneTransitState(),
    stopSequence,
    selectedTileIndex: selectedTile ? state.tiles.indexOf(selectedTile) : -1,
    tiles: state.tiles.map(tile => ({
      terrain: tile.terrain,
      path: tile.path,
      transitTrack: tile.transitTrack,
      litter: tile.litter,
      traffic: tile.traffic,
      moodTotal: tile.moodTotal,
      moodWeight: tile.moodWeight,
      object: tile.object
    })),
    rides: state.rides.map(ride => ({
      ride,
      data: { ...ride, queue: [...ride.queue], riders: [...ride.riders] }
    })),
    guests: state.guests.map(guest => ({
      guest,
      data: { ...guest, pos: { ...guest.pos }, path: [...guest.path] }
    })),
    transitStops: [...transitStops("bus"), ...transitStops("monorail"), ...transitStops("park_train")].map(tile => ({
      stop: tile.object,
      data: { ...tile.object }
    })),
    amenities: state.tiles
      .map(tile => tile.object)
      .filter(object => tools[object?.type]?.amenity)
      .map(amenity => ({ amenity, data: { ...amenity } })),
    buses: state.buses.map(bus => ({ ...bus })),
    monorails: state.monorails.map(train => ({ ...train })),
    parkTrains: state.parkTrains.map(train => ({ ...train }))
  };
}

function pushUndo(snapshot) {
  if (!snapshot) return;
  undoStack.push(snapshot);
  if (undoStack.length > 30) undoStack.shift();
  updateUndoButton();
}

function updateUndoButton() {
  ui.undoBtn.disabled = undoStack.length === 0;
}

function undoLastBuild() {
  const snapshot = undoStack.pop();
  if (!snapshot) {
    toast("元に戻せる建設操作がありません");
    return false;
  }
  state.money = snapshot.money;
  state.finance = { ...snapshot.finance };
  state.transit = JSON.parse(JSON.stringify(snapshot.transit));
  stopSequence = snapshot.stopSequence;
  snapshot.rides.forEach(({ ride, data }) => Object.assign(ride, data, { queue: [...data.queue], riders: [...data.riders] }));
  snapshot.guests.forEach(({ guest, data }) => Object.assign(guest, data, { pos: { ...data.pos }, path: [...data.path] }));
  snapshot.transitStops.forEach(({ stop, data }) => Object.assign(stop, data));
  snapshot.amenities.forEach(({ amenity, data }) => Object.assign(amenity, data));
  snapshot.tiles.forEach((saved, index) => Object.assign(state.tiles[index], saved));
  state.rides = snapshot.rides.map(item => item.ride);
  state.guests = snapshot.guests.map(item => item.guest);
  state.buses = snapshot.buses.map(bus => ({ ...bus }));
  state.monorails = snapshot.monorails.map(train => ({ ...train }));
  state.parkTrains = snapshot.parkTrains.map(train => ({ ...train }));
  transitRenderSignature = "";
  selectedTile = snapshot.selectedTileIndex >= 0 ? state.tiles[snapshot.selectedTileIndex] : null;
  inspect(selectedTile || entrance);
  computeStats();
  updateUndoButton();
  toast("最後の建設操作を元に戻しました");
  return true;
}

function build(tile, options = {}) {
  if (!tile) return false;
  if (selectedTool === "inspect") {
    if (!options.silent) inspect(tile);
    return true;
  }
  const status = getPlacementStatus(tile, selectedTool);
  if (!status.valid) {
    if (!options.silent) toast(status.reason);
    return false;
  }
  const historyBefore = options.recordHistory === false ? null : captureHistoryState();
  if (selectedTool === "remove") {
    if (tile.object) {
      if (tools[tile.object.type]?.ride) {
        const removedRide = tile.object;
        for (const guest of [...removedRide.queue, ...removedRide.riders]) {
          guest.state = "leaving";
          guest.goal = null;
          guest.tile = nearestPathForTile(tile) || entrance;
          guest.pos = { x: guest.tile.x, y: guest.tile.y };
          guest.path = findPath(guest.tile, entrance);
        }
        state.rides = state.rides.filter(ride => ride !== removedRide);
      }
      if (tools[tile.object.type]?.amenity) {
        const removedAmenity = tile.object;
        for (const guest of state.guests.filter(candidate => candidate.goal === removedAmenity)) {
          guest.goal = null;
          guest.goalType = null;
          guest.amenityTimer = 0;
          routeGuestToRideOrExit(guest);
        }
      }
      if (tools[tile.object.type]?.shop) {
        const removedShop = tile.object;
        for (const guest of state.guests.filter(candidate => candidate.goal === removedShop)) {
          const desiredKind = guest.goalShopKind || shopKind(removedShop);
          guest.goal = null;
          guest.goalType = null;
          guest.shopRejected = removedShop;
          if (!routeGuestToShop(guest, desiredKind, false)) routeGuestToRideOrExit(guest);
          guest.shopRejected = null;
        }
      }
      if (tools[tile.object.type]?.transit) {
        const mode = tile.object.transitMode || "bus";
        const network = transitNetwork(mode);
        network.routeStopIds = network.routeStopIds.filter(stopId => stopId !== tile.object.stopId);
        resetTransitVehicles(mode);
      }
      tile.object = null;
      state.money += 60;
    } else if (tile.transitTrack) {
      const mode = tile.transitTrack;
      tile.transitTrack = null;
      resetTransitVehicles(mode);
    } else if (tile.path) {
      tile.path = false;
    } else {
      tile.terrain = tile.baseTerrain;
    }
    pushUndo(historyBefore);
    if (!options.silent) toast("撤去しました");
    return true;
  }
  const tool = tools[selectedTool];
  if (selectedTool === "path") {
    tile.path = true;
  } else if (tool.trackMode) {
    tile.transitTrack = tool.trackMode;
    resetTransitVehicles(tool.trackMode);
  } else if (selectedTool === "water") {
    tile.terrain = "water";
  } else if (tool.ride) {
    tile.object = createRide(selectedTool);
    state.rides.push(tile.object);
  } else if (tool.shop) {
    tile.object = createShop(selectedTool);
  } else if (tool.amenity) {
    tile.object = {
      type: selectedTool,
      usage: 0,
      fill: 0,
      collected: 0,
      ...(tool.maxFill ? { maxFill: tool.maxFill } : {})
    };
  } else if (tool.transit) {
    const mode = tool.transitMode || (selectedTool === "bus_stop" ? "bus" : state.transit.activeMode);
    tile.object = createTransitStop(mode);
    registerTransitStop(tile.object);
    resetTransitVehicles(mode);
  } else {
    tile.object = { type: selectedTool };
  }
  state.money -= tool.cost;
  if (tile.litter) tile.litter = Math.max(0, tile.litter - 1);
  if (!options.silent) inspect(tile);
  pushUndo(historyBefore);
  return true;
}

function removeRange(from, to) {
  if (!from || !to) return 0;
  const historyBefore = captureHistoryState();
  const minX = Math.min(from.x, to.x);
  const maxX = Math.max(from.x, to.x);
  const minY = Math.min(from.y, to.y);
  const maxY = Math.max(from.y, to.y);
  let removed = 0;
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (build(tileAt(x, y), { silent: true, recordHistory: false })) removed++;
    }
  }
  if (removed) pushUndo(historyBefore);
  toast(removed ? `${removed}マスをまとめて撤去しました` : "範囲内に撤去できる物がありません");
  return removed;
}

function inspect(tile) {
  if (!tile) tile = entrance;
  selectedTile = tile;
  let title = "芝生タイル";
  let body = "通路、ライド、景観、水辺を配置できる空き地です。";
  let controls = "";
  if (tile.terrain === "water") {
    title = "水辺の庭";
    body = "景観値を少し高めます。ゲストはつながった通路を使って水辺を回り込みます。";
  }
  if (tile.path) {
    title = "クリーム色の通路";
    body = "ゲストは接続された通路だけを移動します。ライドは通路に隣接させると利用されます。";
  }
  if (tile.object) {
    const t = tools[tile.object.type];
    title = t.label;
    if (t.ride) {
      const capacity = rideCapacity(tile.object);
      const duration = rideDuration(tile.object);
      const wait = rideEstimatedWait(tile.object);
      const upkeep = Math.round(rideMaintenanceCost(tile.object) * difficultyCostFactor());
      const level = Number(tile.object.level || 1);
      const popularity = Math.round(Number(tile.object.popularity ?? RIDE_MANAGEMENT_CONFIG.startingPopularity));
      const upgradeCost = rideUpgradeCost(tile.object);
      const status = tile.object.broken ? "故障中" : tile.object.open === false ? "運休中" : "営業中";
      const waitLabel = tile.object.broken || tile.object.open === false ? "--" : `${wait}秒`;
      body = `${status}。状態 ${Math.round(tile.object.condition ?? 100)}%、待ち列 ${tile.object.queue.length}人・推定${waitLabel}、乗車中 ${tile.object.riders.length}/${capacity}人、運転回数 ${tile.object.totalRides}回。`;
      controls = `<div class="ride-management-grid"><span>レベル<b>Lv.${level}</b></span><span>人気<b>${popularity}</b></span><span>維持費 / 精算<b>$${upkeep}</b></span><span>定員<b>${capacity}人</b></span><span>運転時間<b>${duration.toFixed(1)}秒</b></span><span>整備開始<b>${rideMaintenanceThreshold(tile.object)}%</b></span></div><div class="inline-economy"><span>乗車料金</span><div class="stepper"><button data-action="ride-price-down" title="乗車料金を下げる">−</button><b>$${tile.object.price}</b><button data-action="ride-price-up" title="乗車料金を上げる">＋</button></div></div><span class="ride-policy-label">整備方針</span><div class="ride-policy-control">${Object.entries(RIDE_MANAGEMENT_CONFIG.policies).map(([key, policy]) => `<button class="${tile.object.maintenancePolicy === key ? "active" : ""}" data-action="ride-policy" data-policy="${key}">${policy.label}</button>`).join("")}</div><div class="ride-development-actions"><button class="${tile.object.open !== false ? "active" : ""}" data-action="ride-open-toggle">${tile.object.open === false ? "営業を再開" : "運休する"}</button><button data-action="ride-upgrade" ${upgradeCost <= 0 || tile.object.broken ? "disabled" : ""}>${upgradeCost > 0 ? `Lv.${level + 1}改良 $${upgradeCost}` : "改良完了"}</button></div>`;
    }
    else if (t.transit) {
      const stop = tile.object;
      const mode = stop.transitMode || "bus";
      const network = transitNetwork(mode);
      const order = network.routeStopIds.indexOf(stop.stopId);
      const connection = mode !== "bus"
        ? (nearestTrackForTile(tile, mode) && nearestPathForTile(tile) ? "通路・レール接続済み。" : "接続を確認してください。")
        : "通路接続済み。";
      body = `${order >= 0 ? `停車順 ${order + 1}番。` : "現在は路線外です。"}${connection}待機 ${Math.floor(stop.waiting)}人、累計利用 ${Math.floor(stop.usage)}人、前回乗車 ${Math.floor(stop.lastBoarding)}人。`;
      controls = `<div class="transit-stop-controls"><button data-action="route-toggle">${order >= 0 ? "路線から外す" : "路線に追加"}</button><button data-action="route-up" title="停車順を前へ" ${order <= 0 ? "disabled" : ""}>↑</button><button data-action="route-down" title="停車順を後へ" ${order < 0 || order >= network.routeStopIds.length - 1 ? "disabled" : ""}>↓</button></div>`;
    }
    else if (t.shop) {
      const stock = Number(tile.object.stock ?? 0);
      const maxStock = Number(tile.object.maxStock ?? shopCapacityForDifficulty(state.difficulty, tile.object.type));
      const pending = Number(tile.object.pendingStock || 0);
      const instantQuantity = Math.max(0, maxStock - stock - pending);
      const restockCost = instantQuantity * shopUnitCost(tile.object, true);
      const orderQuantity = Math.min(shopDeliverySize(tile.object), Math.max(0, maxStock - stock));
      const orderCost = orderQuantity * shopUnitCost(tile.object);
      const stockPercent = Math.round(stock / Math.max(1, maxStock) * 100);
      const delivery = pending > 0
        ? `配送中 ${Math.ceil(tile.object.deliveryTimer)}秒・${pending}個`
        : tile.object.orderBlocked
          ? "仕入れ資金不足"
          : "配送待ちなし";
      const performance = shopPerformance(tile.object);
      const conversion = performance.visits ? `${Math.round(performance.conversion * 100)}%` : "--";
      const grossProfit = `${performance.grossProfit >= 0 ? "+" : "-"}$${Math.abs(Math.round(performance.grossProfit))}`;
      const staff = Number(tile.object.staff || 1);
      const level = Number(tile.object.level || 1);
      const reputation = Math.round(Number(tile.object.reputation ?? SHOP_MANAGEMENT_CONFIG.startingReputation));
      const staffCost = tile.object.open === false ? 0 : Math.round(staff * shopStaffWage(tile.object) * difficultyCostFactor());
      const upgradeCost = shopUpgradeCost(tile.object);
      const pricing = performance.pricing;
      const pricingClass = pricing.status === "high" ? "warning" : pricing.status === "fair" ? "positive" : "";
      body = `${tile.object.open === false ? "休業中" : "営業中"}。在庫 ${stock}/${maxStock}、${delivery}。来店 ${performance.visits}人、販売 ${performance.sales}個、成約率 ${conversion}、価格離脱 ${performance.priceRejects}件、品切れ ${performance.lostSales}件、仕入差引 ${grossProfit}。`;
      controls = `<div class="shop-stock-meter"><i class="${stockPercent <= 20 ? "low" : ""}" style="width:${stockPercent}%"></i></div><div class="shop-management-grid"><span>店舗レベル<b>Lv.${level}</b></span><span>評判<b>${reputation}</b></span><span>店員費 / 精算<b>$${staffCost}</b></span></div><p class="shop-insight ${performance.warning ? "warning" : ""}">${performance.insight}</p><div class="shop-price-guide"><span>価格評価<b class="${pricingClass}">${pricing.label}</b></span><span>推奨価格<b>$${pricing.recommended}</b></span><span>粗利 / 個<b>$${pricing.unitProfit}</b></span></div><div class="inline-economy"><span>商品価格</span><div class="stepper"><button data-action="shop-price-down" title="商品価格を下げる">−</button><b>$${tile.object.price}</b><button data-action="shop-price-up" title="商品価格を上げる">＋</button></div><button class="shop-price-apply" data-action="shop-price-recommended" ${Number(tile.object.price) === pricing.recommended ? "disabled" : ""}>推奨 $${pricing.recommended}</button><button class="restock-btn" data-action="restock" ${restockCost <= 0 ? "disabled" : ""}>即時 $${restockCost}</button></div><div class="shop-actions"><button class="${tile.object.autoRestock ? "active" : ""}" data-action="shop-auto-toggle">自動発注 ${tile.object.autoRestock ? "ON" : "OFF"}</button><button data-action="shop-order" ${pending > 0 || orderQuantity <= 0 ? "disabled" : ""}>${orderQuantity}個発注 $${orderCost}</button></div><div class="shop-staff-stepper"><button data-action="shop-staff-down" title="店員を減らす" ${staff <= 1 ? "disabled" : ""}>−</button><span>店員 ${staff}人</span><button data-action="shop-staff-up" title="店員を増やす" ${staff >= SHOP_MANAGEMENT_CONFIG.maxStaff ? "disabled" : ""}>＋</button></div><div class="shop-development-actions"><button class="${tile.object.open !== false ? "active" : ""}" data-action="shop-open-toggle">${tile.object.open === false ? "営業を再開" : "休業する"}</button><button data-action="shop-upgrade" ${upgradeCost <= 0 ? "disabled" : ""}>${upgradeCost > 0 ? `Lv.${level + 1}改装 $${upgradeCost}` : "改装完了"}</button></div>`;
    }
    else if (t.amenity === "bench") {
      body = `累計 ${Math.floor(tile.object.usage || 0)}回利用。疲れたゲストが通路から立ち寄り、休憩して元気を取り戻します。`;
    }
    else if (t.amenity === "toilet") {
      body = `累計 ${Math.floor(tile.object.usage || 0)}回利用。衛生需要が高まったゲストの不満を解消します。維持費は精算ごとに $${t.upkeep} です。`;
    }
    else if (t.amenity === "bin") {
      const fill = Number(tile.object.fill || 0);
      const maxFill = Number(tile.object.maxFill || tools.trash_bin.maxFill);
      body = `容量 ${Math.round(fill)}/${maxFill}、累計回収 ${Math.floor(tile.object.collected || 0)}。3マス以内で発生したごみを受け止め、清掃員が空にします。`;
    }
    else body = `景観値 ${t.scenery}。満足度を少し上げ、清潔さの悪化をやわらげます。`;
  }
  ui.selected.innerHTML = `<strong>${title}</strong><p>${body}</p>${controls}`;
}

function toast(text) {
  ui.toast.textContent = text;
  ui.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ui.toast.classList.remove("show"), 1200);
}

function guestThought(guest, message, short, tone = "neutral", force = false) {
  if (!guest || (!force && guest.thoughtCooldown > 0)) return false;
  guest.thought = { short, tone };
  guest.thoughtTimer = 4.2;
  guest.thoughtCooldown = force ? 3 : 7;
  addGuestLog(guest.profile?.label || GUEST_ARCHETYPES[guest.archetype]?.label || "ゲスト", message, tone);
  return true;
}

function addGuestLog(label, message, tone = "neutral") {
  state.guestLog.unshift({ label, message, tone, day: state.day });
  state.guestLog = state.guestLog.slice(0, 6);
  renderGuestLog();
}

function renderGuestLog() {
  if (!state.guestLog.length) {
    ui.guestLog.innerHTML = '<p class="empty-feedback">新しい感想を待っています</p>';
    return;
  }
  ui.guestLog.innerHTML = state.guestLog.map(entry =>
    `<article class="${entry.tone}"><b>${entry.label}</b><p>${entry.message}</p></article>`
  ).join("");
}

function paintPathBetween(from, to) {
  if (!from || !to) return;
  let x = from.x;
  let y = from.y;
  const stepX = Math.sign(to.x - x);
  const stepY = Math.sign(to.y - y);
  while (x !== to.x) {
    x += stepX;
    if (build(tileAt(x, y), { silent: true, recordHistory: false })) mouse.painted++;
  }
  while (y !== to.y) {
    y += stepY;
    if (build(tileAt(x, y), { silent: true, recordHistory: false })) mouse.painted++;
  }
}

canvas.addEventListener("pointerdown", e => {
  mouse.down = true;
  mouse.moved = false;
  mouse.painted = 0;
  mouse.sx = e.clientX;
  mouse.sy = e.clientY;
  mouse.cx = camera.x;
  mouse.cy = camera.y;
  mouse.lastTile = screenToTile(e.clientX, e.clientY);
  mouse.mode = selectedTool === "path" || tools[selectedTool]?.trackMode ? "paint" : selectedTool === "remove" ? "range-remove" : "pan";
  if (mouse.mode === "paint" && mouse.lastTile) {
    mouse.historyBefore = captureHistoryState();
    if (build(mouse.lastTile, { silent: true, recordHistory: false })) mouse.painted++;
  }
  if (mouse.mode === "range-remove") {
    mouse.rangeStart = mouse.lastTile;
    mouse.rangeEnd = mouse.lastTile;
  }
  canvas.setPointerCapture?.(e.pointerId);
});

canvas.addEventListener("pointermove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  hovered = screenToTile(e.clientX, e.clientY);
  if (mouse.down) {
    if (mouse.mode === "paint") {
      if (hovered && hovered !== mouse.lastTile) {
        paintPathBetween(mouse.lastTile, hovered);
        mouse.lastTile = hovered;
        mouse.moved = true;
      }
      return;
    }
    if (mouse.mode === "range-remove") {
      if (hovered && hovered !== mouse.rangeEnd) {
        mouse.rangeEnd = hovered;
        mouse.moved = true;
      }
      return;
    }
    const dx = e.clientX - mouse.sx;
    const dy = e.clientY - mouse.sy;
    if (Math.hypot(dx, dy) > 4) mouse.moved = true;
    camera.x = mouse.cx + dx;
    camera.y = mouse.cy + dy;
  }
});

canvas.addEventListener("pointerup", e => {
  mouse.down = false;
  canvas.releasePointerCapture?.(e.pointerId);
  if (mouse.mode === "paint") {
    if (mouse.painted) pushUndo(mouse.historyBefore);
    const label = tools[selectedTool]?.trackMode ? "高架レール" : "通路";
    toast(mouse.painted ? `${label}を ${mouse.painted}マス建設しました` : "建設できる場所をドラッグしてください");
  } else if (mouse.mode === "range-remove") {
    removeRange(mouse.rangeStart, mouse.rangeEnd || mouse.rangeStart);
  } else if (!mouse.moved) {
    build(screenToTile(e.clientX, e.clientY));
  }
  mouse.mode = null;
  mouse.lastTile = null;
  mouse.rangeStart = null;
  mouse.rangeEnd = null;
  mouse.historyBefore = null;
});

canvas.addEventListener("pointercancel", () => {
  if (mouse.mode === "paint" && mouse.painted) {
    pushUndo(mouse.historyBefore);
    undoLastBuild();
  }
  mouse.down = false;
  mouse.mode = null;
  mouse.lastTile = null;
  mouse.rangeStart = null;
  mouse.rangeEnd = null;
  mouse.historyBefore = null;
});

canvas.addEventListener("wheel", e => {
  e.preventDefault();
  setZoom(camera.zoom * (e.deltaY > 0 ? .9 : 1.1), e.clientX, e.clientY);
}, { passive: false });

ui.zoomInBtn.addEventListener("click", () => setZoom(camera.zoom * 1.18));
ui.zoomOutBtn.addEventListener("click", () => setZoom(camera.zoom / 1.18));
ui.zoomResetBtn.addEventListener("click", () => setZoom(1));

function closeToolCategories(except = null) {
  document.querySelectorAll(".tool-category").forEach(category => {
    if (category === except) return;
    category.classList.remove("open");
    category.querySelector(".category-trigger")?.setAttribute("aria-expanded", "false");
  });
}

function updateToolCategoryState(activeButton = null) {
  document.querySelectorAll(".tool-category").forEach(category => {
    category.classList.toggle("active", !!activeButton && category.contains(activeButton));
  });
}

function selectTool(tool, options = {}) {
  const btn = document.querySelector(`[data-tool="${tool}"]`);
  if (!btn || !tools[tool]) return false;
  if (!isToolUnlocked(tool)) {
    if (!options.silent) toast(`${tools[tool].label}はパーク評価${TOOL_UNLOCK_STARS[tool]}で解禁されます`);
    return false;
  }
  selectedTool = tool;
  document.querySelectorAll("[data-tool]").forEach(b => b.classList.toggle("active", b === btn));
  updateToolCategoryState(btn);
  if (options.close !== false) closeToolCategories();
  if (!options.silent) toast(`${tools[selectedTool].label}を選択しました`);
  return true;
}

document.querySelectorAll(".category-trigger").forEach(trigger => {
  trigger.addEventListener("click", e => {
    e.stopPropagation();
    const category = trigger.closest(".tool-category");
    const willOpen = !category.classList.contains("open");
    closeToolCategories(category);
    category.classList.toggle("open", willOpen);
    trigger.setAttribute("aria-expanded", String(willOpen));
  });
});

document.querySelectorAll("[data-tool]").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
    selectTool(btn.dataset.tool);
  });
});

document.addEventListener("click", () => closeToolCategories());
selectTool(selectedTool, { silent: true, close: false });

function applyHeroSelection(hero, silent = false) {
  selectedHero = hero;
  localStorage.setItem("parkHero", hero);
  document.querySelectorAll("[data-hero]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.hero === hero);
  });
  ui.heroName.textContent = hero === "female" ? "女性マネージャー" : "男性マネージャー";
  if (!silent) toast(`${ui.heroName.textContent}を選択しました`);
}

document.querySelectorAll("[data-hero]").forEach(btn => {
  btn.addEventListener("click", () => applyHeroSelection(btn.dataset.hero));
});
applyHeroSelection(selectedHero, true);

const TUTORIAL_STEPS = [
  {
    title: "ようこそ、園長さん",
    body: `<p>まず難易度を選びます。初めてなら <strong>「はじめて」</strong> がおすすめです。初期資金が多く、最初の2ラウンドは運営費が大きく軽減されます。</p><p class="tutorial-tip">難易度を変えても、ゲームの機能やアンロック内容は同じです。</p>`
  },
  {
    title: "最初は建てすぎない",
    body: `<p>スターター設備だけでも開園できます。最初はゲストの行列と感想を観察し、<strong>通路に接した設備だけ</strong>を少しずつ追加しましょう。</p><p class="tutorial-tip">大きなライド、交通車両、スタッフは建設費に加えて定期的な運営費がかかります。</p>`
  },
  {
    title: "料金とスタッフを見る",
    body: `<p>入園料は <strong>$20〜30</strong> が序盤の目安です。高すぎると来園を断られます。ライド料金は施設を調べると変更できます。</p><p>ごみが残るなら清掃員、故障が長引くなら整備員を増やします。仕事が少ないときの過剰雇用は赤字につながります。</p>`
  },
  {
    title: "収支を確認して拡張",
    body: `<p>管理画面の <strong>料金・運営収支</strong> で売上と支出を比較します。赤字のヒントが表示されたら、建設を止めて料金・スタッフ・交通を見直しましょう。</p><p class="tutorial-tip">ラウンド終了前にセーブし、黒字と経営目標を確認してから次の区画へ広げるのが安定経営の近道です。</p>`
  }
];

function setDifficulty(mode, options = {}) {
  if (!DIFFICULTY_CONFIGS[mode]) return false;
  const previous = DIFFICULTY_CONFIGS[state.difficulty] || DIFFICULTY_CONFIGS.beginner;
  const pristine = state.round === 1
    && state.guestsServed === 0
    && Object.values(state.finance).every(value => Number(value || 0) === 0)
    && state.money === previous.initialMoney;
  state.difficulty = mode;
  if (options.adjustFunds !== false && pristine) {
    state.money = DIFFICULTY_CONFIGS[mode].initialMoney;
    for (const tile of shopTiles()) tile.object = createShop(tile.object.type);
  }
  renderTutorial();
  computeStats();
  if (!options.silent) toast(`難易度を「${DIFFICULTY_CONFIGS[mode].label}」に設定しました`);
  return true;
}

function renderTutorial() {
  const step = TUTORIAL_STEPS[tutorialStep];
  if (!step) return;
  ui.tutorialStepLabel.textContent = `STEP ${tutorialStep + 1} / ${TUTORIAL_STEPS.length}`;
  ui.tutorialTitle.textContent = step.title;
  ui.tutorialBody.innerHTML = step.body;
  ui.tutorialProgress.style.width = `${(tutorialStep + 1) / TUTORIAL_STEPS.length * 100}%`;
  ui.difficultyPicker.hidden = tutorialStep !== 0;
  ui.tutorialBackBtn.disabled = tutorialStep === 0;
  ui.tutorialNextBtn.textContent = tutorialStep === TUTORIAL_STEPS.length - 1 ? "開園する" : "次へ";
  document.querySelectorAll("[data-difficulty]").forEach(button => {
    button.classList.toggle("active", button.dataset.difficulty === state.difficulty);
  });
}

function openTutorial(step = 0) {
  tutorialStep = clamp(step, 0, TUTORIAL_STEPS.length - 1);
  pausedBeforeTutorial = paused;
  paused = true;
  ui.pauseBtn.textContent = "再開";
  ui.tutorialOverlay.hidden = false;
  renderTutorial();
}

function closeTutorial(markSeen = true) {
  ui.tutorialOverlay.hidden = true;
  if (markSeen) localStorage.setItem(TUTORIAL_KEY, "1");
  paused = pausedBeforeTutorial;
  ui.pauseBtn.textContent = paused ? "再開" : "停止";
}

function advanceTutorial() {
  if (tutorialStep >= TUTORIAL_STEPS.length - 1) {
    closeTutorial(true);
    return;
  }
  tutorialStep++;
  renderTutorial();
}

function adjustStaff(role, delta) {
  const labels = { cleaners: "清掃員", mechanics: "整備員" };
  const current = state.staff[role];
  const next = clamp(current + delta, 0, 12);
  if (next === current) return;
  if (delta > 0) {
    const hiringCost = role === "cleaners" ? 250 : 350;
    if (state.money < hiringCost) {
      toast("雇用資金が足りません");
      return;
    }
    state.money -= hiringCost;
    state.finance.staffExpenses += hiringCost;
    toast(`${labels[role]}を雇いました`);
  } else {
    toast(`${labels[role]}を1人減らしました`);
  }
  state.staff[role] = next;
  syncStaffAgents();
  computeStats();
}

function trainStaff(role) {
  if (!["cleaner", "mechanic"].includes(role)) return false;
  const labels = { cleaner: "清掃員", mechanic: "整備員" };
  if (!staffTeam(role).length) {
    toast(`${labels[role]}を雇ってから研修できます`);
    return false;
  }
  const candidate = staffTrainingCandidate(role);
  if (!candidate) {
    toast(`${labels[role]}チームは全員Lv.${STAFF_MANAGEMENT_CONFIG.maxLevel}です`);
    return false;
  }
  const cost = staffTrainingCost(role);
  if (state.money < cost) {
    toast("研修資金が足りません");
    return false;
  }
  state.money -= cost;
  state.finance.staffExpenses += cost;
  candidate.level = clamp(Number(candidate.level || 1) + 1, 1, STAFF_MANAGEMENT_CONFIG.maxLevel);
  candidate.experience = Math.max(Number(candidate.experience || 0), STAFF_MANAGEMENT_CONFIG.experienceThresholds[candidate.level - 1]);
  candidate.fatigue = clamp(Number(candidate.fatigue || 0) + 8, 0, 100);
  computeStats();
  toast(`${labels[role]}をLv.${candidate.level}へ研修しました`);
  return true;
}

function startMarketingCampaign(type) {
  const campaign = MARKETING_CAMPAIGNS[type];
  if (!campaign) return false;
  if (state.money < campaign.cost) {
    toast("広告予算が足りません");
    return false;
  }
  state.money -= campaign.cost;
  state.finance.marketingExpenses += campaign.cost;
  state.marketing.activeCampaign = type;
  state.marketing.remainingLeads = campaign.leads;
  state.marketing.campaignsStarted = Math.max(0, Number(state.marketing.campaignsStarted || 0)) + 1;
  computeStats();
  toast(`${campaign.label}向けキャンペーンを開始しました`);
  return true;
}

function cancelMarketingCampaign() {
  const campaign = activeMarketingCampaign();
  if (!campaign) return false;
  state.marketing.activeCampaign = null;
  state.marketing.remainingLeads = 0;
  computeStats();
  toast(`${campaign.label}向けキャンペーンを停止しました`);
  return true;
}

function adjustAdmissionFee(delta) {
  const next = clamp(state.admissionFee + delta, 0, 75);
  if (next === state.admissionFee) return;
  state.admissionFee = next;
  computeStats();
  toast(`入園料を $${next} に設定しました`);
}

function adjustSelectedPrice(delta) {
  const object = selectedTile?.object;
  const tool = tools[object?.type];
  if (!object || (!tool?.ride && !tool?.shop)) return;
  const min = tool.ride ? 0 : 1;
  const max = tool.ride ? 30 : 24;
  object.price = clamp(Number(object.price ?? tool.defaultPrice) + delta, min, max);
  inspect(selectedTile);
  computeStats();
  toast(`${tool.ride ? "乗車" : "商品"}料金を $${object.price} に設定しました`);
}

function applySelectedShopRecommendedPrice() {
  const shop = selectedTile?.object;
  if (!tools[shop?.type]?.shop) return false;
  const recommended = shopRecommendedPrice(shop);
  if (Number(shop.price) === recommended) {
    toast("商品価格はすでに推奨範囲です");
    return false;
  }
  shop.price = recommended;
  inspect(selectedTile);
  computeStats();
  toast(`商品価格を推奨の $${recommended} に調整しました`);
  return true;
}

function focusHighestPricedShop() {
  const issue = shopPricingIssues()[0];
  if (!issue) {
    toast("高めの商品価格はありません");
    return false;
  }
  const point = iso(issue.tile.x + .5, issue.tile.y + .5);
  camera.x += innerWidth * .42 - point.x;
  camera.y += innerHeight * .48 - point.y;
  inspect(issue.tile);
  toast(`${tools[issue.tile.object.type].label}を確認：推奨 $${issue.diagnosis.recommended}`);
  return true;
}

function toggleSelectedRideOpen() {
  const ride = selectedTile?.object;
  if (!tools[ride?.type]?.ride) return false;
  ride.open = ride.open === false;
  if (!ride.open) {
    const waiting = [...ride.queue];
    ride.queue = [];
    for (const guest of waiting) {
      guest.goal = null;
      guest.goalType = null;
      guest.state = "walking";
      routeGuestToRideOrExit(guest);
      guestThought(guest, `${tools[ride.type].label}が運休したので別の遊具へ`, "別の遊具へ", "neutral", true);
    }
  }
  inspect(selectedTile);
  computeStats();
  toast(ride.open ? "ライドの営業を再開しました" : "ライドを運休しました。維持費が軽減されます");
  return true;
}

function setSelectedRidePolicy(policyName) {
  const ride = selectedTile?.object;
  if (!tools[ride?.type]?.ride || !RIDE_MANAGEMENT_CONFIG.policies[policyName]) return false;
  ride.maintenancePolicy = policyName;
  inspect(selectedTile);
  computeStats();
  toast(`整備方針を「${RIDE_MANAGEMENT_CONFIG.policies[policyName].label}」に変更しました`);
  return true;
}

function upgradeSelectedRide() {
  const ride = selectedTile?.object;
  if (!tools[ride?.type]?.ride) return false;
  if (ride.broken) {
    toast("故障を修理してから改良してください");
    return false;
  }
  const cost = rideUpgradeCost(ride);
  if (!cost) {
    toast("このライドは最大レベルです");
    return false;
  }
  if (state.money < cost) {
    toast("ライド改良の資金が足りません");
    return false;
  }
  state.money -= cost;
  ride.level = clamp(Number(ride.level || 1) + 1, 1, RIDE_MANAGEMENT_CONFIG.maxLevel);
  ride.popularity = clamp(Number(ride.popularity ?? RIDE_MANAGEMENT_CONFIG.startingPopularity) + 6, 0, 100);
  ride.condition = clamp(Number(ride.condition ?? 100) + 12, 0, 100);
  inspect(selectedTile);
  computeStats();
  toast(`${tools[ride.type].label}をLv.${ride.level}へ改良しました`);
  return true;
}

function restockSelectedKiosk() {
  const shop = selectedTile?.object;
  if (!tools[shop?.type]?.shop) return;
  const maxStock = Number(shop.maxStock ?? shopCapacityForDifficulty(state.difficulty, shop.type));
  const missing = Math.max(0, maxStock - Number(shop.stock ?? 0) - Number(shop.pendingStock || 0));
  if (!missing) return;
  const cost = missing * shopUnitCost(shop, true);
  if (state.money < cost) {
    toast("仕入れ資金が足りません");
    return;
  }
  state.money -= cost;
  state.finance.restockExpenses += cost;
  shop.supplyCost = Number(shop.supplyCost || 0) + cost;
  shop.stock = Math.min(maxStock, Number(shop.stock || 0) + missing);
  inspect(selectedTile);
  computeStats();
  toast(`商品を ${missing} 個補充しました`);
}

function toggleSelectedShopAutoRestock() {
  const shop = selectedTile?.object;
  if (!tools[shop?.type]?.shop) return false;
  shop.autoRestock = !shop.autoRestock;
  if (shop.autoRestock && Number(shop.stock || 0) <= shopReorderPoint(shop)) placeShopOrder(shop, { silent: true });
  inspect(selectedTile);
  computeStats();
  toast(`自動発注を${shop.autoRestock ? "オン" : "オフ"}にしました`);
  return true;
}

function orderSelectedShop() {
  const shop = selectedTile?.object;
  if (!tools[shop?.type]?.shop) return false;
  const ordered = placeShopOrder(shop);
  inspect(selectedTile);
  computeStats();
  return ordered;
}

function toggleSelectedShopOpen() {
  const shop = selectedTile?.object;
  if (!tools[shop?.type]?.shop) return false;
  shop.open = shop.open === false;
  if (!shop.open) {
    for (const guest of state.guests.filter(candidate => candidate.goal === shop)) {
      const kind = guest.goalShopKind || shopKind(shop);
      guest.goal = null;
      guest.goalType = null;
      guest.shopRejected = shop;
      if (!routeGuestToShop(guest, kind, false)) routeGuestToRideOrExit(guest);
      guest.shopRejected = null;
    }
  } else if (shop.autoRestock && Number(shop.stock || 0) <= shopReorderPoint(shop)) {
    placeShopOrder(shop, { silent: true });
  }
  inspect(selectedTile);
  computeStats();
  toast(shop.open ? "店舗の営業を再開しました" : "店舗を休業しました。店員費は発生しません");
  return true;
}

function adjustSelectedShopStaff(delta) {
  const shop = selectedTile?.object;
  if (!tools[shop?.type]?.shop) return false;
  const current = clamp(Math.round(Number(shop.staff || 1)), 1, SHOP_MANAGEMENT_CONFIG.maxStaff);
  const next = clamp(current + delta, 1, SHOP_MANAGEMENT_CONFIG.maxStaff);
  if (next === current) return false;
  if (delta > 0) {
    const cost = SHOP_MANAGEMENT_CONFIG.hireCost;
    if (state.money < cost) {
      toast("店員の雇用資金が足りません");
      return false;
    }
    state.money -= cost;
    state.finance.staffExpenses += cost;
  }
  shop.staff = next;
  shop.reputation = clamp(Number(shop.reputation ?? SHOP_MANAGEMENT_CONFIG.startingReputation) + (delta > 0 ? 1 : -.5), 0, 100);
  inspect(selectedTile);
  computeStats();
  toast(delta > 0 ? `店員を雇いました。現在${next}人です` : `店員を${next}人に調整しました`);
  return true;
}

function upgradeSelectedShop() {
  const shop = selectedTile?.object;
  if (!tools[shop?.type]?.shop) return false;
  const cost = shopUpgradeCost(shop);
  if (!cost) {
    toast("この店舗は最大レベルです");
    return false;
  }
  if (state.money < cost) {
    toast("店舗改装の資金が足りません");
    return false;
  }
  state.money -= cost;
  shop.level = clamp(Number(shop.level || 1) + 1, 1, SHOP_MANAGEMENT_CONFIG.maxLevel);
  shop.maxStock = Math.max(Number(shop.maxStock || 0), shopCapacityAtLevel(shop));
  shop.reputation = clamp(Number(shop.reputation ?? SHOP_MANAGEMENT_CONFIG.startingReputation) + 4, 0, 100);
  inspect(selectedTile);
  computeStats();
  toast(`店舗をLv.${shop.level}へ改装しました。在庫上限が${shop.maxStock}になりました`);
  return true;
}

function transitStopTile(stopOrId = selectedTile) {
  if (stopOrId?.object && tools[stopOrId.object.type]?.transit) return stopOrId;
  const stopId = typeof stopOrId === "string" ? stopOrId : stopOrId?.stopId;
  return state.tiles.find(tile => tile.object?.stopId === stopId) || null;
}

function toggleStopInRoute(stopOrId = selectedTile) {
  const tile = transitStopTile(stopOrId);
  if (!tile) return false;
  const stop = tile.object;
  const mode = stop.transitMode || "bus";
  const network = transitNetwork(mode);
  const historyBefore = captureHistoryState();
  const index = network.routeStopIds.indexOf(stop.stopId);
  if (index >= 0) network.routeStopIds.splice(index, 1);
  else network.routeStopIds.push(stop.stopId);
  resetTransitVehicles(mode);
  transitRenderSignature = "";
  pushUndo(historyBefore);
  inspect(tile);
  computeStats();
  toast(index >= 0 ? `${stop.name}を路線から外しました` : `${stop.name}を路線に追加しました`);
  return true;
}

function moveStopInRoute(stopOrId = selectedTile, delta = 0) {
  const tile = transitStopTile(stopOrId);
  if (!tile || !delta) return false;
  const stop = tile.object;
  const mode = stop.transitMode || "bus";
  const network = transitNetwork(mode);
  const from = network.routeStopIds.indexOf(stop.stopId);
  const to = clamp(from + Math.sign(delta), 0, network.routeStopIds.length - 1);
  if (from < 0 || from === to) return false;
  const historyBefore = captureHistoryState();
  [network.routeStopIds[from], network.routeStopIds[to]] = [network.routeStopIds[to], network.routeStopIds[from]];
  resetTransitVehicles(mode);
  transitRenderSignature = "";
  pushUndo(historyBefore);
  inspect(tile);
  computeStats();
  toast(`${stop.name}を停車順 ${to + 1}番へ移動しました`);
  return true;
}

function adjustBusFleet(delta) {
  const network = transitNetwork("bus");
  const config = TRANSIT_MODE_CONFIGS.bus;
  const next = clamp(network.fleet + Math.sign(delta), 1, 6);
  if (next === network.fleet) return false;
  if (next > network.fleet && state.money < config.vehicleCost) {
    toast("バスの購入資金が足りません");
    return false;
  }
  const historyBefore = captureHistoryState();
  if (next > network.fleet) state.money -= config.vehicleCost;
  else state.money += config.vehicleRefund;
  network.fleet = next;
  state.buses = [];
  transitRenderSignature = "";
  pushUndo(historyBefore);
  computeStats();
  toast(next > historyBefore.transit.networks.bus.fleet ? "バスを1台購入しました" : "バスを1台売却しました");
  return true;
}

function adjustBusInterval(delta) {
  const network = transitNetwork("bus");
  const config = TRANSIT_MODE_CONFIGS.bus;
  const next = clamp(network.interval + Math.sign(delta), config.minInterval, config.maxInterval);
  if (next === network.interval) return false;
  const historyBefore = captureHistoryState();
  network.interval = next;
  state.buses = [];
  transitRenderSignature = "";
  pushUndo(historyBefore);
  computeStats();
  toast(`運行間隔を ${next}秒に設定しました`);
  return true;
}

function advanceGoals(completedStatuses) {
  const completedIds = completedStatuses.map(status => status.goalId);
  for (const goalId of completedIds) {
    if (!state.progression.completedGoalIds.includes(goalId)) state.progression.completedGoalIds.push(goalId);
  }
  state.progression.activeGoalIds = state.progression.activeGoalIds.filter(goalId => !completedIds.includes(goalId));
  for (const goalId of GOAL_ORDER) {
    if (state.progression.activeGoalIds.length >= 3) break;
    if (!state.progression.completedGoalIds.includes(goalId) && !state.progression.activeGoalIds.includes(goalId)) {
      state.progression.activeGoalIds.push(goalId);
    }
  }
}

function showRoundReport(report) {
  ui.reportRound.textContent = `ROUND ${report.round}`;
  ui.reportStars.textContent = starText(report.rating.stars);
  ui.reportSummary.innerHTML = `
    <span>売上<b>$${Math.round(report.revenue).toLocaleString()}</b></span>
    <span>支出<b>$${Math.round(report.expenses).toLocaleString()}</b></span>
    <span>収支<b class="${report.net < 0 ? "negative" : ""}">${report.net >= 0 ? "+" : "-"}$${Math.abs(Math.round(report.net)).toLocaleString()}</b></span>
    <span>評価<b>${Math.round(report.rating.score)}点</b></span>
    <span>目標報酬<b>$${report.goalReward.toLocaleString()}</b></span>
    <span>評価報奨<b>$${report.ratingBonus.toLocaleString()}</b></span>`;
  const achievements = [
    ...report.completedGoals.map(status => `<p>目標達成: ${status.goal.label}　+$${status.goal.reward.toLocaleString()}</p>`),
    ...report.newUnlocks.map(label => `<p>新解禁: ${label}</p>`)
  ];
  if (!achievements.length) achievements.push('<p class="neutral">次のラウンドも経営目標へ挑戦しましょう</p>');
  ui.reportAchievements.innerHTML = achievements.join("");
  pausedBeforeReport = paused;
  paused = true;
  ui.pauseBtn.textContent = "再開";
  ui.roundReport.hidden = false;
}

function closeRoundReport() {
  ui.roundReport.hidden = true;
  paused = pausedBeforeReport;
  ui.pauseBtn.textContent = paused ? "再開" : "停止";
}

function settleRound() {
  const metrics = getManagementMetrics();
  const rating = calculateParkRating(metrics);
  const completedGoals = state.progression.activeGoalIds
    .map(goalId => goalStatus(goalId, metrics))
    .filter(status => status.complete);
  const goalReward = completedGoals.reduce((sum, status) => sum + status.goal.reward, 0);
  const newUnlocks = reconcileParkUnlocks(rating, false);
  const baseBonus = metrics.net > 0 && state.happy >= 70
    ? Math.min(600, Math.round(state.happy * 2 + metrics.net * .05))
    : 0;
  const prestigeBonus = state.progression.bestStars >= 4 ? Math.round(baseBonus * .15) : 0;
  const worldClassBonus = state.progression.bestStars >= 5 && metrics.net > 0 ? 500 : 0;
  const ratingBonus = baseBonus + prestigeBonus + worldClassBonus;
  const report = {
    round: state.round,
    revenue: metrics.revenue,
    expenses: metrics.expenses,
    net: metrics.net,
    rating,
    completedGoals,
    newUnlocks,
    goalReward,
    ratingBonus
  };
  state.money += goalReward + ratingBonus;
  advanceGoals(completedGoals);
  state.progression.reports.unshift(report);
  state.progression.reports = state.progression.reports.slice(0, 8);
  state.round++;
  state.day++;
  state.progression.roundStartServed = state.guestsServed;
  Object.keys(state.finance).forEach(key => { state.finance[key] = 0; });
  undoStack.length = 0;
  updateUndoButton();
  computeStats();
  showRoundReport(report);
  return report;
}

ui.pauseBtn.addEventListener("click", () => {
  paused = !paused;
  ui.pauseBtn.textContent = paused ? "再開" : "停止";
});

ui.roundBtn.addEventListener("click", settleRound);
ui.closeReportBtn.addEventListener("click", closeRoundReport);
ui.continueReportBtn.addEventListener("click", closeRoundReport);

ui.saveBtn.addEventListener("click", saveGame);
ui.undoBtn.addEventListener("click", undoLastBuild);
ui.loadBtn.addEventListener("click", loadGame);
ui.tutorialBtn.addEventListener("click", () => openTutorial(0));
ui.tutorialCloseBtn.addEventListener("click", () => closeTutorial(true));
ui.tutorialSkipBtn.addEventListener("click", () => closeTutorial(false));
ui.tutorialBackBtn.addEventListener("click", () => {
  tutorialStep = Math.max(0, tutorialStep - 1);
  renderTutorial();
});
ui.tutorialNextBtn.addEventListener("click", advanceTutorial);
document.querySelectorAll("[data-difficulty]").forEach(button => {
  button.addEventListener("click", () => setDifficulty(button.dataset.difficulty));
});
ui.cleanerMinus.addEventListener("click", () => adjustStaff("cleaners", -1));
ui.cleanerPlus.addEventListener("click", () => adjustStaff("cleaners", 1));
ui.mechanicMinus.addEventListener("click", () => adjustStaff("mechanics", -1));
ui.mechanicPlus.addEventListener("click", () => adjustStaff("mechanics", 1));
ui.cleanerTraining.addEventListener("click", () => trainStaff("cleaner"));
ui.mechanicTraining.addEventListener("click", () => trainStaff("mechanic"));
ui.busMinus.addEventListener("click", () => adjustBusFleet(-1));
ui.busPlus.addEventListener("click", () => adjustBusFleet(1));
ui.intervalMinus.addEventListener("click", () => adjustBusInterval(-1));
ui.intervalPlus.addEventListener("click", () => adjustBusInterval(1));
ui.admissionMinus.addEventListener("click", () => adjustAdmissionFee(-1));
ui.admissionPlus.addEventListener("click", () => adjustAdmissionFee(1));
ui.marketingFamily.addEventListener("click", () => startMarketingCampaign("family"));
ui.marketingThrill.addEventListener("click", () => startMarketingCampaign("thrill"));
ui.marketingScenic.addEventListener("click", () => startMarketingCampaign("scenic"));
ui.marketingFoodie.addEventListener("click", () => startMarketingCampaign("foodie"));
ui.marketingCancel.addEventListener("click", cancelMarketingCampaign);
ui.shopPricingAction.addEventListener("click", focusHighestPricedShop);
ui.analysisNormal.addEventListener("click", () => setAnalysisMode("normal"));
ui.analysisCrowding.addEventListener("click", () => setAnalysisMode("crowding"));
ui.analysisHygiene.addEventListener("click", () => setAnalysisMode("hygiene"));
ui.analysisSatisfaction.addEventListener("click", () => setAnalysisMode("satisfaction"));
ui.routeList.addEventListener("click", event => {
  const stopId = event.target.closest("[data-stop-id]")?.dataset.stopId;
  const tile = transitStopTile(stopId);
  if (tile) inspect(tile);
});
ui.selected.addEventListener("click", event => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "ride-price-down" || action === "shop-price-down") adjustSelectedPrice(-1);
  if (action === "ride-price-up" || action === "shop-price-up") adjustSelectedPrice(1);
  if (action === "shop-price-recommended") applySelectedShopRecommendedPrice();
  if (action === "restock") restockSelectedKiosk();
  if (action === "shop-auto-toggle") toggleSelectedShopAutoRestock();
  if (action === "shop-order") orderSelectedShop();
  if (action === "shop-open-toggle") toggleSelectedShopOpen();
  if (action === "shop-staff-down") adjustSelectedShopStaff(-1);
  if (action === "shop-staff-up") adjustSelectedShopStaff(1);
  if (action === "shop-upgrade") upgradeSelectedShop();
  if (action === "ride-open-toggle") toggleSelectedRideOpen();
  if (action === "ride-policy") setSelectedRidePolicy(event.target.closest("[data-policy]")?.dataset.policy);
  if (action === "ride-upgrade") upgradeSelectedRide();
  if (action === "route-toggle") toggleStopInRoute();
  if (action === "route-up") moveStopInRoute(selectedTile, -1);
  if (action === "route-down") moveStopInRoute(selectedTile, 1);
});

window.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
    e.preventDefault();
    undoLastBuild();
    return;
  }
  const speed = 34;
  if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") camera.x += speed;
  if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") camera.x -= speed;
  if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") camera.y += speed;
  if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") camera.y -= speed;
});

function loop(now) {
  const dt = Math.min(.05, (now - last) / 1000);
  last = now;
  update(dt);
  drawWorld();
  requestAnimationFrame(loop);
}
restoreProgressionState(null);
renderGuestLog();
updateUndoButton();
syncStaffAgents();
computeStats();
if (localStorage.getItem(TUTORIAL_KEY) !== "1") openTutorial(0);
window.parkDebug = {
  state,
  setTool(tool) {
    return selectTool(tool, { silent: true });
  },
  buildAt(x, y, tool) {
    if (tool) this.setTool(tool);
    build(tileAt(x, y));
    return this.summary();
  },
  screenOfTile(x, y) {
    const p = iso(x, y);
    return { x: p.x, y: p.y + TILE_H * .5 * camera.zoom };
  },
  summary() {
    const rating = calculateParkRating();
    return {
      money: Math.round(state.money),
      happy: Math.round(state.happy),
      clean: Math.round(state.clean),
      guests: state.guests.length,
      queue: state.rides.reduce((sum, r) => sum + r.queue.length, 0),
      rides: state.rides.length,
      brokenRides: state.rides.filter(ride => ride.broken).length,
      averageCondition: Math.round(state.rides.length
        ? state.rides.reduce((sum, ride) => sum + Number(ride.condition ?? 100), 0) / state.rides.length
        : 100),
      openRides: state.rides.filter(ride => ride.open !== false).length,
      averageRidePopularity: Math.round(state.rides.length ? state.rides.reduce((sum, ride) => sum + Number(ride.popularity ?? RIDE_MANAGEMENT_CONFIG.startingPopularity), 0) / state.rides.length : 0),
      upgradedRides: state.rides.filter(ride => Number(ride.level || 1) > 1).length,
      cleaners: state.staff.cleaners,
      mechanics: state.staff.mechanics,
      staffAgents: state.staffAgents.length,
      averageStaffLevel: Number((state.staffAgents.length
        ? state.staffAgents.reduce((sum, agent) => sum + Number(agent.level || 1), 0) / state.staffAgents.length
        : 0).toFixed(1)),
      averageStaffFatigue: Math.round(state.staffAgents.length
        ? state.staffAgents.reduce((sum, agent) => sum + Number(agent.fatigue || 0), 0) / state.staffAgents.length
        : 0),
      restingStaff: state.staffAgents.filter(agent => agent.state === "resting").length,
      cleaningJobs: state.staffStats.cleaningJobs,
      repairJobs: state.staffStats.repairJobs,
      operatingCost: operatingCost(),
      admissionFee: state.admissionFee,
      activeCampaign: state.marketing.activeCampaign,
      marketingLeads: Math.ceil(state.marketing.remainingLeads),
      marketingAttracted: Math.floor(state.marketing.attractedGuests),
      marketingRefusals: Math.floor(state.marketing.refusals),
      analysisMode,
      busiestTraffic: Number(Math.max(0, ...state.tiles.map(tile => Number(tile.traffic || 0))).toFixed(1)),
      hygieneWarnings: state.tiles.filter(tile => tileHygieneRisk(tile) >= 35).length,
      satisfactionWarnings: state.tiles.filter(tile => {
        const value = tileRecentSatisfaction(tile);
        return value !== null && value < 60;
      }).length,
      difficulty: state.difficulty,
      costFactor: difficultyCostFactor(),
      sentiment: Number(state.sentiment.toFixed(1)),
      finance: { ...state.finance },
      buses: state.buses.length,
      busStops: busStops().length,
      busFleet: transitNetwork("bus").fleet,
      busInterval: transitNetwork("bus").interval,
      transitRoute: [...transitNetwork("bus").routeStopIds],
      transitWaiting: Math.floor(transitNetwork("bus").entranceWaiting
        + busStops().reduce((sum, tile) => sum + Number(tile.object.waiting || 0), 0)),
      transitRiders: Math.floor(transitNetwork("bus").totalRiders),
      monorails: state.monorails.length,
      monorailStations: transitStops("monorail").length,
      monorailTrack: state.tiles.filter(tile => tile.transitTrack === "monorail").length,
      monorailRiders: Math.floor(transitNetwork("monorail").totalRiders),
      parkTrains: state.parkTrains.length,
      parkTrainStations: transitStops("park_train").length,
      parkTrainTrack: state.tiles.filter(tile => tile.transitTrack === "park_train").length,
      parkTrainRiders: Math.floor(transitNetwork("park_train").totalRiders),
      shopStock: shopTiles().reduce((sum, tile) => sum + Number(tile.object.stock || 0), 0),
      shopCapacity: shopTiles().reduce((sum, tile) => sum + Number(tile.object.maxStock || 0), 0),
      shopSales: shopTiles().reduce((sum, tile) => sum + Number(tile.object.sales || 0), 0),
      shopVisits: shopTiles().reduce((sum, tile) => sum + Number(tile.object.visits || 0), 0),
      shopPriceRejects: shopTiles().reduce((sum, tile) => sum + Number(tile.object.priceRejects || 0), 0),
      overpricedShops: shopPricingIssues().length,
      shopGrossProfit: shopTiles().reduce((sum, tile) => sum + shopPerformance(tile.object).grossProfit, 0),
      shopDeliveries: shopTiles().reduce((sum, tile) => sum + Number(tile.object.deliveries || 0), 0),
      shopTypes: Object.fromEntries(["food", "drink", "souvenir"].map(kind => [kind, shopTiles().filter(tile => shopKind(tile.object) === kind).length])),
      openShops: shopTiles().filter(tile => tile.object.open !== false).length,
      shopStaff: shopTiles().filter(tile => tile.object.open !== false).reduce((sum, tile) => sum + Number(tile.object.staff || 1), 0),
      averageShopReputation: Math.round(shopTiles().length ? shopTiles().reduce((sum, tile) => sum + Number(tile.object.reputation ?? SHOP_MANAGEMENT_CONFIG.startingReputation), 0) / shopTiles().length : 0),
      ratingScore: Math.round(rating.score),
      ratingStars: rating.stars,
      bestStars: state.progression.bestStars,
      unlockedTools: [...state.progression.unlockedTools],
      activeGoals: [...state.progression.activeGoalIds],
      completedGoals: [...state.progression.completedGoalIds],
      paths: state.tiles.filter(t => t.path).length,
      scenery: sceneryScore(),
      benchUses: Math.floor(state.tiles.filter(tile => tile.object?.type === "bench").reduce((sum, tile) => sum + Number(tile.object.usage || 0), 0)),
      toiletUses: Math.floor(state.tiles.filter(tile => tile.object?.type === "toilet").reduce((sum, tile) => sum + Number(tile.object.usage || 0), 0)),
      binCollected: Math.floor(state.tiles.filter(tile => tile.object?.type === "trash_bin").reduce((sum, tile) => sum + Number(tile.object.collected || 0), 0))
    };
  },
  saveGame,
  loadGame,
  adjustAdmissionFee,
  startMarketingCampaign,
  cancelMarketingCampaign,
  activeMarketingCampaign,
  marketingFit,
  marketingFitHint,
  chooseGuestArchetype,
  renderMarketingPanel,
  setAnalysisMode,
  getAnalysisMetrics,
  renderAnalysisPanel,
  tileHygieneRisk,
  tileRecentSatisfaction,
  analysisTileValue,
  updateAnalysisSignals,
  adjustBusFleet,
  adjustBusInterval,
  toggleStopInRoute,
  moveStopInRoute,
  getTransitRoutePlan,
  renderTransitPanel,
  transitVehicleSegment,
  calculateParkRating,
  reconcileParkUnlocks,
  settleRound,
  closeRoundReport,
  adjustSelectedPrice,
  toggleSelectedRideOpen,
  setSelectedRidePolicy,
  upgradeSelectedRide,
  createRide,
  ridePolicy,
  rideCapacity,
  rideDuration,
  rideEffectiveAppeal,
  rideMaintenanceThreshold,
  rideRepairTarget,
  rideMaintenanceCost,
  rideUpgradeCost,
  rideEstimatedWait,
  restockSelectedKiosk,
  toggleSelectedShopAutoRestock,
  orderSelectedShop,
  toggleSelectedShopOpen,
  adjustSelectedShopStaff,
  upgradeSelectedShop,
  placeShopOrder,
  chooseShop,
  shopKind,
  desiredShopKind,
  routeGuestToShop,
  shopPriceTolerance,
  shopRecommendedPrice,
  shopPricingDiagnosis,
  shopPricingIssues,
  shopPerformance,
  shopCapacityForDifficulty,
  shopDeliverySize,
  shopUnitCost,
  shopStaffWage,
  shopUpgradeCost,
  shopCapacityAtLevel,
  buyFromShop,
  applySelectedShopRecommendedPrice,
  focusHighestPricedShop,
  inspect,
  drawWorld,
  update,
  operatingCostBreakdown,
  difficultyCostFactor,
  setDifficulty,
  openTutorial,
  closeTutorial,
  adjustStaff,
  syncStaffAgents,
  trainStaff,
  staffEfficiency,
  staffWage,
  staffTeamStats,
  staffTrainingCost,
  parkStaffWageTotal,
  undoLastBuild,
  removeRange,
  spawnGuestAt,
  chooseRide,
  chooseAmenity,
  dropLitter,
  addGuestLog,
  getPlacementStatus,
  undoDepth() { return undoStack.length; }
};
requestAnimationFrame(loop);
