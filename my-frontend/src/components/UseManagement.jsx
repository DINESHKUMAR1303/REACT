import React, { useEffect, useState } from "react";
import axios from "axios";

import "./UseManagement.css";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", gender: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        params: { search, gender: genderFilter, sortBy, sortOrder }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => { fetchUsers(); }, [search, genderFilter, sortBy, sortOrder]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/users/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/users", formData);
      }
      setFormData({ name: "", email: "", phone: "", gender: "" });
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleEdit = user => {
    setEditId(user._id);
    setFormData({ name: user.name, email: user.email, phone: user.phone, gender: user.gender });
  };

  const handleDelete = async id => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <div className="container">
      <h2>User Management</h2>

      <form onSubmit={handleSubmit} className="form">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required/>
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required/>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <button type="submit">{editId ? "Update User" : "Add User"}</button>
      </form>

      <div className="controls">
        <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
        <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
          <option value="">All Genders</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="createdAt">Created At</option>
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id}>
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.gender}</td>
                <td>
                  <button onClick={() => handleEdit(u)}>Edit</button>
                  <button onClick={() => handleDelete(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
