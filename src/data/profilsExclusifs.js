// src/data/profilsExclusifs.js
export const profilsExclusifs = {
  commercant: {
    titre: "Commerçant des Marchés Congolais",
    description: "Négocier comme un vrai Congolais",
    icon: "🛍️",
    phrases: [
      {
        id: 1,
        fr: "Mon frère, fais-moi un prix congolais !",
        en: "My brother, give me a Congolese price!",
        tips: "Utilise 'mon frère/ma sœur' pour créer une connexion",
      },
      {
        id: 2,
        fr: "Je suis un client habitué de ce marché",
        en: "I'm a regular customer of this market",
        tips: "Montre que tu connais les coutumes locales",
      },
      {
        id: 3,
        fr: "Le produit vient d'où ? De Kin ou de Brazza ?",
        en: "Where is the product from? Kinshasa or Brazzaville?",
        tips: "Montre ton intérêt pour l'origine des produits",
      },
      {
        id: 4,
        fr: "C'est le dernier prix ? Je prends en gros",
        en: "Is this the final price? I'm buying in bulk",
        tips: "Négocie en mentionnant un achat en quantité",
      },
      {
        id: 5,
        fr: "Tu vois, je viens directement à toi",
        en: "You see, I came directly to you",
        tips: "Souligne ta loyauté pour obtenir un meilleur prix",
      },
      {
        id: 6,
        fr: "Aujourd'hui c'est la fête, fais-moi plaisir",
        en: "Today is a celebration, make me happy",
        tips: "Utilise les événements pour négocier",
      },
      {
        id: 7,
        fr: "Je reviendrai avec mes amis",
        en: "I'll come back with my friends",
        tips: "Promettre du business futur",
      },
      {
        id: 8,
        fr: "Le produit est frais ? Il vient d'arriver ?",
        en: "Is the product fresh? Did it just arrive?",
        tips: "Questionne la qualité pour justifier ton prix",
      },
      {
        id: 9,
        fr: "On se comprend entre Congolais",
        en: "We understand each other as Congolese",
        tips: "Crée un lien national pour la négociation",
      },
      {
        id: 10,
        fr: "Je paie cash, pas de crédit",
        en: "I pay cash, no credit",
        tips: "Le cash est roi dans les marchés",
      },
    ],
  },

  etudiant: {
    titre: "Étudiant des Campus Congolais",
    description: "Vie étudiante au Congo",
    icon: "🎓",
    phrases: [
      {
        id: 11,
        fr: "Le prof a reporté le cours à demain",
        en: "The teacher postponed the class to tomorrow",
        tips: "Les reports de cours sont fréquents",
      },
      {
        id: 12,
        fr: "On se retrouve à la bibliothèque de l'Université Marien Ngouabi ?",
        en: "Shall we meet at Marien Ngouabi University library?",
        tips: "Utilise les lieux emblématiques",
      },
      {
        id: 13,
        fr: "J'ai un exposé sur la culture congolaise",
        en: "I have a presentation on Congolese culture",
        tips: "Sujets locaux valorisés",
      },
      {
        id: 14,
        fr: "Les notes sont tombées sur le campus",
        en: "The grades are out on campus",
        tips: "Expression locale pour les résultats",
      },
      {
        id: 15,
        fr: "On organise une soirée à Bacongo ce weekend",
        en: "We're organizing a party in Bacongo this weekend",
        tips: "Vie sociale étudiante",
      },
    ],
  },

  transport: {
    titre: "Transport dans les Rues de Brazzaville",
    description: "Prendre les transports en commun",
    icon: "🚗",
    phrases: [
      {
        id: 16,
        fr: "Chauffeur, arrête au Rond-Point de la Poste",
        en: "Driver, stop at Post Office Roundabout",
        tips: "Points de repère connus",
      },
      {
        id: 17,
        fr: "Combien pour aller à Talangaï ?",
        en: "How much to go to Talangaï?",
        tips: "Quartiers spécifiques de Brazzaville",
      },
      {
        id: 18,
        fr: "Tu passes par le Centre-ville ?",
        en: "Are you going through downtown?",
        tips: "Vérifier l'itinéraire",
      },
      {
        id: 19,
        fr: "Attention, il y a des nids-de-poule",
        en: "Watch out, there are potholes",
        tips: "Réalité des routes congolaises",
      },
      {
        id: 20,
        fr: "Dépose-moi au marché Total",
        en: "Drop me off at Total market",
        tips: "Marchés comme points de repère",
      },
    ],
  },

  parent: {
    titre: "Parent Congolais",
    description: "Vie familiale au Congo",
    icon: "👨‍👩‍👧‍👦",
    phrases: [
      {
        id: 21,
        fr: "As-tu salué tes grands-parents ?",
        en: "Did you greet your grandparents?",
        tips: "Respect des aînés très important",
      },
      {
        id: 22,
        fr: "On va à l'église dimanche",
        en: "We're going to church on Sunday",
        tips: "Vie religieuse familiale",
      },
      {
        id: 23,
        fr: "Mange ton fufu et pondu",
        en: "Eat your fufu and pondu",
        tips: "Plats traditionnels congolais",
      },
      {
        id: 24,
        fr: "Sois sage à l'école",
        en: "Be good at school",
        tips: "Éducation valorisée",
      },
    ],
  },
};

// Fonction audio améliorée
export const parlerAvecStyle = (texte, langue = "en") => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(texte);
    utterance.lang = langue === "fr" ? "fr-FR" : "en-US";
    utterance.rate = 0.8; // Plus lent pour l'apprentissage
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    synth.speak(utterance);
  }
};
