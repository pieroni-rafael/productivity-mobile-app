"use client";

import { useState, useEffect } from "react";

// Version configuration - you'll need to create this file or import from somewhere
// For now, using a fallback version
const VERSION_CONFIG = {
  CURRENT_VERSION: "1.0.0"
};

// Current app version from config
export const APP_VERSION = VERSION_CONFIG.CURRENT_VERSION;

interface UseVersionCheckReturn {
  currentVersion: string
  latestVersion: string | null
  showUpdateDialog: boolean
  isChecking: boolean
  dismissUpdate: () => void
  forceUpdate: () => void
}

// Version check hook
export const useVersionCheck = (): UseVersionCheckReturn => {
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  // Get API URL from Next.js environment variables
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "");

  useEffect(() => {
    const checkVersion = async () => {
      try {
        console.log("🔄 Checking version...");
        console.log("Current frontend version:", APP_VERSION);
        
        // Get last dismissed version from localStorage
        const dismissed = localStorage.getItem("dismissedVersion");
        const dismissedTime = localStorage.getItem("dismissedVersionTime");
        
        // If user dismissed this version less than 24 hours ago, don't show again
        if (dismissed && dismissedTime) {
          const hoursSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60);
          console.log(`Previously dismissed version ${dismissed}, ${hoursSinceDismissed.toFixed(1)} hours ago`);
          if (hoursSinceDismissed < 24) {
            // Don't return here, still check for newer versions
          }
        }

        if (!API_URL) {
          console.warn("No backend API URL configured");
          setLatestVersion(APP_VERSION);
          setIsChecking(false);
          return;
        }

        // Check latest version from backend
        console.log("Fetching version from:", `${API_URL}/version`);
        const response = await fetch(`${API_URL}/version`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const latest = data.version || APP_VERSION;
          
          console.log("Backend version:", latest);
          setLatestVersion(latest);
          
          // Compare versions
          const needsUpdate = isNewerVersion(latest, APP_VERSION);
          console.log(`Needs update: ${needsUpdate} (${latest} > ${APP_VERSION})`);
          
          // Check if we should show the dialog
          let shouldShowDialog = needsUpdate && latest !== dismissed;
          
          // If dismissed but it's been more than 24 hours, show again
          if (needsUpdate && dismissed === latest && dismissedTime) {
            const hoursSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60);
            if (hoursSinceDismissed >= 24) {
              console.log("24 hours passed since dismissal, showing again");
              shouldShowDialog = true;
            }
          }
          
          if (shouldShowDialog) {
            console.log("Showing update dialog!");
            setShowUpdateDialog(true);
          } else if (needsUpdate) {
            console.log("Update available but dialog was recently dismissed");
          }
        } else {
          console.error("Version check response not ok:", response.status);
        }
      } catch (error) {
        console.error("Version check failed:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkVersion();
    
    // Check for updates every hour
    const interval = setInterval(checkVersion, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [API_URL]);

  const dismissUpdate = () => {
    setShowUpdateDialog(false);
    if (latestVersion) {
      localStorage.setItem("dismissedVersion", latestVersion);
      localStorage.setItem("dismissedVersionTime", Date.now().toString());
    }
  };

  const forceUpdate = () => {
    // Clear cache and reload
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
    
    // Force reload with cache bypass (Note: reload(true) is deprecated, use location.reload())
    window.location.reload();
  };

  return {
    currentVersion: APP_VERSION,
    latestVersion,
    showUpdateDialog,
    isChecking,
    dismissUpdate,
    forceUpdate,
  };
};

// Helper function to compare version strings
const isNewerVersion = (latest: string, current: string): boolean => {
  const latestParts = latest.split(".").map(Number);
  const currentParts = current.split(".").map(Number);
  
  for (let i = 0; i < Math.max(latestParts.length, currentParts.length); i++) {
    const latestPart = latestParts[i] || 0;
    const currentPart = currentParts[i] || 0;
    
    if (latestPart > currentPart) return true;
    if (latestPart < currentPart) return false;
  }
  
  return false;
};