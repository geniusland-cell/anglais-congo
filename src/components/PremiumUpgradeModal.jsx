import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  X,
  Crown,
  Users,
  GraduationCap,
  Briefcase,
  Check,
  Star,
} from "lucide-react";
import "./PremiumUpgradeModal.css";

const PremiumUpgradeModal = ({ onClose, selectedPlan = null }) => {
  const { user, upgradeToPremium } = useAuth();
  const [selectedPlanType, setSelectedPlanType] = useState(
    selectedPlan || "famille"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const plans = {
    famille: {
      name: "Famille",
      icon: <Users size={32} />,
      price: "15,000 FC",
      priceUSD: "$15",
      duration: "/mois",
      color: "#e74c3c",
      gradient: "linear-gradient(135deg, #e74c3c, #c0392b)",
      description: "Parfait pour toute la famille avec contenu enfants inclus",
      features: [
        "Accès complet pour toute la famille",
        "Contenu spécialisé pour enfants",
        "Jeux interactifs et chansons",
        "Profils multiples (parents + enfants)",
        "Contrôle parental avancé",
        "Exercices adaptés par âge",
        "Support prioritaire",
        "Certificats de progression",
      ],
      popular: true,
    },
    etudiant: {
      name: "Étudiant",
      icon: <GraduationCap size={32} />,
      price: "8,000 FC",
      priceUSD: "$8",
      duration: "/mois",
      color: "#27ae60",
      gradient: "linear-gradient(135deg, #27ae60, #2ecc71)",
      description: "Tarif réduit pour étudiants avec accès étendu",
      features: [
        "Tarif étudiant préférentiel",
        "Accès à tous les cours",
        "Exercices illimités",
        "Suivi de progression détaillé",
        "Certificats officiels",
        "Communauté étudiante",
        "Ressources d'étude",
        "Support technique",
      ],
      popular: false,
    },
    business: {
      name: "Professionnel",
      icon: <Briefcase size={32} />,
      price: "25,000 FC",
      priceUSD: "$25",
      duration: "/mois",
      color: "#3498db",
      gradient: "linear-gradient(135deg, #3498db, #2980b9)",
      description: "Accès complet pour professionnels et entreprises",
      features: [
        "Accès illimité à tout le contenu",
        "Anglais des affaires spécialisé",
        "Formations sectorielles",
        "Certificats professionnels",
        "Support prioritaire 24/7",
        "Rapports de progression",
        "Intégration équipe",
        "Formations personnalisées",
      ],
      popular: false,
    },
  };

  const handlePlanSelect = (planType) => {
    setSelectedPlanType(planType);
    setError("");
  };

  const handleUpgrade = async () => {
    if (!selectedPlanType) {
      setError("Veuillez sélectionner un plan");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await upgradeToPremium(selectedPlanType);
      if (success) {
        onClose();
      } else {
        setError("Erreur lors de la mise à niveau. Veuillez réessayer.");
      }
    } catch (err) {
      setError(
        "Erreur de connexion. Veuillez vérifier votre connexion internet."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="premium-modal-overlay" onClick={onClose}>
      <div
        className="premium-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="premium-modal-header">
          <div className="premium-header-content">
            <Crown className="premium-crown-icon" size={40} />
            <h2>Passez au Premium</h2>
            <p>Débloquez tout le potentiel d'AnglaisCongo</p>
          </div>
          <button className="premium-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="premium-modal-body">
          {error && <div className="premium-error-message">⚠️ {error}</div>}

          <div className="premium-plans-grid">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                className={`premium-plan-card ${
                  selectedPlanType === key ? "selected" : ""
                } ${plan.popular ? "popular" : ""}`}
                onClick={() => handlePlanSelect(key)}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <Star size={16} />
                    Plus populaire
                  </div>
                )}

                <div
                  className="plan-header"
                  style={{ background: plan.gradient }}
                >
                  <div className="plan-icon">{plan.icon}</div>
                  <h3>{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price-main">{plan.price}</span>
                    <span className="price-usd">({plan.priceUSD})</span>
                    <span className="price-duration">{plan.duration}</span>
                  </div>
                </div>

                <div className="plan-body">
                  <p className="plan-description">{plan.description}</p>

                  <div className="plan-features">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <Check size={16} className="feature-check" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="plan-footer">
                  <div
                    className={`select-indicator ${
                      selectedPlanType === key ? "selected" : ""
                    }`}
                  >
                    {selectedPlanType === key
                      ? "✓ Sélectionné"
                      : "Sélectionner"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="premium-benefits">
            <h3>🎯 Pourquoi choisir Premium ?</h3>
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-icon">🚀</div>
                <div className="benefit-content">
                  <h4>Progression accélérée</h4>
                  <p>Apprenez 3x plus vite avec nos méthodes avancées</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🎮</div>
                <div className="benefit-content">
                  <h4>Contenu interactif</h4>
                  <p>Jeux, quiz et exercices adaptés au contexte congolais</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">👨‍👩‍👧‍👦</div>
                <div className="benefit-content">
                  <h4>Pour toute la famille</h4>
                  <p>Contenu adapté à tous les âges et niveaux</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🏆</div>
                <div className="benefit-content">
                  <h4>Certificats officiels</h4>
                  <p>Validez vos compétences avec nos certifications</p>
                </div>
              </div>
            </div>
          </div>

          <div className="premium-payment-info">
            <h4>💳 Modes de paiement acceptés</h4>
            <div className="payment-methods">
              <div className="payment-method">
                <span className="payment-icon">📱</span>
                <span>MTN Mobile Money</span>
              </div>
              <div className="payment-method">
                <span className="payment-icon">📱</span>
                <span>Orange Money</span>
              </div>
              <div className="payment-method">
                <span className="payment-icon">💳</span>
                <span>Carte bancaire</span>
              </div>
              <div className="payment-method">
                <span className="payment-icon">🏦</span>
                <span>Virement bancaire</span>
              </div>
            </div>
          </div>

          <div className="premium-actions">
            <button
              className="premium-upgrade-btn"
              onClick={handleUpgrade}
              disabled={isLoading || !selectedPlanType}
              style={{ background: plans[selectedPlanType]?.gradient }}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Traitement...
                </>
              ) : (
                <>
                  <Crown size={20} />
                  Passer au {plans[selectedPlanType]?.name} -{" "}
                  {plans[selectedPlanType]?.price}
                </>
              )}
            </button>

            <button className="premium-cancel-btn" onClick={onClose}>
              Plus tard
            </button>
          </div>

          <div className="premium-guarantee">
            <p>
              ✅ <strong>Garantie satisfait ou remboursé 30 jours</strong>
              <br />
              🔒 Paiement 100% sécurisé
              <br />
              📞 Support client disponible 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpgradeModal;
