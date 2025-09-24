"use client";

import { useState, useEffect } from 'react';

export const useKeyboardVisibility = (): boolean => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      // Check if the focused element is an input or textarea
      const target = e.target as HTMLElement;
      if (target?.matches('input, textarea, [contenteditable]')) {
        setIsKeyboardVisible(true);
      }
    };

    const handleBlur = () => {
      // Small delay to prevent flicker when switching between inputs
      setTimeout(() => {
        const activeElement = document.activeElement as HTMLElement;
        if (!activeElement?.matches('input, textarea, [contenteditable]')) {
          setIsKeyboardVisible(false);
        }
      }, 100);
    };

    // Also detect viewport changes (more reliable on iOS)
    const handleViewportChange = () => {
      if (window.visualViewport) {
        const hasKeyboard = window.visualViewport.height < window.innerHeight * 0.75;
        setIsKeyboardVisible(hasKeyboard);
      }
    };

    // Add event listeners
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
    }

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      }
    };
  }, []);

  return isKeyboardVisible;
};