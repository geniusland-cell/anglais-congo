import React, { useState } from "react";
import { languesDisponibles } from "../config/langues";
import "./SelecteurLangue.css";

const SelecteurLangue = () => {
  const [langueSelectionnee, setLangueSelectionnee] = useState("fr");

  const changerLangue = (codeLangue) => {
    setLangueSelectionnee(codeLangue);
    // Sauvegarder dans le localStorage
    localStorage.setItem("preferenceLangue", codeLangue);
    // Recharger l'application
    window.location.reload();
  };

  return (
    <div className="selecteur-langue">
      <h4>🌐 Language / Langue</h4>
      <div className="options-langue">
        {Object.values(languesDisponibles).map((langue) => (
          <label key={langue.code} className="option-langue">
            <input
              type="radio"
              name="langue"
              value={langue.code}
              checked={langueSelectionnee === langue.code}
              onChange={() => changerLangue(langue.code)}
            />
            <span>{langue.nom}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SelecteurLangue;
