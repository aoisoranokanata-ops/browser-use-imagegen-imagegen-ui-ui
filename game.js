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
  toast: document.getElementById("toast"),
  growthBar: document.getElementById("growthBar"),
  loadBar: document.getElementById("loadBar"),
  sceneBar: document.getElementById("sceneBar"),
  pauseBtn: document.getElementById("pauseBtn"),
  roundBtn: document.getElementById("roundBtn"),
  saveBtn: document.getElementById("saveBtn"),
  loadBtn: document.getElementById("loadBtn"),
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
const tools = {
  inspect: { cost: 0, label: "調べる" },
  path: { cost: 80, label: "通路" },
  remove: { cost: 0, label: "撤去" },
  bus_stop: { cost: 650, label: "バス停", transit: true, scenery: 2 },
  carousel: { cost: 1800, label: "メリーゴーランド", ride: true, cap: 7, duration: 9, appeal: 18, color: "#ef6f61" },
  wheel: { cost: 3200, label: "観覧車", ride: true, cap: 10, duration: 13, appeal: 27, color: "#49abc2" },
  coaster: { cost: 4800, label: "コースター", ride: true, cap: 12, duration: 10, appeal: 36, color: "#f1b84f" },
  teacups: { cost: 1400, label: "ティーカップ", ride: true, cap: 6, duration: 7, appeal: 15, color: "#9bcf67" },
  kiosk: { cost: 900, label: "スナック売店", shop: true },
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
let mouse = { x: 0, y: 0, down: false, moved: false, sx: 0, sy: 0, cx: 0, cy: 0 };
let hovered = null;
let selectedTool = "inspect";
let selectedHero = localStorage.getItem("parkHero") || "male";
let paused = false;
let last = performance.now();
let spawnTimer = 0;
let incomeTimer = 0;
let toastTimer = 0;
let busDropTimer = 0;

const state = {
  money: 18000,
  clean: 91,
  happy: 82,
  day: 1,
  round: 1,
  guestsServed: 0,
  tiles: [],
  guests: [],
  rides: [],
  buses: []
};

function makeTile(x, y) {
  const pond = x > 20 && y > 18 && x + y < 48;
  return { x, y, terrain: pond ? "water" : "grass", object: null, path: false, litter: 0 };
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
placeStarterObject(5, 12, "kiosk");
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
  tile.object = { type, queue: [], riders: [], timer: 0, totalRides: 0 };
  state.rides.push(tile.object);
}

function placeStarterObject(x, y, type) {
  tileAt(x, y).object = { type };
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

function drawWorld() {
  const grad = ctx.createLinearGradient(0, 0, 0, innerHeight);
  grad.addColorStop(0, "#bfead9");
  grad.addColorStop(1, "#dff2c8");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  for (const tile of state.tiles) {
    const p = iso(tile.x, tile.y);
    let fill = (tile.x + tile.y) % 2 ? colors.grassA : colors.grassB;
    if (tile.terrain === "water") fill = colors.water;
    if (tile.path) fill = colors.path;
    diamond(p.x, p.y, fill);
    if (tile.path) drawPathTrim(p.x, p.y);
    if (tile.terrain === "water") drawWater(p.x, p.y);
    if (tile.litter > 0.5) drawLitter(p.x, p.y, tile.litter);
    if (hovered === tile) drawHover(p.x, p.y);
    if (tile.object) drawObject(tile, p);
  }
  drawBuses();
  drawGuests();
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

function drawHover(x, y) {
  diamond(x, y, selectedTool === "remove" ? "rgba(239,111,97,.26)" : "rgba(255,255,255,.34)", "rgba(38,49,63,.52)");
}

function drawLitter(x, y, amount) {
  ctx.fillStyle = `rgba(117,88,56,${Math.min(.5, amount / 9)})`;
  ctx.fillRect(x + 4 * camera.zoom, y + 18 * camera.zoom, 4 * camera.zoom, 3 * camera.zoom);
  ctx.fillRect(x - 12 * camera.zoom, y + 22 * camera.zoom, 3 * camera.zoom, 3 * camera.zoom);
}

function drawObject(tile, p) {
  const type = tile.object.type;
  if (tools[type]?.ride) drawRide(type, p, tile.object);
  if (type === "bus_stop") drawBusStop(p);
  if (type === "kiosk") drawKiosk(p);
  if (type === "tree") drawTree(p);
  if (type === "shrub") drawShrub(p);
  if (type === "flower") drawFlowerBed(p);
  if (type === "palm") drawPalm(p);
  if (type === "decor") drawDecor(p);
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

function drawKiosk(p) {
  const z = camera.zoom;
  ctx.save();
  ctx.translate(p.x, p.y + 18 * z);
  drawSoftShadow(0, 8 * z, 30 * z, 10 * z, .16);
  drawHouse(0, 0, "#fff7df", "#ef6f61");
  ctx.fillStyle = "#49abc2";
  roundRect(-20 * z, -14 * z, 40 * z, 8 * z, 3 * z);
  ctx.fill();
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i % 2 ? "#fff7df" : "#ef6f61";
    ctx.fillRect((-20 + i * 8) * z, -14 * z, 8 * z, 8 * z);
  }
  ctx.fillStyle = "#f1b84f";
  ctx.fillRect(-13 * z, -10 * z, 26 * z, 10 * z);
  ctx.fillStyle = "#26313f";
  ctx.fillRect(4 * z, -2 * z, 8 * z, 12 * z);
  drawFlag(-24 * z, -14 * z, "#f1b84f", -1);
  ctx.restore();
}

function drawBusStop(p) {
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

function drawGuests() {
  const sorted = [...state.guests].sort((a, b) => (a.pos.x + a.pos.y) - (b.pos.x + b.pos.y));
  for (let i = 0; i < sorted.length; i++) {
    const g = sorted[i];
    const p = iso(g.pos.x + .5, g.pos.y + .5, 8);
    drawGuest(p.x, p.y, g, i);
  }
}

function drawBuses() {
  const route = getBusRoute();
  if (route.length < 2 || !state.buses.length) return;
  for (const bus of state.buses) {
    const i = Math.floor(bus.distance) % route.length;
    const next = (i + 1) % route.length;
    const f = bus.distance - Math.floor(bus.distance);
    const a = route[i];
    const b = route[next];
    const x = a.x + (b.x - a.x) * f + .5;
    const y = a.y + (b.y - a.y) * f + .5;
    const p = iso(x, y, 9);
    drawBus(p.x, p.y, b.x - a.x, b.y - a.y);
  }
}

function drawBus(x, y, dx, dy) {
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
  ctx.fillStyle = index % 3 === 0 ? "#f1b84f" : "#26313f";
  ctx.beginPath();
  ctx.ellipse(x, y - 10 * z + bob, 6 * z, 3 * z, 0, 0, Math.PI * 2);
  ctx.fill();
  if (index % 4 === 0) {
    ctx.fillStyle = "#fff7df";
    ctx.beginPath();
    ctx.arc(x + 6 * z, y + 3 * z + bob, 3 * z, 0, Math.PI * 2);
    ctx.fill();
  }
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

function update(dt) {
  if (paused) return;
  spawnTimer += dt;
  incomeTimer += dt;
  const attraction = state.rides.reduce((sum, r) => sum + tools[r.type].appeal, 0);
  const transitStops = busStops().length;
  const interval = Math.max(.65, 3.6 - attraction / 42 - state.round * .08 - transitStops * .14);
  if (spawnTimer > interval && state.guests.length < 12 + state.round * 5) {
    spawnTimer = 0;
    spawnGuest();
  }
  updateBuses(dt);
  for (const ride of state.rides) updateRide(ride, dt);
  for (const guest of state.guests) updateGuest(guest, dt);
  if (incomeTimer > 3.2) {
    incomeTimer = 0;
    const kiosks = state.tiles.filter(t => t.object?.type === "kiosk").length;
    state.money += kiosks * Math.max(6, Math.floor(state.guests.length * 2.4));
    state.clean = clamp(state.clean - state.guests.length * .06 + sceneryScore() * .015, 35, 100);
  }
  state.guests = state.guests.filter(g => !g.done);
  computeStats();
}

function updateBuses(dt) {
  const route = getBusRoute();
  const stops = busStops();
  if (!stops.length || route.length < 2) {
    state.buses = [];
    return;
  }
  if (!state.buses.length) state.buses.push({ distance: 0 });
  for (const bus of state.buses) {
    bus.distance = (bus.distance + dt * 1.8) % route.length;
  }
  busDropTimer += dt;
  if (busDropTimer > Math.max(4.5, 8 - stops.length * .7) && state.guests.length < 18 + state.round * 6) {
    busDropTimer = 0;
    const stop = stops[Math.floor(Math.random() * stops.length)];
    spawnGuestAt(nearestPathForTile(stop) || entrance);
  }
}

function spawnGuest() {
  spawnGuestAt(entrance);
}

function spawnGuestAt(startTile) {
  const goal = chooseRide();
  const color = ["#ef6f61", "#49abc2", "#f1b84f", "#7acb72", "#8e6fb5"][Math.floor(Math.random() * 5)];
  const guest = {
    pos: { x: startTile.x, y: startTile.y },
    tile: startTile,
    path: [],
    speed: .95 + Math.random() * .35,
    goal,
    state: "walking",
    patience: 22 + Math.random() * 18,
    color,
    spent: false
  };
  guest.path = goal ? findPath(startTile, nearestPath(goal)) : [];
  state.guests.push(guest);
}

function chooseRide() {
  const reachable = state.rides.filter(ride => {
    const pathTile = nearestPath(ride);
    return pathTile && findPath(entrance, pathTile).length;
  });
  if (!reachable.length) return null;
  const sorted = reachable.sort((a, b) => {
    const scoreA = tools[a.type].appeal - a.queue.length * 4;
    const scoreB = tools[b.type].appeal - b.queue.length * 4;
    return scoreB - scoreA;
  });
  return sorted[Math.floor(Math.random() * Math.min(3, sorted.length))];
}

function nearestPath(ride) {
  const tile = state.tiles.find(t => t.object === ride);
  const n = neighbors(tile).find(t => t.path);
  return n || null;
}

function updateGuest(g, dt) {
  if (g.state === "queued" || g.state === "riding") {
    g.patience -= dt;
    if (g.state === "queued" && g.patience < 0) {
      const i = g.goal.queue.indexOf(g);
      if (i >= 0) g.goal.queue.splice(i, 1);
      state.happy -= 3;
      g.path = findPath(g.tile, entrance);
      g.state = "leaving";
    }
    return;
  }
  if (!g.path.length) {
    if (g.state === "leaving") { g.done = true; return; }
    if (g.goal) {
      g.goal.queue.push(g);
      g.state = "queued";
      g.tile.litter += Math.random() * .4;
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
  const step = g.speed * dt;
  if (dist <= step) {
    g.pos.x = next.x;
    g.pos.y = next.y;
    g.tile = next;
    g.path.shift();
  } else {
    g.pos.x += dx / dist * step;
    g.pos.y += dy / dist * step;
  }
  if (!g.spent && Math.random() < .003) {
    const nearShop = neighbors(g.tile).some(t => t.object?.type === "kiosk");
    if (nearShop) {
      g.spent = true;
      state.money += 24;
      state.happy += .18;
    }
  }
}

function updateRide(ride, dt) {
  ride.timer -= dt;
  if (ride.timer <= 0 && ride.riders.length) {
    for (const guest of ride.riders) {
      guest.state = "leaving";
      guest.path = findPath(guest.tile, entrance);
      guest.goal = null;
      guest.patience = 30;
      guest.tile.litter += Math.random() * .55;
      state.guestsServed++;
      state.money += 115 + Math.floor(tools[ride.type].appeal * 2.2);
      state.happy += 1.1;
    }
    ride.riders = [];
    ride.totalRides++;
  }
  if (!ride.riders.length && ride.queue.length) {
    const cap = tools[ride.type].cap;
    ride.riders = ride.queue.splice(0, cap);
    const rideTile = state.tiles.find(t => t.object === ride);
    for (const guest of ride.riders) {
      guest.state = "riding";
      guest.tile = rideTile;
      guest.pos = { x: rideTile.x, y: rideTile.y };
    }
    ride.timer = tools[ride.type].duration;
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
  return state.tiles.filter(t => t.object?.type === "bus_stop");
}

function nearestPathForTile(tile) {
  return neighbors(tile).find(t => t.path) || null;
}

function getBusRoute() {
  const stops = busStops()
    .map(nearestPathForTile)
    .filter(Boolean);
  if (!stops.length) return [];
  const waypoints = [entrance, ...stops];
  const route = [];
  for (let i = 0; i < waypoints.length; i++) {
    const a = waypoints[i];
    const b = waypoints[(i + 1) % waypoints.length];
    const segment = findPath(a, b);
    const tiles = segment.length ? [a, ...segment] : [a];
    for (const tile of tiles) {
      if (route[route.length - 1] !== tile) route.push(tile);
    }
  }
  return route;
}

function sceneryScore() {
  return state.tiles.reduce((sum, t) => sum + (tools[t.object?.type]?.scenery || 0) + (t.terrain === "water" ? 1 : 0), 0);
}

function snapshotObject(object) {
  if (!object) return null;
  const saved = { type: object.type };
  if (tools[object.type]?.ride) {
    saved.timer = object.timer || 0;
    saved.totalRides = object.totalRides || 0;
  }
  return saved;
}

function restoreObject(saved) {
  if (!saved || !tools[saved.type]) return null;
  if (tools[saved.type].ride) {
    return {
      type: saved.type,
      queue: [],
      riders: [],
      timer: saved.timer || 0,
      totalRides: saved.totalRides || 0
    };
  }
  return { type: saved.type };
}

function rebuildRideList() {
  state.rides = state.tiles
    .map(tile => tile.object)
    .filter(object => tools[object?.type]?.ride);
}

function saveGame() {
  const save = {
    version: 1,
    savedAt: Date.now(),
    selectedHero,
    money: state.money,
    clean: state.clean,
    happy: state.happy,
    day: state.day,
    round: state.round,
    guestsServed: state.guestsServed,
    tiles: state.tiles.map(tile => ({
      terrain: tile.terrain,
      path: tile.path,
      litter: tile.litter,
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
    state.guests = [];
    state.buses = [];
    busDropTimer = 0;
    spawnTimer = 0;
    incomeTimer = 0;
    save.tiles.forEach((savedTile, index) => {
      const tile = state.tiles[index];
      tile.terrain = savedTile.terrain === "water" ? "water" : "grass";
      tile.path = !!savedTile.path;
      tile.litter = Math.max(0, Number(savedTile.litter) || 0);
      tile.object = restoreObject(savedTile.object);
    });
    rebuildRideList();
    if (save.selectedHero) applyHeroSelection(save.selectedHero, true);
    inspect(entrance);
    computeStats();
    toast("パークをロードしました");
  } catch {
    toast("セーブデータの読み込みに失敗しました");
  }
}

function computeStats() {
  const queue = state.rides.reduce((sum, r) => sum + r.queue.length, 0);
  const rides = state.rides.length;
  const scene = sceneryScore();
  const transit = busStops().length;
  const served = state.guestsServed;
  const joy = 45 + rides * 4 + scene * .18 + transit * 1.6 + served * .04 + state.clean * .12 - queue * 1.8;
  state.happy = clamp(joy, 18, 100);
  ui.money.textContent = `$${Math.round(state.money).toLocaleString()}`;
  ui.happy.textContent = `${Math.round(state.happy)}%`;
  ui.clean.textContent = `${Math.round(state.clean)}%`;
  ui.queue.textContent = queue;
  ui.guests.textContent = state.guests.length;
  ui.day.textContent = state.day;
  ui.round.textContent = state.round;
  ui.growthBar.style.width = `${clamp((rides * 16 + transit * 7 + served * .22), 4, 100)}%`;
  ui.loadBar.style.width = `${clamp(queue * 8 + state.guests.length * 2, 5, 100)}%`;
  ui.sceneBar.style.width = `${clamp(scene * 2, 7, 100)}%`;
}

function build(tile) {
  if (!tile) return;
  if (selectedTool === "inspect") return inspect(tile);
  if (selectedTool === "remove") {
    if (tile.object) {
      if (tools[tile.object.type]?.ride) state.rides = state.rides.filter(r => r !== tile.object);
      tile.object = null;
      state.money += 60;
      toast("オブジェクトを撤去しました");
    } else if (tile.path && tile !== entrance) {
      tile.path = false;
      toast("通路を撤去しました");
    }
    return;
  }
  const tool = tools[selectedTool];
  if (state.money < tool.cost) return toast("資金が足りません");
  if (selectedTool === "path") {
    if (tile.terrain === "water" || tile.object || tile.path) return toast("通路には空いた土地が必要です");
    tile.path = true;
  } else if (selectedTool === "bus_stop") {
    if (tile.object || tile.path || tile.terrain === "water") return toast("バス停には通路に隣接した空き芝生が必要です");
    if (!nearestPathForTile(tile)) return toast("バス停は通路の隣に置いてください");
    tile.object = { type: selectedTool };
  } else if (selectedTool === "water") {
    if (tile.object || tile.path) return toast("水辺には空いた土地が必要です");
    tile.terrain = "water";
  } else if (["tree", "shrub", "flower", "palm", "decor"].includes(selectedTool)) {
    if (tile.object || tile.path || tile.terrain === "water") return toast("景観アイテムには空いた芝生が必要です");
    tile.object = { type: selectedTool };
  } else {
    if (tile.object || tile.path || tile.terrain === "water") return toast("アトラクションには空いた芝生が必要です");
    tile.object = { type: selectedTool, queue: [], riders: [], timer: 0, totalRides: 0 };
    if (tool.ride) state.rides.push(tile.object);
  }
  state.money -= tool.cost;
  if (tile.litter) tile.litter = Math.max(0, tile.litter - 1);
  inspect(tile);
}

function inspect(tile) {
  let title = "芝生タイル";
  let body = "通路、ライド、景観、水辺を配置できる空き地です。";
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
    if (t.ride) body = `待ち列 ${tile.object.queue.length}人、乗車中 ${tile.object.riders.length}/${t.cap}人、運転回数 ${tile.object.totalRides}回。`;
    else if (t.transit) body = `バスが入口と停留所を巡回します。現在のバス停は ${busStops().length}か所で、ゲスト流入と満足度を少し高めます。`;
    else if (t.shop) body = "近くを通ったゲストが買い物をして、追加収益が入ります。";
    else body = `景観値 ${t.scenery}。満足度を少し上げ、清潔さの悪化をやわらげます。`;
  }
  ui.selected.innerHTML = `<strong>${title}</strong><p>${body}</p>`;
}

function toast(text) {
  ui.toast.textContent = text;
  ui.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ui.toast.classList.remove("show"), 1200);
}

canvas.addEventListener("pointerdown", e => {
  mouse.down = true;
  mouse.moved = false;
  mouse.sx = e.clientX;
  mouse.sy = e.clientY;
  mouse.cx = camera.x;
  mouse.cy = camera.y;
});

canvas.addEventListener("pointermove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  hovered = screenToTile(e.clientX, e.clientY);
  if (mouse.down) {
    const dx = e.clientX - mouse.sx;
    const dy = e.clientY - mouse.sy;
    if (Math.hypot(dx, dy) > 4) mouse.moved = true;
    camera.x = mouse.cx + dx;
    camera.y = mouse.cy + dy;
  }
});

canvas.addEventListener("pointerup", e => {
  mouse.down = false;
  if (!mouse.moved) build(screenToTile(e.clientX, e.clientY));
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

ui.pauseBtn.addEventListener("click", () => {
  paused = !paused;
  ui.pauseBtn.textContent = paused ? "再開" : "停止";
});

ui.roundBtn.addEventListener("click", () => {
  state.round++;
  state.day++;
  state.money += 700 + state.round * 180 + Math.round(state.happy * 8);
  state.clean = clamp(state.clean + 8 - state.guests.length * .12, 35, 100);
  for (const t of state.tiles) t.litter *= .35;
  toast(`ラウンド ${state.round} を開園しました`);
});

ui.saveBtn.addEventListener("click", saveGame);
ui.loadBtn.addEventListener("click", loadGame);

window.addEventListener("keydown", e => {
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
computeStats();
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
    const p = iso(x + .5, y + .5);
    return { x: p.x, y: p.y + TILE_H * .5 * camera.zoom };
  },
  summary() {
    return {
      money: Math.round(state.money),
      happy: Math.round(state.happy),
      clean: Math.round(state.clean),
      guests: state.guests.length,
      queue: state.rides.reduce((sum, r) => sum + r.queue.length, 0),
      rides: state.rides.length,
      buses: state.buses.length,
      busStops: busStops().length,
      paths: state.tiles.filter(t => t.path).length,
      scenery: sceneryScore()
    };
  },
  saveGame,
  loadGame
};
requestAnimationFrame(loop);
