import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    name: '',
    phone: '',
    dob: '',
    email: '',
    password: '',
    qualification: 'highschool',
    file: null,
  });
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const showForm = (form) => setActiveTab(form);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    const { name, value, files } = e.target;
    setSignupForm({ ...signupForm, [name]: files ? files[0] : value });
  };

  // ===== Login Submit =====
  const handleLoginSubmit = async () => {
    if (!loginForm.email || !loginForm.password) {
      alert('Please fill in all login fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/login', loginForm);
      alert(res.data.message); // e.g., "Login successful"
      console.log('Logged in user:', res.data.user);

      // Optionally store user in localStorage or state for session
      // localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  // ===== Signup Submit =====
  const handleSignupSubmit = async () => {
    let newErrors = { name: '', phone: '' };
    if (!signupForm.name) newErrors.name = 'Full name is required';
    if (!signupForm.phone || !/^\d{10}$/.test(signupForm.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    setErrors(newErrors);

    if (!Object.values(newErrors).every((err) => !err)) {
      alert('Please fix the errors');
      return;
    }
    if (!agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', signupForm.name);
      formData.append('phone', signupForm.phone);
      formData.append('dob', signupForm.dob);
      formData.append('email', signupForm.email);
      formData.append('password', signupForm.password);
      formData.append('qualification', signupForm.qualification);
      if (signupForm.file) formData.append('file', signupForm.file);

      const res = await axios.post('http://localhost:5000/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(res.data.message); // "User registered successfully"
      setSignupForm({
        name: '',
        phone: '',
        dob: '',
        email: '',
        password: '',
        qualification: 'highschool',
        file: null,
      });
      setAgreeTerms(false);
      setErrors({ name: '', phone: '' });
      setActiveTab('login'); // Switch to login after successful signup
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
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => showForm('login')}
          >
            Log In
          </button>
          <button
            className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => showForm('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* ===== Login Form ===== */}
        {activeTab === 'login' && (
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

        {/* ===== Signup Form ===== */}
        {activeTab === 'signup' && (
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
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              I agree to the terms and conditions
            </div>
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
