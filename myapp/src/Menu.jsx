
import React, { useState } from 'react';
import './App.css';

import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import heroImage from '/public/banner-right-image.png';
import girlImage from '/public/about-left-image.png';
import icon1 from '/public/service-icon-01.png';
import icon2 from '/public/service-icon-02.png';
import icon3 from '/public/service-icon-03.png';
import icon4 from '/public/service-icon-04.png';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header className="main-header">
        <Container className="d-flex justify-content-between align-items-center py-2 px-4">
          <div className="logo">
            <span className="spac">SPAC</span><span className="dyna">DYNA</span>
          </div>

          <div className="d-none d-lg-flex align-items-center gap-4">
            <ul className="desktop-menu d-flex align-items-center gap-4 m-0">
              <li><a href="#scrollspyHeading1" className="active">Home</a></li>
              <li><a href="#scrollspyHeading2">About Us</a></li>
              <li><a href="#scrollspyHeading3">Services</a></li>
              <li><a href="#scrollspyHeading4">Portfolio</a></li>
              <li><a href="#scrollspyHeading5">Blog</a></li>
              <li><a href="#scrollspyHeading6">Message Us</a></li>
            </ul>
            <a href="#scrollspyHeading7" className="contact-btn">Contact Now</a>
          </div>

          <div className="menu-toggle d-lg-none" onClick={toggleMenu}>
            {menuOpen ? '✖' : '☰'}
          </div>
        </Container>

        {menuOpen && (
          <nav className="mobile-menu d-lg-none">
            <ul>
              <li><a href="#scrollspyHeading1">Home</a></li>
              <li><a href="#scrollspyHeading2">About Us</a></li>
              <li><a href="#scrollspyHeading3">Services</a></li>
              <li><a href="#scrollspyHeading4">Portfolio</a></li>
              <li><a href="#scrollspyHeading5">Blog</a></li>
              <li><a href="#scrollspyHeading6">Message Us</a></li>
              <li><a href="#scrollspyHeading7" className="contact-btn">Contact Now</a></li>
            </ul>
          </nav>
        )}
      </header>

      <div className="scrollspy-example" tabIndex="0">
        <section id="scrollspyHeading1" className="hero">
          <div className="shape-left"></div>
          <div className="shape-right"></div>
          <Container className="hero-content">
            <div className="row align-items-center">
              <div className="col-md-6 text-md-start text-center">
                <p className="tagline">WELCOME TO SPACE DYNAMIC</p>
                <h1>
                  We Make <span className="blue">Digital Ideas</span><br />
                  & <span className="red">SEO</span> Marketing
                </h1>
                <p className="description">
                  Space Dynamic is a professional looking HTML template using Bootstrap 5.<br />
                  This CSS template is free for you provided by <a href="#">TemplateMo</a>.
                </p>
                <Form className="d-flex justify-content-md-start justify-content-center mt-4">
                  <Form.Control type="text" placeholder="Your website URL..." className="me-2 w-50" />
                  <Button type="submit" variant="danger">Analyze Site</Button>
                </Form>
              </div>

              <div className="col-md-6 text-center mt-4 mt-md-0">
                <img src={heroImage} alt="Hero" className="img-fluid hero-image" />
              </div>
            </div>
          </Container>
        </section>

        <section className="features-section">
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <img src={girlImage} alt="Illustration" className="img-fluid feature-image" />
              </Col>
              <Col md={6}>
                <Row className="gy-4">
                  <Col sm={6}>
                    <div className="feature-box">
                      <img src={icon1} alt="Data Analysis" />
                      <h5>Data Analysis</h5>
                      <p>Lorem ipsum dolor sit amet, ctetur aoi adipiscing eliter</p>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="feature-box">
                      <img src={icon2} alt="Data Reporting" />
                      <h5>Data Reporting</h5>
                      <p>Lorem ipsum dolor sit amet, ctetur aoi adipiscing eliter</p>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="feature-box">
                      <img src={icon3} alt="Web Analytics" />
                      <h5>Web Analytics</h5>
                      <p>Lorem ipsum dolor sit amet, ctetur aoi adipiscing eliter</p>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="feature-box">
                      <img src={icon4} alt="SEO Suggestions" />
                      <h5>SEO Suggestions</h5>
                      <p>Lorem ipsum dolor sit amet, ctetur aoi adipiscing eliter</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default App;