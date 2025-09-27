import React, { useEffect } from "react";
import { parlerAvecStyle } from "../data/profilsExclusifs";
import "./ModalProfil.css";

const ModalProfil = ({ profil, onClose }) => {
  // Fermer avec la touche Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!profil) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* En-tête de la modale */}
        <div className="modal-header">
          <div className="modal-title">
            <span className="modal-icon">{profil.icon}</span>
            <div>
              <h2>{profil.titre}</h2>
              <p>{profil.description}</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Contenu de la modale */}
        <div className="modal-body">
          <div className="profil-badge">
            <span className="badge-exclusif">🎯 Contenu Exclusif Congo</span>
          </div>

          <div className="phrases-list">
            {profil.phrases.map((phrase) => (
              <div key={phrase.id} className="phrase-modal-item">
                <div className="phrase-content">
                  <div className="phrase-text">
                    <div className="language-section">
                      <span className="lang-label">Français:</span>
                      <span className="phrase-fr">{phrase.fr}</span>
                    </div>
                    <div className="language-section">
                      <span className="lang-label">English:</span>
                      <span className="phrase-en">{phrase.en}</span>
                    </div>
                  </div>

                  <div className="phrase-actions">
                    <button
                      className="btn-audio"
                      onClick={() => parlerAvecStyle(phrase.fr, "fr")}
                      title="Écouter en français"
                    >
                      🔊 FR
                    </button>
                    <button
                      className="btn-audio"
                      onClick={() => parlerAvecStyle(phrase.en, "en")}
                      title="Listen in English"
                    >
                      🔊 EN
                    </button>
                  </div>
                </div>

                <div className="phrase-tips">
                  <div className="tips-icon">💡</div>
                  <span>{phrase.tips}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pied de la modale */}
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProfil;
