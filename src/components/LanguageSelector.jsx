import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import PremiumUpgradeModal from "./PremiumUpgradeModal";
import "./LanguageSelector.css";

const LanguageSelector = () => {
  const { userPreferences, updateLanguagePreference, user } = useAuth();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const languages = [
    {
      code: "fr",
      name: "Français",
      flag: "🇫🇷",
      description: "Apprendre l'anglais en français",
      isPremium: false,
    },
    {
      code: "ln",
      name: "Lingala",
      flag: "🇨🇩",
      description: "Koyekola Lingelesi na Lingala",
      isPremium: true,
    },
  ];

  const handleLanguageSelect = (languageCode) => {
    // Vérifier si c'est le Lingala et si l'utilisateur n'est pas Premium
    if (languageCode === "ln" && (!user || !user.isPremium)) {
      setShowPremiumModal(true);
      return;
    }

    // Sinon, changer la langue normalement
    updateLanguagePreference(languageCode);
  };

  return (
    <>
      <div className="language-selector">
        <h3>🌍 Choisissez votre langue d'apprentissage</h3>
        <div className="languages-grid">
          {languages.map((language) => {
            const isSelected =
              userPreferences.learningLanguage === language.code;
            const isLocked = language.isPremium && (!user || !user.isPremium);

            return (
              <div
                key={language.code}
                className={`language-card ${isSelected ? "selected" : ""} ${
                  isLocked ? "premium-locked" : ""
                }`}
                onClick={() => handleLanguageSelect(language.code)}
              >
                <div className="language-flag">
                  {isLocked ? "🔒" : language.flag}
                </div>
                <div className="language-info">
                  <h4>
                    {language.name}
                    {language.isPremium && (
                      <span className="premium-badge">🌟</span>
                    )}
                  </h4>
                  <p>{language.description}</p>
                  {isLocked && (
                    <div className="premium-notice-small">Premium requis</div>
                  )}
                </div>
                <div className="language-status">
                  {isSelected ? "✅" : isLocked ? "🌟" : "○"}
                </div>
              </div>
            );
          })}
        </div>

        {userPreferences.learningLanguage === "ln" &&
          (!user || !user.isPremium) && (
            <div className="premium-warning">
              <div className="warning-content">
                <span className="warning-icon">⚠️</span>
                <p>
                  Vous avez sélectionné Lingala mais n'avez pas d'abonnement
                  Premium. Le contenu sera limité.
                </p>
                <button
                  className="upgrade-btn-small"
                  onClick={() => setShowPremiumModal(true)}
                >
                  🚀 Passer au Premium
                </button>
              </div>
            </div>
          )}
      </div>

      {/* Modal Premium Upgrade */}
      {showPremiumModal && (
        <PremiumUpgradeModal
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          reason="lingala"
        />
      )}
    </>
  );
};

export default LanguageSelector;
