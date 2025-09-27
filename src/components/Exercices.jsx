import React, { useState } from "react";
import ExerciceQCM from "./ExerciceQCM";
import "./Exercices.css";

const Exercices = () => {
  const [showExercice, setShowExercice] = useState(false);

  return (
    <section id="exercices" className="exercices">
      <div className="container">
        <div className="exercices-header">
          <h2>
            🎯 <span className="accent-congo">Exercice Gratuit</span>
          </h2>
          <p className="section-subtitle">
            Testez vos connaissances avec notre exercice de traduction
          </p>
        </div>

        {!showExercice ? (
          <div className="exercices-preview">
            <div className="preview-card">
              <div className="preview-icon">🇫🇷 → 🇺🇸</div>
              <h3>Quiz de Traduction</h3>
              <p>Traduisez des phrases du français vers l'anglais</p>
              <ul className="preview-features">
                <li>✅ QCM interactif</li>
                <li>✅ Feedback immédiat</li>
                <li>✅ Score en temps réel</li>
                <li>✅ 100% gratuit</li>
              </ul>
              <button
                className="btn-exercice-demo"
                onClick={() => setShowExercice(true)}
              >
                🚀 Essayer l'exercice
              </button>
            </div>
          </div>
        ) : (
          <div className="exercice-actif">
            <button
              className="btn-retour"
              onClick={() => setShowExercice(false)}
            >
              ← Retour à la présentation
            </button>
            <ExerciceQCM />
          </div>
        )}
      </div>
    </section>
  );
};

export default Exercices;
