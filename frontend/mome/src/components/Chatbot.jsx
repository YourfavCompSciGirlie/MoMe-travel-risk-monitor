import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { FiMessageSquare, FiX, FiMic, FiSend, FiHome, FiInfo, FiAlertCircle, FiMap, FiSettings, FiStar, FiNavigation } from 'react-icons/fi';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your travel assistant. How can I help you today?", sender: 'AI', voice: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [continuousListening, setContinuousListening] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
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
   
  const playTextToSpeech = async (text) => {
    try {
      const response = await fetch('http://localhost:3001/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error('TTS error:', error);
        return;
      }
  
      const data = await response.json();
      const audioSrc = data.audio;
  
      const audio = new Audio(audioSrc);
      audio.play();
  
    } catch (err) {
      console.error('Error calling TTS backend:', err);
    }
  };



  const addSystemMessage = (text, voice = false) => {
    setMessages(prev => [...prev, { text, sender: 'AI', voice }]);
    if (voice) {
     // speakResponse(text);
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
    const pages = ['home', 'alerts', 'routes', 'points', 'settings'];
    
    for (const page of pages) {
      if (lowerCommand.includes(page)) {
        setCurrentPage(page);
        addSystemMessage(`Navigated to ${page} page. How can I help you with ${page}?`, true);
        return true;
      }
    }
    return false;
  };

  const handleSend = async (customInput) => {
    const message = (customInput || input).trim();
    if (!message) return;

    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    try {
      // First try navigation commands
      const isNavigation = handleNavigation(message);
      
      if (!isNavigation) {
        // Call your AI endpoint
        const response = await fetch('http://localhost:5000/api/voices/ask'
          , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: message,
            context: currentPage
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response from AI');
        }

        const data = await response.json();
        addSystemMessage(data.text, true);
        playTextToSpeech(data.text);
      
      }
    } catch (error) {
      console.error('Error calling AI endpoint:', error);
      addSystemMessage("Sorry, I'm having trouble processing your request. Please try again later.", true);
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
                  addSystemMessage(`Now on ${button.label} page. How can I help you with ${button.label.toLowerCase()}?`, true);
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