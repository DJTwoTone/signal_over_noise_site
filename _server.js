const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname);

const mime = {
  html: 'text/html', css: 'text/css', js: 'application/javascript',
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
  svg: 'image/svg+xml', webp: 'image/webp', woff2: 'font/woff2', ico: 'image/x-icon',
  pdf: 'application/pdf'
};

http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/scan' || url === '/scan/') {
    res.writeHead(301, { Location: '/toolkit/' });
    res.end();
    return;
  }
  if (url === '/packages' || url === '/packages/') {
    res.writeHead(301, { Location: '/services/' });
    res.end();
    return;
  }
  let filePath = path.join(root, url === '/' ? 'index.html' : url.endsWith('/') ? url + 'index.html' : url);
  if (!path.extname(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
    filePath = path.join(filePath, 'index.html');
  }
  const ext = path.extname(filePath).slice(1);
  const type = mime[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}).listen(8080, () => console.log('Server running at http://localhost:8080'));
