import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus, Icosahedron, Html } from '@react-three/drei';
import { useSpring, animated, config } from '@react-spring/three';

// Tech item component with interactive hover effect
const TechItem = ({ position, rotationSpeed, scale = 1, icon, label, color = '#e87a41' }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Animation properties using react-spring
  const { scaleAnim, colorAnim } = useSpring({
    scaleAnim: hovered ? [scale * 1.2, scale * 1.2, scale * 1.2] : [scale, scale, scale],
    colorAnim: hovered ? '#ffffff' : color,
    config: config.wobbly
  });

  // Rotation animation
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * rotationSpeed;
      ref.current.rotation.x += delta * rotationSpeed * 0.5;
    }
  });

  // Determine which 3D shape to render based on icon prop
  const renderIcon = () => {
    switch (icon) {
      case 'box':
        return <Box args={[0.5, 0.5, 0.5]} />;
      case 'sphere':
        return <Sphere args={[0.3, 16, 16]} />;
      case 'torus':
        return <Torus args={[0.3, 0.1, 16, 32]} />;
      case 'icosahedron':
        return <Icosahedron args={[0.3, 0]} />;
      default:
        return <Box args={[0.5, 0.5, 0.5]} />;
    }
  };

  return (
    <animated.group
      position={position}
      scale={scaleAnim}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={ref}>
        {renderIcon()}
        <animated.meshStandardMaterial
          color={colorAnim}
          metalness={0.8}
          roughness={0.2}
          emissive={colorAnim}
          emissiveIntensity={0.5}
          wireframe={hovered}
        />
      </mesh>
      
      {/* Label that appears on hover */}
      {hovered && (
        <Html position={[0, 0.5, 0]} center>
          <div className="tech-item-label">{label}</div>
        </Html>
      )}
    </animated.group>
  );
};

/**
 * PUBLIC_INTERFACE
 * TechItems component
 * 
 * Various 3D tech elements orbiting around the central tech sphere,
 * representing different technologies and solutions
 */
const TechItems = ({ scrollPosition = 0 }) => {
  const groupRef = useRef();
  const radius = 3;
  
  // Orbital animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1 * (1 - scrollPosition * 0.5);
    }
  });

  const techItems = [
    { position: [radius, 0, 0], rotationSpeed: 0.5, icon: 'box', label: 'Cloud Computing' },
    { position: [-radius, 0, 0], rotationSpeed: 0.3, icon: 'sphere', label: 'AI Solutions' },
    { position: [0, radius * 0.8, 0], rotationSpeed: 0.4, icon: 'torus', label: 'IoT Systems' },
    { position: [0, -radius * 0.8, 0], rotationSpeed: 0.3, icon: 'icosahedron', label: 'Data Analytics' },
    { position: [0, 0, radius], rotationSpeed: 0.7, icon: 'box', label: 'Cybersecurity' },
    { position: [0, 0, -radius], rotationSpeed: 0.6, icon: 'torus', label: 'Blockchain' },
    { position: [radius * 0.7, radius * 0.7, 0], rotationSpeed: 0.5, icon: 'sphere', label: 'AR/VR' },
    { position: [-radius * 0.7, -radius * 0.7, 0], rotationSpeed: 0.4, icon: 'icosahedron', label: 'DevOps' }
  ];
  
  return (
    <group ref={groupRef}>
      {techItems.map((item, index) => (
        <TechItem
          key={index}
          position={item.position}
          rotationSpeed={item.rotationSpeed}
          icon={item.icon}
          label={item.label}
          color="#e87a41"
        />
      ))}
    </group>
  );
};

export default TechItems;
