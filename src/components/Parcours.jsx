import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getPhrasesForLevel } from "../data/multilangData";
import LanguageSelector from "./LanguageSelector";
import LingalaUpsell from "./LingalaUpsell";
import ModalNiveau from "./ModalNiveau";
import "./Parcours.css";

const Parcours = () => {
  const [niveauModal, setNiveauModal] = useState(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const {
    userPreferences,
    canAccessLingala,
    hasPremiumAccess,
    isAuthenticated,
  } = useAuth();

  const openNiveau = (niveauId) => {
    // Récupérer les phrases selon la langue et l'abonnement
    const phrases = getPhrasesForLevel(
      niveauId,
      userPreferences.learningLanguage,
      hasPremiumAccess
    );

    if (niveauId === 1) {
      setNiveauModal({ id: 1, phrases });
    } else {
      // Pour les niveaux 2-3, vérifier l'accès premium
      if (hasPremiumAccess) {
        setNiveauModal({ id: niveauId, phrases });
      } else {
        setNiveauModal({ id: niveauId, phrases: [] }); // Modal avec upsell
      }
    }
  };

  const closeNiveau = () => {
    setNiveauModal(null);
  };

  const getNiveauDescription = (niveauId) => {
    const baseDescriptions = {
      1: "Salutations et présentations de base",
      2: "Vie quotidienne et situations pratiques",
      3: "Conversations complexes et professionnelles",
    };

    const langueLabel =
      userPreferences.learningLanguage === "ln" ? "Lingala" : "Français";

    return `${baseDescriptions[niveauId]} (${langueLabel} → Anglais)`;
  };

  const getNiveauStats = (niveauId) => {
    const phrases = getPhrasesForLevel(
      niveauId,
      userPreferences.learningLanguage,
      hasPremiumAccess
    );

    return `${phrases.length} phrases`;
  };

  // Composant de carte de niveau réutilisable
  const NiveauCard = ({
    niveau,
    title,
    description,
    isLocked = false,
    lockReason = "",
  }) => (
    <div className={`niveau-card card ${isLocked ? "locked" : ""}`}>
      <div className="niveau-header">
        <span className="niveau-badge">Niveau {niveau}</span>
        {isLocked && <span className="lock-badge">🔒</span>}
        <h3>{title}</h3>
      </div>

      <div className="niveau-content">
        <p className="niveau-description">{description}</p>

        <div className="niveau-stats">
          <span className="stats-count">{getNiveauStats(niveau)}</span>
          <span className="stats-language">
            {userPreferences.learningLanguage === "ln" ? "🇨🇬" : "🇫🇷"} → 🇬🇧
          </span>
        </div>

        <ul className="niveau-features">
          {niveau === 1 && (
            <>
              <li>✅ Salutations essentielles</li>
              <li>✅ Présentations de base</li>
              <li>✅ Audio intégré</li>
            </>
          )}
          {niveau === 2 && (
            <>
              <li>✅ Au marché et boutique</li>
              <li>✅ Dans les transports</li>
              <li>✅ Conversations simples</li>
            </>
          )}
          {niveau === 3 && (
            <>
              <li>✅ Vie professionnelle</li>
              <li>✅ Débats et opinions</li>
              <li>✅ Situations complexes</li>
            </>
          )}
        </ul>

        {isLocked ? (
          <div className="niveau-locked">
            <p className="lock-reason">{lockReason}</p>
            <LingalaUpsell compact={true} />
          </div>
        ) : (
          <button className="btn-niveau" onClick={() => openNiveau(niveau)}>
            {niveau === 1 ? "Commencer gratuitement" : "Explorer le niveau"}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <section id="parcours" className="parcours">
      <div className="container">
        <div className="parcours-header">
          <h2>
            Parcours d'Apprentissage{" "}
            <span className="accent-congo">
              (
              {userPreferences.learningLanguage === "ln"
                ? "Lingala"
                : "Français"}{" "}
              → Anglais)
            </span>
          </h2>

          <p className="section-subtitle">
            Progressez à votre rythme avec notre méthode adaptée
            {userPreferences.learningLanguage === "ln" &&
              " à la culture congolaise"}
          </p>

          {/* Sélecteur de langue pour les premium */}
          {(hasPremiumAccess || canAccessLingala) && (
            <div className="language-switcher-section">
              <button
                className="btn-language-switch"
                onClick={() => setShowLanguageModal(true)}
              >
                🌍 Changer de langue (
                {userPreferences.learningLanguage === "ln"
                  ? "Lingala"
                  : "Français"}
                )
              </button>
            </div>
          )}
        </div>

        <div className="parcours-grid">
          {/* Niveau 1 - Toujours gratuit */}
          <NiveauCard
            niveau={1}
            title="Les Bases Indispensables"
            description={getNiveauDescription(1)}
          />

          {/* Niveau 2 - Premium seulement */}
          <NiveauCard
            niveau={2}
            title="La Vie Quotidienne"
            description={getNiveauDescription(2)}
            isLocked={!hasPremiumAccess}
            lockReason="Débloquez le niveau 2 avec l'abonnement Premium"
          />

          {/* Niveau 3 - Premium seulement */}
          <NiveauCard
            niveau={3}
            title="Conversations Approfondies"
            description={getNiveauDescription(3)}
            isLocked={!hasPremiumAccess}
            lockReason="Débloquez le niveau 3 avec l'abonnement Premium"
          />
        </div>

        {/* Upsell Lingala pour les non-premium */}
        {!canAccessLingala && isAuthenticated && (
          <div className="lingala-promo-section">
            <LingalaUpsell />
          </div>
        )}

        {/* Message pour les non-connectés */}
        {!isAuthenticated && (
          <div className="auth-reminder">
            <div className="reminder-content">
              <h4>📚 Accédez à votre progression</h4>
              <p>
                Créez un compte gratuit pour sauvegarder vos progrès et
                débloquer des fonctionnalités avancées
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modale sélecteur de langue */}
      {showLanguageModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowLanguageModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <LanguageSelector onClose={() => setShowLanguageModal(false)} />
          </div>
        </div>
      )}

      {/* Modale niveau */}
      <ModalNiveau niveau={niveauModal} onClose={closeNiveau} />
    </section>
  );
};

export default Parcours;
