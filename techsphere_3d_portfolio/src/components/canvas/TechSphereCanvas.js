import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import TechSphere from '../models/TechSphere';
import FloatingPlatform from '../models/FloatingPlatform';
import TechItems from '../models/TechItems';

/**
 * Scene camera controller that handles animations based on scroll position
 */
const CameraController = ({ scrollPosition }) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 5));
  const initialPosition = useRef(new THREE.Vector3(0, 0, 8));
  
  useEffect(() => {
    // Set initial camera position
    camera.position.copy(initialPosition.current);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  useFrame(() => {
    // Animate camera based on scroll position
    const targetZ = initialPosition.current.z - scrollPosition * 3;
    const targetY = scrollPosition * 2;
    
    targetPosition.current.set(0, targetY, targetZ);
    
    camera.position.lerp(targetPosition.current, 0.05);
    camera.lookAt(0, targetY * 0.5, 0);
    camera.updateProjectionMatrix();
  });
  
  return null;
};

/**
 * PUBLIC_INTERFACE
 * TechSphereCanvas component for the 3D scene
 * 
 * Primary Three.js canvas container that renders the interactive 3D portfolio scene
 */
const TechSphereCanvas = ({ scrollPosition = 0 }) => {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      dpr={[1, 2]} // Responsive pixel ratio (better performance on mobile)
      camera={{ position: [0, 0, 8], fov: 75, near: 0.1, far: 1000 }}
    >
      {/* Environment & Lighting */}
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 5, 20]} />
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#e87a41" />
      <Environment preset="city" />
      
      {/* Main 3D Elements */}
      <group position={[0, -1, 0]}>
        <TechSphere scrollPosition={scrollPosition} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <FloatingPlatform position={[0, -1, 0]} />
        </Float>
        <TechItems scrollPosition={scrollPosition} />
      </group>
      
      {/* Controls & Camera Animation */}
      <CameraController scrollPosition={scrollPosition} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </Canvas>
  );
};

export default TechSphereCanvas;
