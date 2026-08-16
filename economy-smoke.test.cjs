const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

class MockElement {
  constructor(id = "") {
    this.id = id;
    this.dataset = {};
    this.style = {};
    this.listeners = {};
    this.classList = {
      add() {},
      remove() {},
      toggle() {},
      contains() { return false; }
    };
  }

  addEventListener(type, listener) {
    (this.listeners[type] ||= []).push(listener);
  }

  click(target = this) {
    for (const listener of this.listeners.click || []) listener({ target, stopPropagation() {} });
  }

  setAttribute() {}
  querySelector() { return null; }
  closest() { return null; }
}

const context2d = new Proxy({
  createLinearGradient() { return { addColorStop() {} }; },
  measureText() { return { width: 10 }; }
}, {
  get(target, key) {
    if (!(key in target)) target[key] = () => {};
    return target[key];
  }
});

const elements = new Map();
const element = id => {
  if (!elements.has(id)) elements.set(id, new MockElement(id));
  return elements.get(id);
};
element("game").getContext = () => context2d;

const toolNames = [
  "inspect", "path", "remove", "bus_stop", "monorail_track", "monorail_station", "train_track", "train_station", "carousel", "wheel", "coaster",
  "teacups", "kiosk", "drink_stand", "souvenir_shop", "bench", "trash_bin", "toilet", "tree", "shrub", "flower", "palm", "water", "decor"
];
const toolButtons = new Map(toolNames.map(name => {
  const button = new MockElement();
  button.dataset.tool = name;
  return [name, button];
}));

const storage = new Map();
const math = Object.create(Math);
math.random = () => 0;

const sandbox = {
  console,
  Math: math,
  Date,
  JSON,
  setTimeout: () => 1,
  clearTimeout() {},
  innerWidth: 1280,
  innerHeight: 800,
  performance: { now: () => 0 },
  requestAnimationFrame() {},
  addEventListener() {},
  localStorage: {
    getItem: key => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value))
  },
  document: {
    getElementById: element,
    querySelector(selector) {
      const match = selector.match(/^\[data-tool="(.+)"\]$/);
      return match ? toolButtons.get(match[1]) : null;
    },
    querySelectorAll(selector) {
      if (selector === "[data-tool]") return [...toolButtons.values()];
      return [];
    },
    addEventListener() {}
  }
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("game.js", "utf8"), sandbox, { filename: "game.js" });

const debug = sandbox.parkDebug;
const state = debug.state;
debug.drawWorld();
assert.equal(debug.transitVehicleSegment({ distance: Number.NaN }, [{ x: 0, y: 0 }, { x: 1, y: 0 }]), null);
assert.equal(debug.transitVehicleSegment({ distance: -1 }, [{ x: 0, y: 0 }, { x: 1, y: 0 }]).from.x, 1);

assert.equal(element("tutorialOverlay").hidden, false, "the beginner tutorial should open on first launch");
for (let i = 0; i < 4; i++) element("tutorialNextBtn").click();
assert.equal(element("tutorialOverlay").hidden, true);
assert.equal(storage.get("yumeshimaParkTutorialV1"), "1");
assert.equal(state.difficulty, "beginner");
assert.equal(state.money, 30000);
assert.equal(debug.difficultyCostFactor(), .4);
assert.equal(state.tiles.find(tile => tile.object?.type === "kiosk").object.maxStock, 60);
assert.equal(debug.operatingCostBreakdown().baseTotal, 163, "starter shop staffing should be the only new base cost");
assert.equal(debug.operatingCostBreakdown().shopStaff, 18 * debug.difficultyCostFactor());
const starterShop = state.tiles.find(tile => tile.object?.type === "kiosk").object;
assert.equal(starterShop.open, true);
assert.equal(starterShop.staff, 1);
assert.equal(starterShop.level, 1);
assert.equal(starterShop.reputation, 65);
const conditionGuest = { profile: { hungerRate: 1, thirstRate: 1, souvenirBias: 1 } };
assert.equal(debug.setDayCondition("sunny", "heatwave"), true);
const sunnyNeedRates = debug.guestNeedRates(conditionGuest);
const sunnyArrivalInterval = debug.dayConditionArrivalInterval(10);
assert.equal(debug.currentDayCondition().label, "晴れ");
assert.equal(element("conditionCurrent").textContent, "晴れ");
assert.equal(element("conditionNext").textContent, "次回 猛暑");
assert.equal(debug.setDayCondition("heatwave", "holiday"), true);
const heatwaveNeedRates = debug.guestNeedRates(conditionGuest);
assert.ok(heatwaveNeedRates.thirst > sunnyNeedRates.thirst * 1.5, "heatwaves should sharply increase drink demand");
assert.ok(debug.dayConditionArrivalInterval(10) > sunnyArrivalInterval, "heatwaves should slightly reduce arrivals");
assert.ok(debug.dayConditionRideBias("teacups") > debug.dayConditionRideBias("coaster"));
assert.match(element("conditionHint").textContent, /ドリンク/);
assert.equal(debug.setDayCondition("holiday", "rain"), true);
const holidayNeedRates = debug.guestNeedRates(conditionGuest);
assert.ok(holidayNeedRates.souvenir > sunnyNeedRates.souvenir * 1.5, "holidays should increase souvenir demand");
assert.equal(debug.currentDayCondition().arrivalRate, 1.28);
assert.ok(debug.dayConditionArrivalInterval(10) < sunnyArrivalInterval, "holidays should increase arrivals");
debug.saveGame();
debug.setDayCondition("rain", "sunny");
debug.loadGame();
assert.equal(state.dayCondition.current, "holiday");
assert.equal(state.dayCondition.next, "rain", "condition forecasts should survive save/load");
debug.setDayCondition("sunny", "heatwave");
const forecastGuest = {
  done: false,
  spent: false,
  purchases: { food: false, drink: false, souvenir: false },
  hunger: 20,
  thirst: 90,
  souvenirDesire: 20
};
state.guests.push(forecastGuest);
const missingDrinkForecast = debug.shopDemandForecast("drink");
assert.equal(missingDrinkForecast.status, "shortage");
assert.equal(missingDrinkForecast.demanders, 1);
assert.equal(missingDrinkForecast.openShops, 0);
assert.equal(missingDrinkForecast.action, "build");
debug.renderShopDemandForecast();
assert.equal(element("drinkDemandStatus").textContent, "店舗不足");
assert.match(element("drinkDemandMeta").textContent, /需要1/);
assert.equal(debug.handleShopDemandAction("drink"), true);
assert.equal(debug.summary().selectedTool, "drink_stand");
debug.setTool("inspect");
state.guests.pop();
debug.setDifficulty("standard", { silent: true });
assert.equal(state.money, 24000);
assert.equal(debug.difficultyCostFactor(), .95 * .75);
assert.equal(state.tiles.find(tile => tile.object?.type === "kiosk").object.maxStock, 45);
debug.setDifficulty("challenge", { silent: true });
assert.equal(state.money, 18000);
assert.equal(debug.difficultyCostFactor(), 1);
assert.equal(state.tiles.find(tile => tile.object?.type === "kiosk").object.maxStock, 30);
debug.setDifficulty("beginner", { silent: true });
assert.equal(state.money, 30000);
assert.equal(state.tiles.find(tile => tile.object?.type === "kiosk").object.maxStock, 60);

