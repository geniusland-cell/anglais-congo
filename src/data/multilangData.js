// src/data/multilangData.js

// Configuration voix humaines par défaut
export const VOICE_CONFIG = {
  fr: {
    lang: "fr-FR",
    preferredVoices: ["Google français", "Virginie", "Audrey", "Natural"],
    rate: 0.85,
    pitch: 1.05,
    volume: 0.95,
  },
  ln: {
    lang: "fr-FR", // Fallback français pour lingala
    preferredVoices: ["Google français", "Virginie"],
    rate: 0.82,
    pitch: 1.08, // Légèrement plus aigu pour lingala
    volume: 0.92,
  },
  en: {
    lang: "en-US",
    preferredVoices: ["Google US English", "Samantha", "Alex", "Natural"],
    rate: 0.88,
    pitch: 1.02,
    volume: 0.94,
  },
};

export const multilangContent = {
  // ====================
  // CONTENU GRATUIT (Français seulement)
  // ====================
  gratuit: {
    salutations: [
      {
        id: 1,
        fr: {
          text: "Bonjour",
          audio: null, // Utilisera synthèse vocale
          tips: "Utilisé à tout moment de la journée",
          pronunciation: "bon-jour",
        },
        en: {
          text: "Hello",
          pronunciation: "heh-loh",
        },
        category: "salutations",
        difficulty: 1,
      },
      {
        id: 2,
        fr: {
          text: "Comment ça va ?",
          audio: null,
          tips: "Forme courte de 'Comment vas-tu ?'",
          pronunciation: "ko-mon sa va",
        },
        en: {
          text: "How are you?",
          pronunciation: "how ar yoo",
        },
        category: "salutations",
        difficulty: 1,
      },
      {
        id: 3,
        fr: {
          text: "Je m'appelle...",
          audio: null,
          tips: "Pour se présenter",
          pronunciation: "je ma-pel",
        },
        en: {
          text: "My name is...",
          pronunciation: "my naym iz",
        },
        category: "presentations",
        difficulty: 1,
      },
      {
        id: 4,
        fr: {
          text: "Merci",
          audio: null,
          tips: "Toujours poli de remercier",
          pronunciation: "mer-see",
        },
        en: {
          text: "Thank you",
          pronunciation: "thank yoo",
        },
        category: "salutations",
        difficulty: 1,
      },
      {
        id: 5,
        fr: {
          text: "Au revoir",
          audio: null,
          tips: "Utilisé quand on quitte quelqu'un",
          pronunciation: "o re-vwar",
        },
        en: {
          text: "Goodbye",
          pronunciation: "good-bye",
        },
        category: "salutations",
        difficulty: 1,
      },
    ],
    presentations: [
      {
        id: 6,
        fr: {
          text: "Je viens du Congo",
          audio: null,
          tips: "Pour indiquer son origine",
          pronunciation: "je vyen du kon-go",
        },
        en: {
          text: "I come from Congo",
          pronunciation: "ay kum from kon-go",
        },
        category: "presentations",
        difficulty: 2,
      },
      {
        id: 7,
        fr: {
          text: "J'habite à Brazzaville",
          audio: null,
          tips: "Pour dire où on vit",
          pronunciation: "ja-beet a bra-za-veel",
        },
        en: {
          text: "I live in Brazzaville",
          pronunciation: "ay liv in bra-za-veel",
        },
        category: "presentations",
        difficulty: 2,
      },
      {
        id: 8,
        fr: {
          text: "Je suis étudiant",
          audio: null,
          tips: "Pour parler de sa situation",
          pronunciation: "je swee zay-tu-dyan",
        },
        en: {
          text: "I am a student",
          pronunciation: "ay am a stoo-dent",
        },
        category: "presentations",
        difficulty: 2,
      },
    ],
  },

  // ====================
  // CONTENU PREMIUM (Français + Lingala)
  // ====================
  premium: {
    salutations: [
      {
        id: 101,
        fr: {
          text: "Enchanté de vous rencontrer",
          audio: null,
          tips: "Formel, pour une première rencontre",
          pronunciation: "on-shan-tay de voo ron-kon-tray",
        },
        ln: {
          text: "Esengo na ngai",
          audio: null,
          tips: "Littéralement 'Joie à moi'",
          pronunciation: "e-sen-go na ngai",
        },
        en: {
          text: "Nice to meet you",
          pronunciation: "nays to meet yoo",
        },
        category: "salutations",
        difficulty: 2,
      },
      {
        id: 102,
        fr: {
          text: "Comment s'est passée votre journée ?",
          audio: null,
          tips: "Pour montrer de l'intérêt",
          pronunciation: "ko-mon say pa-say vo-tre jour-nay",
        },
        ln: {
          text: "Mokolo nini?",
          audio: null,
          tips: "Littéralement 'Journée comment ?'",
          pronunciation: "mo-ko-lo ni-ni",
        },
        en: {
          text: "How was your day?",
          pronunciation: "how woz yor day",
        },
        category: "salutations",
        difficulty: 3,
      },
    ],
    marche: [
      {
        id: 201,
        fr: {
          text: "Je prends en gros",
          audio: null,
          tips: "Pour négocier un meilleur prix",
          pronunciation: "je pron on gro",
        },
        ln: {
          text: "Nazali koya na monene",
          audio: null,
          tips: "Littéralement 'Je viens avec grand'",
          pronunciation: "na-za-li ko-ya na mo-ne-ne",
        },
        en: {
          text: "I'm buying in bulk",
          pronunciation: "aym bay-ing in bulk",
        },
        category: "marche",
        difficulty: 3,
      },
      {
        id: 202,
        fr: {
          text: "C'est le dernier prix ?",
          audio: null,
          tips: "Pour finaliser la négociation",
          pronunciation: "say le der-nye pree",
        },
        ln: {
          text: "Prix ya suka?",
          audio: null,
          tips: "Littéralement 'Prix de fin'",
          pronunciation: "pree ya su-ka",
        },
        en: {
          text: "Is this the final price?",
          pronunciation: "iz this the fay-nal prays",
        },
        category: "marche",
        difficulty: 2,
      },
      {
        id: 203,
        fr: {
          text: "Le produit est frais ?",
          audio: null,
          tips: "Important pour les aliments",
          pronunciation: "le pro-dwee ay fray",
        },
        ln: {
          text: "Produit ezali pete?",
          audio: null,
          tips: "Littéralement 'Produit est nouveau ?'",
          pronunciation: "pro-dwee e-za-li pe-te",
        },
        en: {
          text: "Is the product fresh?",
          pronunciation: "iz the pro-dukt fresh",
        },
        category: "marche",
        difficulty: 2,
      },
    ],
    famille: [
      {
        id: 301,
        fr: {
          text: "As-tu fait tes devoirs ?",
          audio: null,
          tips: "Pour les parents qui suivent les enfants",
          pronunciation: "a-tyoo fay tay de-vwar",
        },
        ln: {
          text: "Osalaki devoir na yo?",
          audio: null,
          tips: "Littéralement 'Tu as fait devoir à toi ?'",
          pronunciation: "o-sa-la-ki de-vwar na yo",
        },
        en: {
          text: "Did you do your homework?",
          pronunciation: "did yoo do yor home-werk",
        },
        category: "famille",
        difficulty: 3,
      },
      {
        id: 302,
        fr: {
          text: "À table !",
          audio: null,
          tips: "Pour appeler à manger",
          pronunciation: "a tabl",
        },
        ln: {
          text: "Na mesa!",
          audio: null,
          tips: "Littéralement 'À table'",
          pronunciation: "na me-sa",
        },
        en: {
          text: "Dinner is ready!",
          pronunciation: "di-ner iz re-di",
        },
        category: "famille",
        difficulty: 1,
      },
    ],
  },
};

