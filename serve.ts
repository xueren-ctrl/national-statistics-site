// Tiny static server for local development only. Serves app/ at / and the
// whole build directory beside it, so screenshots and files resolve too.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 8080);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');
  let path = url.pathname === '/' ? '/app/index.html' : url.pathname;
  if (path.startsWith('/app/')) path = path.slice(1);
  else if (path === '/app/index.html') path = 'app/index.html';
  else path = path.replace(/^\//, '');
  try {
    const data = await readFile(join(here, path));
    res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found: ' + path);
  }
});

server.listen(port, () => {
  console.log(`America by the Numbers at http://localhost:${port}/`);
});
