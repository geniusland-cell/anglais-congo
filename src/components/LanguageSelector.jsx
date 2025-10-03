import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "./LanguageSelector.css";

const LanguageSelector = ({ onClose }) => {
  const { userPreferences, updateLanguagePreference, canAccessLingala } =
    useAuth();

  const languages = [
    {
      code: "fr",
      name: "Français",
      flag: "🇫🇷",
      description: "Apprendre l'anglais depuis le français",
      available: true, // Toujours disponible
    },
    {
      code: "ln",
      name: "Lingala",
      flag: "🇨🇬",
      description: "Apprendre l'anglais depuis le lingala",
      available: canAccessLingala, // Seulement si premium
    },
  ];

  const handleLanguageChange = (languageCode) => {
    updateLanguagePreference(languageCode);
    onClose?.(); // Fermer la modale si fournie
  };

  const getLanguageStatus = (language) => {
    if (!language.available) {
      return {
        type: "premium",
        message: "Abonnement requis",
      };
    }

    if (userPreferences.learningLanguage === language.code) {
      return {
        type: "selected",
        message: "Actuellement sélectionné",
      };
    }

    return {
      type: "available",
      message: "Cliquez pour sélectionner",
    };
  };

  return (
    <div className="language-selector">
      <div className="language-header">
        <h2>🌍 Choisissez votre langue</h2>
        <p>
          Sélectionnez la langue depuis laquelle vous voulez apprendre l'anglais
        </p>
      </div>

      <div className="language-options">
        {languages.map((language) => {
          const status = getLanguageStatus(language);

          return (
            <div
              key={language.code}
              className={`language-option ${status.type} ${
                userPreferences.learningLanguage === language.code
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                language.available && handleLanguageChange(language.code)
              }
            >
              <div className="language-flag">{language.flag}</div>

              <div className="language-content">
                <div className="language-title">
                  <h3>{language.name} → 🇬🇧 Anglais</h3>
                  <span className="language-status">{status.message}</span>
                </div>
                <p className="language-description">{language.description}</p>

                {status.type === "premium" && (
                  <div className="premium-badge">
                    <span className="premium-icon">⭐</span>
                    Fonctionnalité Premium
                  </div>
                )}
              </div>

              <div className="language-indicator">
                {userPreferences.learningLanguage === language.code ? (
                  <div className="indicator-active">✓</div>
                ) : (
                  <div className="indicator-inactive"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!canAccessLingala && (
        <div className="language-upsell">
          <div className="upsell-content">
            <h4>🚀 Débloquez le Lingala !</h4>
            <p>Passez Premium pour apprendre l'anglais depuis le Lingala</p>
            <ul>
              <li>✅ Contenu adapté à la culture congolaise</li>
              <li>✅ Prononciation lingala authentique</li>
              <li>✅ Expressions du quotidien</li>
            </ul>
          </div>
        </div>
      )}

      <div className="language-footer">
        <p className="language-note">
          ⚠️ Vous pourrez changer cette préférence à tout moment dans vos
          paramètres
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;
