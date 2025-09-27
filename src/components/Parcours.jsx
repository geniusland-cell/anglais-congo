import React, { useState } from "react";
import { niveau1Data } from "../data/niveau1";
import ModalNiveau from "./ModalNiveau";
import "./Parcours.css";

const Parcours = () => {
  const [niveauModal, setNiveauModal] = useState(null);

  const openNiveau = (niveauId) => {
    // Pour le niveau 1, on a les données réelles
    if (niveauId === 1) {
      setNiveauModal({ id: 1, ...niveau1Data });
    } else {
      // Pour les autres niveaux (à venir)
      setNiveauModal({ id: niveauId });
    }
  };

  const closeNiveau = () => {
    setNiveauModal(null);
  };

  const getNiveauDescription = (niveauId) => {
    const descriptions = {
      1: `${niveau1Data.salutations.length} salutations et ${niveau1Data.presentations.length} présentations`,
      2: "Marché, transport, restaurant, école",
      3: "Professionnel, débats, culture, situations complexes",
    };
    return descriptions[niveauId];
  };

  return (
    <section id="parcours" className="parcours">
      <div className="container">
        <h2>
          Parcours Principal <span>(Pour tous)</span>
        </h2>
        <p className="section-subtitle">
          Suivez ces étapes progressives pour maîtriser l'anglais pratique
        </p>

        <div className="parcours-grid">
          {/* Niveau 1 */}
          <div className="niveau-card card">
            <div className="niveau-header">
              <span className="niveau-badge">Niveau 1</span>
              <h3>Les Bases Indispensables</h3>
            </div>
            <div className="niveau-content">
              <ul>
                <li>
                  ✅ {niveau1Data.salutations.length} salutations essentielles
                </li>
                <li>
                  ✅ {niveau1Data.presentations.length} phrases de présentation
                </li>
                <li>✅ Audio intégré français/anglais</li>
                <li>✅ Vocabulaire de base</li>
                <li>✅ Politesse quotidienne</li>
              </ul>
              <button className="btn-niveau" onClick={() => openNiveau(1)}>
                Explorer le niveau
              </button>
            </div>
          </div>

          {/* Niveau 2 */}
          <div className="niveau-card card">
            <div className="niveau-header">
              <span className="niveau-badge">Niveau 2</span>
              <h3>La Vie Quotidienne</h3>
            </div>
            <div className="niveau-content">
              <ul>
                <li>✅ Au marché et boutique</li>
                <li>✅ Dans les transports</li>
                <li>✅ Au restaurant</li>
                <li>✅ À l'école/université</li>
                <li>✅ Conversations simples</li>
              </ul>
              <button className="btn-niveau" onClick={() => openNiveau(2)}>
                Bientôt disponible
              </button>
            </div>
          </div>

          {/* Niveau 3 */}
          <div className="niveau-card card">
            <div className="niveau-header">
              <span className="niveau-badge">Niveau 3</span>
              <h3>Conversations Approfondies</h3>
            </div>
            <div className="niveau-content">
              <ul>
                <li>✅ Vie professionnelle</li>
                <li>✅ Débats et opinions</li>
                <li>✅ Expressions idiomatiques</li>
                <li>✅ Culture et proverbes</li>
                <li>✅ Situations complexes</li>
              </ul>
              <button className="btn-niveau" onClick={() => openNiveau(3)}>
                Bientôt disponible
              </button>
            </div>
          </div>
        </div>

        {/* Modale Niveau */}
        <ModalNiveau niveau={niveauModal} onClose={closeNiveau} />
      </div>
    </section>
  );
};

export default Parcours;
