import { useState, useEffect } from "react";
import { languesDisponibles } from "../config/langues";

export const useLangue = () => {
  const [langueActuelle, setLangueActuelle] = useState("fr");

  useEffect(() => {
    // Charger la préference sauvegardée
    const langueSauvegardee = localStorage.getItem("preferenceLangue");
    if (langueSauvegardee && languesDisponibles[langueSauvegardee]) {
      setLangueActuelle(langueSauvegardee);
    }
  }, []);

  const traduire = (cle) => {
    return languesDisponibles[langueActuelle]?.traductions[cle] || cle;
  };

  return {
    langueActuelle,
    setLangueActuelle,
    traduire,
  };
};
