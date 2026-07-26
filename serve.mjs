import http from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 5177);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png"
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const clean = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  const path = join(root, clean === "/" ? "index.html" : clean);
  if (!path.startsWith(root) || !existsSync(path)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  res.writeHead(200, { "Content-Type": types[extname(path)] || "application/octet-stream" });
  createReadStream(path).pipe(res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Isle of Wonder running at http://127.0.0.1:${port}/`);
});
