import React, { useState } from "react";
import LoginForm from "./auth/LoginForm"; // ← AJOUTER CET IMPORT
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false); // ← NOUVEL ÉTAT

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <nav className="nav container">
          <div className="logo">
            <h2>AnglaisCongo</h2>
          </div>

          <ul className="nav-links">
            <li>
              <a
                href="#accueil"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("accueil");
                }}
              >
                Accueil
              </a>
            </li>
            <li>
              <a
                href="#parcours"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("parcours");
                }}
              >
                Parcours
              </a>
            </li>
            <li>
              <a
                href="#profils"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("profils");
                }}
              >
                Profils
              </a>
            </li>
            <li>
              <a
                href="#exercices"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("exercices");
                }}
              >
                Exercices
              </a>
            </li>
            {/* NOUVEAU BOUTON CONNEXION */}
            <li>
              <button
                className="auth-btn"
                onClick={() => setShowAuthModal(true)}
              >
                Connexion
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* MODALE AUTH */}
      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <LoginForm onClose={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