debug.saveGame();
const beginnerOpeningMoney = state.money;
math.random = () => .5;
for (let i = 0; i < 1800; i++) debug.update(.05);
assert.ok(state.money > beginnerOpeningMoney - 1000, "beginner parks should not collapse during the first 90 seconds");
assert.ok(state.money > 25000, "beginner parks should retain a useful construction reserve");
math.random = () => 0;
debug.loadGame();
assert.equal(state.money, beginnerOpeningMoney);
assert.equal(state.difficulty, "beginner");

assert.ok(debug.marketingFit("family") > debug.marketingFit("thrill"), "the starter park should suit families better than thrill seekers");
const moneyBeforeMarketing = state.money;
assert.equal(debug.startMarketingCampaign("thrill"), true);
assert.equal(state.money, moneyBeforeMarketing - 800);
assert.equal(state.finance.marketingExpenses, 800);
assert.equal(state.marketing.activeCampaign, "thrill");
assert.equal(state.marketing.remainingLeads, 20);
assert.equal(debug.chooseGuestArchetype(), "thrill", "campaigns should bias the advertised audience");
assert.match(element("marketingStatus").textContent, /絶叫ファン/);
assert.match(element("marketingThrillMeta").textContent, /適合/);

state.admissionFee = 75;
assert.equal(debug.spawnGuestAt(state.tiles.find(tile => tile.x === 2 && tile.y === 14)), false);
assert.equal(state.marketing.remainingLeads, 19, "a rejected advertised visitor should still consume a lead");
assert.equal(state.marketing.refusals, 1);
state.admissionFee = 0;
assert.equal(debug.spawnGuestAt(state.tiles.find(tile => tile.x === 2 && tile.y === 14)), true);
const marketedGuest = state.guests[state.guests.length - 1];
assert.equal(marketedGuest.archetype, "thrill");
assert.equal(marketedGuest.campaignType, "thrill");
assert.ok(marketedGuest.satisfaction < 66, "a poor audience fit should lower initial satisfaction");
assert.equal(state.marketing.attractedGuests, 1);
assert.equal(state.marketing.remainingLeads, 18);

debug.saveGame();
state.marketing.activeCampaign = null;
state.marketing.remainingLeads = 0;
debug.loadGame();
assert.equal(state.marketing.activeCampaign, "thrill");
assert.equal(state.marketing.remainingLeads, 18, "campaign progress should survive save/load");
assert.equal(state.marketing.refusals, 1);
assert.equal(debug.cancelMarketingCampaign(), true);
state.money = beginnerOpeningMoney;
state.admissionFee = 25;
Object.keys(state.finance).forEach(key => { state.finance[key] = 0; });
state.marketing = { activeCampaign: null, remainingLeads: 0, attractedGuests: 0, refusals: 0, campaignsStarted: 0 };
debug.saveGame();

const analysisPathTile = state.tiles.find(tile => tile.x === 3 && tile.y === 14);
analysisPathTile.traffic = 12;
analysisPathTile.litter = 2;
analysisPathTile.moodTotal = 50;
analysisPathTile.moodWeight = 1;
assert.equal(debug.setAnalysisMode("crowding"), true);
assert.match(debug.getAnalysisMetrics("crowding").hotspot, /通路 3,14/);
assert.equal(debug.analysisTileValue(analysisPathTile, "crowding", { maxTraffic: 12 }), 1);
assert.ok(debug.tileHygieneRisk(analysisPathTile) >= 48);
assert.equal(debug.tileRecentSatisfaction(analysisPathTile), 50);
assert.equal(debug.analysisTileValue(analysisPathTile, "satisfaction"), .5);
const trafficBeforeDecay = analysisPathTile.traffic;
debug.updateAnalysisSignals(1);
assert.ok(analysisPathTile.traffic < trafficBeforeDecay, "traffic history should fade over time");
assert.equal(debug.setAnalysisMode("satisfaction"), true);
assert.match(element("analysisStatus").textContent, /満足度/);
debug.saveGame();
analysisPathTile.traffic = 0;
analysisPathTile.litter = 0;
analysisPathTile.moodTotal = 0;
analysisPathTile.moodWeight = 0;
debug.setAnalysisMode("normal");
debug.loadGame();
const loadedAnalysisTile = state.tiles.find(tile => tile.x === 3 && tile.y === 14);
assert.equal(debug.summary().analysisMode, "satisfaction");
assert.ok(loadedAnalysisTile.traffic > 0, "traffic history should survive save/load");
assert.equal(loadedAnalysisTile.litter, 2);
assert.equal(debug.tileRecentSatisfaction(loadedAnalysisTile), 50);
loadedAnalysisTile.traffic = 0;
loadedAnalysisTile.litter = 0;
loadedAnalysisTile.moodTotal = 0;
loadedAnalysisTile.moodWeight = 0;
debug.setAnalysisMode("normal");
debug.saveGame();

assert.equal(state.admissionFee, 25);
debug.adjustAdmissionFee(5);
assert.equal(state.admissionFee, 30);

const rideTile = state.tiles.find(tile => tile.object?.type === "carousel");
debug.inspect(rideTile);
debug.adjustSelectedPrice(2);
assert.equal(rideTile.object.price, 9);
const managedRide = rideTile.object;
assert.equal(managedRide.open, true);
assert.equal(managedRide.level, 1);
assert.equal(managedRide.popularity, 55);
assert.equal(managedRide.maintenancePolicy, "balanced");
assert.equal(debug.rideCapacity(managedRide), 7);
assert.equal(debug.rideDuration(managedRide), 9);
const balancedRideCost = debug.rideMaintenanceCost(managedRide);
assert.equal(debug.setSelectedRidePolicy("economy"), true);
assert.equal(debug.rideMaintenanceThreshold(managedRide), 62);
assert.ok(debug.rideMaintenanceCost(managedRide) < balancedRideCost);
assert.equal(debug.setSelectedRidePolicy("preventive"), true);
assert.equal(debug.rideMaintenanceThreshold(managedRide), 92);
assert.ok(debug.rideMaintenanceCost(managedRide) > balancedRideCost);
const openRideCost = debug.rideMaintenanceCost(managedRide);
assert.equal(debug.toggleSelectedRideOpen(), true);
assert.equal(managedRide.open, false);
assert.ok(debug.rideMaintenanceCost(managedRide) < openRideCost);
const rideChoiceWhileClosed = debug.chooseRide({ tile: state.tiles.find(tile => tile.x === 8 && tile.y === 14), budget: 100, priceSensitivity: 1, fatigue: 0, hunger: 0, profile: { rideBias: {} } });
assert.notEqual(rideChoiceWhileClosed, managedRide, "closed rides must be excluded from guest choices");
assert.equal(debug.toggleSelectedRideOpen(), true);
assert.equal(debug.setSelectedRidePolicy("balanced"), true);
const rideUpgradeCost = debug.rideUpgradeCost(managedRide);
const moneyBeforeRideUpgrade = state.money;
assert.equal(debug.upgradeSelectedRide(), true);
assert.equal(managedRide.level, 2);
assert.equal(debug.rideCapacity(managedRide), 9);
assert.equal(debug.rideDuration(managedRide), 8.1);
assert.equal(managedRide.popularity, 61);
assert.equal(moneyBeforeRideUpgrade - state.money, rideUpgradeCost);
managedRide.queue = Array.from({ length: 10 }, () => ({}));
assert.equal(debug.rideEstimatedWait(managedRide), 17);
managedRide.queue = [];

