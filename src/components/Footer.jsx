import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>AnglaisCongo</h3>
            <p>
              Apprenez l'anglais pratique pour votre quotidien en Republique du
              Congo
            </p>
          </div>

          <div className="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li>
                <a href="#accueil">Accueil</a>
              </li>
              <li>
                <a href="#parcours">Parcours</a>
              </li>
              <li>
                <a href="#profils">Profils</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: geniusmampouya@gmail.com</p>
            <p>Téléphone: +242067678128</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 AnglaisCongo - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
