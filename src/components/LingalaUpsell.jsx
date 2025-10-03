import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "./LingalaUpsell.css";

const LingalaUpsell = ({ onUpgradeClick, compact = false }) => {
  const { user, updateSubscription } = useAuth();

  const handleUpgrade = async () => {
    // Simulation de mise à jour d'abonnement
    const result = await updateSubscription("famille");
    if (result.success) {
      console.log("🎉 Abonnement mis à jour !");
      onUpgradeClick?.();
    }
  };

  const pricingPlans = [
    {
      name: "Famille",
      price: "2.500 FCFA",
      period: "par mois",
      features: ["Accès Lingala", "4 comptes", "Contenu enfants"],
    },
    {
      name: "Étudiant+",
      price: "3.500 FCFA",
      period: "par mois",
      features: ["Accès Lingala", "Spécialisations", "Certificats"],
    },
    {
      name: "Business",
      price: "8.000 FCFA",
      period: "par mois",
      features: ["Accès Lingala", "Formation pro", "Support prioritaire"],
    },
  ];

  if (compact) {
    return (
      <div className="lingala-upsell-compact">
        <div className="upsell-header">
          <span className="upsell-icon">🔒</span>
          <div className="upsell-text">
            <h4>Contenu Lingala Premium</h4>
            <p>Débloquez l'apprentissage depuis le Lingala</p>
          </div>
        </div>
        <button className="upsell-btn-compact" onClick={handleUpgrade}>
          Débloquer - à partir de 2.500 FCFA/mois
        </button>
      </div>
    );
  }

  return (
    <div className="lingala-upsell">
      <div className="upsell-hero">
        <div className="hero-icon">🇨🇬✨</div>
        <h2>Apprenez l'anglais depuis le Lingala !</h2>
        <p className="hero-subtitle">
          Enfin une application qui respecte votre langue maternelle
        </p>
      </div>

      <div className="upsell-benefits">
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">🎯</div>
            <h4>Culturellement adapté</h4>
            <p>Contenu pensé pour les Congolais, par des Congolais</p>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">🗣️</div>
            <h4>Prononciation authentique</h4>
            <p>Audio par des locuteurs natifs du Lingala</p>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">💼</div>
            <h4>Utile au quotidien</h4>
            <p>Expressions du marché, famille, vie sociale</p>
          </div>
        </div>
      </div>

      <div className="pricing-section">
        <h3>Choisissez votre formule</h3>
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="pricing-card">
              <div className="plan-header">
                <h4>{plan.name}</h4>
                <div className="plan-price">
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">{plan.period}</span>
                </div>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
                <li>✓ Accès Lingala → Anglais</li>
              </ul>

              <button className="plan-select-btn" onClick={handleUpgrade}>
                Choisir {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="upsell-guarantee">
        <div className="guarantee-content">
          <span className="guarantee-icon">🛡️</span>
          <div>
            <h4>Satisfait ou remboursé</h4>
            <p>7 jours d'essai gratuit - Annulez à tout moment</p>
          </div>
        </div>
      </div>

      <div className="upsell-footer">
        <p className="footer-note">
          ⚡ <strong>Offre spéciale lancement</strong> - Prix congolais adaptés
        </p>
      </div>
    </div>
  );
};

export default LingalaUpsell;