// Helper functions pour la synthèse vocale
export const getContentByLanguage = (content, language, isPremium = false) => {
  const contentSource = isPremium ? content.premium : content.gratuit;

  const allContent = [];

  // Parcourir toutes les catégories
  Object.values(contentSource).forEach((category) => {
    category.forEach((item) => {
      if (language === "ln" && !item.ln) {
        return; // Skip si pas de version lingala en premium
      }

      const contentItem = {
        id: item.id,
        source: item[language]?.text || item.fr.text,
        sourceAudio: item[language]?.audio,
        sourceTips: item[language]?.tips || item.fr.tips,
        sourcePronunciation:
          item[language]?.pronunciation || item.fr.pronunciation,
        target: item.en.text,
        targetPronunciation: item.en.pronunciation,
        category: item.category,
        difficulty: item.difficulty,
        isPremium: isPremium,
      };

      allContent.push(contentItem);
    });
  });

  return allContent;
};

// Fonction de synthèse vocale améliorée
export const parlerAvecVoixHumaine = (texte, langue = "fr") => {
  if (!("speechSynthesis" in window)) {
    console.warn("Synthèse vocale non supportée");
    return;
  }

  const synth = window.speechSynthesis;

  // Arrêter toute parole en cours
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(texte);
  const config = VOICE_CONFIG[langue] || VOICE_CONFIG.fr;

  // Appliquer configuration voix humaine
  utterance.lang = config.lang;
  utterance.rate = config.rate;
  utterance.pitch = config.pitch;
  utterance.volume = config.volume;

  // Sélectionner la meilleure voix disponible
  const voices = synth.getVoices();
  let selectedVoice = null;

  for (const voiceName of config.preferredVoices) {
    const voice = voices.find(
      (v) => v.lang === config.lang && v.name.includes(voiceName)
    );
    if (voice) {
      selectedVoice = voice;
      console.log(`🎧 Voix sélectionnée: ${voice.name} pour ${langue}`);
      break;
    }
  }

  // Fallback à la première voix disponible
  if (!selectedVoice) {
    selectedVoice = voices.find((v) => v.lang === config.lang);
    if (selectedVoice) {
      console.log(`🎧 Voix fallback: ${selectedVoice.name}`);
    }
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  // Gestion des événements pour feedback visuel
  utterance.onstart = () => {
    console.log("🎤 Début synthèse vocale");
    document.querySelectorAll(".btn-audio").forEach((btn) => {
      btn.classList.add("speaking");
      btn.disabled = true;
    });
  };

  utterance.onend = () => {
    console.log("✅ Fin synthèse vocale");
    setTimeout(() => {
      document.querySelectorAll(".btn-audio").forEach((btn) => {
        btn.classList.remove("speaking");
        btn.disabled = false;
      });
    }, 300);
  };

  utterance.onerror = (event) => {
    console.error("❌ Erreur synthèse vocale:", event);
    document.querySelectorAll(".btn-audio").forEach((btn) => {
      btn.classList.remove("speaking");
      btn.disabled = false;
    });
  };

  // Lancer la synthèse avec un petit délai
  setTimeout(() => {
    try {
      synth.speak(utterance);
    } catch (error) {
      console.error("Erreur lors de la synthèse:", error);
    }
  }, 150);
};

// Récupérer toutes les phrases pour un niveau donné
export const getPhrasesForLevel = (level, language, isPremium = false) => {
  const allContent = getContentByLanguage(
    multilangContent,
    language,
    isPremium
  );

  return allContent.filter((phrase) => {
    if (level === 1) return phrase.difficulty === 1;
    if (level === 2) return phrase.difficulty <= 2;
    if (level === 3) return phrase.difficulty <= 3;
    return true;
  });
};
