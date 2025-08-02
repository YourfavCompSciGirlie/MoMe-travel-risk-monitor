import React, { useState } from 'react';
import './Help.css';
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaBell, 
  FaMicrophoneAlt, 
  FaShieldAlt, 
  FaQuestion, 
  FaSearch,
  FaHeadset,
  FaBook,
  FaVideo,
  FaEnvelope
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

  const faqs = [
    {
      question: "How do I add a new medication?",
      answer: "Navigate to the Medications tab and click 'Add New'. You can enter details manually or use voice input.",
      category: "medications"
    },
    {
      question: "Can I sync MoMe with my health records?",
      answer: "Yes, MoMe supports integration with major health platforms. Go to Settings > Integrations to connect.",
      category: "integration"
    },
    {
      question: "What if I miss a dose?",
      answer: "MoMe will notify you if you miss a dose and provide guidance on what to do next based on your medication.",
      category: "alerts"
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use end-to-end encryption and comply with all healthcare privacy regulations.",
      category: "privacy"
    },
    {
      question: "How do I set up family member profiles?",
      answer: "Go to Profile > Family Members to add and manage profiles for your dependents.",
      category: "profile"
    },
    {
      question: "Can I export my medication history?",
      answer: "Yes, you can export your complete history as PDF or CSV from the Reports section.",
      category: "reports"
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const helpResources = [
    {
      title: "Video Tutorials",
      icon: <FaVideo className="resource-icon" />,
      description: "Watch step-by-step guides on using MoMe features",
      link: "/tutorials"
    },
    {
      title: "User Manual",
      icon: <FaBook className="resource-icon" />,
      description: "Download our comprehensive user guide",
      link: "/manual"
    },
    {
      title: "Live Chat",
      icon: <FaHeadset className="resource-icon" />,
      description: "Chat instantly with our support team",
      link: "/chat"
    },
    {
      title: "Email Support",
      icon: <FaEnvelope className="resource-icon" />,
      description: "Get help via email within 24 hours",
      link: "mailto:support@momeapp.com"
    }
  ];

  return (
    <div className="help-container">
      <header className="help-header">
        <h1>Help Center</h1>
        <p className="subtitle">Everything you need to make the most of MoMe</p>
      </header>

      <section className="help-search">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="How can we help you today?" 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="search-button">Search</button>
        </form>
        {searchQuery && (
          <div className="search-results-count">
            Found {filteredFAQs.length} results for "{searchQuery}"
          </div>
        )}
      </section>

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

          <section className="help-section">
            <h2>Popular Topics</h2>
            <div className="topic-cards">
              <div 
                className={`topic-card ${expandedCard === 'alerts' ? 'expanded' : ''}`}
                onClick={() => toggleCard('alerts')}
              >
                <div className="card-header">
                  <FaBell className="card-icon" />
                  <h3>How Alerts Work</h3>
                  {expandedCard === 'alerts' ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {expandedCard === 'alerts' && (
                  <div className="card-content">
                    <p>MoMe's alert system is designed to ensure you never miss a dose:</p>
                    <ul>
                      <li><strong>Primary Alert:</strong> Notification at scheduled medication time</li>
                      <li><strong>Follow-up:</strong> Reminder if medication isn't logged within 15 minutes</li>
                      <li><strong>Escalation:</strong> Additional notification after 30 minutes with option to snooze</li>
                      <li><strong>Critical:</strong> After 1 hour, alert suggests contacting your doctor if needed</li>
                    </ul>
                    <div className="card-footer">
                      <p>You can customize all alert timing and methods in Settings</p>
                      <a href="/alerts-guide" className="learn-more">Learn more about alerts</a>
                    </div>
                  </div>
                )}
              </div>

              <div 
                className={`topic-card ${expandedCard === 'voice' ? 'expanded' : ''}`}
                onClick={() => toggleCard('voice')}
              >
                <div className="card-header">
                  <FaMicrophoneAlt className="card-icon" />
                  <h3>Voice Mode Guide</h3>
                  {expandedCard === 'voice' ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {expandedCard === 'voice' && (
                  <div className="card-content">
                    <p>MoMe's voice mode understands natural language commands:</p>
                    <div className="voice-examples">
                      <div className="example">
                        <p className="command">"Log my 500mg Amoxicillin"</p>
                        <p className="description">Logs a dose with medication name and strength</p>
                      </div>
                      <div className="example">
                        <p className="command">"When is my next dose?"</p>
                        <p className="description">Tells you upcoming medication schedule</p>
                      </div>
                      <div className="example">
                        <p className="command">"What are the side effects of Metformin?"</p>
                        <p className="description">Provides medication information</p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <p className="voice-tip">
                        Tip: Speak clearly and include dosage amounts for best results. You can enable 
                        always-on voice mode in Settings for hands-free operation.
                      </p>
                      <a href="/voice-guide" className="learn-more">See full voice command list</a>
                    </div>
                  </div>
                )}
              </div>

              <div 
                className={`topic-card ${expandedCard === 'privacy' ? 'expanded' : ''}`}
                onClick={() => toggleCard('privacy')}
              >
                <div className="card-header">
                  <FaShieldAlt className="card-icon" />
                  <h3>Privacy & Security</h3>
                  {expandedCard === 'privacy' ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {expandedCard === 'privacy' && (
                  <div className="card-content">
                    <p>Your privacy is our top priority:</p>
                    <ul>
                      <li>All health data is encrypted both in transit and at rest</li>
                      <li>We never sell or share your personal information</li>
                      <li>You have full control over your data with export and delete options</li>
                      <li>MoMe complies with HIPAA and GDPR regulations</li>
                    </ul>
                    <div className="card-footer">
                      <div className="legal-links">
                        <a href="/privacy" className="legal-link">Privacy Policy</a>
                        <a href="/terms" className="legal-link">Terms of Service</a>
                        <a href="/data" className="legal-link">Data Practices</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      ) : null}

      <section className="help-section">
        <h2>{searchQuery ? "Search Results" : "Frequently Asked Questions"}</h2>
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

      <section className="help-section additional-help">
        <div className="support-banner">
          <h2>Still need help?</h2>
          <p>Our dedicated support team is here for you 24/7</p>
          <div className="support-options">
            <a href="/contact" className="support-option">
              <FaHeadset className="support-icon" />
              <span>Live Chat</span>
            </a>
            <a href="mailto:support@momeapp.com" className="support-option">
              <FaEnvelope className="support-icon" />
              <span>Email Us</span>
            </a>
            <a href="tel:+18005551234" className="support-option">
              <FaHeadset className="support-icon" />
              <span>Call Support</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;