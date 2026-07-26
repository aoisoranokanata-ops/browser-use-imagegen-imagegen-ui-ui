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
  "inspect", "path", "remove", "bus_stop", "carousel", "wheel", "coaster",
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
const postBonusMoney = state.money;
element("roundBtn").click();
element("roundBtn").click();
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

state.guests = [];
const candidates = state.tiles.filter(tile => !tile.object && !tile.path && tile.terrain !== "water").slice(0, 8);
const baseCost = debug.operatingCostBreakdown().total;
for (const tile of candidates) debug.buildAt(tile.x, tile.y, "coaster");
assert.ok(debug.operatingCostBreakdown().total >= baseCost + candidates.length * 45);

state.admissionFee = 75;
state.money = 3000;
for (let i = 0; i < 8; i++) debug.update(9);
assert.ok(state.money < 0, "overbuilding should produce a cash deficit without guests");

console.log("economy smoke test: OK", JSON.stringify(debug.summary()));
