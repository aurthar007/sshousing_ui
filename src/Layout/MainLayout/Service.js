import React, { useState, useEffect } from "react";
import {
  FaHouseUser,
  FaBuilding,
  FaCogs,
  FaUsers,
  FaChartLine,
  FaPhoneAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../../App.css";

const services = [
  {
    icon: FaHouseUser,
    title: "Property Management",
    description:
      "Comprehensive management of residential and commercial properties ensuring maximum ROI and tenant satisfaction.",
  },
  {
    icon: FaBuilding,
    title: "Facility Maintenance",
    description:
      "Timely and professional maintenance services keeping properties in pristine condition with minimal disruptions.",
  },
  {
    icon: FaCogs,
    title: "Technical Support",
    description:
      "24/7 technical assistance with smart home integrations, security systems, and IoT device management.",
  },
  {
    icon: FaUsers,
    title: "Tenant Relations",
    description:
      "Fostering positive tenant relations through transparent communication and swift conflict resolution.",
  },
  {
    icon: FaChartLine,
    title: "Market Analytics",
    description:
      "Real-time market data and trends to make informed investment and leasing decisions.",
  },
  {
    icon: FaPhoneAlt,
    title: "Customer Support",
    description:
      "Dedicated support team ready to assist landlords, tenants, and service providers anytime.",
  },
];

const testimonials = [
  {
    name: "Emily R.",
    role: "Tenant",
    text: "The property management team is always responsive and proactive. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Michael T.",
    role: "Property Owner",
    text: "Thanks to their maintenance and tenant relations services, my properties have never been better.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Sophia L.",
    role: "Facility Manager",
    text: "Excellent technical support and seamless integrations keep everything running smoothly.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const Services = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="service-page premium">
      {/* HERO */}
      <section className="service-hero premium-hero">
        <div className="overlay-gradient" />
        <motion.div
          className="service-hero-content"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Transforming Property Management</h1>
          <p>
            Discover how our cutting-edge services elevate property management to new heights.
          </p>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 12px #f39c12" }}
            className="btn-gradient"
            onClick={() => (window.location.href = "/contact")}
          >
            Get Started
          </motion.button>
        </motion.div>
        <svg
          className="section-divider"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L48,197.3C96,171,192,117,288,106.7C384,96,480,128,576,144C672,160,768,160,864,170.7C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* SERVICES GRID */}
      <section className="service-grid-section">
        <h2 className="section-title premium-title">Our Premium Services</h2>
        <div className="service-grid">
          {services.map(({ icon: Icon, title, description }, idx) => (
            <motion.div
              key={idx}
              className="service-card premium-card"
              whileHover={{
                scale: 1.07,
                boxShadow: "0 12px 25px rgba(243,156,18,0.4)",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                delay: idx * 0.15,
              }}
            >
              <Icon className="service-icon pulse" size={48} />
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section premium-testimonials">
        <h2 className="section-title premium-title">What Our Clients Say</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={testimonialIndex}
            className="testimonial-card"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            <img
              className="testimonial-avatar"
              src={testimonials[testimonialIndex].avatar}
              alt={testimonials[testimonialIndex].name}
            />
            <p className="testimonial-text">
              "{testimonials[testimonialIndex].text}"
            </p>
            <h4>{testimonials[testimonialIndex].name}</h4>
            <span className="testimonial-role">
              {testimonials[testimonialIndex].role}
            </span>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* CTA SECTION */}
      <section className="service-cta premium-cta">
        <motion.div
          className="service-cta-box"
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px #f39c12" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Ready to Elevate Your Property?</h3>
          <p>
            Join the leaders in smart housing management and unlock your property's full potential.
          </p>
          <motion.button
            className="btn-gradient"
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px #f39c12" }}
            onClick={() => (window.location.href = "/register")}
          >
            Register Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
