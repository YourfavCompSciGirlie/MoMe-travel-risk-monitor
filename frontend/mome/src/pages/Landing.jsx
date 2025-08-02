import React from 'react';
import './Landing.css';
import { FiAlertTriangle, FiMap, FiShield, FiBarChart2, FiNavigation, FiCloud, FiWifi, FiClock } from 'react-icons/fi';
import image1 from '../assets/Images/BigCarTop.jpg';
import image2 from '../assets/Images/CarLow.jpg';
import image3 from '../assets/Images/CarTrafficFront.jpg';
import image4 from '../assets/Images/RoadTop.jpg';


const LandingPage = () => {
    return (
        <div className="landing-wrapper">
            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>MoMe – Smart Travel Risk Monitoring</h1>
                        <p className="tagline">Your personal weather and safety assistant on the road</p>
                        <div className="cta-buttons">
                            <a href="/login" className="btn secondary">Login</a>
                            <a href="/signup" className="btn primary">Get Started</a>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img
                            src={image2}
                            alt="Woman using navigation app while driving"
                        />
                    </div>
                </div>
            </header>

            {/* Feature Highlights */}
            <section className="features-section">
                <h2>Hazards We Protect Against</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                        <div className="icon-wrapper weather">
                            <FiCloud />
                        </div>
                        <h3>Severe Weather</h3>
                        <p>Real-time alerts for hail, floods, and storms</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-wrapper traffic">
                            <FiNavigation />
                        </div>
                        <h3>Traffic Zones</h3>
                        <p>Avoid congestion and road closures</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-wrapper crime">
                            <FiShield />
                        </div>
                        <h3>Crime Hotspots</h3>
                        <p>Steer clear of high-risk areas</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-wrapper insurance">
                            <FiBarChart2 />
                        </div>
                        <h3>Insurance Risk</h3>
                        <p>Reduce your accident probability</p>
                    </div>
                </div>
            </section>

            {/* Our Solution */}
            <section className="solution-section alt-bg">
                <div className="solution-content">
                    <div className="solution-text">
                        <h2>Our Smart Solution</h2>
                        <ul className="solution-list">
                            <li><FiAlertTriangle /> Real-time hazard alerts with precise timing</li>
                            <li><FiMap /> GPS route tracking with alternative suggestions</li>
                            <li><FiCloud /> Integrated weather API data analysis</li>
                            <li><FiBarChart2 /> Predictive risk scoring engine</li>
                            <li><FiShield /> Crime zone database updates</li>
                            <li><FiClock /> Historical pattern recognition</li>
                        </ul>
                    </div>
                    <div className="solution-image">
                        <img
                        src={image3}
                            alt="Mobile app showing navigation and weather"
                        />
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            {/* Can this please get some icons from https://skillicons.dev/ */}
            <section className="tech-section">
                <h2>Our Technology</h2>
                <div className="tech-columns">
                    <div className="tech-column">
                        <h3>Frontend</h3>
                        <ul>
                            <li>React</li>
                            <li>Vite</li>
                            <li>TypeScript</li>
                            <li>Mapbox GL</li>
                        </ul>
                    </div>
                    <div className="tech-column">
                        <h3>Backend</h3>
                        <ul>
                            <li>Node.js</li>
                            <li>Express</li>
                            <li>PostgreSQL</li>
                            <li>Redis</li>
                        </ul>
                    </div>
                    <div className="tech-column">
                        <h3>Infrastructure</h3>
                        <ul>
                            <li>Weather APIs</li>
                            <li>Traffic Data</li>
                            <li>AWS/GCP</li>
                            <li>Docker</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Innovations */}
            <section className="innovations-section alt-bg">
                <h2>What Makes MoMe Special</h2>
                <div className="innovation-cards">
                    <div className="innovation-card">
                        <div className="icon-wrapper purple">
                            <FiMap />
                        </div>
                        <h3>Route-Aware Forecasting</h3>
                        <p>Predicts weather along your entire route, not just current location</p>
                    </div>
                    <div className="innovation-card">
                        <div className="icon-wrapper orange">
                            <FiBarChart2 />
                        </div>
                        <h3>Dynamic Risk Scoring</h3>
                        <p>Calculates Low/Moderate/Severe risk levels</p>
                    </div>
                    <div className="innovation-card">
                        <div className="icon-wrapper blue">
                            <FiNavigation />
                        </div>
                        <h3>Intelligent Rerouting</h3>
                        <p>Auto-suggests safer paths based on conditions</p>
                    </div>
                    <div className="innovation-card">
                        <div className="icon-wrapper green">
                            <FiWifi />
                        </div>
                        <h3>Offline Caching</h3>
                        <p>Works even with spotty connectivity</p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="stats-section">
                <div className="stats-container">
                    <div className="stat-item">
                        <h3>50+</h3>
                        <p>Cities Covered</p>
                    </div>
                    <div className="stat-item">
                        <h3>98%</h3>
                        <p>Alert Accuracy</p>
                    </div>
                    <div className="stat-item">
                        <h3>10k+</h3>
                        <p>Drivers Protected</p>
                    </div>
                    <div className="stat-item">
                        <h3>24/7</h3>
                        <p>Monitoring</p>
                    </div>
                </div>
            </section>

            {/* Use Cases */}


            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <h3>MoMe</h3>
                        <p>Smart Travel Assistant</p>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <h4>Product</h4>
                            <a href="/features">Features</a>
                            <a href="/pricing">Pricing</a>
                            <a href="/download">Download</a>
                        </div>
                        <div className="link-group">
                            <h4>Company</h4>
                            <a href="/about">About</a>
                            <a href="/careers">Careers</a>
                            <a href="/blog">Blog</a>
                        </div>
                        <div className="link-group">
                            <h4>Support</h4>
                            <a href="/help">Help Center</a>
                            <a href="/contact">Contact</a>
                            <a href="/privacy">Privacy</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2025 MoMe – Momentum for Me. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;