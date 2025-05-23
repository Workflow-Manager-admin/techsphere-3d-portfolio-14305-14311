import * as THREE from 'three';

/**
 * Utility functions for animations in the 3D scene
 */

/**
 * PUBLIC_INTERFACE
 * Creates a smooth lerp animation
 * 
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 */
export const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

/**
 * PUBLIC_INTERFACE
 * Creates a pulsing animation value
 * 
 * @param {number} time - Current time (usually from clock.elapsedTime)
 * @param {number} speed - Speed of the pulsing
 * @param {number} amplitude - Amplitude of the pulse
 * @returns {number} Pulse value
 */
export const pulse = (time, speed = 1, amplitude = 1) => {
  return (Math.sin(time * speed) * 0.5 + 0.5) * amplitude;
};

/**
 * PUBLIC_INTERFACE
 * Creates an orbital movement around a point
 * 
 * @param {Object} options - Animation options
 * @param {number} options.time - Current time
 * @param {number} options.radius - Radius of the orbit
 * @param {number} options.speed - Speed of the orbit
 * @param {number} options.centerX - Center X position
 * @param {number} options.centerZ - Center Z position
 * @returns {THREE.Vector3} Position vector
 */
export const createOrbitalMovement = ({ time, radius, speed, centerX = 0, centerZ = 0 }) => {
  const x = centerX + Math.sin(time * speed) * radius;
  const z = centerZ + Math.cos(time * speed) * radius;
  return new THREE.Vector3(x, 0, z);
};

/**
 * PUBLIC_INTERFACE
 * Creates a floating movement animation
 * 
 * @param {Object} options - Animation options
 * @param {number} options.time - Current time
 * @param {number} options.height - Height of the float
 * @param {number} options.speed - Speed of the float
 * @returns {number} Y position
 */
export const createFloatingMovement = ({ time, height = 0.5, speed = 1 }) => {
  return Math.sin(time * speed) * height;
};
