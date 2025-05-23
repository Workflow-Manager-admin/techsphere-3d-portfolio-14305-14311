import React, { Suspense, useState, useEffect, useRef } from 'react';
import TechSphereCanvas from './canvas/TechSphereCanvas';

/**
 * PUBLIC_INTERFACE
 * MainContainer component for TechSphere 3D Portfolio
 * 
 * The primary container that integrates 3D elements with UI components
 * to showcase the company's technological expertise and innovative solutions.
 */
const MainContainer = () => {
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  // Handle scroll events to update animations
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollPosition(window.scrollY / (document.body.scrollHeight - window.innerHeight));
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Simulate loading (could be replaced with actual asset loading progress)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main-container" ref={containerRef}>
      {loading ? (
        <div className="loader">
          <div className="loader-spinner"></div>
          <div className="loader-text">Loading TechSphere Experience...</div>
        </div>
      ) : (
        <>
          {/* 3D Canvas Section */}
          <div className="canvas-container">
            <Suspense fallback={<div className="loading">Loading 3D elements...</div>}>
              <TechSphereCanvas scrollPosition={scrollPosition} />
            </Suspense>
          </div>
          
          {/* Company Info Section */}
          <section className="info-section">
            <div className="container">
              <h2 className="section-title">Cutting-Edge Technology Solutions</h2>
              <p className="section-description">
                We specialize in developing innovative technological solutions that transform 
                businesses and enhance user experiences. Our expertise spans across multiple domains,
                including AI, cloud computing, IoT, and immersive technologies.
              </p>
              <div className="tech-grid">
                <div className="tech-item">
                  <h3>Artificial Intelligence</h3>
                  <p>Advanced machine learning algorithms and neural networks</p>
                </div>
                <div className="tech-item">
                  <h3>Cloud Solutions</h3>
                  <p>Scalable and secure cloud infrastructure and services</p>
                </div>
                <div className="tech-item">
                  <h3>IoT Ecosystems</h3>
                  <p>Connected device networks and smart systems</p>
                </div>
                <div className="tech-item">
                  <h3>Immersive Experiences</h3>
                  <p>Virtual and augmented reality applications</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Projects Showcase */}
          <section className="projects-section">
            <div className="container">
              <h2 className="section-title">Featured Projects</h2>
              <div className="projects-grid">
                <div className="project-card">
                  <div className="project-content">
                    <h3>Smart City Platform</h3>
                    <p>Integrated IoT solution for urban infrastructure management</p>
                    <button className="btn">Learn More</button>
                  </div>
                </div>
                <div className="project-card">
                  <div className="project-content">
                    <h3>AI-Powered Analytics</h3>
                    <p>Predictive analytics platform for business intelligence</p>
                    <button className="btn">Learn More</button>
                  </div>
                </div>
                <div className="project-card">
                  <div className="project-content">
                    <h3>Immersive Training</h3>
                    <p>VR-based training solutions for industrial applications</p>
                    <button className="btn">Learn More</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Contact Section */}
          <section className="contact-section">
            <div className="container">
              <h2 className="section-title">Let's Build Something Amazing</h2>
              <p className="section-description">
                Ready to elevate your business with cutting-edge technology solutions?
              </p>
              <button className="btn btn-large">Contact Us</button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MainContainer;