debug.buildAt(9, 11, "kiosk");
const kiosk = state.tiles.find(tile => tile.x === 9 && tile.y === 11).object;
assert.equal(kiosk.stock, 60);
kiosk.stock = 5;
debug.inspect(state.tiles.find(tile => tile.object === kiosk));
const beforeRestock = state.money;
debug.restockSelectedKiosk();
assert.equal(kiosk.stock, 60);
assert.equal(beforeRestock - state.money, 220);
assert.equal(state.finance.restockExpenses, 220);

kiosk.stock = 10;
const beforeAutoOrder = state.money;
debug.update(.05);
assert.equal(kiosk.pendingStock, 30);
assert.equal(beforeAutoOrder - state.money, 90);
assert.equal(kiosk.orders, 1);
for (let i = 0; i < 161; i++) debug.update(.05);
assert.equal(kiosk.pendingStock, 0);
assert.equal(kiosk.stock, 40);
assert.equal(kiosk.deliveries, 1);
debug.inspect(state.tiles.find(tile => tile.x === 9 && tile.y === 11));
assert.equal(debug.toggleSelectedShopAutoRestock(), true);
assert.equal(kiosk.autoRestock, false);
kiosk.stock = 10;
debug.update(.1);
assert.equal(kiosk.pendingStock, 0, "disabled auto ordering should leave stock under manager control");
assert.equal(debug.toggleSelectedShopAutoRestock(), true);
assert.equal(kiosk.autoRestock, true);
assert.equal(kiosk.pendingStock, 30, "re-enabling auto ordering should immediately cover low stock");
for (let i = 0; i < 161; i++) debug.update(.05);
assert.equal(kiosk.stock, 40);

debug.inspect(state.tiles.find(tile => tile.object === kiosk));
const shopStaffCostBeforeHire = debug.operatingCostBreakdown().shopStaff;
const moneyBeforeShopHire = state.money;
const staffExpensesBeforeShopHire = state.finance.staffExpenses;
assert.equal(debug.adjustSelectedShopStaff(1), true);
assert.equal(kiosk.staff, 2);
assert.equal(moneyBeforeShopHire - state.money, 180);
assert.equal(state.finance.staffExpenses - staffExpensesBeforeShopHire, 180);
assert.equal(debug.operatingCostBreakdown().shopStaff, shopStaffCostBeforeHire + 18 * debug.difficultyCostFactor());
const staffedShopCost = debug.operatingCostBreakdown().shopStaff;
assert.equal(debug.toggleSelectedShopOpen(), true);
assert.equal(kiosk.open, false);
assert.ok(Math.abs(debug.operatingCostBreakdown().shopStaff - (staffedShopCost - 36 * debug.difficultyCostFactor())) < 1e-9);
const closedShopGuest = {
  tile: state.tiles.find(tile => tile.x === 8 && tile.y === 11),
  budget: 50,
  hunger: 90,
  thirst: 10,
  souvenirDesire: 10,
  purchases: { food: false, drink: false, souvenir: false },
  priceSensitivity: 1
};
assert.notEqual(debug.chooseShop(closedShopGuest, "food").tile.object, kiosk, "closed shops must be excluded from guest choices");
assert.equal(debug.toggleSelectedShopOpen(), true);
assert.equal(kiosk.open, true);
const upgradeCost = debug.shopUpgradeCost(kiosk);
const moneyBeforeUpgrade = state.money;
assert.equal(debug.upgradeSelectedShop(), true);
assert.equal(kiosk.level, 2);
assert.equal(kiosk.maxStock, 72);
assert.equal(moneyBeforeUpgrade - state.money, upgradeCost);
assert.ok(kiosk.reputation > 65);

const beforeAdmission = state.finance.admissionRevenue;
debug.adjustAdmissionFee(-10);
debug.update(4);
assert.ok(state.finance.admissionRevenue > beforeAdmission, "a guest should pay admission");

debug.update(9);
assert.ok(state.finance.maintenanceExpenses > 0);
assert.ok(state.finance.staffExpenses > 0);

state.admissionFee = 41;
state.finance.shopRevenue = 123;
debug.inspect(state.tiles.find(tile => tile.x === 9 && tile.y === 11));
assert.equal(debug.orderSelectedShop(), true);
const savedPendingStock = kiosk.pendingStock;
const costlyMealGuest = {
  spent: false,
  budget: 50,
  hunger: 68,
  archetype: "thrill",
  priceSensitivity: 1.4,
  satisfaction: 72,
  thoughtCooldown: 0
};
kiosk.price = 15;
const stockBeforePriceRefusal = kiosk.stock;
assert.equal(debug.buyFromShop(costlyMealGuest, kiosk), false, "price-sensitive guests should reject an expensive meal");
assert.equal(kiosk.stock, stockBeforePriceRefusal);
assert.equal(kiosk.priceRejects, 1);
assert.ok(debug.shopPriceTolerance(costlyMealGuest) < kiosk.price);
assert.equal(kiosk.recentPriceRejects, 1);
assert.equal(kiosk.recentToleranceWeight, 1);
const visitsAfterPriceRefusal = kiosk.visits;
assert.equal(debug.buyFromShop(costlyMealGuest, kiosk), false, "a guest should not repeat the same rejected purchase");
assert.equal(kiosk.visits, visitsAfterPriceRefusal);
assert.equal(kiosk.priceRejects, 1);
const recommendedMealPrice = debug.shopRecommendedPrice(kiosk);
assert.ok(recommendedMealPrice < kiosk.price, "guest tolerance should produce a lower recommended price");
assert.equal(debug.shopPricingDiagnosis(kiosk).status, "high");
debug.inspect(state.tiles.find(tile => tile.object === kiosk));
assert.equal(debug.applySelectedShopRecommendedPrice(), true);
assert.equal(kiosk.price, recommendedMealPrice);
assert.equal(debug.shopPricingDiagnosis(kiosk).status, "fair");
assert.match(debug.shopPerformance(kiosk).insight, /推奨価格/);
const hungryFoodie = {
  spent: false,
  budget: 50,
  hunger: 82,
  archetype: "foodie",
  priceSensitivity: .8,
  satisfaction: 72,
  thoughtCooldown: 0
};
kiosk.price = 9;
assert.equal(debug.buyFromShop(hungryFoodie, kiosk), true, "hungry foodies should accept a fair meal price");
assert.equal(kiosk.stock, stockBeforePriceRefusal - 1);
assert.equal(kiosk.visits, 2);
assert.equal(kiosk.sales, 1);
assert.equal(kiosk.revenue, 9);
assert.ok(kiosk.supplyCost > 0);
const shopPerformanceBeforeSave = debug.shopPerformance(kiosk);
assert.equal(shopPerformanceBeforeSave.conversion, .5);
assert.equal(shopPerformanceBeforeSave.grossProfit, kiosk.revenue - kiosk.supplyCost);
const savedShopStock = kiosk.stock;
const savedSupplyCost = kiosk.supplyCost;
const savedRecentToleranceTotal = kiosk.recentToleranceTotal;
debug.buildAt(7, 12, "drink_stand");
debug.buildAt(9, 10, "souvenir_shop");
const drinkStand = state.tiles.find(tile => tile.x === 7 && tile.y === 12).object;
const souvenirShop = state.tiles.find(tile => tile.x === 9 && tile.y === 10).object;
assert.equal(drinkStand.type, "drink_stand");
assert.equal(drinkStand.maxStock, 72);
assert.equal(drinkStand.price, 6);
assert.equal(debug.shopDeliverySize(drinkStand), 36);
assert.equal(debug.shopUnitCost(drinkStand), 2);
assert.equal(souvenirShop.type, "souvenir_shop");
assert.equal(souvenirShop.maxStock, 45);
assert.equal(souvenirShop.price, 14);
assert.equal(debug.shopDeliverySize(souvenirShop), 20);
assert.equal(debug.shopUnitCost(souvenirShop), 6);

