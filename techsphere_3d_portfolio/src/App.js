import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">⚡</span> TechSphere
            </div>
            <div className="nav-links">
              <a href="#about" className="nav-link">About</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#contact" className="nav-link">Contact</a>
              <button className="btn">Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <MainContainer />
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-symbol">⚡</span> TechSphere
            </div>
            <div className="footer-copyright">
              &copy; {new Date().getFullYear()} TechSphere. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;