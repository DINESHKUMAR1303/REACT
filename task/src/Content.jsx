import React, { useState } from "react";
import './App.css';

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        ></textarea>
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#007bff", color: "white", border: "none" }}>
          Send
        </button>
        {submitted && <p style={{ color: "green", marginTop: "10px" }}>Message sent!</p>}
      </form>
    </div>
  );
}

export default ContactForm;