const guestsBeforeDemandTest = state.guests;
state.guests = Array.from({ length: 4 }, () => ({
  done: false,
  spent: false,
  purchases: { food: false, drink: false, souvenir: false },
  hunger: 20,
  thirst: 90,
  souvenirDesire: 20
}));
drinkStand.recentInterest = 0;
const highDrinkForecast = debug.shopDemandForecast("drink");
assert.equal(highDrinkForecast.status, "high");
assert.equal(highDrinkForecast.openShops, 1);
assert.equal(highDrinkForecast.demanders, 4);
assert.equal(highDrinkForecast.action, "build");
state.guests = guestsBeforeDemandTest;

const thirstyGuest = {
  tile: state.tiles.find(tile => tile.x === 8 && tile.y === 10),
  purchases: { food: false, drink: false, souvenir: false },
  spent: false,
  budget: 50,
  hunger: 20,
  thirst: 88,
  souvenirDesire: 20,
  archetype: "thrill",
  priceSensitivity: 1,
  satisfaction: 72,
  thoughtCooldown: 0
};
assert.equal(debug.desiredShopKind(thirstyGuest), "drink");
assert.equal(debug.chooseShop(thirstyGuest, "drink").tile.object, drinkStand);
assert.equal(debug.buyFromShop(thirstyGuest, drinkStand), true);
assert.equal(thirstyGuest.purchases.drink, true);
assert.ok(thirstyGuest.thirst < 30);
assert.equal(drinkStand.stock, 71);

const souvenirGuest = {
  tile: state.tiles.find(tile => tile.x === 8 && tile.y === 10),
  purchases: { food: false, drink: false, souvenir: false },
  spent: false,
  budget: 60,
  hunger: 20,
  thirst: 20,
  souvenirDesire: 90,
  archetype: "scenic",
  priceSensitivity: 1,
  satisfaction: 72,
  thoughtCooldown: 0
};
assert.equal(debug.desiredShopKind(souvenirGuest), "souvenir");
assert.equal(debug.chooseShop(souvenirGuest, "souvenir").tile.object, souvenirShop);
assert.equal(debug.buyFromShop(souvenirGuest, souvenirShop), true);
assert.equal(souvenirGuest.purchases.souvenir, true);
assert.ok(souvenirGuest.souvenirDesire < 20);
assert.equal(souvenirShop.stock, 44);
const finalShopRevenue = state.finance.shopRevenue;
debug.saveGame();
state.admissionFee = 1;
state.finance.shopRevenue = 0;
debug.loadGame();
assert.equal(state.admissionFee, 41);
assert.equal(state.finance.shopRevenue, finalShopRevenue);
const loadedKiosk = state.tiles.find(tile => tile.x === 9 && tile.y === 11).object;
assert.equal(loadedKiosk.stock, savedShopStock);
assert.equal(loadedKiosk.pendingStock, savedPendingStock);
assert.equal(loadedKiosk.autoRestock, true);
assert.equal(loadedKiosk.open, true);
assert.equal(loadedKiosk.staff, 2);
assert.equal(loadedKiosk.level, 2);
assert.equal(loadedKiosk.maxStock, 72);
assert.ok(loadedKiosk.reputation > 65);
const loadedManagedRide = state.tiles.find(tile => tile.object?.type === "carousel").object;
assert.equal(loadedManagedRide.open, true);
assert.equal(loadedManagedRide.level, 2);
assert.equal(loadedManagedRide.popularity, 61);
assert.equal(loadedManagedRide.maintenancePolicy, "balanced");
assert.equal(debug.rideCapacity(loadedManagedRide), 9);
assert.equal(loadedKiosk.visits, 2);
assert.equal(loadedKiosk.priceRejects, 1);
assert.equal(loadedKiosk.recentPriceRejects, 1);
assert.equal(loadedKiosk.recentToleranceWeight, 2);
assert.equal(loadedKiosk.recentToleranceTotal, savedRecentToleranceTotal);
assert.equal(loadedKiosk.revenue, 9);
assert.equal(loadedKiosk.supplyCost, savedSupplyCost);
const loadedDrinkStand = state.tiles.find(tile => tile.object?.type === "drink_stand").object;
const loadedSouvenirShop = state.tiles.find(tile => tile.object?.type === "souvenir_shop").object;
assert.equal(loadedDrinkStand.maxStock, 72);
assert.equal(loadedDrinkStand.stock, 71);
assert.equal(loadedDrinkStand.sales, 1);
assert.equal(loadedSouvenirShop.maxStock, 45);
assert.equal(loadedSouvenirShop.stock, 44);
assert.equal(loadedSouvenirShop.sales, 1);

state.finance.admissionRevenue = 500;
state.finance.maintenanceExpenses = 100;
state.finance.staffExpenses = 100;
const roundBefore = state.round;
element("roundBtn").click();
assert.equal(state.round, roundBefore + 1);
assert.ok(Object.values(state.finance).every(value => value === 0));
assert.equal(element("roundReport").hidden, false);
element("continueReportBtn").click();
const postBonusMoney = state.money;
element("roundBtn").click();
element("continueReportBtn").click();
element("roundBtn").click();
element("continueReportBtn").click();
assert.equal(state.round, roundBefore + 3);
assert.equal(state.money, postBonusMoney, "empty rounds must not generate free cash");

