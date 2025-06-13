import React from "react";
import { FaBuilding, FaUsers, FaHandshake, FaLaptopCode, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import "../../App.css"; // Add your CSS here or import a dedicated About.css

const About = () => {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero-section">
        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Empowering Modern Property Management</h1>
          <p className="subtitle">
            SSHousing bridges the gap between technology and real estate,
            offering powerful tools for admins, owners, and residents.
          </p>
        </motion.div>
      </section>

      {/* MISSION CARDS */}
      <section className="about-grid">
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="about-card"
            whileHover={{ scale: 1.1, boxShadow: "0 8px 20px rgba(0, 123, 255, 0.3)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <item.icon size={55} color="#007bff" className="card-icon" />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* ADVANCED HIGHLIGHTS */}
      <section className="about-highlights">
        <h2>Advanced Capabilities</h2>
        <div className="about-highlight-grid">
          <motion.div
            className="highlight-box"
            whileHover={{ scale: 1.05, boxShadow: "0 6px 18px rgba(0, 123, 255, 0.25)" }}
          >
            <FaLaptopCode size={45} color="#17a2b8" />
            <h4>AI-powered Insights</h4>
            <p>Harness data-driven decision-making with integrated analytics and forecasting tools.</p>
          </motion.div>
          <motion.div
            className="highlight-box"
            whileHover={{ scale: 1.05, boxShadow: "0 6px 18px rgba(0, 123, 255, 0.25)" }}
          >
            <FaChartLine size={45} color="#17a2b8" />
            <h4>Real-time Dashboards</h4>
            <p>Instant access to performance metrics and operational data in a visual format.</p>
          </motion.div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="about-team">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Meet Our Expert Team
        </motion.h2>

        <div className="about-team-grid">
          {team.map((member, i) => (
            <motion.div
              key={i}
              className="about-team-card"
              whileHover={{ y: -12, scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src={member.image} alt={member.name} className="team-image" />
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="about-cta">
        <motion.div
          className="about-cta-box"
          whileHover={{ scale: 1.07, boxShadow: "0 12px 35px rgba(0, 123, 255, 0.4)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Ready to Get Started?</h3>
          <p>Join the revolution in smart housing management with SSHousing.</p>
          <button
            className="cta-btn"
            onClick={() => window.location.href = "/register"}
          >
            Register Now
          </button>
        </motion.div>
      </section>

    </div>
  );
};

// Features data
const features = [
  {
    icon: FaBuilding,
    title: "Modern Infrastructure",
    text: "Powered by scalable cloud technologies to keep your data safe and your platform fast.",
  },
  {
    icon: FaUsers,
    title: "Multi-Role Access",
    text: "Support for Admins and Owners with tailored dashboards and permissions.",
  },
  {
    icon: FaHandshake,
    title: "Smart Integration",
    text: "Easily integrate with billing, notifications, and analytics platforms.",
  },
];

// Team data
const team = [
  {
    name: "Avijit Gorai",
    role: "Founder & Lead Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "RAJU Roy",
    role: "Product Designer",
    image: "https://th.bing.com/th/id/R.b3613a96632eddd5a190552c06d81e6f?rik=LitEdmUQJuATCw&riu=http%3a%2f%2fwww.machovibes.com%2fwp-content%2fuploads%2f2018%2f07%2f40-Best-Portrait-Photography-Poses-for-Men-14.jpg&ehk=xNBN66agKVOYFKgJK7Oz2KIzV3xAHPxH9uCylW%2fx%2bhM%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    name: "VICKY KUMAR",
    role: "Full Stack Engineer",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
  },
];

export default About;
