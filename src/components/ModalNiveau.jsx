import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getPhrasesForLevel } from "../data/multilangData";
import PremiumUpgradeModal from "./PremiumUpgradeModal";
import "./ModalNiveau.css";

const ModalNiveau = ({ isOpen, onClose, onStartLesson }) => {
  const { userPreferences, user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState("debutant");
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  if (!isOpen) return null;

  const levels = [
    {
      id: "debutant",
      title: "Débutant",
      icon: "🌱",
      description: "Commencez votre apprentissage",
      color: "#27ae60",
    },
    {
      id: "intermediaire",
      title: "Intermédiaire",
      icon: "🌿",
      description: "Perfectionnez vos bases",
      color: "#3498db",
    },
    {
      id: "avance",
      title: "Avancé",
      icon: "🌳",
      description: "Maîtrisez la langue",
      color: "#9b59b6",
    },
  ];

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
  };

  const handleStartLesson = () => {
    // Vérifier si l'utilisateur essaie d'accéder au contenu Lingala sans Premium
    if (
      userPreferences.learningLanguage === "ln" &&
      (!user || !user.isPremium)
    ) {
      setShowPremiumModal(true);
      return;
    }

    // Vérifier si les données existent pour la langue sélectionnée
    const phrases = getPhrasesForLevel(
      selectedLevel,
      userPreferences.learningLanguage
    );

    if (!phrases || !Array.isArray(phrases) || phrases.length === 0) {
      alert(
        `Désolé, le contenu pour la langue ${
          userPreferences.learningLanguage === "ln" ? "Lingala" : "Français"
        } n'est pas encore disponible pour ce niveau.`
      );
      return;
    }

    onStartLesson(selectedLevel);
    onClose();
  };

  // Obtenir les phrases pour le niveau sélectionné avec vérification Premium
  const getPreviewPhrases = () => {
    try {
      // Si c'est du Lingala et que l'utilisateur n'est pas Premium, ne pas afficher l'aperçu
      if (
        userPreferences.learningLanguage === "ln" &&
        (!user || !user.isPremium)
      ) {
        return [];
      }

      const phrases = getPhrasesForLevel(
        selectedLevel,
        userPreferences.learningLanguage
      );

      // Vérification de sécurité
      if (!phrases || !Array.isArray(phrases)) {
        return [];
      }

      return phrases.slice(0, 3); // Afficher seulement les 3 premières phrases
    } catch (error) {
      console.error("Erreur lors de la récupération des phrases:", error);
      return [];
    }
  };

  const previewPhrases = getPreviewPhrases();
  const isLingalaWithoutPremium =
    userPreferences.learningLanguage === "ln" && (!user || !user.isPremium);

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-niveau">
          <div className="modal-header">
            <h2>🎯 Choisissez votre niveau</h2>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="modal-content">
            <div className="language-info">
              <p>
                📚 Langue d'apprentissage :
                <strong>
                  {userPreferences.learningLanguage === "ln"
                    ? " Lingala"
                    : " Français"}
                </strong>
                {isLingalaWithoutPremium && (
                  <span className="premium-badge">🌟 Premium</span>
                )}
              </p>
            </div>

            {isLingalaWithoutPremium && (
              <div className="premium-notice">
                <div className="premium-notice-content">
                  <h4>🌟 Contenu Premium</h4>
                  <p>
                    L'apprentissage en Lingala est réservé aux membres Premium.
                    Passez au Premium pour débloquer tout le contenu Lingala !
                  </p>
                </div>
              </div>
            )}

            <div className="levels-grid">
              {levels.map((level) => (
                <div
                  key={level.id}
                  className={`level-card ${
                    selectedLevel === level.id ? "selected" : ""
                  } ${isLingalaWithoutPremium ? "premium-locked" : ""}`}
                  onClick={() => handleLevelSelect(level.id)}
                  style={{ "--level-color": level.color }}
                >
                  <div className="level-icon">
                    {isLingalaWithoutPremium ? "🔒" : level.icon}
                  </div>
                  <h3>{level.title}</h3>
                  <p>{level.description}</p>
                  <div className="level-indicator">
                    {isLingalaWithoutPremium
                      ? "🌟 Premium requis"
                      : selectedLevel === level.id
                      ? "✅ Sélectionné"
                      : "Choisir"}
                  </div>
                </div>
              ))}
            </div>

            <div className="preview-section">
              <h3>📖 Aperçu du contenu</h3>
              {isLingalaWithoutPremium ? (
                <div className="premium-preview-message">
                  <div className="premium-icon">🌟</div>
                  <h4>Contenu Premium Lingala</h4>
                  <p>
                    Découvrez plus de 50 phrases en Lingala avec la
                    prononciation audio, des exercices interactifs et du contenu
                    exclusif !
                  </p>
                  <button
                    className="upgrade-preview-btn"
                    onClick={() => setShowPremiumModal(true)}
                  >
                    🚀 Voir les options Premium
                  </button>
                </div>
              ) : previewPhrases.length > 0 ? (
                <div className="phrases-preview">
                  {previewPhrases.map((phrase, index) => (
                    <div key={index} className="phrase-item">
                      <span className="phrase-en">{phrase.en}</span>
                      <span className="phrase-translation">
                        {userPreferences.learningLanguage === "ln"
                          ? phrase.ln
                          : phrase.fr}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-content-message">
                  <p>⚠️ Contenu non disponible pour cette langue</p>
                  <p>
                    Le contenu en{" "}
                    {userPreferences.learningLanguage === "ln"
                      ? "Lingala"
                      : "Français"}
                    sera bientôt disponible !
                  </p>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={onClose}>
                Annuler
              </button>
              <button
                className="btn-start"
                onClick={handleStartLesson}
                disabled={
                  isLingalaWithoutPremium || previewPhrases.length === 0
                }
                style={{
                  opacity:
                    isLingalaWithoutPremium || previewPhrases.length === 0
                      ? 0.5
                      : 1,
                  cursor:
                    isLingalaWithoutPremium || previewPhrases.length === 0
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {isLingalaWithoutPremium ? "🌟 Premium requis" : "🚀 Commencer"}
              </button>
            </div>
          </div>
        </div>
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

export default ModalNiveau;
