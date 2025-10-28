import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("login");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

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

  const showForm = (form) => setActiveTab(form);

  // === Handle Input Changes ===
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    const { name, value, files } = e.target;
    setSignupForm({ ...signupForm, [name]: files ? files[0] : value });
  };

  // === VALIDATION HELPERS ===
  const validateLogin = () => {
    let tempErrors = {};
    if (!loginForm.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginForm.email))
      tempErrors.email = "Invalid email format";
    if (!loginForm.password) tempErrors.password = "Password is required";
    else if (loginForm.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";
    return tempErrors;
  };

  const validateSignup = () => {
    let tempErrors = {};

    if (!signupForm.name.trim()) tempErrors.name = "Full name is required";

    if (!signupForm.phone) tempErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(signupForm.phone))
      tempErrors.phone = "Enter a valid 10-digit phone number";

    if (!signupForm.dob) tempErrors.dob = "Date of birth is required";

    if (!signupForm.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupForm.email))
      tempErrors.email = "Invalid email format";

    if (!signupForm.password) tempErrors.password = "Password is required";
    else if (signupForm.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters long";
    else if (!/\d/.test(signupForm.password))
      tempErrors.password = "Password must contain at least one number";

    if (!signupForm.qualification)
      tempErrors.qualification = "Select a qualification";

    if (!signupForm.file) tempErrors.file = "Please upload a photo";

    if (!agreeTerms)
      tempErrors.agreeTerms = "You must agree to the terms and conditions";

    return tempErrors;
  };

  // === LOGIN SUBMIT ===
  const handleLoginSubmit = async () => {
    const validationErrors = validateLogin();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      alert("Please fix login errors before continuing");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", loginForm);
      alert(res.data.message);
      console.log("Logged in user:", res.data.user);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  // === SIGNUP SUBMIT ===
  const handleSignupSubmit = async () => {
    const validationErrors = validateSignup();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      alert("Please fix signup errors before continuing");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(signupForm).forEach(([key, value]) => {
        formData.append(key, value);
      });

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
      setErrors({});
      setActiveTab("login");
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

        {/* === LOGIN FORM === */}
        {activeTab === "login" && (
          <div className="form active">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="example@mail.com"
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
                placeholder="Enter password"
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </div>

            <div className="forgot">Forgot Password?</div>

            <button className="btn" onClick={handleLoginSubmit}>
              Login Now
            </button>
          </div>
        )}

        {/* === SIGNUP FORM === */}
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
                placeholder="0000000000"
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
                placeholder="example@mail.com"
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
                placeholder="Enter password"
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
              {errors.qualification && (
                <p className="error">{errors.qualification}</p>
              )}
            </div>

            <div className="form-group">
              <label>Passport Size Photo</label>
              <input type="file" name="file" onChange={handleSignupChange} />
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
