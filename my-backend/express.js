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
  res.send('Welcome to Backend!');
});

// ===== Read all users =====
app.get('/read', (req, res) => {
  const data = readData();
  const { search, sort, order, ...filters } = req.query;

  let filteredData = data;

  // Search by name/email
  if (search) {
    filteredData = filteredData.filter(
      u =>
        (u.name && u.name.toLowerCase().includes(search.toLowerCase())) ||
        (u.email && u.email.toLowerCase().includes(search.toLowerCase()))
    );
  }

  // Filter by other query parameters
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

// ===== Add user via POST JSON =====
app.post('/write', (req, res) => {
  const { name, age, email, id } = req.body;

  if (!name) return res.status(400).json({ message: 'Name is required' });

  const data = readData();
  const newId = id ? parseInt(id) : (data.length ? Math.max(...data.map(u => u.id)) + 1 : 1);

  if (data.some(u => u.id === newId)) return res.status(400).json({ message: 'ID already exists' });

  const newUser = { id: newId, name, age: age || null, email: email || null };
  data.push(newUser);
  writeData(data);

  res.json({ message: 'User added successfully!', user: newUser });
});

// ===== Add user via GET query (Browser-friendly) =====
app.get('/write', (req, res) => {
  const { id, name, age, email } = req.query;

  if (!name) return res.status(400).send('Name is required');

  const data = readData();
  const newId = id ? parseInt(id) : (data.length ? Math.max(...data.map(u => u.id)) + 1 : 1);

  if (data.some(u => u.id === newId)) return res.status(400).send('ID already exists');

  const newUser = { id: newId, name, age: age ? parseInt(age) : null, email: email || null };
  data.push(newUser);
  writeData(data);

  res.send(`User added successfully! ID: ${newId}, Name: ${name}`);
});

// ===== Update user via PUT (Postman/curl) =====
app.put('/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age, email } = req.body;

  const data = readData();
  const index = data.findIndex(u => u.id === id);

  if (index === -1) return res.status(404).json({ message: 'User not found' });

  if (name !== undefined) data[index].name = name;
  if (age !== undefined) data[index].age = age;
  if (email !== undefined) data[index].email = email;

  writeData(data);
  res.json({ message: 'User updated successfully!', user: data[index] });
});

// ===== Update user via GET query (Browser-friendly) =====
app.get('/update', (req, res) => {
  const { id, name, age, email } = req.query;
  if (!id) return res.status(400).send('ID is required');

  const data = readData();
  const index = data.findIndex(u => u.id === parseInt(id));
  if (index === -1) return res.status(404).send('User not found');

  if (name) data[index].name = name;
  if (age) data[index].age = parseInt(age);
  if (email) data[index].email = email;

  writeData(data);
  res.send(`User ID ${id} updated successfully!`);
});

// ===== Delete user via DELETE (Postman/curl) =====
app.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const data = readData();
  const index = data.findIndex(u => u.id === id);

  if (index === -1) return res.status(404).json({ message: 'User not found' });

  data.splice(index, 1); // remove the user
  writeData(data);

  res.json({ message: 'User deleted successfully!' });
});

// ===== Delete user via GET query (Browser-friendly) =====
app.get('/delete', (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).send('ID is required');

  const data = readData();
  const index = data.findIndex(u => u.id === parseInt(id));
  if (index === -1) return res.status(404).send('User not found');

  data.splice(index, 1); // remove the user
  writeData(data);

  res.send(`User ID ${id} deleted successfully!`);
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`✅ Express server running at http://localhost:${PORT}`);
});
