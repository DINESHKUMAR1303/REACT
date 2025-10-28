import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    phone: "",
    dob: "",
    email: "",
    password: "",
    qualification: "highschool",
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [preview, setPreview] = useState(null);

  const showForm = (form) => setActiveTab(form);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setSignupForm({ ...signupForm, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setSignupForm({ ...signupForm, [name]: value });
    }
  };

  const validateLogin = () => {
    let temp = {};
    if (!loginForm.email) temp.email = "Email is required";
    if (!loginForm.password) temp.password = "Password is required";
    return temp;
  };

  const validateSignup = () => {
    let temp = {};
    if (!signupForm.name.trim()) temp.name = "Full name is required";
    if (!signupForm.phone) temp.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(signupForm.phone))
      temp.phone = "Enter a valid 10-digit phone number";
    if (!signupForm.dob) temp.dob = "Date of birth is required";
    if (!signupForm.email) temp.email = "Email is required";
    if (!signupForm.password) temp.password = "Password is required";
    if (!signupForm.file) temp.file = "Please upload a photo";
    if (!agreeTerms)
      temp.agreeTerms = "You must agree to the terms and conditions";
    return temp;
  };

  const handleLoginSubmit = async () => {
    const validationErrors = validateLogin();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await axios.post("http://localhost:5000/login", loginForm);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  const handleSignupSubmit = async () => {
    const validationErrors = validateSignup();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const formData = new FormData();
      Object.entries(signupForm).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const res = await axios.post("http://localhost:5000/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);
      setSignupForm({
        name: "",
        phone: "",
        dob: "",
        email: "",
        password: "",
        qualification: "highschool",
        file: null,
      });
      setAgreeTerms(false);
      setPreview(null);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <h1 className="title">NSCHOOL</h1>

        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => showForm("login")}
          >
            Log In
          </button>
          <button
            className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => showForm("signup")}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" && (
          <div className="form active">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <button className="btn" onClick={handleLoginSubmit}>
              Login
            </button>
          </div>
        )}

        {activeTab === "signup" && (
          <div className="form active">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={signupForm.name}
                onChange={handleSignupChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={signupForm.phone}
                onChange={handleSignupChange}
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={signupForm.dob}
                onChange={handleSignupChange}
              />
              {errors.dob && <p className="error">{errors.dob}</p>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={signupForm.email}
                onChange={handleSignupChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={signupForm.password}
                onChange={handleSignupChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label>Qualification</label>
              <select
                name="qualification"
                value={signupForm.qualification}
                onChange={handleSignupChange}
              >
                <option value="highschool">High School</option>
                <option value="intermediate">Intermediate</option>
                <option value="graduation">Graduation</option>
                <option value="postgraduation">Post Graduation</option>
              </select>
            </div>

            <div className="form-group">
              <label>Passport Size Photo</label>
              <input type="file" name="file" onChange={handleSignupChange} />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="preview-img"
                  width="100"
                />
              )}
              {errors.file && <p className="error">{errors.file}</p>}
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              I agree to the terms and conditions
            </div>
            {errors.agreeTerms && <p className="error">{errors.agreeTerms}</p>}

            <button className="btn" onClick={handleSignupSubmit}>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
