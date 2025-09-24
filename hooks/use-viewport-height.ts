"use client";

import { useEffect } from 'react';

export const useViewportHeight = (): void => {
  useEffect(() => {
    // Function to update CSS variable with actual viewport height
    const updateViewportHeight = () => {
      // Use visualViewport if available (better for mobile keyboards)
      const vh = window.visualViewport 
        ? window.visualViewport.height 
        : window.innerHeight;
      
      // Set CSS variable for use in CSS
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--vh-unit', `${vh * 0.01}px`);
    };

    // Initial call
    updateViewportHeight();

    // Update on resize
    const handleResize = () => updateViewportHeight();
    
    // Update on orientation change
    const handleOrientationChange = () => updateViewportHeight();

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // If visualViewport is available, use it for better accuracy
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', updateViewportHeight);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
        window.visualViewport.removeEventListener('scroll', updateViewportHeight);
      }
    };
  }, []);
};