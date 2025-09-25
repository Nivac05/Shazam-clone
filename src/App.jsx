import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isShazaming, setIsShazaming] = useState(false);
  const [activeTab, setActiveTab] = useState('shazam');
  const [showStartupAnimation, setShowStartupAnimation] = useState(false);
  const [particles, setParticles] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);

  const listeningMessages = [
    "Listening for music...",
    "Will get it right away",
    "This sounds so good"
  ];

  const createParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
      });
    }
    setParticles(newParticles);
  };

  // Handle message cycling during listening
  useEffect(() => {
    let messageInterval;
    let fadeInterval;
    
    if (isShazaming && !showStartupAnimation) {
      // Start the message cycling
      fadeInterval = setInterval(() => {
        setShowMessage(false);
        setTimeout(() => {
          setCurrentMessageIndex((prev) => (prev + 1) % listeningMessages.length);
          setShowMessage(true);
        }, 300); // Fade out duration
      }, 5000); // Change message every 5 seconds
    }
    
    return () => {
      if (messageInterval) clearInterval(messageInterval);
      if (fadeInterval) clearInterval(fadeInterval);
    };
  }, [isShazaming, showStartupAnimation, listeningMessages.length]);

  // Reset message state when stopping
  useEffect(() => {
    if (!isShazaming) {
      setCurrentMessageIndex(0);
      setShowMessage(true);
    }
  }, [isShazaming]);
  const handleShazamClick = () => {
    if (!isShazaming) {
      // Start listening
      setShowStartupAnimation(true);
      createParticles();
      
      // Set listening state after a brief delay to allow startup animation to begin
      setTimeout(() => {
        setIsShazaming(true);
      }, 100);
      
      // Hide startup animation after it completes
      setTimeout(() => {
        setShowStartupAnimation(false);
      }, 1500);
    } else {
      // Stop listening
      setIsShazaming(false);
      setParticles([]);
      setShowStartupAnimation(false);
    }
  };

  return (
    <div className={`app ${isShazaming ? 'listening-mode' : ''}`}>
      {/* Navigation */}
      <div className={`navigation ${isShazaming ? 'fade-up' : ''}`}>
        <button
          onClick={() => setActiveTab('library')}
          className={`nav-button ${activeTab === 'library' ? 'active' : ''}`}
        >
          <div className="nav-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <span>Library</span>
        </button>

        <div className="page-indicators">
          <div className={`indicator ${activeTab === 'library' ? 'active' : ''}`}></div>
          <div className={`indicator ${activeTab === 'shazam' ? 'active' : ''}`}></div>
          <div className={`indicator ${activeTab === 'concerts' ? 'active' : ''}`}></div>
        </div>

        <button
          onClick={() => setActiveTab('concerts')}
          className={`nav-button ${activeTab === 'concerts' ? 'active' : ''}`}
        >
          <div className="nav-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 10v6l-7-2v3H9v-3l-7 2V10l7-2V5h6v3l7 2z"/>
            </svg>
          </div>
          <span>Concerts</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className={`instruction-text ${showStartupAnimation ? 'fade-up' : isShazaming ? 'listening-active' : ''}`}>
          {!isShazaming ? (
            <h1>Tap to Shazam</h1>
          ) : showStartupAnimation ? (
            <h1 style={{ opacity: 0 }}>Tap to Shazam</h1>
          ) : (
            <h1 className={`listening-message ${showMessage ? 'show' : 'hide'}`}>
              {listeningMessages[currentMessageIndex]}
            </h1>
          )}
        </div>

        {/* Particle Effects */}
        {(showStartupAnimation || isShazaming) && (
          <div className="particles-container">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="particle"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Apple Intelligence Startup Animation */}
        {showStartupAnimation && (
          <div className="startup-animation">
            <div className="ai-ring ai-ring-1"></div>
            <div className="ai-ring ai-ring-2"></div>
            <div className="ai-ring ai-ring-3"></div>
            <div className="ai-glow"></div>
          </div>
        )}

        <div className={`shazam-button-container ${isShazaming ? 'listening' : ''}`}>
          {isShazaming && (
            <>
              <div className="ripple ripple-1"></div>
              <div className="ripple ripple-2"></div>
              <div className="ripple ripple-3"></div>
            </>
          )}
          
          <button
            className={`shazam-button ${isShazaming ? 'active' : ''} ${showStartupAnimation ? 'startup' : ''}`}
            onClick={handleShazamClick}
          >
            <div className="button-highlight"></div>
            <div className="shazam-logo">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 10 C30 10, 15 25, 15 45 C15 55, 20 65, 30 70 L40 75 C45 77, 50 80, 50 85 C50 88, 47 90, 45 90 C40 90, 35 85, 35 80 L20 80 C20 92, 30 102, 45 102 C60 102, 70 92, 70 80 C70 70, 65 60, 55 55 L45 50 C40 48, 35 45, 35 40 C35 37, 38 35, 40 35 C45 35, 50 40, 50 45 L65 45 C65 33, 55 23, 40 23 C35 23, 30 25, 25 28 L35 10 Z" />
              </svg>
            </div>
            {isShazaming && <div className="pulse-overlay"></div>}
          </button>
        </div>

        <button className={`search-button ${isShazaming ? 'fade-up' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;