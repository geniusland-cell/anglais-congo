import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "./PremiumUpgradeModal.css";

const PremiumUpgradeModal = ({ isOpen, onClose, feature }) => {
  const { updateSubscription } = useAuth();

  if (!isOpen) return null;

  const plans = [
    {
      id: "famille",
      nom: "Famille",
      prix: "2500 FCFA/mois",
      description: "Parfait pour toute la famille",
      features: [
        "✅ Profil ENFANT avec comptines",
        "✅ Contenu Lingala + Français",
        "✅ Jeux éducatifs interactifs",
        "✅ Histoires congolaises",
        "✅ Support prioritaire",
      ],
      popular: true,
    },
    {
      id: "etudiant",
      nom: "Étudiant",
      prix: "1500 FCFA/mois",
      description: "Idéal pour les étudiants",
      features: [
        "✅ Tous les profils exclusifs",
        "✅ Contenu académique avancé",
        "✅ Exercices universitaires",
        "✅ Certificats de progression",
      ],
    },
    {
      id: "business",
      nom: "Business",
      prix: "5000 FCFA/mois",
      description: "Pour les professionnels",
      features: [
        "✅ Vocabulaire business avancé",
        "✅ Simulations de réunions",
        "✅ Anglais des affaires",
        "✅ Coaching personnalisé",
      ],
    },
  ];

  const handleUpgrade = async (planId) => {
    try {
      const result = await updateSubscription(planId);
      if (result.success) {
        alert(
          `🎉 Félicitations ! Vous êtes maintenant abonné au plan ${planId.toUpperCase()}`
        );
        onClose();
        // Recharger la page pour mettre à jour l'accès
        window.location.reload();
      }
    } catch (error) {
      alert("❌ Erreur lors de la mise à jour. Veuillez réessayer.");
    }
  };

  return (
    <div className="modal-overlay premium-modal" onClick={onClose}>
      <div
        className="modal-content premium-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="premium-header">
          <h2>🚀 Débloquez tout le potentiel d'AnglaisCongo</h2>
          <p>
            Accédez au contenu exclusif : <strong>{feature}</strong>
          </p>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="premium-body">
          <div className="plans-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`plan-card ${plan.popular ? "popular" : ""}`}
              >
                {plan.popular && (
                  <div className="popular-badge">🔥 Populaire</div>
                )}

                <div className="plan-header">
                  <h3>{plan.nom}</h3>
                  <div className="plan-prix">{plan.prix}</div>
                  <p>{plan.description}</p>
                </div>

                <div className="plan-features">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  className={`btn-upgrade ${plan.popular ? "btn-popular" : ""}`}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {plan.popular ? "🌟 Choisir ce plan" : "Sélectionner"}
                </button>
              </div>
            ))}
          </div>

          <div className="payment-info">
            <h3>💳 Moyens de paiement</h3>
            <div className="payment-methods">
              <div className="payment-method">
                <span>📱 MTN Mobile Money</span>
                <span className="coming-soon">Bientôt disponible</span>
              </div>
              <div className="payment-method">
                <span>💰 CinetPay</span>
                <span className="coming-soon">Bientôt disponible</span>
              </div>
            </div>
            <p className="payment-note">
              🔒 Paiements sécurisés • ❌ Annulation à tout moment • 🎯 Support
              client dédié
            </p>
          </div>
        </div>

        <div className="premium-footer">
          <button className="btn-secondary" onClick={onClose}>
            Peut-être plus tard
          </button>
          <button
            className="btn-primary"
            onClick={() => handleUpgrade("famille")}
          >
            🚀 Commencer maintenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpgradeModal;
