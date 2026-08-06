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
  "teacups", "kiosk", "tree", "shrub", "flower", "palm", "water", "decor"
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

assert.equal(state.admissionFee, 25);
debug.adjustAdmissionFee(5);
assert.equal(state.admissionFee, 30);

const rideTile = state.tiles.find(tile => tile.object?.type === "carousel");
debug.inspect(rideTile);
debug.adjustSelectedPrice(2);
assert.equal(rideTile.object.price, 9);

debug.buildAt(15, 14, "kiosk");
const kiosk = state.tiles.find(tile => tile.x === 15 && tile.y === 14).object;
assert.equal(kiosk.stock, 30);
kiosk.stock = 5;
debug.inspect(state.tiles.find(tile => tile.object === kiosk));
const beforeRestock = state.money;
debug.restockSelectedKiosk();
assert.equal(kiosk.stock, 30);
assert.equal(beforeRestock - state.money, 75);
assert.equal(state.finance.restockExpenses, 75);

const beforeAdmission = state.finance.admissionRevenue;
debug.adjustAdmissionFee(-10);
debug.update(4);
assert.ok(state.finance.admissionRevenue > beforeAdmission, "a guest should pay admission");

debug.update(9);
assert.ok(state.finance.maintenanceExpenses > 0);
assert.ok(state.finance.staffExpenses > 0);

state.admissionFee = 41;
state.finance.shopRevenue = 123;
debug.saveGame();
state.admissionFee = 1;
state.finance.shopRevenue = 0;
debug.loadGame();
assert.equal(state.admissionFee, 41);
assert.equal(state.finance.shopRevenue, 123);
assert.equal(kiosk.stock, 30);

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
familyGuest.hunger = 70;
familyGuest.thoughtCooldown = 0;
math.random = () => 0;
debug.update(.1);
assert.equal(familyGuest.goalType, "shop");
familyGuest.tile = state.tiles.find(tile => tile.x === 6 && tile.y === 14);
familyGuest.pos = { x: familyGuest.tile.x, y: familyGuest.tile.y };
familyGuest.path = [];
familyGuest.thoughtCooldown = 0;
const stockBeforeMeal = hungryShopTile.object.stock;
debug.update(.1);
assert.equal(familyGuest.spent, true);
assert.equal(hungryShopTile.object.stock, stockBeforeMeal - 1);
assert.ok(state.guestLog.length > 0);

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
assert.ok(debug.operatingCostBreakdown().total >= baseCost + candidates.length * 45);

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
const goalMoneyBefore = state.money;
const fiveStarReport = debug.settleRound();
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
storage.set("yumeshimaParkSaveV1", JSON.stringify(legacySave));
debug.loadGame();
assert.ok(state.progression.bestStars >= 1);
assert.ok(state.progression.activeGoalIds.length > 0);
assert.ok(state.progression.unlockedTools.includes("coaster"), "existing advanced rides should migrate as unlocked");
storage.set("yumeshimaParkSaveV1", modernSave);
debug.loadGame();
assert.equal(state.progression.bestStars, 5);

console.log("economy smoke test: OK", JSON.stringify(debug.summary()));
