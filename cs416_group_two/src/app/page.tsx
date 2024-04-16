"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Toolbar from './Toolbar';
import styles from '../cssFiles/Home.module.css';
import { auth, onAuthStateChanged } from '../../firebaseConfig'; // Adjust the import path as necessary

// Dynamically import MapContainer with SSR disabled
const MapContainerWithNoSSR = dynamic(() => import('./MapContainer'), {
  ssr: false,
});

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const mapObject = {
    bounds: {
      sw: { lat: 41.581223, lng: -87.476069 }, // Example southwest corner
      ne: { lat: 41.588220, lng: -87.469090 }, // Example northeast corner
    },
  };

  return (
    <div className={styles.homeContainer}>
      <Toolbar />
      <div className={styles.mapContainer}>
        {/* Pass isLoggedIn as a prop to MapContainerWithNoSSR */}
        <MapContainerWithNoSSR mapObject={mapObject} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}