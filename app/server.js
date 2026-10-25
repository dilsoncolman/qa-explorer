const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const appPath = path.join(__dirname, 'index.html');
const port = 4173;

const server = http.createServer((request, response) => {
  if (request.url !== '/') {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  fs.readFile(appPath, 'utf8', (error, html) => {
    if (error) {
      response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Could not load the Task Board app.');
      return;
    }

    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end(html);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Task Board running at http://127.0.0.1:${port}`);
});
