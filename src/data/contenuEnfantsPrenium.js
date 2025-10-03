// src/data/contenuEnfantsPremium.js - Contenu exclusif pour enfants congolais
export const contenuEnfantsPremium = {
  comptines: [
    {
      id: 1,
      titre: "Twinkle Twinkle Little Star - Version Congo",
      fr: "Petite étoile qui brille, comme les lumières de Brazzaville",
      en: "Twinkle, twinkle, little star, how I wonder what you are",
      audio: "twinkle-star",
      illustration: "⭐",
      description: "Comptine classique adaptée au Congo",
    },
    {
      id: 2,
      titre: "ABC Song - Alphabet Congolais",
      fr: "A comme Antilope, B comme Banane, C comme Congo",
      en: "A is for Antelope, B is for Banana, C is for Congo",
      audio: "abc-congo",
      illustration: "🔤",
      description: "Apprendre l'alphabet avec des mots du Congo",
    },
    {
      id: 3,
      titre: "Head Shoulders - Mon Corps",
      fr: "Tête, épaules, genoux, pieds - comme papa et maman",
      en: "Head, shoulders, knees and toes, knees and toes",
      audio: "head-shoulders",
      illustration: "👶",
      description: "Apprendre les parties du corps en chantant",
    },
    {
      id: 4,
      titre: "Old MacDonald - Ferme Congolaise",
      fr: "Papa Makala a une ferme, avec des chèvres et des poules",
      en: "Old MacDonald had a farm, with goats and chickens",
      audio: "farm-congo",
      illustration: "🐐",
      description: "Découvrir les animaux de la ferme congolaise",
    },
    {
      id: 5,
      titre: "If You're Happy - Si tu es content",
      fr: "Si tu es content, tape des mains comme à la fête",
      en: "If you're happy and you know it, clap your hands",
      audio: "happy-clap",
      illustration: "👏",
      description: "Exprimer la joie à la congolaise",
    },
  ],

  jeux: [
    {
      id: 1,
      nom: "Memory des Animaux du Congo",
      type: "memory",
      description: "Retrouve les paires d'animaux congolais",
      niveau: "facile",
      cartes: [
        { id: 1, nom: "Éléphant", en: "Elephant", emoji: "🐘" },
        { id: 2, nom: "Singe", en: "Monkey", emoji: "🐵" },
        { id: 3, nom: "Perroquet", en: "Parrot", emoji: "🦜" },
        { id: 4, nom: "Antilope", en: "Antelope", emoji: "🦌" },
        { id: 5, nom: "Crocodile", en: "Crocodile", emoji: "🐊" },
        { id: 6, nom: "Hippopotame", en: "Hippo", emoji: "🦛" },
      ],
    },
    {
      id: 2,
      nom: "Coloriage Magique - Fruits du Congo",
      type: "coloriage",
      description: "Colorie en écoutant les noms en anglais",
      niveau: "facile",
      images: [
        { nom: "Mangue", en: "Mango", couleur: "#FFA500" },
        { nom: "Banane", en: "Banana", couleur: "#FFFF00" },
        { nom: "Papaye", en: "Papaya", couleur: "#FF6347" },
        { nom: "Ananas", en: "Pineapple", couleur: "#FFD700" },
      ],
    },
    {
      id: 3,
      nom: "Quiz des Salutations",
      type: "quiz",
      description: "Comment dit-on bonjour en anglais ?",
      niveau: "débutant",
      questions: [
        {
          question: "Comment dit-on 'Bonjour' en anglais ?",
          options: ["Hello", "Goodbye", "Please", "Thank you"],
          correct: 0,
          explication: "Hello = Bonjour en anglais !",
        },
        {
          question: "Comment dit-on 'Au revoir' en anglais ?",
          options: ["Hello", "Goodbye", "Sorry", "Yes"],
          correct: 1,
          explication: "Goodbye = Au revoir en anglais !",
        },
      ],
    },
    {
      id: 4,
      nom: "Puzzle des Nombres",
      type: "puzzle",
      description: "Remets les nombres dans l'ordre",
      niveau: "facile",
      pieces: [
        { numero: 1, en: "One", fr: "Un" },
        { numero: 2, en: "Two", fr: "Deux" },
        { numero: 3, en: "Three", fr: "Trois" },
        { numero: 4, en: "Four", fr: "Quatre" },
        { numero: 5, en: "Five", fr: "Cinq" },
      ],
    },
  ],

  vocabulaire: [
    {
      categorie: "Famille Congolaise",
      mots: [
        { fr: "Papa", en: "Daddy", emoji: "👨", audio: "daddy" },
        { fr: "Maman", en: "Mommy", emoji: "👩", audio: "mommy" },
        { fr: "Grand-père", en: "Grandpa", emoji: "👴", audio: "grandpa" },
        { fr: "Grand-mère", en: "Grandma", emoji: "👵", audio: "grandma" },
        { fr: "Frère", en: "Brother", emoji: "👦", audio: "brother" },
        { fr: "Sœur", en: "Sister", emoji: "👧", audio: "sister" },
      ],
    },
    {
      categorie: "Nourriture Congolaise",
      mots: [
        { fr: "Fufu", en: "Fufu", emoji: "🍚", audio: "fufu" },
        { fr: "Pondu", en: "Pondu", emoji: "🥬", audio: "pondu" },
        { fr: "Poisson", en: "Fish", emoji: "🐟", audio: "fish" },
        { fr: "Banane", en: "Banana", emoji: "🍌", audio: "banana" },
        { fr: "Manioc", en: "Cassava", emoji: "🥔", audio: "cassava" },
      ],
    },
    {
      categorie: "École et Jeux",
      mots: [
        { fr: "École", en: "School", emoji: "🏫", audio: "school" },
        { fr: "Livre", en: "Book", emoji: "📚", audio: "book" },
        { fr: "Crayon", en: "Pencil", emoji: "✏️", audio: "pencil" },
        { fr: "Ballon", en: "Ball", emoji: "⚽", audio: "ball" },
        { fr: "Poupée", en: "Doll", emoji: "🪆", audio: "doll" },
      ],
    },
  ],

  histoires: [
    {
      id: 1,
      titre: "Le Petit Éléphant de la Sangha",
      description: "Une histoire d'amitié dans la forêt congolaise",
      niveau: "débutant",
      pages: [
        {
          fr: "Il était une fois un petit éléphant qui vivait près de la rivière Sangha",
          en: "Once upon a time, there was a little elephant who lived near the Sangha river",
          image: "🐘🏞️",
        },
        {
          fr: "Il voulait apprendre à parler anglais pour rencontrer des amis du monde entier",
          en: "He wanted to learn English to meet friends from around the world",
          image: "🌍👫",
        },
        {
          fr: "Un jour, il rencontra un perroquet qui parlait plusieurs langues",
          en: "One day, he met a parrot who spoke many languages",
          image: "🦜💬",
        },
      ],
    },
  ],

  activites: [
    {
      nom: "Karaoké Enfant",
      description: "Chante tes comptines préférées",
      type: "karaoke",
      icon: "🎤",
    },
    {
      nom: "Théâtre de Marionnettes",
      description: "Joue des scènes en anglais",
      type: "theatre",
      icon: "🎭",
    },
    {
      nom: "Dessin Animé Interactif",
      description: "Regarde et participe",
      type: "video",
      icon: "📺",
    },
  ],
};

