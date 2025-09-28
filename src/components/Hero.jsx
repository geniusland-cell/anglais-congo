import React from "react";
import { useLangue } from "../hooks/useLangue";
import "./Hero.css";

const Hero = () => {
  const { traduire } = useLangue();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="accueil" className="hero">
      <div className="hero-content container">
        <h1>{traduire("titre").replace("VOTRE", "<span>VOTRE</span>")}</h1>
        <p>{traduire("sousTitre")}</p>
        <div className="hero-buttons">
          <button
            className="btn-primary"
            onClick={() => scrollToSection("parcours")}
          >
            {traduire("boutonPrimaire")}
          </button>
          <button
            className="btn-secondary"
            onClick={() => scrollToSection("profils")}
          >
            {traduire("boutonSecondaire")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
