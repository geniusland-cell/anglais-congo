import React, { useState } from "react";
import { profilsExclusifs } from "../data/profilsExclusifs";
import ModalProfil from "./ModalProfil";
import "./Profils.css";

const Profils = () => {
  const [profilModal, setProfilModal] = useState(null);

  const openProfil = (profilKey) => {
    setProfilModal(profilKey);
  };

  const closeProfil = () => {
    setProfilModal(null);
  };

  return (
    <section id="profils" className="profils">
      <div className="container">
        <h2>
          Trouvez le contenu pour{" "}
          <span className="accent-congo">VOTRE Profil</span>
        </h2>
        <p className="section-subtitle">
          Accédez à du contenu exclusif adapté aux réalités congolaises
        </p>

        <div className="profils-grid">
          {Object.entries(profilsExclusifs).map(([key, profil]) => (
            <div key={key} className="profil-card card">
              <div className="profil-icon">{profil.icon}</div>
              <h3>{profil.titre}</h3>
              <p>{profil.description}</p>
              <span className="badge-exclusif">Exclusif</span>
              <button className="btn-profil" onClick={() => openProfil(key)}>
                Voir le contenu
              </button>
            </div>
          ))}

          {/* Profils à venir */}
          <div className="profil-card card coming-soon">
            <div className="profil-icon">👨‍💼</div>
            <h3>Professionnel</h3>
            <p>Vocabulaire bureau, réunions, business</p>
            <span className="badge-coming">Bientôt</span>
            <button className="btn-profil" disabled>
              Disponible prochainement
            </button>
          </div>

          <div className="profil-card card coming-soon">
            <div className="profil-icon">🏥</div>
            <h3>Santé</h3>
            <p>Vocabulaire hôpital, médecins, symptômes</p>
            <span className="badge-coming">Bientôt</span>
            <button className="btn-profil" disabled>
              Disponible prochainement
            </button>
          </div>
        </div>

        {/* Modale */}
        <ModalProfil
          profil={profilModal ? profilsExclusifs[profilModal] : null}
          onClose={closeProfil}
        />
      </div>
    </section>
  );
};

export default Profils;
