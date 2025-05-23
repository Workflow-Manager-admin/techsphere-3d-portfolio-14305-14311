import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

/**
 * PUBLIC_INTERFACE
 * TechSphere component
 * 
 * A central 3D sphere representing the company's technological core,
 * with animated textures and glow effects
 */
const TechSphere = ({ scrollPosition = 0 }) => {
  const sphereRef = useRef();
  const glowRef = useRef();
  
  // Rotation animation
  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.1 * (1 + scrollPosition);
      sphereRef.current.rotation.x += delta * 0.05;
    }
    
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05);
    }
  });

  return (
    <group>
      {/* Main tech sphere */}
      <Sphere ref={sphereRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#444"
          metalness={0.9}
          roughness={0.1}
          emissive="#e87a41"
          emissiveIntensity={0.5}
        >
          {/* The wireframe effect */}
          <wireframe attach="wireframe" />
        </meshStandardMaterial>
      </Sphere>
      
      {/* Glow effect */}
      <Sphere ref={glowRef} args={[1.25, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#e87a41"
          transparent={true}
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Tech orbit rings */}
      <group rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <ringGeometry args={[1.5, 1.55, 64]} />
          <meshBasicMaterial color="#e87a41" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
      </group>
      
      <group rotation={[Math.PI / 6, Math.PI / 3, 0]}>
        <mesh>
          <ringGeometry args={[1.8, 1.85, 64]} />
          <meshBasicMaterial color="#e87a41" side={THREE.DoubleSide} transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
};

export default TechSphere;
