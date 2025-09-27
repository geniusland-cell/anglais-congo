import React, { useEffect } from "react";
import { parlerPhrase } from "../data/niveau1";
import "./ModalNiveau.css";

const ModalNiveau = ({ niveau, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!niveau) return null;

  const getNiveauTitle = (niveauId) => {
    const titles = {
      1: {
        title: "Les Bases Indispensables",
        icon: "🆕",
        description: "Salutations et présentations essentielles",
      },
      2: {
        title: "La Vie Quotidienne",
        icon: "🏠",
        description: "Situations du quotidien au Congo",
      },
      3: {
        title: "Conversations Approfondies",
        icon: "💬",
        description: "Échanges complexes et professionnels",
      },
    };
    return titles[niveauId] || titles[1];
  };

  const niveauInfo = getNiveauTitle(niveau.id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* En-tête */}
        <div className="modal-header">
          <div className="modal-title">
            <span className="modal-icon">{niveauInfo.icon}</span>
            <div>
              <h2>{niveauInfo.title}</h2>
              <p>{niveauInfo.description}</p>
              <span className="badge-niveau">Niveau {niveau.id}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Corps */}
        <div className="modal-body">
          {/* Salutations */}
          {niveau.id === 1 && (
            <div className="section-category">
              <h3>🎯 Salutations Essentielles</h3>
              <div className="phrases-grid">
                {niveau.salutations.map((phrase) => (
                  <PhraseItem key={phrase.id} phrase={phrase} />
                ))}
              </div>
            </div>
          )}

          {/* Présentations */}
          {niveau.id === 1 && (
            <div className="section-category">
              <h3>👤 Présentations Simples</h3>
              <div className="phrases-grid">
                {niveau.presentations.map((phrase) => (
                  <PhraseItem key={phrase.id} phrase={phrase} />
                ))}
              </div>
            </div>
          )}

          {/* Contenu à venir pour niveaux 2 et 3 */}
          {niveau.id > 1 && (
            <div className="coming-soon-section">
              <div className="coming-soon-icon">🚧</div>
              <h3>Contenu en préparation</h3>
              <p>
                Ce niveau sera disponible très prochainement avec du contenu
                exclusif !
              </p>
            </div>
          )}
        </div>

        {/* Pied */}
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant phrase réutilisable
const PhraseItem = ({ phrase }) => (
  <div className="phrase-modal-item">
    <div className="phrase-content">
      <div className="phrase-text">
        <div className="language-row">
          <span className="phrase-fr">{phrase.fr}</span>
        </div>
        <div className="language-row">
          <span className="phrase-en">{phrase.en}</span>
        </div>
      </div>
      <div className="phrase-actions">
        <button
          className="btn-audio"
          onClick={() => parlerPhrase(phrase.fr, "fr")}
          title="Écouter en français"
        >
          🔊 FR
        </button>
        <button
          className="btn-audio"
          onClick={() => parlerPhrase(phrase.en, "en")}
          title="Listen in English"
        >
          🔊 EN
        </button>
      </div>
    </div>
  </div>
);

export default ModalNiveau;
