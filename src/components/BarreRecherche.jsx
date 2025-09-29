import React, { useState } from "react";
import "./BarreRecherche.css";

const BarreRecherche = ({ onRecherche }) => {
  const [terme, setTerme] = useState("");

  const handleRecherche = (e) => {
    const valeur = e.target.value;
    setTerme(valeur);
    onRecherche(valeur);
  };

  const viderRecherche = () => {
    setTerme("");
    onRecherche("");
  };

  return (
    <div className="barre-recherche">
      <div className="recherche-input-container">
        <input
          type="text"
          placeholder="🔍 Rechercher une phrase, un mot..."
          value={terme}
          onChange={handleRecherche}
          className="recherche-input"
        />
        {terme && (
          <button className="btn-vider" onClick={viderRecherche}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default BarreRecherche;
