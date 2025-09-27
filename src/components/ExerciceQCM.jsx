import React, { useState, useEffect } from "react";
import { niveau1Data, parlerPhrase } from "../data/niveau1";
import "./ExerciceQCM.css";

const ExerciceQCM = () => {
  const [phrases, setPhrases] = useState([]);
  const [phraseActuelle, setPhraseActuelle] = useState(null);
  const [options, setOptions] = useState([]);
  const [reponseUtilisateur, setReponseUtilisateur] = useState("");
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showResultat, setShowResultat] = useState(false);

  // Initialiser l'exercice
  useEffect(() => {
    demarrerExercice();
  }, []);

  const demarrerExercice = () => {
    // Mélanger toutes les phrases disponibles
    const toutesPhrases = [
      ...niveau1Data.salutations,
      ...niveau1Data.presentations,
    ].sort(() => Math.random() - 0.5);

    setPhrases(toutesPhrases);
    setScore(0);
    setTotalQuestions(0);
    setShowResultat(false);
    phraseSuivante(toutesPhrases);
  };

  const phraseSuivante = (phrasesList) => {
    if (phrasesList.length === 0) {
      setShowResultat(true);
      return;
    }

    const phrase = phrasesList[0];
    setPhraseActuelle(phrase);
    setReponseUtilisateur("");

    // Générer des options aléatoires
    const autresPhrases = phrasesList
      .filter((p) => p.id !== phrase.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((p) => p.en);

    const optionsMelangees = [phrase.en, ...autresPhrases].sort(
      () => Math.random() - 0.5
    );

    setOptions(optionsMelangees);
    setPhrases(phrasesList.slice(1));
  };

  const verifierReponse = (reponse) => {
    setReponseUtilisateur(reponse);
    setTotalQuestions(totalQuestions + 1);

    if (reponse === phraseActuelle.en) {
      setScore(score + 1);
    }

    // Passer à la phrase suivante après un délai
    setTimeout(() => {
      phraseSuivante(phrases);
    }, 1500);
  };

  const ecouterPhrase = () => {
    parlerPhrase(phraseActuelle.fr, "fr");
  };

  if (showResultat) {
    return (
      <div className="exercice-container">
        <div className="resultat-final">
          <h3>🎉 Exercice Terminé !</h3>
          <div className="score">
            <span className="score-chiffre">
              {score}/{totalQuestions}
            </span>
            <span className="score-pourcentage">
              ({Math.round((score / totalQuestions) * 100)}%)
            </span>
          </div>
          <button className="btn-recommencer" onClick={demarrerExercice}>
            🔄 Recommencer
          </button>
        </div>
      </div>
    );
  }

  if (!phraseActuelle) {
    return (
      <div className="exercice-container">
        <div className="chargement">Chargement de l'exercice...</div>
      </div>
    );
  }

  return (
    <div className="exercice-container">
      <div className="exercice-header">
        <h3>🇫🇷 → 🇺🇸 Traduction</h3>
        <div className="score-actuel">
          Score: {score}/{totalQuestions}
        </div>
      </div>

      <div className="phrase-a-traduire">
        <div className="phrase-fr">
          "{phraseActuelle.fr}"
          <button
            className="btn-ecouter"
            onClick={ecouterPhrase}
            title="Écouter"
          >
            🔊
          </button>
        </div>
        <p>Choisissez la bonne traduction :</p>
      </div>

      <div className="options-reponse">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${
              reponseUtilisateur === option
                ? option === phraseActuelle.en
                  ? "correct"
                  : "incorrect"
                : ""
            } ${reponseUtilisateur ? "disabled" : ""}`}
            onClick={() => !reponseUtilisateur && verifierReponse(option)}
            disabled={!!reponseUtilisateur}
          >
            {option}
            {reponseUtilisateur === option && (
              <span className="feedback-icon">
                {option === phraseActuelle.en ? "✅" : "❌"}
              </span>
            )}
          </button>
        ))}
      </div>

      {reponseUtilisateur && (
        <div
          className={`feedback ${
            reponseUtilisateur === phraseActuelle.en ? "correct" : "incorrect"
          }`}
        >
          {reponseUtilisateur === phraseActuelle.en ? (
            <span>
              ✅ Correct ! La réponse était bien "{phraseActuelle.en}"
            </span>
          ) : (
            <span>
              ❌ Presque ! La bonne réponse était "{phraseActuelle.en}"
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciceQCM;
