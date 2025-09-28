import React, { useState } from "react";
import SelecteurLangue from "./SelecteurLangue";
import "./Header.css";

const Header = () => {
  const [showSelecteurLangue, setShowSelecteurLangue] = useState(false);

  return (
    <header className="header">
      <nav className="nav container">
        <div className="logo">
          <h2>AnglaisCongo</h2>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#accueil">Accueil</a>
          </li>
          <li>
            <a href="#parcours">Parcours</a>
          </li>
          <li>
            <a href="#profils">Profils</a>
          </li>
          <li>
            <a href="#exercices">Exercices</a>
          </li>
          <li>
            <button
              className="btn-langue"
              onClick={() => setShowSelecteurLangue(!showSelecteurLangue)}
            >
              🌐
            </button>
          </li>
        </ul>
      </nav>

      {/* Selecteur de langue qui apparaît au clic */}
      {showSelecteurLangue && (
        <div className="selecteur-container">
          <SelecteurLangue />
        </div>
      )}
    </header>
  );
};

export default Header;