state.money = 50000;
debug.setTool("path");
const dragStart = debug.screenOfTile(16, 14);
const dragEnd = debug.screenOfTile(18, 14);
for (const listener of element("game").listeners.pointerdown || []) listener({ ...dragStart, clientX: dragStart.x, clientY: dragStart.y, pointerId: 1 });
for (const listener of element("game").listeners.pointermove || []) listener({ ...dragEnd, clientX: dragEnd.x, clientY: dragEnd.y, pointerId: 1 });
for (const listener of element("game").listeners.pointerup || []) listener({ ...dragEnd, clientX: dragEnd.x, clientY: dragEnd.y, pointerId: 1 });
assert.equal(state.tiles.find(tile => tile.x === 16 && tile.y === 14).path, true);
assert.equal(state.tiles.find(tile => tile.x === 17 && tile.y === 14).path, true);
assert.equal(state.tiles.find(tile => tile.x === 18 && tile.y === 14).path, true);
debug.undoLastBuild();
assert.equal(state.tiles.find(tile => tile.x === 16 && tile.y === 14).path, false);
assert.equal(state.tiles.find(tile => tile.x === 18 && tile.y === 14).path, false);

debug.buildAt(18, 8, "tree");
debug.buildAt(19, 8);
assert.equal(state.tiles.find(tile => tile.x === 18 && tile.y === 8).object.type, "tree");
assert.equal(state.tiles.find(tile => tile.x === 19 && tile.y === 8).object.type, "tree");
assert.ok(debug.undoDepth() >= 2);
debug.undoLastBuild();
assert.equal(state.tiles.find(tile => tile.x === 19 && tile.y === 8).object, null);
debug.undoLastBuild();
assert.equal(state.tiles.find(tile => tile.x === 18 && tile.y === 8).object, null);

debug.buildAt(18, 8, "tree");
debug.buildAt(19, 8);
debug.setTool("remove");
assert.equal(debug.removeRange(
  state.tiles.find(tile => tile.x === 18 && tile.y === 8),
  state.tiles.find(tile => tile.x === 19 && tile.y === 8)
), 2);
assert.equal(state.tiles.find(tile => tile.x === 18 && tile.y === 8).object, null);
assert.equal(state.tiles.find(tile => tile.x === 19 && tile.y === 8).object, null);
debug.undoLastBuild();
assert.equal(state.tiles.find(tile => tile.x === 18 && tile.y === 8).object.type, "tree");
assert.equal(state.tiles.find(tile => tile.x === 19 && tile.y === 8).object.type, "tree");

const emptyTile = state.tiles.find(tile => tile.x === 20 && tile.y === 8);
assert.equal(debug.getPlacementStatus(emptyTile, "flower").valid, true);
assert.equal(debug.getPlacementStatus(emptyTile, "kiosk").valid, false, "shops should require an adjacent path");
assert.equal(debug.getPlacementStatus(state.tiles.find(tile => tile.x === 7 && tile.y === 15), "kiosk").valid, true);
assert.equal(debug.getPlacementStatus(state.tiles.find(tile => tile.x === 2 && tile.y === 14), "flower").valid, false);

debug.buildAt(6, 13, "kiosk");
const hungryShopTile = state.tiles.find(tile => tile.x === 6 && tile.y === 13);
state.admissionFee = 0;
state.guests = [];
const guestTypes = [];
for (const value of [0, .25, .45, .65, .85]) {
  math.random = () => value;
  debug.spawnGuestAt(state.tiles.find(tile => tile.x === 2 && tile.y === 14));
  guestTypes.push(state.guests[state.guests.length - 1].archetype);
}
assert.deepEqual(guestTypes, ["family", "thrill", "scenic", "foodie", "relaxed"]);
const familyGuest = state.guests.find(guest => guest.archetype === "family");
const thrillGuest = state.guests.find(guest => guest.archetype === "thrill");
const familyGoalBeforeDistribution = familyGuest.goal;
const familyGoalTypeBeforeDistribution = familyGuest.goalType;
const firstShopChoice = debug.chooseShop(familyGuest);
familyGuest.goal = firstShopChoice.tile.object;
familyGuest.goalType = "shop";
const secondShopChoice = debug.chooseShop(thrillGuest);
assert.notEqual(secondShopChoice.tile.object, firstShopChoice.tile.object, "guests should spread across equally convenient shops");
familyGuest.goal = familyGoalBeforeDistribution;
familyGuest.goalType = familyGoalTypeBeforeDistribution;
familyGuest.hunger = 70;
familyGuest.thoughtCooldown = 0;
math.random = () => 0;
debug.update(.1);
assert.equal(familyGuest.goalType, "shop");
const mealShop = familyGuest.goal;
const mealPathTile = familyGuest.path[familyGuest.path.length - 1] || familyGuest.tile;
familyGuest.tile = mealPathTile;
familyGuest.pos = { x: familyGuest.tile.x, y: familyGuest.tile.y };
familyGuest.path = [];
familyGuest.thoughtCooldown = 0;
const stockBeforeMeal = mealShop.stock;
debug.update(.1);
assert.equal(familyGuest.spent, true);
assert.equal(mealShop.stock, stockBeforeMeal - 1);
assert.ok(state.guestLog.length > 0);

state.money = 50000;
const amenityCostBefore = debug.operatingCostBreakdown().maintenance;
debug.buildAt(7, 15, "bench");
debug.buildAt(7, 11, "trash_bin");
debug.buildAt(9, 15, "toilet");
const benchTile = state.tiles.find(tile => tile.x === 7 && tile.y === 15);
const binTile = state.tiles.find(tile => tile.x === 7 && tile.y === 11);
const toiletTile = state.tiles.find(tile => tile.x === 9 && tile.y === 15);
assert.equal(debug.operatingCostBreakdown().maintenance, amenityCostBefore + 15 * debug.difficultyCostFactor());

familyGuest.state = "walking";
familyGuest.goalType = "ride";
familyGuest.fatigue = 76;
familyGuest.restroomNeed = 0;
familyGuest.path = [];
familyGuest.thoughtCooldown = 0;
debug.update(.1);
assert.equal(familyGuest.goalType, "bench");
const benchPathTile = familyGuest.path[familyGuest.path.length - 1] || familyGuest.tile;
familyGuest.tile = benchPathTile;
familyGuest.pos = { x: benchPathTile.x, y: benchPathTile.y };
familyGuest.path = [];
debug.update(.1);
assert.equal(familyGuest.state, "resting");
for (let i = 0; i < 45; i++) debug.update(.1);
assert.ok(familyGuest.fatigue < 20, "a bench should restore a tired guest");
assert.equal(benchTile.object.usage, 1);

