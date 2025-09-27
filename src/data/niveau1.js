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

// Fonction de synthèse vocale
export const parlerPhrase = (texte, langue = "en") => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    // Arrêter toute parole en cours
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(texte);
    utterance.lang = langue === "fr" ? "fr-FR" : "en-US";
    utterance.rate = 0.9; // Vitesse légèrement réduite
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    synth.speak(utterance);
  } else {
    console.warn("Synthèse vocale non supportée");
  }
};
