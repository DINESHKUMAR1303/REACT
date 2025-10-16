const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 2831;

mongoose
  .connect("mongodb://localhost:27017/students", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected to 'students' Database"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  role: String,
});
const User = mongoose.model("User", userSchema);

// Home
app.get("/", (req, res) => {
  res.send("Welcome to MongoDB + Express FS Backend!");
});

// Add New User via GET
app.get("/write", async (req, res) => {
  const { id, name, email, role } = req.query;

  if (!id || !name || !email || !role) {
    return res.status(400).send("Missing id, name, email, or role!");
  }

  const exists = await User.findOne({ id: parseInt(id) });
  if (exists) {
    return res.status(400).send("User ID already exists!");
  }

  const newUser = new User({
    id: parseInt(id),
    name,
    email,
    role,
  });

  await newUser.save();

  res.send(`
    User added successfully!<br><br>
    <b>ID:</b> ${id}<br>
    <b>Name:</b> ${name}<br>
    <b>Email:</b> ${email}<br>
    <b>Role:</b> ${role}
  `);
});

// Update User via GET
app.get("/update", async (req, res) => {
  const { id, name, email, role } = req.query;

  if (!id) {
    return res.status(400).send("Missing user ID!");
  }

  const user = await User.findOne({ id: parseInt(id) });
  if (!user) {
    return res.status(404).send("User not found!");
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;

  await user.save();

  res.send(`
    User updated successfully!<br><br>
    <b>ID:</b> ${user.id}<br>
    <b>Name:</b> ${user.name}<br>
    <b>Email:</b> ${user.email}<br>
    <b>Role:</b> ${user.role}
  `);
});

// Delete User via GET
app.get("/delete", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("Missing user ID!");
  }

  const deleted = await User.findOneAndDelete({ id: parseInt(id) });
  if (!deleted) {
    return res.status(404).send("User not found!");
  }

  res.send(`User with ID ${id} deleted successfully!`);
});

// Get All Users (search, filter, sort)
app.get("/users", async (req, res) => {
  let { search, sort, filter } = req.query;
  let query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  if (filter) query.role = filter;

  let users = await User.find(query);

  if (sort === "name") users.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "id") users.sort((a, b) => a.id - b.id);

  res.json({ users });
});

// Get Single User by ID
app.get("/users/:id", async (req, res) => {
  const user = await User.findOne({ id: parseInt(req.params.id) });
  if (!user) return res.status(404).send("User not found!");
  res.json(user);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
