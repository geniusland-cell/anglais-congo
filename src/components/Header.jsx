import React, { useState, useEffect } from "react";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm"; // ← AJOUTER CET IMPORT
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' ou 'register'

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

  const handleAuthClose = () => {
    setShowAuthModal(false);
    setAuthMode("login"); // Reset au mode login
  };

  const switchToRegister = () => setAuthMode("register");
  const switchToLogin = () => setAuthMode("login");

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
            {/* BOUTON CONNEXION */}
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
        <div className="modal-overlay" onClick={handleAuthClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {authMode === "login" ? (
              <LoginForm
                onClose={handleAuthClose}
                onSwitchToRegister={switchToRegister}
              />
            ) : (
              <RegisterForm
                onClose={handleAuthClose}
                onSwitchToLogin={switchToLogin}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
