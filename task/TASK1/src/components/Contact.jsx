import React from "react";
import "../App.css";

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-subtitle">
          We’d love to hear from you! Reach out to us through any of the options below.
        </p>

        <div className="contact-info">
          <div className="contact-card">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <p>support@foodiehub.com</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-phone-alt"></i>
            <h3>Phone</h3>
            <p>+91 9876543210</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Address</h3>
            <p>123 Food Street, Chennai, India</p>
          </div>
        </div>

        <div className="contact-form">
          <h3>Send us a message</h3>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="4" required></textarea>
            <button type="submit" className="btn primary-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
