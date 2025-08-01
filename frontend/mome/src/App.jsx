import React, { useState, useEffect } from 'react';
import './Login.css'; // We'll create this CSS file next

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });
  const [glitchEffect, setGlitchEffect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger glitch effect on submit
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 500);
    // Your login logic here
    console.log('Logging in with:', email, password);
  };

  // Particle background effect
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`login-container ${glitchEffect ? 'glitch' : ''}`}>
      <canvas id="particle-canvas" className="particle-background"></canvas>
      
      <div className="cyber-card">
        <div className="cyber-card-inner">
          <div className="cyber-card-header">
            <h2 className="cyberpunk-font">
              <span className="cyber-text" data-text="ACCESS">ACCESS</span>
              <span className="cyber-glitch">_</span>
              <span className="cyber-text" data-text="GRANTED">GRANTED</span>
            </h2>
            <div className="cyber-line"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="cyber-form">
            <div className={`input-group ${isFocused.email ? 'focused' : ''}`}>
              <label className="cyber-label">
                <span className="label-text">USER ID</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused({...isFocused, email: true})}
                  onBlur={() => setIsFocused({...isFocused, email: false})}
                  className="cyber-input"
                  required
                />
                <span className="input-border"></span>
              </label>
            </div>
            
            <div className={`input-group ${isFocused.password ? 'focused' : ''}`}>
              <label className="cyber-label">
                <span className="label-text">SECURE KEY</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused({...isFocused, password: true})}
                  onBlur={() => setIsFocused({...isFocused, password: false})}
                  className="cyber-input"
                  required
                />
                <span className="input-border"></span>
              </label>
            </div>
            
            <div className="cyber-actions">
              <button type="submit" className="cyber-button">
                <span className="cyber-button-text">AUTHENTICATE</span>
                <span className="cyber-button-lights">
                  <span className="cyber-button-light"></span>
                  <span className="cyber-button-light"></span>
                  <span className="cyber-button-light"></span>
                </span>
              </button>
            </div>
          </form>
          
          <div className="cyber-footer">
            <div className="cyber-line"></div>
            <p className="cyberpunk-font-small">
              <span className="cyber-text" data-text="SYSTEM">SYSTEM</span>
              <span className="cyber-glitch">_</span>
              <span className="cyber-text" data-text="SECURE">SECURE</span>
            </p>
          </div>
        </div>
        
        <div className="cyber-card-corner cyber-card-corner-tl"></div>
        <div className="cyber-card-corner cyber-card-corner-tr"></div>
        <div className="cyber-card-corner cyber-card-corner-bl"></div>
        <div className="cyber-card-corner cyber-card-corner-br"></div>
      </div>
    </div>
  );
};

export default Login;