import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/**
 * PUBLIC_INTERFACE
 * FloatingPlatform component
 * 
 * A 3D platform that floats beneath the tech sphere and provides a base
 * for the 3D scene elements
 */
const FloatingPlatform = ({ position = [0, 0, 0] }) => {
  const platformRef = useRef();
  const glowRef = useRef();
  const ringRef = useRef();
  
  // Subtle animation for the platform
  useFrame((state) => {
    if (platformRef.current) {
      platformRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.y += 0.001;
    }
    
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.2 + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Main platform */}
      <group ref={platformRef}>
        <RoundedBox args={[4, 0.2, 4]} radius={0.2} smoothness={4}>
          <meshStandardMaterial
            color="#222"
            metalness={0.7}
            roughness={0.2}
            envMapIntensity={1}
          />
        </RoundedBox>
        
        {/* Platform details */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[2, 2.5, 0.2, 32, 1, true]} />
          <meshStandardMaterial
            color="#333"
            metalness={0.7}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
      
      {/* Glowing ring */}
      <group position={[0, -0.5, 0]} ref={ringRef}>
        <mesh>
          <ringGeometry args={[2.2, 2.3, 64]} />
          <meshBasicMaterial
            color="#e87a41"
            side={THREE.DoubleSide}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
      
      {/* Floor glow effect */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} ref={glowRef}>
        <circleGeometry args={[3, 32]} />
        <meshBasicMaterial
          color="#e87a41"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default FloatingPlatform;
