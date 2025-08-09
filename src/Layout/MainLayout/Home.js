import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaShieldAlt,
  FaTachometerAlt,
  FaUserShield,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import "../../App.css";

const backgroundImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1486308510493-cb52e9e08f63?auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1470&q=80",
];

const Home = () => {
  const navigate = useNavigate();
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 10000); // change every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => {
    setBgIndex((prev) => (prev === 0 ? backgroundImages.length - 1 : prev - 1));
  };

  const goNext = () => {
    setBgIndex((prev) => (prev + 1) % backgroundImages.length);
  };

  return (
    <div className="home-hero">
      <section
        className="hero"
        style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Simplify Property Management</h1>
          <p className="hero-subtitle">
            A secure and efficient solution for Admins & Owners to manage housing details.
          </p>
        </div>

        {/* Arrows */}
        <button className="hero-arrow left" onClick={goPrev} aria-label="Previous Image">
          <FaArrowLeft />
        </button>
        <button className="hero-arrow right" onClick={goNext} aria-label="Next Image">
          <FaArrowRight />
        </button>
      </section>

      {/* Call-to-Actions (Modern Layout) */}
      <section className="cta-grid">
        <div className="cta-card">
          <h3>Start Managing</h3>
          <p>Access your dashboard and manage all housing data efficiently.</p>
          <button className="cta-btn primary" onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>

        <div className="cta-card">
          <h3>New Here?</h3>
          <p>Create an account to get started as an Admin or Owner today.</p>
          <button className="cta-btn outline" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>

        <div className="cta-card">
          <h3>Learn More</h3>
          <p>Discover our mission and what drives SSHousing forward.</p>
          <button className="cta-btn outline" onClick={() => navigate("/about")}>
            About Us
          </button>
        </div>

        <div className="cta-card">
          <h3>Our Services</h3>
          <p>Explore the features and benefits available to our users.</p>
          <button className="cta-btn outline" onClick={() => navigate("/service")}>
            Services
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2 className="section-heading">Features Built for You</h2>
        <div className="features-grid">
          <div className="feature-box">
            <FaShieldAlt className="feature-icon" />
            <h3>Secure Login</h3>
            <p>Multi-role authentication for Admins and Owners with JWT protection.</p>
          </div>
          <div className="feature-box">
            <FaTachometerAlt className="feature-icon" />
            <h3>Powerful Dashboard</h3>
            <p>Admin panel for managing roles, countries, states, and districts.</p>
          </div>
          <div className="feature-box">
            <FaUserShield className="feature-icon" />
            <h3>Owner Access</h3>
            <p>Manage listings and view analytics with a modern UI for property owners.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>Trusted by Property Managers</h2>
        <div className="testimonial-box">
          <p>"SSHousing has made our housing operations seamless and secure."</p>
          <strong>- Mr. Avijit Gorai, Real Estate Admin</strong>
        </div>
      </section>
    </div>
  );
};

export default Home;
