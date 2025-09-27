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

// Fonction audio améliorée avec voix plus humaine et naturelle
export const parlerAvecStyle = (texte, langue = "fr") => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;

    // Arrêter toute parole en cours
    synth.cancel();

    // Vérifier si déjà en train de parler
    if (synth.speaking) {
      console.log("Déjà en train de parler, annulation");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(texte);

    // Paramètres voix naturelle et humaine
    utterance.lang = langue === "fr" ? "fr-FR" : "en-US";
    utterance.rate = 0.82; // Rythme naturel de conversation
    utterance.pitch = 1.05; // Légèrement plus chaleureux
    utterance.volume = 0.92; // Volume confortable

    // Chercher les meilleures voix disponibles
    const voices = synth.getVoices();
    const preferredVoices = {
      "fr-FR": ["Google français", "Natural", "Julie", "Virginie", "Audrey"],
      "en-US": [
        "Google US English",
        "Samantha",
        "Alex",
        "Karen",
        "Microsoft David",
      ],
    };

    const targetLang = langue === "fr" ? "fr-FR" : "en-US";
    let bestVoice = null;

    // Chercher la voix idéale par ordre de préférence
    for (const voiceName of preferredVoices[targetLang]) {
      const voice = voices.find(
        (v) => v.lang === targetLang && v.name.includes(voiceName)
      );
      if (voice) {
        bestVoice = voice;
        console.log("Voix sélectionnée:", voice.name);
        break;
      }
    }

    // Fallback : première voix disponible dans la langue
    if (!bestVoice) {
      bestVoice = voices.find((v) => v.lang === targetLang);
      if (bestVoice) {
        console.log("Voix fallback:", bestVoice.name);
      }
    }

    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    // Gestion avancée des événements
    utterance.onstart = () => {
      console.log("Lecture audio démarrée");
      // Feedback visuel
      const buttons = document.querySelectorAll(".btn-audio");
      buttons.forEach((btn) => {
        btn.classList.add("playing");
        btn.disabled = true;
      });
    };

    utterance.onend = () => {
      console.log("Lecture audio terminée");
      setTimeout(() => {
        const buttons = document.querySelectorAll(".btn-audio");
        buttons.forEach((btn) => {
          btn.classList.remove("playing");
          btn.disabled = false;
        });
      }, 200);
    };

    utterance.onerror = (event) => {
      console.error("Erreur audio:", event);
      const buttons = document.querySelectorAll(".btn-audio");
      buttons.forEach((btn) => {
        btn.classList.remove("playing");
        btn.disabled = false;
      });

      // Fallback utilisateur
      alert(`🔊 ${langue.toUpperCase()}: ${texte}`);
    };

    // Délai pour la stabilité
    setTimeout(() => {
      try {
        synth.speak(utterance);
      } catch (error) {
        console.error("Erreur critique:", error);
        alert(`🎧 ${texte}`);
      }
    }, 120);
  } else {
    // Fallback pour navigateurs sans synthèse vocale
    const msg = `🔊 ${langue.toUpperCase()}: ${texte}`;
    console.log(msg);
    alert(msg);
  }
};
