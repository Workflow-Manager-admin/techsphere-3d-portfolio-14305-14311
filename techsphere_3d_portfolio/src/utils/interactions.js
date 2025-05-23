import * as THREE from 'three';

/**
 * Utility functions for user interactions with the 3D scene
 */

/**
 * PUBLIC_INTERFACE
 * Checks if a ray intersects with a given object
 * 
 * @param {Object} event - Pointer event
 * @param {Object} camera - Three.js camera
 * @param {Object} object - Three.js object to check intersection with
 * @returns {boolean} Whether the ray intersects the object
 */
export const checkIntersection = (event, camera, object) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  
  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObject(object, true);
  
  return intersects.length > 0;
};

/**
 * PUBLIC_INTERFACE
 * Handles responsive sizing for 3D objects based on device
 * 
 * @param {string} deviceType - Type of device ('mobile', 'tablet', 'desktop')
 * @param {Object} sizes - Object containing size multipliers for each device type
 * @returns {number} Size multiplier
 */
export const getResponsiveSize = (deviceType, sizes = { mobile: 0.7, tablet: 0.85, desktop: 1 }) => {
  return sizes[deviceType] || sizes.desktop;
};

/**
 * PUBLIC_INTERFACE
 * Detects device type based on window width
 * 
 * @returns {string} Device type ('mobile', 'tablet', or 'desktop')
 */
export const detectDeviceType = () => {
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * PUBLIC_INTERFACE
 * Calculates performance level based on device capabilities
 * 
 * @returns {string} Performance level ('low', 'medium', or 'high')
 */
export const detectPerformanceLevel = () => {
  // Simple detection based on device memory and processor cores
  // More sophisticated detection would involve benchmarking
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) return 'low';
  
  if (window.navigator.hardwareConcurrency) {
    const cores = window.navigator.hardwareConcurrency;
    if (cores < 4) return 'low';
    if (cores < 8) return 'medium';
    return 'high';
  }
  
  return 'medium'; // Default to medium if can't determine
};

/**
 * PUBLIC_INTERFACE
 * Creates a damped scrolling effect for smoother animations
 * 
 * @param {number} currentValue - Current scroll position
 * @param {number} targetValue - Target scroll position
 * @param {number} damping - Damping factor (lower = smoother)
 * @returns {number} Smoothed scroll position
 */
export const smoothScroll = (currentValue, targetValue, damping = 0.1) => {
  return currentValue + (targetValue - currentValue) * damping;
};