familyGuest.state = "walking";
familyGuest.goalType = "ride";
familyGuest.goal = state.rides[0];
familyGuest.restroomNeed = 76;
familyGuest.fatigue = 10;
familyGuest.path = [];
familyGuest.thoughtCooldown = 0;
debug.update(.1);
assert.equal(familyGuest.goalType, "toilet");
const toiletPathTile = familyGuest.path[familyGuest.path.length - 1] || familyGuest.tile;
familyGuest.tile = toiletPathTile;
familyGuest.pos = { x: toiletPathTile.x, y: toiletPathTile.y };
familyGuest.path = [];
debug.update(.1);
assert.equal(familyGuest.state, "restroom");
for (let i = 0; i < 35; i++) debug.update(.1);
assert.ok(familyGuest.restroomNeed < 5, "a toilet should resolve restroom demand");
assert.equal(toiletTile.object.usage, 1);

const nearBinPath = state.tiles.find(tile => tile.x === 8 && tile.y === 11);
const litterBefore = nearBinPath.litter;
assert.equal(debug.dropLitter(nearBinPath, 3), true);
assert.equal(nearBinPath.litter, litterBefore);
assert.equal(binTile.object.fill, 3);
assert.equal(binTile.object.collected, 3);
const cleaningJobsBefore = state.staffStats.cleaningJobs;
for (let i = 0; i < 600; i++) debug.update(.05);
assert.ok(binTile.object.fill < 3, "cleaners should empty trash bins");
assert.ok(state.staffStats.cleaningJobs > cleaningJobsBefore, "a cleaner should complete a visible cleaning job");
assert.equal(state.staffAgents.filter(agent => agent.role === "cleaner").length, state.staff.cleaners);

const repairRide = state.rides[0];
repairRide.broken = true;
repairRide.condition = 20;
const repairJobsBefore = state.staffStats.repairJobs;
for (let i = 0; i < 1000; i++) debug.update(.05);
assert.equal(repairRide.broken, false, "a mechanic should reopen a broken ride");
assert.ok(repairRide.condition >= 55);
assert.ok(state.staffStats.repairJobs > repairJobsBefore, "a mechanic should complete a visible repair job");

const staffAgentsBeforeHire = state.staffAgents.length;
debug.adjustStaff("cleaners", 1);
assert.equal(state.staffAgents.length, staffAgentsBeforeHire + 1, "hiring should add a staff character immediately");
const trainee = state.staffAgents.filter(agent => agent.role === "cleaner").sort((a, b) => b.id - a.id)[0];
assert.equal(trainee.level, 1);
assert.equal(debug.staffTrainingCost("cleaner"), 320);
const traineeEfficiencyBefore = debug.staffEfficiency(trainee);
const parkStaffCostBeforeTraining = debug.operatingCostBreakdown().parkStaff;
const trainingMoneyBefore = state.money;
const trainingExpensesBefore = state.finance.staffExpenses;
assert.equal(debug.trainStaff("cleaner"), true);
assert.equal(trainee.level, 2);
assert.ok(debug.staffEfficiency(trainee) > traineeEfficiencyBefore);
assert.ok(debug.operatingCostBreakdown().parkStaff > parkStaffCostBeforeTraining, "trained staff should earn a higher wage");
assert.equal(trainingMoneyBefore - state.money, 320);
assert.equal(state.finance.staffExpenses - trainingExpensesBefore, 320);
assert.equal(debug.staffTrainingCost("cleaner"), 320, "the next level-one employee should train next");

const restingMechanic = state.staffAgents.find(agent => agent.role === "mechanic");
restingMechanic.fatigue = 91.9;
restingMechanic.state = "patrolling";
restingMechanic.path = [state.tiles.find(tile => tile.path && tile !== restingMechanic.tile)];
debug.update(.2);
assert.equal(restingMechanic.state, "resting", "tired staff should take a break automatically");
const fatigueAtRest = restingMechanic.fatigue;
debug.update(.5);
assert.ok(restingMechanic.fatigue < fatigueAtRest, "resting should recover fatigue");
restingMechanic.fatigue = 32.1;
debug.update(.1);
assert.notEqual(restingMechanic.state, "resting", "recovered staff should return to work");

trainee.fatigue = 44;
const savedTraineeId = trainee.id;
restingMechanic.fatigue = 60;
restingMechanic.state = "resting";
const savedRestingMechanicId = restingMechanic.id;

const savedAmenityStats = {
  benchUses: benchTile.object.usage,
  toiletUses: toiletTile.object.usage,
  binCollected: binTile.object.collected
};
debug.saveGame();
benchTile.object.usage = 99;
toiletTile.object.usage = 99;
binTile.object.collected = 99;
state.staffStats.cleaningJobs = 999;
debug.loadGame();
assert.equal(state.tiles.find(tile => tile.x === 7 && tile.y === 15).object.usage, savedAmenityStats.benchUses);
assert.equal(state.tiles.find(tile => tile.x === 9 && tile.y === 15).object.usage, savedAmenityStats.toiletUses);
assert.equal(state.tiles.find(tile => tile.x === 7 && tile.y === 11).object.collected, savedAmenityStats.binCollected);
assert.ok(state.staffStats.cleaningJobs < 999, "staff job totals should survive save/load");
assert.equal(state.staffAgents.length, state.staff.cleaners + state.staff.mechanics);
const loadedTrainee = state.staffAgents.find(agent => agent.id === savedTraineeId);
assert.equal(loadedTrainee.level, 2, "staff training should survive save/load");
assert.equal(loadedTrainee.fatigue, 44, "staff fatigue should survive save/load");
const loadedRestingMechanic = state.staffAgents.find(agent => agent.id === savedRestingMechanicId);
assert.equal(loadedRestingMechanic.state, "resting", "staff should resume an unfinished break after loading");
loadedRestingMechanic.fatigue = 0;
loadedRestingMechanic.state = "idle";
debug.adjustStaff("cleaners", -1);
assert.equal(state.staffAgents.length, staffAgentsBeforeHire);

const noStaffLitterTile = state.tiles.find(tile => tile.x === 8 && tile.y === 10);
const noStaffRide = state.rides[0];
state.staff.cleaners = 0;
state.staff.mechanics = 0;
debug.syncStaffAgents();
noStaffLitterTile.litter = 2;
noStaffRide.broken = true;
noStaffRide.condition = 20;
for (let i = 0; i < 200; i++) debug.update(.05);
assert.equal(noStaffLitterTile.litter, 2, "litter should remain without cleaners");
assert.equal(noStaffRide.broken, true, "broken rides should remain closed without mechanics");
assert.equal(noStaffRide.condition, 20);
state.staff.cleaners = 1;
state.staff.mechanics = 1;
debug.syncStaffAgents();
noStaffLitterTile.litter = 0;
noStaffRide.broken = false;
noStaffRide.condition = 100;

state.money = 50000;
const transitCostBefore = debug.operatingCostBreakdown().transit;
debug.buildAt(4, 13, "bus_stop");
debug.buildAt(10, 13, "bus_stop");
let busStopTiles = state.tiles.filter(tile => tile.object?.type === "bus_stop");
assert.equal(busStopTiles.length, 3);
assert.equal(state.transit.networks.bus.routeStopIds.length, 3);
assert.equal(new Set(state.transit.networks.bus.routeStopIds).size, 3);

