import React from "react";

export default function Contact() {
  return (
    <section className="section">
      <h1>Contact Us</h1>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit" className="btn-primary">Send Message</button>
      </form>
    </section>
  );
}
