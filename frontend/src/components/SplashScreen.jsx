import React, { useEffect, useState } from "react";
import logo from "../assets/miyume.png";
import "./SplashScreen.css";

export default function SplashScreen() {
  const [fade, setFade] = useState(false);
  useEffect(()=> {
    const t = setTimeout(()=> setFade(true), 1800);
    return ()=> clearTimeout(t);
  }, []);
  return (
    <div className={`splash ${fade ? "fade-out" : ""}`}>
      <img src={logo} alt="Miyume" className="splash-logo" />
      <h3 className="text-muted mt-3">Miyume Crochet Store</h3>
    </div>
  );
}

