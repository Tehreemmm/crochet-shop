import React, { useEffect, useState } from "react";
import "./SplashScreen.css";
import logo from "/home/arbabhaider649/Downloads/miyume.png"; // make sure you put miyume.png in src/assets

function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2000); // show for 2s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      <img src={logo} alt="Miyume Logo" className="splash-logo" />
      <h2 className="splash-text">Miyume Crochet Store</h2>
    </div>
  );
}

export default SplashScreen;

