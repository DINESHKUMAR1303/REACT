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
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data || '[]');
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// =============================
// HTML Template for Menu
// =============================
function renderMenu() {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CRUD Menu</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f7f8fa;
        padding: 40px;
        text-align: center;
        color: #333;
      }
      h1 {
        color: #444;
      }
      .menu {
        background: #fff;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        display: inline-block;
        width: 400px;
        text-align: left;
      }
      .section {
        margin-bottom: 25px;
      }
      label {
        display: block;
        margin: 8px 0 5px;
        font-weight: bold;
      }
      input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
      button {
        background: #007bff;
        border: none;
        color: white;
        padding: 8px 14px;
        margin-top: 10px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }
      button:hover {
        background: #0056b3;
      }
      pre {
        text-align: left;
        background: #eee;
        padding: 10px;
        border-radius: 6px;
        font-size: 14px;
        max-height: 200px;
        overflow-y: auto;
      }
      hr {
        margin: 25px 0;
      }
    </style>
  </head>
  <body>
    <h1>📋 JSON CRUD Menu</h1>
    <div class="menu">
      <div class="section">
        <h3>👥 Read All Users</h3>
        <button onclick="readAll()">Read</button>
        <pre id="all"></pre>
      </div>
      <hr>
      <div class="section">
        <h3>🔍 Read User by ID</h3>
        <label>ID:</label>
        <input type="number" id="readId" />
        <button onclick="readById()">Read User</button>
        <pre id="single"></pre>
      </div>
      <hr>
      <div class="section">
        <h3>➕ Add New User</h3>
        <label>ID:</label><input type="number" id="addId" />
        <label>Name:</label><input type="text" id="addName" />
        <label>Age:</label><input type="number" id="addAge" />
        <button onclick="addUser()">Add User</button>
        <p id="addMsg"></p>
      </div>
      <hr>
      <div class="section">
        <h3>❌ Delete User</h3>
        <label>ID:</label>
        <input type="number" id="deleteId" />
        <button onclick="deleteUser()">Delete</button>
        <p id="deleteMsg"></p>
      </div>
    </div>

    <script>
      async function readAll() {
        const res = await fetch('/read');
        const data = await res.json();
        document.getElementById('all').innerText = JSON.stringify(data, null, 2);
      }

      async function readById() {
        const id = document.getElementById('readId').value;
        if (!id) return alert('Please enter an ID');
        const res = await fetch('/read/' + id);
        if (res.ok) {
          const data = await res.json();
          document.getElementById('single').innerText = JSON.stringify(data, null, 2);
        } else {
          document.getElementById('single').innerText = 'User not found';
        }
      }

      async function addUser() {
        const id = document.getElementById('addId').value;
        const name = document.getElementById('addName').value;
        const age = document.getElementById('addAge').value;
        if (!id || !name || !age) return alert('All fields are required!');
        const res = await fetch('/write?id=' + id + '&name=' + name + '&age=' + age);
        document.getElementById('addMsg').innerText = await res.text();
      }

      async function deleteUser() {
        const id = document.getElementById('deleteId').value;
        if (!id) return alert('Please enter an ID');
        const res = await fetch('/delete?id=' + id);
        document.getElementById('deleteMsg').innerText = await res.text();
      }
    </script>
  </body>
  </html>
  `;
}

// =============================
// HTTP Server Routes
// =============================
const server = http.createServer((req, res) => {
  const parsedUrl = urlModule.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Home → redirect to menu
  if (pathname === '/' && req.method === 'GET') {
    res.writeHead(302, { Location: '/menu' });
    return res.end();
  }

  // Menu page
  if (pathname === '/menu' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(renderMenu());
  }

  // Read all
  if (pathname === '/read' && req.method === 'GET') {
    const data = readData();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(data));
  }

  // Read by ID
  if (pathname.startsWith('/read/') && req.method === 'GET') {
    const id = parseInt(pathname.split('/')[2]);
    const data = readData();
    const user = data.find(u => u.id === id);
    res.writeHead(user ? 200 : 404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(user || { error: 'User not found' }));
  }

  // Write user
  if (pathname === '/write' && req.method === 'GET') {
    const id = query.id ? parseInt(query.id) : null;
    const name = query.name;
    const age = query.age ? parseInt(query.age) : null;

    if (!id || !name || !age) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Missing or invalid parameters');
    }

    const data = readData();
    if (data.find(u => u.id === id)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('ID already exists');
    }

    data.push({ id, name, age });
    writeData(data);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('✅ Successfully written!');
  }

  // Delete user
  if (pathname === '/delete' && req.method === 'GET') {
    const id = query.id ? parseInt(query.id) : null;
    if (!id) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Missing ID');
    }

    const data = readData();
    const index = data.findIndex(u => u.id === id);
    if (index === -1) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('User not found');
    }

    data.splice(index, 1);
    writeData(data);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('✅ User deleted successfully!');
  }

  // Route not found
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Route not found');
});

// =============================
// Start Server
// =============================
server.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}/menu`);
});
