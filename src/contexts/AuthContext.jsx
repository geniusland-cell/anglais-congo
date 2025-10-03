import React, { createContext, useState, useContext, useEffect } from "react";

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    learningLanguage: "fr", // 'fr' ou 'ln'
  });

  // Charger les préférences depuis localStorage au démarrage
  useEffect(() => {
    loadUserPreferences();
    checkAuthStatus();
  }, []);

  const loadUserPreferences = () => {
    try {
      const savedPrefs = localStorage.getItem("anglaisCongo_preferences");
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        setUserPreferences(prefs);
      }
    } catch (error) {
      console.error("Erreur chargement préférences:", error);
    }
  };

  const saveUserPreferences = (prefs) => {
    try {
      localStorage.setItem("anglaisCongo_preferences", JSON.stringify(prefs));
    } catch (error) {
      console.error("Erreur sauvegarde préférences:", error);
    }
  };

  // Vérifier si l'utilisateur est déjà connecté au chargement
  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("anglaisCongo_token");
      if (token) {
        // Pour la phase test, on simule un utilisateur
        const simulatedUser = {
          id: 1,
          email: "test@example.com",
          subscription_type: "gratuit", // 'gratuit', 'famille', 'etudiant', 'business'
          created_at: new Date().toISOString(),
        };
        setUser(simulatedUser);
      }
    } catch (error) {
      console.error("Erreur vérification auth:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour la préférence de langue
  const updateLanguagePreference = (language) => {
    const newPrefs = { ...userPreferences, learningLanguage: language };
    setUserPreferences(newPrefs);
    saveUserPreferences(newPrefs);

    console.log(`🌍 Langue d'apprentissage changée: ${language}`);
  };

  // Vérifier si l'utilisateur a accès au lingala
  const canAccessLingala = () => {
    return user?.subscription_type !== "gratuit";
  };

  // Vérifier si l'utilisateur a accès au contenu premium
  const hasPremiumAccess = () => {
    return user?.subscription_type !== "gratuit";
  };

  // Connexion (simulée pour les tests)
  const login = async (email, password) => {
    try {
      // Simulation d'un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Pour les tests, on accepte n'importe quel email/mot de passe
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        subscription_type: "gratuit", // Par défaut gratuit
        created_at: new Date().toISOString(),
      };

      localStorage.setItem("anglaisCongo_token", "test-token-" + userData.id);
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: "Erreur de connexion" };
    }
  };

  // Inscription (simulée pour les tests)
  const register = async (email, password, phoneMtn = null) => {
    try {
      // Simulation d'un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        phoneMtn: phoneMtn,
        subscription_type: "gratuit", // Par défaut gratuit
        created_at: new Date().toISOString(),
      };

      localStorage.setItem("anglaisCongo_token", "test-token-" + userData.id);
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: "Erreur d'inscription" };
    }
  };

  // Mettre à jour l'abonnement (pour tests paiements)
  const updateSubscription = async (subscriptionType) => {
    try {
      const updatedUser = {
        ...user,
        subscription_type: subscriptionType,
        subscription_updated: new Date().toISOString(),
      };
      setUser(updatedUser);

      console.log(`💰 Abonnement mis à jour: ${subscriptionType}`);
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: "Erreur mise à jour abonnement" };
    }
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("anglaisCongo_token");
    setUser(null);
    console.log("👋 Utilisateur déconnecté");
  };

  // Mettre à jour le profil (simulé)
  const updateProfile = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: "Erreur de mise à jour" };
    }
  };

  // Valeur du contexte
  const value = {
    // État authentification
    user,
    loading,

    // Préférences utilisateur
    userPreferences,
    updateLanguagePreference,

    // Accès et permissions
    canAccessLingala: canAccessLingala(),
    hasPremiumAccess: hasPremiumAccess(),
    isAuthenticated: !!user,
    userType: user?.subscription_type || "gratuit",

    // Actions
    login,
    register,
    logout,
    updateProfile,
    updateSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
