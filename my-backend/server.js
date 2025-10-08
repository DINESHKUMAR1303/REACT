const http = require('http');
const fs = require('fs');
const path = require('path');
const urlModule = require('url');

const PORT = 2831;
const filePath = path.join(__dirname, 'data.json');

// =============================
// Helper Functions
// =============================
function readData() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data || '[]');
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// =============================
// HTTP Server
// =============================
const server = http.createServer((req, res) => {
  const parsedUrl = urlModule.parse(req.url, true); // parse query params
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Home
  if (pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Welcome to Backend Page with JSON FS!');
  }

  // Read all users
  if (pathname === '/read' && req.method === 'GET') {
    const data = readData();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(data));
  }

  // Read single user by ID
  if (pathname.startsWith('/read/') && req.method === 'GET') {
    const id = parseInt(pathname.split('/')[2]);
    const data = readData();
    const user = data.find(u => u.id === id);
    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('User not found');
    }
  }

  // Write new user via query params
  // Example: /write?id=1&name=Dinesh&age=25
  if (pathname === '/write' && req.method === 'GET') {
    const id = query.id ? parseInt(query.id) : null;
    const name = query.name;
    const age = query.age ? parseInt(query.age) : null;

    if (!id || !name || !age) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Missing or invalid parameters');
    }

    const data = readData();

    // Check if ID already exists
    if (data.find(u => u.id === id)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('ID already exists');
    }

    const newUser = { id, name, age };
    data.push(newUser);
    writeData(data);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Successfully written');
  }

  // Route not found
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Route not found');
});

// =============================
// Start Server
// =============================
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
