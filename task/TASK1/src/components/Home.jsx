import React from "react";
import Slider from "react-slick";
import heroImage from "../images/pizza.jpg";
import burgerImg from "../images/burger.jpg";
import pastaImg from "../images/pasta.jpg";
import saladImg from "../images/salad.jpg";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Taste the <span>Best</span> Food in Town
          </h1>
          <p>Fresh ingredients, delicious flavors, and quick delivery – all at your fingertips.</p>
          <div className="hero-buttons">
            <button className="btn primary-btn">Order Now</button>
            <button className="btn secondary-btn">View Menu</button>
          </div>
        </div>
        <div className="hero-image-container">
          <img src={heroImage} alt="Delicious Pizza" className="hero-image" />
        </div>
      </section>

      {/* Popular Foods */}
      <section className="popular-foods">
        <h2>Popular Foods</h2>
        <Slider {...settings} className="food-slider">
          <div className="food-card">
            <img src={heroImage} alt="Pizza" />
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
    </>
  );
};

export default Home;
