import React from 'react';
import './Landing.css';

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <header className="landing-header">
        <h1>MoMe – Smart Travel Risk Monitoring</h1>
        <p>Your personal weather and safety assistant on the road.</p>
        <a href="/signup" className="landing-btn">Get Started</a>
      </header>

      <section className="landing-section">
        <h2>The Problem</h2>
        <p>
          Drivers continuously face hazardous weather conditions like hail, heavy rain, flooding, and high winds.
          These can be difficult to navigate and often lead to accidents, vehicle damage, and increased insurance claims.
          There's a lack of smart apps that proactively and effectively notify users in time to take safer actions.
        </p>
      </section>

      <section className="landing-section alt">
        <h2>Our Solution</h2>
        <ul>
          <li>🚘 Real-time location and route tracking</li>
          <li>🌩️ Live weather hazard detection via APIs</li>
          <li>📊 Predictive risk scoring for upcoming weather</li>
          <li>🔔 Smart, timely, non-intrusive alerts</li>
          <li>⚠️ Crime & hijacking zone detection</li>
          <li>🚦Traffic-aware rerouting (events, congestion, etc.)</li>
        </ul>
      </section>

      <section className="landing-section">
        <h2>Tech Stack</h2>
        <div className="tech-columns">
          <div>
            <h4>Frontend</h4>
            <ul>
              <li>React</li>
              <li>Vite</li>
              <li>TypeScript</li>
            </ul>
          </div>
          <div>
            <h4>Backend</h4>
            <ul>
              <li>Node.js</li>
              <li>Express</li>
              <li>TypeScript / JavaScript</li>
            </ul>
          </div>
          <div>
            <h4>Other</h4>
            <ul>
              <li>Weather APIs</li>
              <li>Google Maps API / Mapbox</li>
              <li>Socket.IO / WebSockets</li>
              <li>MongoDB / PostgreSQL</li>
              <li>CI/CD: GitHub Actions, Vercel, Netlify</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="landing-section alt">
        <h2>What Makes MoMe Innovative?</h2>
        <ul>
          <li>🌐 Route-aware weather predictions – not just location-based.</li>
          <li>📈 Dynamic Risk Scores: Low, Moderate, Severe.</li>
          <li>🗺️ Real-time intelligent rerouting based on traffic & weather.</li>
          <li>🔧 Customizable alert sensitivity for better UX.</li>
          <li>📡 Offline fallback with cached warnings and routes.</li>
        </ul>
      </section>

      <footer className="landing-footer">
        <p>© 2025 MoMe – Momentum for Me. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
