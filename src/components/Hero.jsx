import React from "react";
import "./Hero.css";

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="accueil" className="hero">
      <div className="hero-content container">
        <h1>
          Parlez Anglais pour <span>VOTRE Quotidien</span>
        </h1>
        <p>
          Que vous soyez parent, étudiant, commerçant ou professionnel, apprenez
          l'anglais utile pour votre vie en République du Congo
        </p>
        <div className="hero-buttons">
          <button
            className="btn-primary"
            onClick={() => scrollToSection("parcours")}
          >
            Commencer à apprendre
          </button>
          <button
            className="btn-secondary"
            onClick={() => scrollToSection("profils")}
          >
            Voir mon profil
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