const lastStop = busStopTiles[2];
const lastStopId = lastStop.object.stopId;
assert.equal(debug.moveStopInRoute(lastStop, -1), true);
assert.equal(state.transit.networks.bus.routeStopIds[1], lastStopId);
assert.equal(debug.toggleStopInRoute(lastStop), true);
assert.equal(state.transit.networks.bus.routeStopIds.includes(lastStopId), false);
debug.undoLastBuild();
assert.equal(state.transit.networks.bus.routeStopIds[1], lastStopId, "route edits should be undoable");

assert.equal(debug.adjustBusFleet(1), true);
assert.equal(debug.adjustBusFleet(1), true);
assert.equal(debug.adjustBusInterval(-1), true);
assert.equal(debug.adjustBusInterval(-1), true);
assert.equal(state.transit.networks.bus.fleet, 3);
assert.equal(state.transit.networks.bus.interval, 5);
assert.ok(debug.operatingCostBreakdown().transit > transitCostBefore);
assert.equal(debug.getTransitRoutePlan("bus").connectedStopIds.length, 3);

state.admissionFee = 0;
state.guests = [];
state.transit.networks.bus.entranceWaiting = 24;
math.random = () => 0;
for (let i = 0; i < 1800; i++) debug.update(.05);
assert.equal(state.buses.length, 3);
assert.ok(state.transit.networks.bus.totalRiders > 0);
assert.ok(busStopTiles.some(tile => tile.object.usage > 0), "stops should record individual usage");

const savedTransit = {
  fleet: state.transit.networks.bus.fleet,
  interval: state.transit.networks.bus.interval,
  route: [...state.transit.networks.bus.routeStopIds],
  riders: state.transit.networks.bus.totalRiders
};
debug.saveGame();
state.transit.networks.bus.fleet = 1;
state.transit.networks.bus.interval = 15;
state.transit.networks.bus.routeStopIds = [];
debug.loadGame();
busStopTiles = state.tiles.filter(tile => tile.object?.type === "bus_stop");
assert.equal(state.transit.networks.bus.fleet, savedTransit.fleet);
assert.equal(state.transit.networks.bus.interval, savedTransit.interval);
assert.deepEqual([...state.transit.networks.bus.routeStopIds], savedTransit.route);
assert.equal(state.transit.networks.bus.totalRiders, savedTransit.riders);
assert.ok(busStopTiles.some(tile => tile.object.usage > 0), "stop usage should survive save/load");

state.guests = [];
state.money = 100000;
const candidates = state.tiles.filter(tile => !tile.object && !tile.path && tile.terrain !== "water").slice(0, 8);
const baseCost = debug.operatingCostBreakdown().total;
state.progression.bestStars = 1;
state.progression.unlockedTools = [];
assert.equal(debug.setTool("coaster"), false, "advanced rides should stay locked at one star");
const unlockedAtThreeStars = debug.reconcileParkUnlocks({ stars: 3 }, false);
assert.ok(unlockedAtThreeStars.includes("観覧車"));
assert.ok(unlockedAtThreeStars.includes("コースター"));
assert.equal(debug.setTool("coaster"), true);
for (const tile of candidates) debug.buildAt(tile.x, tile.y, "coaster");
assert.ok(debug.operatingCostBreakdown().total >= baseCost + candidates.length * 45 * debug.difficultyCostFactor());

const monorailCostBefore = debug.operatingCostBreakdown().transit;
const unlockedAtFourStars = debug.reconcileParkUnlocks({ stars: 4 }, false);
assert.ok(unlockedAtFourStars.includes("高架レール"));
assert.ok(unlockedAtFourStars.includes("モノレール駅"));
assert.equal(debug.setTool("train_station"), false, "park trains should remain locked below five stars");
for (let y = 10; y <= 17; y++) debug.buildAt(8, y, "monorail_track");
assert.equal(state.tiles.find(tile => tile.x === 8 && tile.y === 14).path, true, "elevated rail should preserve the path below");
assert.equal(state.tiles.find(tile => tile.x === 8 && tile.y === 14).transitTrack, "monorail");
debug.buildAt(7, 10, "monorail_station");
debug.buildAt(9, 17, "monorail_station");
const monorailStations = state.tiles.filter(tile => tile.object?.type === "monorail_station");
assert.equal(monorailStations.length, 2);
assert.equal(debug.getTransitRoutePlan("monorail").connectedStopIds.length, 2);
assert.ok(debug.operatingCostBreakdown().transit > monorailCostBefore);
for (const stationTile of monorailStations) stationTile.object.waiting = 24;
state.admissionFee = 0;
for (let i = 0; i < 1200; i++) debug.update(.05);
assert.equal(state.monorails.length, 1);
assert.ok(state.transit.networks.monorail.totalRiders > 0);
assert.ok(monorailStations.some(tile => tile.object.usage > 0));

debug.buildAt(8, 18, "monorail_track");
assert.equal(state.tiles.find(tile => tile.x === 8 && tile.y === 18).transitTrack, "monorail");
debug.undoLastBuild();
assert.equal(state.tiles.find(tile => tile.x === 8 && tile.y === 18).transitTrack, null, "rail construction should be undoable");

state.admissionFee = 75;
state.money = 3000;
for (let i = 0; i < 8; i++) debug.update(9);
assert.ok(state.money < 0, "overbuilding should produce a cash deficit without guests");

state.clean = 100;
state.happy = 100;
state.transit.networks.bus.totalRiders = 500;
state.transit.networks.bus.entranceWaiting = 0;
for (const tile of busStopTiles) tile.object.waiting = 0;
state.guestsServed += 12;
state.progression.roundStartServed = state.guestsServed - 12;
state.progression.activeGoalIds = ["profit", "guests", "clean"];
state.progression.completedGoalIds = [];
Object.keys(state.finance).forEach(key => { state.finance[key] = 0; });
state.finance.admissionRevenue = 10000;
debug.setDayCondition("rain", "holiday");
const goalMoneyBefore = state.money;
const fiveStarReport = debug.settleRound();
assert.equal(fiveStarReport.condition, "rain");
assert.equal(state.dayCondition.current, "holiday");
assert.notEqual(state.dayCondition.next, state.dayCondition.current);
assert.equal(element("conditionCurrent").textContent, "休日イベント");
assert.match(element("reportAchievements").innerHTML, /次回予報/);
assert.equal(fiveStarReport.rating.stars, 5);
assert.equal(fiveStarReport.goalReward, 1850);
assert.equal(state.progression.bestStars, 5);
assert.ok(fiveStarReport.newUnlocks.includes("園内線路"));
assert.ok(fiveStarReport.newUnlocks.includes("園内列車駅"));
assert.deepEqual([...state.progression.completedGoalIds].sort(), ["clean", "guests", "profit"]);
assert.ok(state.money > goalMoneyBefore + fiveStarReport.goalReward);
assert.equal(element("roundReport").hidden, false);
debug.closeRoundReport();
debug.update(.1);
assert.equal(state.monorails.length, 2, "five-star parks should run a second monorail train");

