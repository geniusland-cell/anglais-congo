// src/data/niveau1.js
export const niveau1Data = {
  salutations: [
    { id: 1, fr: "Bonjour", en: "Hello" },
    { id: 2, fr: "Bonsoir", en: "Good evening" },
    { id: 3, fr: "Au revoir", en: "Goodbye" },
    { id: 4, fr: "Comment ça va ?", en: "How are you?" },
    { id: 5, fr: "Ça va bien, merci", en: "I'm fine, thank you" },
    { id: 6, fr: "Et toi ?", en: "And you?" },
    { id: 7, fr: "Enchanté(e)", en: "Nice to meet you" },
    { id: 8, fr: "À demain", en: "See you tomorrow" },
    { id: 9, fr: "À bientôt", en: "See you soon" },
    { id: 10, fr: "Bonne journée", en: "Have a good day" },
    { id: 11, fr: "Bonne nuit", en: "Good night" },
    { id: 12, fr: "S'il vous plaît", en: "Please" },
    { id: 13, fr: "Merci beaucoup", en: "Thank you very much" },
    { id: 14, fr: "Excusez-moi", en: "Excuse me" },
    { id: 15, fr: "De rien", en: "You're welcome" },
  ],

  presentations: [
    { id: 16, fr: "Je m'appelle...", en: "My name is..." },
    { id: 17, fr: "Je viens de...", en: "I come from..." },
    { id: 18, fr: "J'habite à...", en: "I live in..." },
    { id: 19, fr: "J'ai ... ans", en: "I am ... years old" },
    { id: 20, fr: "Je suis étudiant(e)", en: "I am a student" },
    { id: 21, fr: "Je travaille comme...", en: "I work as..." },
    { id: 22, fr: "Je suis congolais(e)", en: "I am Congolese" },
    { id: 23, fr: "Enchanté de vous rencontrer", en: "Nice to meet you" },
    { id: 24, fr: "Quel est votre nom ?", en: "What is your name?" },
    { id: 25, fr: "D'où venez-vous ?", en: "Where are you from?" },
  ],
};

// Fonction de synthèse vocale améliorée - Voix plus humaine
export const parlerPhrase = (texte, langue = "fr") => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;

    // Arrêter toute parole en cours
    synth.cancel();

    // Attendre que la synthèse soit prête
    if (synth.speaking) {
      console.error("SpeechSynthesis is already speaking");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(texte);

    // Configuration pour un son plus naturel et humain
    utterance.lang = langue === "fr" ? "fr-FR" : "en-US";
    utterance.rate = 0.85; // Plus lent pour la clarté
    utterance.pitch = 1.0; // Hauteur naturelle
    utterance.volume = 0.95; // Volume optimal

    // Sélectionner une voix plus naturelle si disponible
    const voices = synth.getVoices();
    let selectedVoice = null;

    if (langue === "fr") {
      // Priorité aux voix françaises naturelles
      selectedVoice = voices.find(
        (voice) =>
          voice.lang === "fr-FR" &&
          (voice.name.includes("Google") ||
            voice.name.includes("Natural") ||
            voice.name.includes("Julie"))
      );
    } else {
      // Priorité aux voix anglaises naturelles
      selectedVoice = voices.find(
        (voice) =>
          voice.lang === "en-US" &&
          (voice.name.includes("Google") ||
            voice.name.includes("Natural") ||
            voice.name.includes("Samantha") ||
            voice.name.includes("Alex"))
      );
    }

    // Si aucune voix idéale, prendre la première disponible
    if (!selectedVoice) {
      selectedVoice = voices.find(
        (voice) => voice.lang === (langue === "fr" ? "fr-FR" : "en-US")
      );
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log("Voix utilisée:", selectedVoice.name);
    }

    // Gérer les événements pour un meilleur contrôle
    utterance.onstart = () => {
      console.log("Début de la synthèse vocale");
      // Désactiver temporairement les boutons
      document.querySelectorAll(".btn-audio").forEach((btn) => {
        btn.style.opacity = "0.7";
        btn.style.cursor = "not-allowed";
      });
    };

    utterance.onend = () => {
      console.log("Fin de la synthèse vocale");
      // Réactiver les boutons
      setTimeout(() => {
        document.querySelectorAll(".btn-audio").forEach((btn) => {
          btn.style.opacity = "1";
          btn.style.cursor = "pointer";
        });
      }, 300);
    };

    utterance.onerror = (event) => {
      console.error("Erreur synthèse vocale:", event);
      // Réactiver les boutons en cas d'erreur
      document.querySelectorAll(".btn-audio").forEach((btn) => {
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
      });
    };

    // Petite pause avant de parler pour une meilleure stabilité
    setTimeout(() => {
      try {
        synth.speak(utterance);
      } catch (error) {
        console.error("Erreur lors de la synthèse:", error);
        // Fallback simple
        alert(`Prononciation : ${texte}`);
      }
    }, 100);
  } else {
    console.warn("Synthèse vocale non supportée par ce navigateur");
    // Fallback : afficher un message
    alert(`🎧 ${langue.toUpperCase()} : ${texte}`);
  }
};
