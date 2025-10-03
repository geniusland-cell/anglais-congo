import React, { useState, useEffect } from "react";
import {
  contenuEnfantsPremium,
  jouerComptine,
} from "../data/contenuEnfantsPremium";
import { parlerAvecStyle } from "../data/profilsExclusifs";
import { useAuth } from "../contexts/AuthContext";
import PremiumUpgradeModal from "./PremiumUpgradeModal";
import "./ProfilEnfant.css";

const ProfilEnfant = ({ isOpen, onClose }) => {
  const { hasPremiumAccess } = useAuth();
  const [activeTab, setActiveTab] = useState("comptines");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedComptine, setSelectedComptine] = useState(null);
  const [jeuActif, setJeuActif] = useState(null);

  // Fermer avec Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  const handlePremiumFeature = (feature) => {
    if (!hasPremiumAccess) {
      setShowUpgradeModal(true);
      return false;
    }
    return true;
  };

  const jouerComptineComplete = (comptine) => {
    if (!handlePremiumFeature("Comptines interactives")) return;

    setSelectedComptine(comptine);
    jouerComptine(comptine);

    // Animation spéciale pour les enfants
    setTimeout(() => setSelectedComptine(null), 4000);
  };

  const lancerJeu = (jeu) => {
    if (!handlePremiumFeature(`Jeu: ${jeu.nom}`)) return;
    setJeuActif(jeu);
  };

  const JeuMemory = ({ jeu }) => {
    const [cartes, setCartes] = useState([]);
    const [cartesRetournees, setCartesRetournees] = useState([]);
    const [pairesDecouvertes, setPairesDecouvertes] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
      // Créer les paires de cartes
      const paires = jeu.cartes.flatMap((carte) => [
        { ...carte, id: `${carte.id}-1`, pairId: carte.id },
        { ...carte, id: `${carte.id}-2`, pairId: carte.id },
      ]);

      // Mélanger les cartes
      const cartesMelangees = paires.sort(() => Math.random() - 0.5);
      setCartes(cartesMelangees);
    }, [jeu]);

    const retournerCarte = (carte) => {
      if (cartesRetournees.length === 2) return;
      if (cartesRetournees.find((c) => c.id === carte.id)) return;
      if (pairesDecouvertes.includes(carte.pairId)) return;

      const nouvellesCartes = [...cartesRetournees, carte];
      setCartesRetournees(nouvellesCartes);

      if (nouvellesCartes.length === 2) {
        setTimeout(() => {
          if (nouvellesCartes[0].pairId === nouvellesCartes[1].pairId) {
            // Paire trouvée !
            setPairesDecouvertes([...pairesDecouvertes, carte.pairId]);
            setScore(score + 10);
            parlerAvecStyle(`Bravo ! ${carte.nom} - ${carte.en}`, "fr");
          }
          setCartesRetournees([]);
        }, 1500);
      }
    };

    return (
      <div className="jeu-memory">
        <div className="memory-header">
          <h3>🧠 {jeu.nom}</h3>
          <div className="memory-score">Score: {score} points</div>
          <button onClick={() => setJeuActif(null)} className="btn-retour">
            ← Retour
          </button>
        </div>

        <div className="memory-grid">
          {cartes.map((carte) => {
            const estRetournee = cartesRetournees.find(
              (c) => c.id === carte.id
            );
            const estDecouverte = pairesDecouvertes.includes(carte.pairId);

            return (
              <div
                key={carte.id}
                className={`memory-carte ${
                  estRetournee || estDecouverte ? "retournee" : ""
                }`}
                onClick={() => retournerCarte(carte)}
              >
                <div className="carte-face-cachee">❓</div>
                <div className="carte-face-visible">
                  <div className="carte-emoji">{carte.emoji}</div>
                  <div className="carte-texte">
                    <div>{carte.nom}</div>
                    <div className="carte-en">{carte.en}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {pairesDecouvertes.length === jeu.cartes.length && (
          <div className="memory-victoire">
            🎉 Félicitations ! Tu as trouvé toutes les paires !
            <button
              onClick={() => window.location.reload()}
              className="btn-rejouer"
            >
              🔄 Rejouer
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="modal-overlay profil-enfant-overlay" onClick={onClose}>
        <div
          className="modal-content profil-enfant-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header coloré pour enfants */}
          <div className="enfant-header">
            <div className="enfant-title">
              <span className="enfant-icon">👶</span>
              <div>
                <h2>🌟 Espace Enfant Premium</h2>
                <p>Apprends l'anglais en t'amusant !</p>
              </div>
            </div>
            <button className="modal-close enfant-close" onClick={onClose}>
              ×
            </button>
          </div>

          {/* Navigation par onglets */}
          <div className="enfant-tabs">
            {[
              { id: "comptines", label: "🎵 Comptines", icon: "🎶" },
              { id: "jeux", label: "🎮 Jeux", icon: "🎯" },
              { id: "vocabulaire", label: "📚 Mots", icon: "🔤" },
              { id: "histoires", label: "📖 Histoires", icon: "📚" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`enfant-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenu des onglets */}
          <div className="enfant-body">
            {/* Onglet Comptines */}
            {activeTab === "comptines" && (
              <div className="comptines-section">
                <h3>🎵 Mes Comptines Préférées</h3>
                <div className="comptines-grid">
                  {contenuEnfantsPremium.comptines.map((comptine) => (
                    <div
                      key={comptine.id}
                      className={`comptine-card ${
                        selectedComptine?.id === comptine.id ? "playing" : ""
                      }`}
                      data-comptine={comptine.id}
                    >
                      <div className="comptine-illustration">
                        {comptine.illustration}
                      </div>
                      <h4>{comptine.titre}</h4>
                      <p>{comptine.description}</p>

                      <div className="comptine-textes">
                        <div className="comptine-fr">🇫🇷 {comptine.fr}</div>
                        <div className="comptine-en">🇺🇸 {comptine.en}</div>
                      </div>

                      <div className="comptine-actions">
                        <button
                          className="btn-comptine-play"
                          onClick={() => jouerComptineComplete(comptine)}
                        >
                          🎵 Chanter
                        </button>
                        <button
                          className="btn-audio-simple"
                          onClick={() => parlerAvecStyle(comptine.fr, "fr")}
                        >
                          🔊 FR
                        </button>
                        <button
                          className="btn-audio-simple"
                          onClick={() => parlerAvecStyle(comptine.en, "en")}
                        >
                          🔊 EN
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Onglet Jeux */}
            {activeTab === "jeux" && !jeuActif && (
              <div className="jeux-section">
                <h3>🎮 Mes Jeux Éducatifs</h3>
                <div className="jeux-grid">
                  {contenuEnfantsPremium.jeux.map((jeu) => (
                    <div key={jeu.id} className="jeu-card">
                      <div className="jeu-type">
                        {jeu.type === "memory"
                          ? "🧠"
                          : jeu.type === "quiz"
                          ? "❓"
                          : "🎨"}
                      </div>
                      <h4>{jeu.nom}</h4>
                      <p>{jeu.description}</p>
                      <div className="jeu-niveau">Niveau: {jeu.niveau}</div>
                      <button
                        className="btn-jeu-play"
                        onClick={() => lancerJeu(jeu)}
                      >
                        🚀 Jouer
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Jeu actif */}
            {jeuActif && (
              <div className="jeu-actif">
                {jeuActif.type === "memory" && <JeuMemory jeu={jeuActif} />}
                {/* Autres types de jeux à implémenter */}
              </div>
            )}

            {/* Onglet Vocabulaire */}
            {activeTab === "vocabulaire" && (
              <div className="vocabulaire-section">
                <h3>📚 Mes Premiers Mots</h3>
                {contenuEnfantsPremium.vocabulaire.map((categorie, index) => (
                  <div key={index} className="vocabulaire-categorie">
                    <h4>🏷️ {categorie.categorie}</h4>
                    <div className="mots-grid">
                      {categorie.mots.map((mot, motIndex) => (
                        <div key={motIndex} className="mot-card">
                          <div className="mot-emoji">{mot.emoji}</div>
                          <div className="mot-textes">
                            <div className="mot-fr">{mot.fr}</div>
                            <div className="mot-en">{mot.en}</div>
                          </div>
                          <div className="mot-actions">
                            <button
                              onClick={() => parlerAvecStyle(mot.fr, "fr")}
                            >
                              🔊
                            </button>
                            <button
                              onClick={() => parlerAvecStyle(mot.en, "en")}
                            >
                              🔊
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Onglet Histoires */}
            {activeTab === "histoires" && (
              <div className="histoires-section">
                <h3>📖 Mes Histoires Magiques</h3>
                {contenuEnfantsPremium.histoires.map((histoire) => (
                  <div key={histoire.id} className="histoire-card">
                    <h4>{histoire.titre}</h4>
                    <p>{histoire.description}</p>
                    <div className="histoire-pages">
                      {histoire.pages.map((page, index) => (
                        <div key={index} className="histoire-page">
                          <div className="page-image">{page.image}</div>
                          <div className="page-textes">
                            <div className="page-fr">{page.fr}</div>
                            <div className="page-en">{page.en}</div>
                          </div>
                          <button
                            className="btn-page-audio"
                            onClick={() => {
                              parlerAvecStyle(page.fr, "fr");
                              setTimeout(
                                () => parlerAvecStyle(page.en, "en"),
                                3000
                              );
                            }}
                          >
                            🎧 Écouter
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer avec encouragements */}
          <div className="enfant-footer">
            <div className="encouragements">
              🌟 Continue comme ça ! Tu apprends super bien ! 🌟
            </div>
            <button className="btn-fermer-enfant" onClick={onClose}>
              👋 À bientôt !
            </button>
          </div>
        </div>
      </div>

      {/* Modal d'upgrade premium */}
      <PremiumUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature="Contenu Enfant Premium"
      />
    </>
  );
};

export default ProfilEnfant;