// Fonction pour jouer les comptines avec animation
export const jouerComptine = (comptine) => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    synth.cancel();

    // Animation visuelle
    const animateComptine = () => {
      const comptineElement = document.querySelector(
        `[data-comptine="${comptine.id}"]`
      );
      if (comptineElement) {
        comptineElement.classList.add("playing-animation");
        setTimeout(() => {
          comptineElement.classList.remove("playing-animation");
        }, 3000);
      }
    };

    // Jouer en français puis en anglais
    const playSequence = async () => {
      animateComptine();

      // Français d'abord
      const utteranceFr = new SpeechSynthesisUtterance(comptine.fr);
      utteranceFr.lang = "fr-FR";
      utteranceFr.rate = 0.7; // Plus lent pour les enfants
      utteranceFr.pitch = 1.2; // Plus aigu et enjoué

      synth.speak(utteranceFr);

      // Attendre la fin du français
      utteranceFr.onend = () => {
        setTimeout(() => {
          // Puis anglais
          const utteranceEn = new SpeechSynthesisUtterance(comptine.en);
          utteranceEn.lang = "en-US";
          utteranceEn.rate = 0.7;
          utteranceEn.pitch = 1.2;

          synth.speak(utteranceEn);
        }, 500);
      };
    };

    playSequence();
  }
};
