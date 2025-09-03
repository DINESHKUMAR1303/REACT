import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import pizza from "../images/pizza.jpg";
import burgerImg from "../images/burger.jpg";
import pastaImg from "../images/pasta.jpg";
import saladImg from "../images/salad.jpg";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    centerMode: true,
    centerPadding: "40px",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: "30px" } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "20px" } }
    ]
  };

  return (
    <div className="home-wrapper">

      {/* ✅ Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>
            Taste the <span>Best</span> Food in Town
          </h1>
          <p>
            Fresh ingredients, delicious flavors, and quick delivery – all at your fingertips.
          </p>
          <div className="hero-buttons">
            <button className="btn primary-btn">Order Now</button>
            <button className="btn secondary-btn" onClick={() => navigate("/menu")}>
              View Menu
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="features-section">
        <div className="feature">
          <h3>🚀 Fast Delivery</h3>
          <p>Your favorite meals delivered in under 30 minutes.</p>
        </div>
        <div className="feature">
          <h3>🥗 Fresh Ingredients</h3>
          <p>Only the best and freshest ingredients for every dish.</p>
        </div>
        <div className="feature">
          <h3>⭐ Premium Quality</h3>
          <p>Handcrafted recipes made with love by top chefs.</p>
        </div>
      </section>

      {/* ✅ Popular Foods Section */}
      <section className="popular-foods">
        <h2>Popular Foods</h2>
        <Slider {...settings} className="food-slider">
          <div className="food-card">
            <img src={pizza} alt="Pizza" />
            <h3>Pizza</h3>
            <p>Cheesy and loaded with toppings.</p>
          </div>
          <div className="food-card">
            <img src={burgerImg} alt="Burger" />
            <h3>Burger</h3>
            <p>Juicy patty with fresh veggies.</p>
          </div>
          <div className="food-card">
            <img src={pastaImg} alt="Pasta" />
            <h3>Pasta</h3>
            <p>Rich and creamy Italian flavors.</p>
          </div>
          <div className="food-card">
            <img src={saladImg} alt="Salad" />
            <h3>Salad</h3>
            <p>Healthy and refreshing choice.</p>
          </div>
        </Slider>
      </section>

      {/* ✅ Special Offer Section */}
      <section className="special-offer">
        <h2>🔥 Special Offer</h2>
        <p>
          Get <span>20% OFF</span> on your first order! Use code <b>FOODIE20</b>.
        </p>
        <button className="btn primary-btn">Claim Offer</button>
      </section>

      {/* ✅ Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>"Absolutely the best pizza I’ve had in years. Fast delivery too!"</p>
            <h4>- Priya</h4>
          </div>
          <div className="testimonial">
            <p>"The burgers are juicy and the pasta is heavenly. Highly recommend!"</p>
            <h4>- Arjun</h4>
          </div>
          <div className="testimonial">
            <p>"Fresh, tasty, and quick. This is my go-to food app."</p>
            <h4>- Sneha</h4>
          </div>
        </div>
      </section>

      {/* ✅ Call to Action */}
      <section className="cta-banner">
        <h2>Ready to Taste Happiness?</h2>
        <p>Order now and enjoy the premium dining experience at home.</p>
        <button className="btn primary-btn" onClick={() => navigate("/menu")}>
          Explore Menu
        </button>
      </section>
    </div>
  );
};

export default Home;
