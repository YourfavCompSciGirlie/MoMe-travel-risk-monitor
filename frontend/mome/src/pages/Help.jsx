import React, { useState } from 'react';
import './Help.css';
import {
  FaChevronDown,
  FaChevronUp,
  FaBell,
  FaMapMarkedAlt,
  FaRoute,
  FaAward,
  FaUserCog,
  FaCog,
  FaQuestion,
  FaSearch,
  FaHeadset,
  FaBook,
  FaVideo,
  FaEnvelope,
  FaGlobeAmericas,
  FaExclamationTriangle
} from 'react-icons/fa';

const Help = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  

  const toggleCard = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const helpTopics = [
    {
      id: 'dashboard',
      title: "Dashboard",
      icon: <FaGlobeAmericas className="card-icon" />,
      content: (
        <>
          <p>Your MoMe dashboard provides real-time travel risk information:</p>
          <ul>
            <li><strong>Risk Score:</strong> Composite safety rating (1-10) based on weather, traffic, and area safety</li>
            <li><strong>Live Map:</strong> Visual overlay of hazards and alerts in your area</li>
            <li><strong>Weather Alerts:</strong> Current warnings with severity indicators (yellow/orange/red)</li>
            <li><strong>Quick Actions:</strong> One-tap access to emergency contacts and route alternatives</li>
          </ul>
          <div className="card-footer">
            <p>Tip: Tap any alert for detailed information and recommended actions.</p>
          </div>
        </>
      )
    },
    {
      id: 'alerts',
      title: "Alerts",
      icon: <FaBell className="card-icon" />,
      content: (
        <>
          <p>MoMe's alert system keeps you informed about travel risks:</p>
          <ul>
            <li><strong>Active Alerts:</strong> Current warnings appear with push notifications</li>
            <li><strong>Historical Alerts:</strong> View past incidents in the Alert History section</li>
            <li><strong>Customization:</strong> Adjust which alerts you receive in Settings</li>
            <li><strong>Severity Levels:</strong> Color-coded by urgency (informational, caution, warning, critical)</li>
          </ul>
          <div className="card-footer">
            <p>Alert types include weather hazards, road closures, and high-crime areas.</p>
          </div>
        </>
      )
    },
    {
      id: 'simulation',
      title: "Simulation",
      icon: <FaRoute className="card-icon" />,
      content: (
        <>
          <p>Plan safer trips with the Route Simulation feature:</p>
          <ol>
            <li>Tap "Simulate Route" from the Dashboard</li>
            <li>Enter your start and destination points</li>
            <li>Select departure time (current or future)</li>
            <li>View weather and risk overlays along the route</li>
            <li>Compare alternative routes by safety score</li>
          </ol>
          <div className="card-footer">
            <p>Simulations use historical data and weather forecasts to predict conditions.</p>
          </div>
        </>
      )
    },
    {
      id: 'rewards',
      title: "Rewards",
      icon: <FaAward className="card-icon" />,
      content: (
        <>
          <p>Earn benefits for safe travel with MoMe:</p>
          <div className="rewards-grid">
            <div className="reward-item">
              <h4>XP Points</h4>
              <p>Earned for completing safe trips, logging hazards, and maintaining good driving habits</p>
            </div>
            <div className="reward-item">
              <h4>Badges</h4>
              <p>Unlock achievements for milestones like "100 Safe Miles" or "Storm Spotter"</p>
            </div>
            <div className="reward-item">
              <h4>Benefits</h4>
              <p>Redeem XP for discounts on travel services or insurance premium reductions</p>
            </div>
          </div>
          <div className="card-footer">
            <p>Your safety score impacts reward earnings - safer travel = faster rewards!</p>
          </div>
        </>
      )
    },
    {
      id: 'profile',
      title: "Profile",
      icon: <FaUserCog className="card-icon" />,
      content: (
        <>
          <p>Manage your personal information and preferences:</p>
          <ul>
            <li><strong>Personal Details:</strong> Update contact information and emergency contacts</li>
            <li><strong>Vehicle Info:</strong> Add multiple vehicles with specific safety features</li>
            <li><strong>Travel Preferences:</strong> Set default route types (safest vs. fastest)</li>
            <li><strong>Family Sharing:</strong> Link profiles to monitor loved ones' travel</li>
          </ul>
          <div className="card-footer">
            <p>Complete your profile to get personalized safety recommendations.</p>
          </div>
        </>
      )
    },
    {
      id: 'settings',
      title: "Settings",
      icon: <FaCog className="card-icon" />,
      content: (
        <>
          <p>Customize your MoMe experience:</p>
          <div className="settings-grid">
            <div className="setting-item">
              <h4>Alert Sensitivity</h4>
              <p>Adjust which types of alerts you receive and notification methods</p>
            </div>
            <div className="setting-item">
              <h4>Appearance</h4>
              <p>Toggle between light/dark mode and adjust map display options</p>
            </div>
            <div className="setting-item">
              <h4>Language</h4>
              <p>Change app language (supports 12 languages)</p>
            </div>
            <div className="setting-item">
              <h4>Units</h4>
              <p>Switch between metric/imperial measurements</p>
            </div>
          </div>
        </>
      )
    }
  ];

  const helpResources = [
    {
      title: "Video Tutorials",
      icon: <FaVideo className="resource-icon" />,
      description: "Watch step-by-step guides on using MoMe features",
      link: "/tutorials"
    },
    {
      title: "Safety Handbook",
      icon: <FaBook className="resource-icon" />,
      description: "Download our comprehensive travel safety guide",
      link: "/manual"
    },
    {
      title: "Live Chat",
      icon: <FaHeadset className="resource-icon" />,
      description: "Chat instantly with our support team",
      link: "/chat"
    },
    {
      title: "Emergency Contacts",
      icon: <FaExclamationTriangle className="resource-icon" />,
      description: "Local emergency numbers for your area",
      link: "/emergency"
    }
  ];

  const faqs = [
    {
      question: "How often is the risk data updated?",
      answer: "MoMe updates risk data every 15 minutes for weather and traffic, with crime data refreshed daily.",
      category: "data"
    },
    {
      question: "Can I use MoMe internationally?",
      answer: "Yes, MoMe provides coverage in over 60 countries with localized risk data.",
      category: "coverage"
    },
    {
      question: "What if I lose internet connection?",
      answer: "MoMe will display cached risk data and continue tracking your route. Full alerts resume when reconnected.",
      category: "offline"
    },
    {
      question: "How accurate are the risk predictions?",
      answer: "Our models have 92% accuracy for weather risks and 85% for traffic/safety predictions based on historical validation.",
      category: "accuracy"
    },
    {
      question: "Can I share my route with family?",
      answer: "Yes, from the Dashboard tap 'Share Route' to send real-time tracking to selected contacts.",
      category: "sharing"
    },
    {
      question: "How do I report incorrect hazard data?",
      answer: "Long-press any hazard on the map and select 'Report Inaccuracy' to notify our verification team.",
      category: "reporting"
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTopics = helpTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.content.props.children.some(child =>
      typeof child === 'string' ? child.toLowerCase().includes(searchQuery.toLowerCase()) : false
    )
  );

  return (
    <div className="help-container">
      {/* Page header */}
      <header className="help-header">
        <h1>Help & Support</h1>
        <p className="subtitle">Need help using MoMe? Find answers and guidance here.</p>
      </header>

      {/* Search bar */}
      <section className="help-search">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search help topics..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="search-button">Search</button>
        </form>
        {searchQuery && (
          <div className="search-results-count">
            Found {filteredFAQs.length + filteredTopics.length} results for "{searchQuery}"
          </div>
        )}
      </section>

      {/* Quick help resources */}
      {!searchQuery ? (
        <>
          <section className="help-section quick-resources">
            <h2>Quick Help Resources</h2>
            <div className="resource-grid">
              {helpResources.map((resource, index) => (
                <a href={resource.link} key={index} className="resource-card">
                  <div className="resource-icon-container">
                    {resource.icon}
                  </div>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="help-section">
            <h2>MoMe Features Guide</h2>
            <div className="topic-cards">
              {helpTopics.map((topic) => (
                <div
                  key={topic.id}
                  className={`topic-card ${expandedCard === topic.id ? 'expanded' : ''}`}
                  onClick={() => toggleCard(topic.id)}
                >
                  <div className="card-header">
                    {topic.icon}
                    <h3>{topic.title}</h3>
                    {expandedCard === topic.id ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  {expandedCard === topic.id && (
                    <div className="card-content">
                      {topic.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="help-section">
          <h2>Search Results</h2>
          {filteredTopics.length > 0 && (
            <>
              <h3>Topics</h3>
              <div className="topic-cards">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`topic-card ${expandedCard === topic.id ? 'expanded' : ''}`}
                    onClick={() => toggleCard(topic.id)}
                  >
                    <div className="card-header">
                      {topic.icon}
                      <h4>{topic.title}</h4>
                      {expandedCard === topic.id ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {expandedCard === topic.id && (
                      <div className="card-content">
                        {topic.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* FAQ section */}
      <section className="help-section">
        <h2>{searchQuery ? "Related FAQs" : "Frequently Asked Questions"}</h2>
        <div className="faq-list">
          {(searchQuery ? filteredFAQs : faqs).map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeSection === `faq-${index}` ? 'active' : ''}`}
              onClick={() => toggleSection(`faq-${index}`)}
            >
              <div className="faq-question">
                <FaQuestion className="faq-icon" />
                <span>{faq.question}</span>
                {activeSection === `faq-${index}` ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {activeSection === `faq-${index}` && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                  {!searchQuery && (
                    <span className="faq-category">Category: {faq.category}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact details */}
      <section className="contact-card">
        <h2>Contact Support</h2>
        <div className="contact-content">
          <div className="contact-method">
            <FaEnvelope className="contact-icon" />
            <div>
              <h3>Email</h3>
              <a href="mailto:support@momentum.mome">support@momentum.mome</a>
              <p>Typically responds within 24 hours</p>
            </div>
          </div>
          <div className="contact-method">
            <FaHeadset className="contact-icon" />
            <div>
              <h3>Live Chat</h3>
              <a href="/chat">Start Chat</a>
              <p>Available 9AM-9PM in your local timezone</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="help-footer">
        <p>Didn't find what you were looking for? <a href="/contact">Contact our support team</a></p>
        <p className="copyright">© {new Date().getFullYear()} MoMe - Travel with Confidence</p>
      </footer>
    </div>
  );
};

export default Help;