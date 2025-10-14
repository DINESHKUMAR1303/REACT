const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 2831;
const filePath = path.join(__dirname, 'data.json');

// Middleware to parse JSON bodies
app.use(express.json());

// ===== Helper Functions =====
function readData() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data || '[]');
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ===== Home =====
app.get('/', (req, res) => {
  res.send('Welcome to Backend !');
});

// ===== Read all users =====
app.get('/read', (req, res) => {
  const data = readData();
  const { search, sort, order, ...filters } = req.query;

  let filteredData = data;

  // Search by name or email
  if (search) {
    filteredData = filteredData.filter(
      u =>
        (u.name && u.name.toLowerCase().includes(search.toLowerCase())) ||
        (u.email && u.email.toLowerCase().includes(search.toLowerCase()))
    );
  }

  // Filter by any other query parameters (like age)
  for (const key in filters) {
    filteredData = filteredData.filter(u => String(u[key]) === filters[key]);
  }

  // Sort
  if (sort) {
    const sortOrder = order === 'desc' ? -1 : 1;
    filteredData.sort((a, b) => {
      if (a[sort] < b[sort]) return -1 * sortOrder;
      if (a[sort] > b[sort]) return 1 * sortOrder;
      return 0;
    });
  }

  res.json(filteredData);
});

// ===== Read user by ID =====
app.get('/read/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const user = data.find(u => u.id === id);

  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// ===== Write (Add) user via POST JSON body =====
app.post('/write', (req, res) => {
  const { name, age, email, id } = req.body;

  if (!name) return res.status(400).json({ message: 'Name is required' });

  const data = readData();
  const newId = id ? parseInt(id) : (data.length ? Math.max(...data.map(u => u.id)) + 1 : 1);

  // Check for duplicate ID
  if (data.some(u => u.id === newId)) return res.status(400).json({ message: 'ID already exists' });

  const newUser = { id: newId, name, age: age || null, email: email || null };
  data.push(newUser);
  writeData(data);

  res.json({ message: '✅ User added successfully!', user: newUser });
});

// ===== Write (Add) user via GET query parameters =====
app.get('/write', (req, res) => {
  const { id, name, age, email } = req.query;

  if (!name) return res.status(400).send('Name is required');

  const data = readData();
  const newId = id ? parseInt(id) : (data.length ? Math.max(...data.map(u => u.id)) + 1 : 1);

  // Check for duplicate ID
  if (data.some(u => u.id === newId)) return res.status(400).send('ID already exists');

  const newUser = { id: newId, name, age: age ? parseInt(age) : null, email: email || null };
  data.push(newUser);
  writeData(data);

  res.send(`✅ User added successfully! ID: ${newId}, Name: ${name}`);
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`✅ Express server running at http://localhost:${PORT}`);
});
