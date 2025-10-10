const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 2831;
const filePath = path.join(__dirname, 'data.json');

// ===== Helper Functions =====
function readData() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data || '[]');
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ===== Server =====
const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  // ===== Home =====
  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Welcome to Backend Page with JSON FS!');
  }

  // ===== MENU PAGE =====
  if (url === '/menu' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(`
      <html>
      <head>
        <title>Menu</title>
        <style>
          body { font-family: Arial; padding: 20px; background: #f8f8f8; }
          h1 { color: #333; }
          input, select, button { margin: 5px; padding: 6px; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; background: #fff; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #eee; }
          .url-box { background: #eee; padding: 8px; margin-top: 10px; border-radius: 6px; font-family: monospace; }
          .add-user { margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 6px; }
        </style>
      </head>
      <body>
        <h1> User Menu</h1>

        <!-- Search/Filter/Sort -->
        <div>
          <input id="search" placeholder="Search by name/email">
          <input id="filterAge" placeholder="Filter by age" type="number">
          <select id="sort">
            <option value="">Sort by...</option>
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="id">ID</option>
          </select>
          <select id="order">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button onclick="loadUsers()">Apply</button>
        </div>

        <div class="url-box" id="urlBox">Request: /read</div>

        <table id="userTable">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Age</th><th>Email</th></tr>
          </thead>
          <tbody></tbody>
        </table>

        <!-- Add User Form -->
        <div class="add-user">
          <h3>Add New User</h3>
          <input id="newName" placeholder="Name">
          <input id="newAge" type="number" placeholder="Age">
          <input id="newEmail" placeholder="Email">
          <button onclick="addUser()">Add User</button>
          <div id="addStatus"></div>
        </div>

        <script>
          async function loadUsers() {
            const search = document.getElementById('search').value;
            const age = document.getElementById('filterAge').value;
            const sort = document.getElementById('sort').value;
            const order = document.getElementById('order').value;

            let query = [];
            if (search) query.push('search=' + encodeURIComponent(search));
            if (age) query.push('age=' + encodeURIComponent(age));
            if (sort) query.push('sort=' + sort);
            if (order) query.push('order=' + order);

            const url = '/read' + (query.length ? '?' + query.join('&') : '');
            document.getElementById('urlBox').innerText = 'Request: ' + url;

            const res = await fetch(url);
            const users = await res.json();

            const tbody = document.querySelector('#userTable tbody');
            tbody.innerHTML = '';
            users.forEach(u => {
              const tr = document.createElement('tr');
              tr.innerHTML = '<td>' + u.id + '</td><td>' + (u.name || '-') + '</td><td>' + (u.age || '-') + '</td><td>' + (u.email || '-') + '</td>';
              tbody.appendChild(tr);
            });
          }

          async function addUser() {
            const name = document.getElementById('newName').value;
            const age = document.getElementById('newAge').value;
            const email = document.getElementById('newEmail').value;

            if (!name) {
              document.getElementById('addStatus').innerText = 'Name is required!';
              return;
            }

            // Build /write URL
            const url = '/write?name=' + encodeURIComponent(name) +
                        (age ? '&age=' + encodeURIComponent(age) : '') +
                        (email ? '&email=' + encodeURIComponent(email) : '');
            
            const res = await fetch(url);
            const text = await res.text();
            document.getElementById('addStatus').innerText = text;

            // Clear form
            document.getElementById('newName').value = '';
            document.getElementById('newAge').value = '';
            document.getElementById('newEmail').value = '';

            // Reload table
            loadUsers();
          }

          window.onload = loadUsers;
        </script>
      </body>
      </html>
    `);
  }

  // ===== READ all, search, sort, filter =====
  if (url.startsWith('/read') && method === 'GET') {
    const data = readData();
    const query = new URL(`http://localhost:${PORT}${url}`).searchParams;
    let filteredData = data;

    // SEARCH
    const search = query.get('search');
    if (search) {
      filteredData = filteredData.filter(
        u =>
          (u.name && u.name.toLowerCase().includes(search.toLowerCase())) ||
          (u.email && u.email.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // FILTER
    query.forEach((value, key) => {
      if (!['search', 'sort', 'order'].includes(key)) {
        filteredData = filteredData.filter(u => String(u[key]) === value);
      }
    });

    // SORT
    const sortKey = query.get('sort');
    const order = query.get('order') || 'asc';
    if (sortKey) {
      filteredData.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return order === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(filteredData));
  }

  // ===== READ by ID =====
  if (url.startsWith('/read/') && method === 'GET') {
    const id = parseInt(url.split('/')[2]);
    const data = readData();
    const user = data.find(u => u.id === id);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('User not found');
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(user));
  }

  // ===== WRITE =====
  if (url.startsWith('/write') && method === 'GET') {
    const params = new URL(`http://localhost:${PORT}${url}`).searchParams;
    const name = params.get('name');
    const age = parseInt(params.get('age')) || null;
    const email = params.get('email');

    if (!name) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Name is required');
    }

    const data = readData();
    const newUser = { id: data.length + 1, name, age, email };
    data.push(newUser);
    writeData(data);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('✅ Successfully written!');
  }

  // ===== Not Found =====
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Route not found');
});

// ===== Start Server =====
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
