import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { FiMessageSquare, FiX, FiMic, FiSend, FiHome, FiInfo, FiAlertCircle, FiMap, FiSettings, FiStar, FiNavigation } from 'react-icons/fi';

// Enhanced conversation flows with more natural responses
const CONVERSATION_FLOWS = {
  greetings: [
    "Hello! I'm your travel assistant. How can I help you today?",
    "Hi there! I can help with travel alerts, alternative routes, and your loyalty points.",
    "Welcome back! What travel information do you need?"
  ],
  navigation: {
    'home': { 
      text: "You're on the home page. What would you like to know about?", 
      page: 'home',
      options: [
        "- Current travel alerts",
        "- Alternative route options",
        "- Your loyalty points balance"
      ]
    },
    'alerts': { 
      text: "Here are the current travel alerts:", 
      page: 'alerts',
      action: 'showAlerts'
    },
    'routes': { 
      text: "I can help find alternative routes. Where are you traveling from and to?", 
      page: 'routes' 
    },
    'points': { 
      text: "Let me check your travel points. One moment...", 
      page: 'points',
      action: 'showPointsOptions'
    },
    'settings': { 
      text: "Opening settings for your preferences.", 
      page: 'settings' 
    }
  },
  alerts: {
    initial: [
      "Currently, there are several travel alerts:",
      "1. Strikes affecting Paris metro (June 5-7)",
      "2. Typhoon warning in Okinawa (June 10-12)",
      "3. Road closures in Rome historic center (ongoing)",
      "",
      "Would you like details on any of these? (Paris/Okinawa/Rome)"
    ].join('\n'),
    details: {
      'paris': [
        "Paris Metro Strike Details:",
        "📅 Dates: June 5-7",
        "🚇 Affected lines: 4, 6, and 9 from 7am-9pm daily",
        "",
        "Recommended alternatives:",
        "• Use RER trains where possible",
        "• Consider buses or taxis",
        "• Walking is best for short distances in central areas",
        "",
        "Would you like information about getting around during the strike?"
      ].join('\n'),
      'okinawa': [
        "Okinawa Typhoon Warning:",
        "🌀 Typhoon Haishen expected June 10-12",
        "🌧️ Heavy rains and winds up to 120km/h",
        "",
        "Travel advice:",
        "• Airlines may cancel flights - check with your carrier",
        "• Monitor Japan Meteorological Agency warnings",
        "• Have contingency plans for your itinerary",
        "• Consider travel insurance if you haven't already",
        "",
        "Would you like help with backup travel arrangements?"
      ].join('\n'),
      'rome': [
        "Rome Road Closures:",
        "🛣️ Via dei Fori Imperiali closed until August",
        "🏛️ Due to archaeological work near Colosseum",
        "",
        "Impact on travel:",
        "• No vehicle access to Colosseum area",
        "• Increased pedestrian zones in historic center",
        "• Bus routes 51, 85, 87 diverted",
        "• Allow extra time to reach attractions",
        "",
        "Would you like suggestions for alternative sightseeing routes?"
      ].join('\n')
    },
    followUp: {
      'paris': {
        'transport': [
          "Getting around Paris during strikes:",
          "🚆 RER trains A and B connect major areas",
          "🚍 Buses 63, 87 good alternatives for central Paris",
          "🚲 Vélib bike-share available throughout city",
          "🚕 Taxi apps: G7, Bolt, Uber",
          "",
          "Walking times between central landmarks:",
          "• Louvre to Notre-Dame: 15min",
          "• Eiffel Tower to Arc de Triomphe: 25min"
        ].join('\n')
      },
      'okinawa': {
        'backup': [
          "Okinawa Backup Options:",
          "✈️ If flights cancelled:",
          " - Next available flights typically 1-2 days later",
          " - Consider ferry to mainland (takes ~24hrs)",
          "",
          "🏨 Accommodation tips:",
          " - Many hotels offer storm rate extensions",
          " - Naha has most availability during storms",
          "",
          "ℹ️ Emergency contacts:",
          " - Okinawa Tourist Info: +81 98-866-2222",
          " - Your embassy contacts are in your profile"
        ].join('\n')
      },
      'rome': {
        'sightseeing': [
          "Alternative Rome Sightseeing:",
          "🏟️ Colosseum access:",
          " - Enter from Via di San Gregorio side",
          " - Consider underground tour (less crowded)",
          "",
          "🚶‍♂️ Walking routes:",
          "1. Pantheon → Piazza Navona → Campo de' Fiori",
          "2. Trevi Fountain → Spanish Steps → Villa Borghese",
          "",
          "🚍 Bus alternatives:",
          " - Route 118 serves Trastevere area",
          " - Route 23 connects Vatican to Testaccio"
        ].join('\n')
      }
    }
  },
  points: {
    initial: [
      "You currently have 4,850 travel points. Here's what you can do:",
      "1. Check detailed point balance",
      "2. See redemption options",
      "3. Learn how to earn more points",
      "",
      "What would you like to know about your points?"
    ].join('\n'),
    details: {
      'balance': [
        "Your Points Breakdown:",
        "✈️ Flights: 2,150 pts",
        "🏨 Hotels: 1,700 pts",
        "🚗 Ground transport: 1,000 pts",
        "",
        "⏳ Your points expire December 15, 2023",
        "🎯 You're 150 pts away from a flight upgrade!",
        "",
        "Would you like suggestions to earn those last points?"
      ].join('\n'),
      'redeem': [
        "Redemption Options:",
        "1. Flight upgrade (5,000 pts)",
        "   - Business class on short-haul flights",
        "   - Premium economy on long-haul",
        "",
        "2. Hotel night (8,000 pts)",
        "   - Category 1-3 properties worldwide",
        "   - 50% discount on higher categories",
        "",
        "3. $50 travel credit (2,500 pts)",
        "   - Applicable to any booking",
        "",
        "Would you like to redeem points now?"
      ].join('\n'),
      'earn': [
        "Ways to Earn More Points:",
        "🔥 Current Promotions:",
        "• Double points on all June bookings",
        "• 500 bonus pts for weekend flights",
        "",
        "💳 Regular Earning:",
        "1. Book hotels through our portal (3x pts)",
        "2. Weekend flights bonus (500 pts)",
        "3. Refer friends (1,000 pts each)",
        "",
        "Quickest way to earn 150+ pts:",
        "• Book any hotel stay (avg. 200-300 pts)",
        "• Take a weekend flight (500 pts bonus)"
      ].join('\n')
    }
  },
  general: {
    'help': [
      "I can help with:",
      "• Travel alerts and warnings",
      "• Finding alternative routes",
      "• Checking your loyalty points",
      "• Weather and security information",
      "",
      "Try saying:",
      "- 'Show me travel alerts'",
      "- 'Find alternative routes to Paris'",
      "- 'How many points do I have?'",
      "",
      "Or just say 'Hey Memo' anytime I can help!"
    ].join('\n'),
    'thanks': [
      "You're very welcome!",
      "",
      "Remember, I'm here 24/7 to help with:",
      "• Last-minute travel changes",
      "• Emergency assistance",
      "• Destination information",
      "",
      "Safe travels and don't hesitate to ask if you need anything else!"
    ].join('\n'),
    'emergency': [
      "For emergencies:",
      "1. Local emergency number: 112 (EU) or 911 (US)",
      "2. Your embassy contacts are saved in your profile",
      "3. I can connect you to our 24/7 support line",
      "",
      "⚠️ If this is a life-threatening emergency, please contact local authorities immediately."
    ].join('\n')
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: CONVERSATION_FLOWS.greetings[0], sender: 'AI', voice: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [continuousListening, setContinuousListening] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentFlow, setCurrentFlow] = useState(null);
  const [flowContext, setFlowContext] = useState({});
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Speech recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.log('Speech recognition not supported');
      addSystemMessage("Your browser doesn't support speech recognition. Please use Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript.trim();
      const isFinal = event.results[last].isFinal;
      
      if (!isFinal) return;

      console.log('Recognized:', transcript);

      const lowerTranscript = transcript.toLowerCase();
      if (lowerTranscript.includes('hey memo') || lowerTranscript.includes('hey mome')) {
        if (!isOpen) {
          setIsOpen(true);
          speakResponse("Hello! How can I assist you with your travel plans?");
        }
        const userMessage = transcript.replace(/hey memo|hey mome/gi, '').trim();
        if (userMessage) {
          setInput(userMessage);
          handleSend(userMessage);
        }
        return;
      }

      if (isOpen) {
        setInput(transcript);
        handleSend(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      if (event.error === 'no-speech') {
        if (continuousListening) {
          recognition.start();
        }
      } else {
        setIsListening(false);
        setContinuousListening(false);
      }
    };

    recognition.onend = () => {
      if (continuousListening) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
    
    if (continuousListening) {
      recognition.start();
      setIsListening(true);
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, [isOpen, continuousListening]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  

  const speakResponse = (text) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    synthRef.current.speak(utterance);
  };

  const addSystemMessage = (text, voice = false) => {
    setMessages(prev => [...prev, { text, sender: 'AI', voice }]);
    if (voice) {
      speakResponse(text);
    }
  };

  const startContinuousListening = () => {
    if (!continuousListening) {
      setContinuousListening(true);
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const stopContinuousListening = () => {
    if (continuousListening) {
      setContinuousListening(false);
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      startContinuousListening();
    }
  };

  const handleNavigation = (command) => {
    const lowerCommand = command.toLowerCase();
    for (const [key, value] of Object.entries(CONVERSATION_FLOWS.navigation)) {
      if (lowerCommand.includes(key)) {
        setCurrentPage(value.page);
        addSystemMessage(value.text, true);
        
        // Handle specific navigation actions
        if (value.action === 'showAlerts') {
          setCurrentFlow('alerts');
          addSystemMessage(CONVERSATION_FLOWS.alerts.initial, true);
        } else if (value.action === 'showPointsOptions') {
          setCurrentFlow('points');
          addSystemMessage(CONVERSATION_FLOWS.points.initial, true);
        }
        
        return true;
      }
    }
    return false;
  };

  const handleAlertsFlow = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for alert selection
    for (const [alert, details] of Object.entries(CONVERSATION_FLOWS.alerts.details)) {
      if (lowerMessage.includes(alert)) {
        addSystemMessage(details, true);
        setFlowContext({ currentAlert: alert });
        return true;
      }
    }
    
    // Check for follow-up questions
    if (flowContext.currentAlert) {
      const alertFollowUps = CONVERSATION_FLOWS.alerts.followUp[flowContext.currentAlert] || {};
      for (const [keyword, response] of Object.entries(alertFollowUps)) {
        if (lowerMessage.includes(keyword)) {
          addSystemMessage(response, true);
          return true;
        }
      }
    }
    
    // Check for general responses
    for (const [keyword, response] of Object.entries(CONVERSATION_FLOWS.general)) {
      if (lowerMessage.includes(keyword)) {
        addSystemMessage(response, true);
        return true;
      }
    }
    
    // Default response
    if (lowerMessage.includes('yes') || lowerMessage.includes('more')) {
      const currentAlert = flowContext.currentAlert || '';
      const prompt = CONVERSATION_FLOWS.alerts.details[currentAlert] 
        ? `What would you like to know about the ${currentAlert} alert?` 
        : "I can provide details on Paris, Okinawa, or Rome alerts. Which would you like?";
      addSystemMessage(prompt, true);
      return true;
    }
    
    return false;
  };

  const handlePointsFlow = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for points options
    for (const [option, details] of Object.entries(CONVERSATION_FLOWS.points.details)) {
      if (lowerMessage.includes(option)) {
        addSystemMessage(details, true);
        return true;
      }
    }
    
    // Check for general responses
    for (const [keyword, response] of Object.entries(CONVERSATION_FLOWS.general)) {
      if (lowerMessage.includes(keyword)) {
        addSystemMessage(response, true);
        return true;
      }
    }
    
    // Default response
    addSystemMessage(CONVERSATION_FLOWS.points.initial, true);
    return true;
  };

  const handleSend = async (customInput) => {
    const message = (customInput || input).trim();
    if (!message) return;

    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // First try navigation commands
      const isNavigation = handleNavigation(message);
      
      // Then handle conversation flows
      if (!isNavigation) {
        let isHandled = false;
        
        if (currentFlow === 'alerts') {
          isHandled = handleAlertsFlow(message);
        } else if (currentFlow === 'points') {
          isHandled = handlePointsFlow(message);
        }
        
        // Check general responses if not handled by flow
        if (!isHandled) {
          for (const [keyword, response] of Object.entries(CONVERSATION_FLOWS.general)) {
            if (message.toLowerCase().includes(keyword)) {
              addSystemMessage(response, true);
              isHandled = true;
              break;
            }
          }
        }
        
        // Final fallback
        if (!isHandled) {
          const response = currentFlow === 'alerts' 
            ? "I can provide details on Paris, Okinawa, or Rome alerts. Which would you like?"
            : currentFlow === 'points'
            ? "Would you like to check your balance, redemption options, or ways to earn more points?"
            : `I can help with ${currentPage} information. Try asking about:\n- Travel alerts\n- Alternative routes\n- Your points balance`;
          
          addSystemMessage(response, true);
        }
      }
    } catch (error) {
      addSystemMessage("Sorry, I'm having trouble processing that request.", true);
      console.error('Chatbot error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopContinuousListening();
    } else {
      startContinuousListening();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const navButtons = [
    { id: 'home', icon: <FiHome />, label: 'Home' },
    { id: 'alerts', icon: <FiAlertCircle />, label: 'Alerts' },
    { id: 'routes', icon: <FiNavigation />, label: 'Routes' },
    { id: 'points', icon: <FiStar />, label: 'Points' },
    { id: 'settings', icon: <FiSettings />, label: 'Settings' }
  ];

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <button
        className={`chatbot-toggle ${continuousListening ? 'listening' : ''}`}
        onClick={toggleChat}
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </button>

      {isOpen && (
        <div className="chatbot-content">
          <div className="chatbot-header">
            <h3>Travel Assistant</h3>
            <div className={`wake-word-status ${continuousListening ? 'active' : ''}`}>
              {continuousListening ? '🔊 Listening for "Hey Memo"...' : '🔇 Say "Hey Memo" to activate'}
            </div>
          </div>

          <div className="chatbot-navigation">
            {navButtons.map(button => (
              <button
                key={button.id}
                className={currentPage === button.id ? 'active' : ''}
                onClick={() => {
                  setCurrentPage(button.id);
                  const navItem = CONVERSATION_FLOWS.navigation[button.id];
                  addSystemMessage(navItem.text, true);
                  setCurrentFlow(button.id);
                  if (button.id === 'alerts') {
                    addSystemMessage(CONVERSATION_FLOWS.alerts.initial, true);
                  } else if (button.id === 'points') {
                    addSystemMessage(CONVERSATION_FLOWS.points.initial, true);
                  }
                }}
                title={button.label}
              >
                {button.icon}
              </button>
            ))}
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                <div className="message-content">
                  {msg.text.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message AI typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about travel alerts or say 'Hey Memo'..."
            />
            <button
              className={`mic-button ${isListening ? 'active' : ''}`}
              onClick={handleMicClick}
              title={isListening ? 'Stop listening' : 'Start listening'}
            >
              <FiMic />
            </button>
            <button
              className="send-button"
              onClick={() => handleSend()}
              disabled={!input.trim()}
              title="Send message"
            >
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;