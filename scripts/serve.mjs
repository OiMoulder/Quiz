import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';

const root = process.cwd();
const indexPath = resolve(root, 'index.html');
const allowedDirectories = ['src', 'public'].map(name => resolve(root, name) + sep);
const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml']
]);

function mimeType(filePath) {
  const extension = filePath.slice(filePath.lastIndexOf('.'));
  return contentTypes.get(extension) ?? 'application/octet-stream';
}

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end('Method not allowed');
    return;
  }

  let filePath;
  try {
    const url = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    filePath = pathname === '/'
      ? indexPath
      : resolve(root, `.${pathname}`);

    if (filePath !== indexPath && !allowedDirectories.some(directory => filePath.startsWith(directory))) {
      response.writeHead(404).end('Not found');
      return;
    }

    const content = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': mimeType(filePath),
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    if (error.code === 'ENOENT' || error instanceof URIError) {
      response.writeHead(404).end('Not found');
      return;
    }
    console.error(`Unable to serve ${filePath ?? request.url}`, error);
    response.writeHead(500).end('Internal server error');
  }
});

const port = Number(process.env.PORT ?? 4173);
server.listen(port, '127.0.0.1', () => {
  console.log(`QuizMaster available at http://127.0.0.1:${port}`);
});
