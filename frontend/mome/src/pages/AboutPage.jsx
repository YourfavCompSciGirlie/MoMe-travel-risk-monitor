import React from 'react';
import { FaShieldAlt, FaCarCrash, FaCloudShowersHeavy, FaTrafficLight, FaMapMarkedAlt, FaVolumeUp, FaWifi } from 'react-icons/fa';
import { MdSecurity, MdMoneyOff, MdAccessTime, MdFavorite } from 'react-icons/md';
import './AboutPage.css';
import image1 from '../assets/Images/BigCarTop.jpg';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="hero-title">
                Drive Smarter with <span className="brand-accent">MoMe</span>
              </h1>
              <p className="hero-tagline">
                Real-time hazard detection that protects you on every journey
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">99%</div>
                  <div className="stat-label">Accuracy</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">30+</div>
                  <div className="stat-label">Hazards Detected</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Protection</div>
                </div>
              </div>
            </div>
            <div className="hero-image-container">
              <img 
                src={image1} 
                alt="Traffic monitoring dashboard" 
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section section-padding">
        <div className="container">
          <h2 className="section-title">The Road Can Be Dangerous</h2>
          <div className="hazard-grid">
            <div className="hazard-card">
              <div className="hazard-icon"><FaCloudShowersHeavy size={48} /></div>
              <h3 className="hazard-title">Severe Weather</h3>
              <p className="hazard-description">
                Unexpected storms, flooding, and hail damage
              </p>
            </div>
            <div className="hazard-card">
              <div className="hazard-icon"><FaTrafficLight size={48} /></div>
              <h3 className="hazard-title">Road Disruptions</h3>
              <p className="hazard-description">
                Accidents, construction, and special events
              </p>
            </div>
            <div className="hazard-card">
              <div className="hazard-icon"><MdSecurity size={48} /></div>
              <h3 className="hazard-title">High-Risk Zones</h3>
              <p className="hazard-description">
                Areas with increased theft or carjacking risk
              </p>
            </div>
          </div>
          <div className="problem-statement">
            <p>
              Current navigation apps show you <span className="highlight">where</span> to go, 
              but don't warn you about <span className="highlight">what's coming</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution-section section-padding">
        <div className="container">
          <div className="solution-header">
            <h2 className="section-title">MoMe's Smart Protection System</h2>
            <p className="section-subtitle">
              We analyze multiple data streams to predict hazards <span className="highlight">before</span> you encounter them
            </p>
          </div>
          
          <div className="solution-process">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Real-Time Tracking</h3>
                <p className="step-description">
                  Pinpoints your exact route and analyzes upcoming conditions
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Hazard Detection</h3>
                <p className="step-description">
                  Identifies weather patterns, traffic issues, and high-risk areas
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Intelligent Alerts</h3>
                <p className="step-description">
                  Delivers clear warnings with recommended actions
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3 className="step-title">Dynamic Rerouting</h3>
                <p className="step-description">
                  Suggests safer alternatives in real-time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="features-section section-padding">
        <div className="container">
          <h2 className="section-title">Your Roadside Guardian</h2>
          <div className="features-grid">
            <div className="feature-card highlight-card">
              <div className="feature-icon"><FaShieldAlt size={40} /></div>
              <h3 className="feature-title">Predictive Protection</h3>
              <p className="feature-description">
                Uses AI to forecast hazards 15-30 minutes before you reach them
              </p>
              <div className="feature-badge">Most Popular</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaCloudShowersHeavy size={40} /></div>
              <h3 className="feature-title">Weather Warrior</h3>
              <p className="feature-description">
                Specialized detection for hail, flooding, high winds, and more
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><MdSecurity size={40} /></div>
              <h3 className="feature-title">Crime Shield</h3>
              <p className="feature-description">
                Real-time updates on dangerous areas and police activity
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaMapMarkedAlt size={40} /></div>
              <h3 className="feature-title">Smart Detours</h3>
              <p className="feature-description">
                Automatically suggests safer routes around trouble spots
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaVolumeUp size={40} /></div>
              <h3 className="feature-title">Voice Alerts</h3>
              <p className="feature-description">
                Hands-free warnings that don't distract from driving
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaWifi size={40} /></div>
              <h3 className="feature-title">Offline Mode</h3>
              <p className="feature-description">
                Works even when service is spotty or unavailable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="tech-section section-padding">
        <div className="container">
          <h2 className="section-title">Built With Cutting-Edge Technology</h2>
          <div className="tech-icons-container">
            <img 
              src="https://skillicons.dev/icons?i=react,typescript,vite,nodejs,express,mongodb,postgresql,aws,vercel,googlecloud,maps,socketio" 
              alt="Technology stack" 
              className="tech-icons"
            />
          </div>
          <div className="tech-details-grid">
            <div className="tech-detail-column">
              <h3 className="detail-title">Real-Time Data Processing</h3>
              <ul className="detail-list">
                <li>Weather API integration</li>
                <li>Traffic pattern analysis</li>
                <li>Crime data aggregation</li>
              </ul>
            </div>
            <div className="tech-detail-column">
              <h3 className="detail-title">Advanced Features</h3>
              <ul className="detail-list">
                <li>Predictive route scoring</li>
                <li>Dynamic risk assessment</li>
                <li>Personalized alert system</li>
              </ul>
            </div>
            <div className="tech-detail-column">
              <h3 className="detail-title">Reliable Infrastructure</h3>
              <ul className="detail-list">
                <li>99.9% uptime guarantee</li>
                <li>Military-grade encryption</li>
                <li>Global server coverage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="benefits-section section-padding">
        <div className="container">
          <h2 className="section-title">Why Drivers Love MoMe</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon"><MdMoneyOff size={40} /></div>
              <h3 className="benefit-title">Save Money</h3>
              <ul className="benefit-list">
                <li>Reduce accident-related costs</li>
                <li>Lower insurance premiums</li>
                <li>Avoid vehicle damage</li>
              </ul>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><MdAccessTime size={40} /></div>
              <h3 className="benefit-title">Save Time</h3>
              <ul className="benefit-list">
                <li>Bypass traffic jams</li>
                <li>Optimize your routes</li>
                <li>Reduce unexpected delays</li>
              </ul>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><MdFavorite size={40} /></div>
              <h3 className="benefit-title">Save Stress</h3>
              <ul className="benefit-list">
                <li>Drive with confidence</li>
                <li>Family safety assurance</li>
                <li>Peace of mind</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;