state.money += 10000;
const parkTrainCostBefore = debug.operatingCostBreakdown().transit;
for (let x = 4; x <= 10; x++) debug.buildAt(x, 5, "path");
for (let x = 4; x <= 10; x++) debug.buildAt(x, 7, "train_track");
debug.buildAt(4, 6, "train_station");
debug.buildAt(10, 6, "train_station");
const parkTrainStations = state.tiles.filter(tile => tile.object?.type === "train_station");
assert.equal(parkTrainStations.length, 2);
assert.equal(debug.getTransitRoutePlan("park_train").connectedStopIds.length, 2);
assert.ok(debug.operatingCostBreakdown().transit > parkTrainCostBefore);
for (const stationTile of parkTrainStations) stationTile.object.waiting = 18;
state.admissionFee = 0;
for (let i = 0; i < 1400; i++) debug.update(.05);
assert.equal(state.parkTrains.length, 1);
assert.ok(state.transit.networks.park_train.totalRiders > 0);
assert.ok(parkTrainStations.some(tile => tile.object.usage > 0));

state.money = Math.max(state.money, 1000);
debug.buildAt(11, 7, "train_track");
assert.equal(state.tiles.find(tile => tile.x === 11 && tile.y === 7).transitTrack, "park_train");
debug.undoLastBuild();
assert.equal(state.tiles.find(tile => tile.x === 11 && tile.y === 7).transitTrack, null, "park train track should be undoable");

const followupReport = debug.settleRound();
assert.equal(followupReport.goalReward, 2600, "newly active achievements should pay once");
assert.equal(followupReport.ratingBonus, 0);
debug.closeRoundReport();

const moneyBeforeEmptyRound = state.money;
const emptyReport = debug.settleRound();
assert.equal(emptyReport.goalReward, 0, "completed goals must not pay repeatedly");
assert.equal(emptyReport.ratingBonus, 0, "an empty round must not receive rating rewards");
assert.equal(state.money, moneyBeforeEmptyRound);
debug.closeRoundReport();

debug.saveGame();
state.progression.bestStars = 1;
state.progression.completedGoalIds = [];
debug.loadGame();
assert.equal(state.progression.bestStars, 5);
assert.equal(state.tiles.filter(tile => tile.transitTrack === "monorail").length, 8);
assert.equal(state.tiles.filter(tile => tile.object?.type === "monorail_station").length, 2);
assert.equal(state.tiles.filter(tile => tile.transitTrack === "park_train").length, 7);
assert.equal(state.tiles.filter(tile => tile.object?.type === "train_station").length, 2);
assert.deepEqual([...state.progression.completedGoalIds].sort(), ["clean", "guests", "profit", "ride_variety", "satisfaction", "transit"]);
assert.deepEqual(state.progression.activeGoalIds, []);

const modernSave = storage.get("yumeshimaParkSaveV1");
const legacySave = JSON.parse(modernSave);
delete legacySave.progression;
delete legacySave.staffRoster;
delete legacySave.marketing;
delete legacySave.dayCondition;
delete legacySave.finance.marketingExpenses;
delete legacySave.analysisMode;
legacySave.tiles.forEach(tile => {
  delete tile.traffic;
  delete tile.moodTotal;
  delete tile.moodWeight;
});
const legacyKiosk = legacySave.tiles.find(tile => tile.object?.type === "kiosk").object;
const legacyRide = legacySave.tiles.find(tile => tile.object?.type === "carousel").object;
legacyKiosk.stock = 30;
legacyKiosk.maxStock = 30;
delete legacyKiosk.autoRestock;
delete legacyKiosk.pendingStock;
delete legacyKiosk.deliveryTimer;
delete legacyKiosk.sales;
delete legacyKiosk.visits;
delete legacyKiosk.priceRejects;
delete legacyKiosk.revenue;
delete legacyKiosk.supplyCost;
delete legacyKiosk.recentInterest;
delete legacyKiosk.recentSales;
delete legacyKiosk.recentPriceRejects;
delete legacyKiosk.recentToleranceTotal;
delete legacyKiosk.recentToleranceWeight;
delete legacyKiosk.open;
delete legacyKiosk.staff;
delete legacyKiosk.level;
delete legacyKiosk.reputation;
delete legacyRide.open;
delete legacyRide.level;
delete legacyRide.popularity;
delete legacyRide.maintenancePolicy;
storage.set("yumeshimaParkSaveV1", JSON.stringify(legacySave));
debug.loadGame();
assert.ok(state.progression.bestStars >= 1);
assert.ok(state.progression.activeGoalIds.length > 0);
assert.ok(state.progression.unlockedTools.includes("coaster"), "existing advanced rides should migrate as unlocked");
const migratedKiosk = state.tiles.find(tile => tile.object?.type === "kiosk").object;
assert.equal(migratedKiosk.maxStock, 60, "legacy beginner shops should receive the larger capacity");
assert.equal(migratedKiosk.autoRestock, true);
assert.equal(migratedKiosk.visits, 0);
assert.equal(migratedKiosk.priceRejects, 0);
assert.equal(migratedKiosk.recentPriceRejects, 0);
assert.equal(migratedKiosk.recentToleranceWeight, 0);
assert.equal(migratedKiosk.revenue, 0);
assert.equal(migratedKiosk.supplyCost, 0);
assert.equal(migratedKiosk.open, true);
assert.equal(migratedKiosk.staff, 1);
assert.equal(migratedKiosk.level, 1);
assert.equal(migratedKiosk.reputation, 65);
const migratedRide = state.tiles.find(tile => tile.object?.type === "carousel").object;
assert.equal(migratedRide.open, true);
assert.equal(migratedRide.level, 1);
assert.equal(migratedRide.popularity, 55);
assert.equal(migratedRide.maintenancePolicy, "balanced");
assert.ok(state.staffAgents.every(agent => agent.level === 1 && agent.fatigue === 0), "legacy staff should receive safe defaults");
assert.equal(state.marketing.activeCampaign, null);
assert.equal(state.marketing.remainingLeads, 0);
assert.equal(state.finance.marketingExpenses, 0);
assert.equal(state.dayCondition.current, "sunny");
assert.equal(state.dayCondition.next, "heatwave", "legacy saves should receive a useful first forecast");
assert.equal(debug.summary().analysisMode, "normal");
assert.ok(state.tiles.every(tile => tile.traffic === 0 && tile.moodWeight === 0));
storage.set("yumeshimaParkSaveV1", modernSave);
debug.loadGame();
assert.equal(state.progression.bestStars, 5);
assert.equal(state.dayCondition.current, "heatwave");
assert.equal(state.dayCondition.next, "sunny");

console.log("economy smoke test: OK", JSON.stringify(debug.summary()));
