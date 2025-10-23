const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== MongoDB Connection =====
mongoose.connect("mongodb://127.0.0.1:27017/userdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// ===== User Schema =====
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// ===== Routes =====

// Get all users (with search/filter/sort)
app.get("/api/users", async (req, res) => {
  try {
    let query = {};
    if (req.query.gender) query.gender = req.query.gender;
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ];
    }

    let users = await User.find(query);

    // Sorting
    if (req.query.sortBy) {
      const order = req.query.sortOrder === "desc" ? -1 : 1;
      users = users.sort((a, b) => {
        if (a[req.query.sortBy] < b[req.query.sortBy]) return -1 * order;
        if (a[req.query.sortBy] > b[req.query.sortBy]) return 1 * order;
        return 0;
      });
    }

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a user
app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user
app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user
app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
