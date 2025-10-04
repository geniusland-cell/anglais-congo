import React, { createContext, useContext, useState, useEffect } from "react";

// Contexte d'authentification
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};

// Comptes de démonstration
const demoAccounts = {
  "demo@famille.com": {
    email: "demo@famille.com",
    password: "demo123",
    prenom: "Marie",
    nom: "Famille",
    userType: "famille",
    isPremium: false,
    createdAt: new Date().toISOString(),
  },
  "premium@famille.com": {
    email: "premium@famille.com",
    password: "premium123",
    prenom: "Jean",
    nom: "Premium",
    userType: "famille",
    isPremium: true,
    createdAt: new Date().toISOString(),
  },
  "etudiant@demo.com": {
    email: "etudiant@demo.com",
    password: "etudiant123",
    prenom: "Paul",
    nom: "Étudiant",
    userType: "etudiant",
    isPremium: false,
    createdAt: new Date().toISOString(),
  },
};

// Composant Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    learningLanguage: "fr",
    nativeLanguage: "fr",
    difficultyLevel: "debutant",
  });

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const savedUser = localStorage.getItem("anglais_user");
    const savedPreferences = localStorage.getItem("anglais_preferences");

    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données utilisateur:",
          error
        );
        localStorage.removeItem("anglais_user");
      }
    }

    if (savedPreferences) {
      try {
        const preferencesData = JSON.parse(savedPreferences);
        setUserPreferences(preferencesData);
      } catch (error) {
        console.error("Erreur lors du chargement des préférences:", error);
        localStorage.removeItem("anglais_preferences");
      }
    }
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      // Vérifier les comptes de démonstration
      if (demoAccounts[email] && demoAccounts[email].password === password) {
        const userData = { ...demoAccounts[email] };
        delete userData.password; // Ne pas stocker le mot de passe

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("anglais_user", JSON.stringify(userData));

        return { success: true, user: userData };
      }

      // Vérifier les utilisateurs enregistrés
      const registeredUsers = JSON.parse(
        localStorage.getItem("anglais_registered_users") || "{}"
      );

      if (
        registeredUsers[email] &&
        registeredUsers[email].password === password
      ) {
        const userData = { ...registeredUsers[email] };
        delete userData.password;

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("anglais_user", JSON.stringify(userData));

        return { success: true, user: userData };
      }

      return { success: false, error: "Email ou mot de passe incorrect" };
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      return { success: false, error: "Erreur de connexion" };
    }
  };

  // Fonction d'inscription
  const register = async (userData) => {
    try {
      const { email, password, prenom, nom, userType } = userData;

      // Vérifier si l'email existe déjà
      const registeredUsers = JSON.parse(
        localStorage.getItem("anglais_registered_users") || "{}"
      );

      if (registeredUsers[email] || demoAccounts[email]) {
        return { success: false, error: "Cet email est déjà utilisé" };
      }

      // Créer le nouvel utilisateur
      const newUser = {
        email,
        password,
        prenom,
        nom,
        userType: userType || "famille",
        isPremium: false,
        createdAt: new Date().toISOString(),
      };

      // Sauvegarder dans localStorage
      registeredUsers[email] = newUser;
      localStorage.setItem(
        "anglais_registered_users",
        JSON.stringify(registeredUsers)
      );

      // Connecter automatiquement l'utilisateur
      const userForSession = { ...newUser };
      delete userForSession.password;

      setUser(userForSession);
      setIsAuthenticated(true);
      localStorage.setItem("anglais_user", JSON.stringify(userForSession));

      return { success: true, user: userForSession };
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      return { success: false, error: "Erreur lors de l'inscription" };
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("anglais_user");
  };

  // Fonction pour mettre à jour les préférences de langue
  const updateLanguagePreference = (language) => {
    const newPreferences = {
      ...userPreferences,
      learningLanguage: language,
    };
    setUserPreferences(newPreferences);
    localStorage.setItem("anglais_preferences", JSON.stringify(newPreferences));
    console.log("🌍 Langue d'apprentissage changée:", language);
  };

  // Fonction pour mettre à jour le profil utilisateur
  const updateUserProfile = async (profileData) => {
    try {
      if (!user) return { success: false, error: "Utilisateur non connecté" };

      const updatedUser = {
        ...user,
        ...profileData,
      };

      setUser(updatedUser);
      localStorage.setItem("anglais_user", JSON.stringify(updatedUser));

      // Mettre à jour aussi dans les utilisateurs enregistrés si ce n'est pas un compte démo
      if (!demoAccounts[user.email]) {
        const registeredUsers = JSON.parse(
          localStorage.getItem("anglais_registered_users") || "{}"
        );
        if (registeredUsers[user.email]) {
          registeredUsers[user.email] = {
            ...registeredUsers[user.email],
            ...profileData,
          };
          localStorage.setItem(
            "anglais_registered_users",
            JSON.stringify(registeredUsers)
          );
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      return { success: false, error: "Erreur de mise à jour" };
    }
  };

  // Fonction pour obtenir les statistiques utilisateur
  const getUserStats = () => {
    if (!user) return null;

    // Statistiques fictives pour la démonstration
    return {
      lessonsCompleted: Math.floor(Math.random() * 50) + 10,
      exercisesCompleted: Math.floor(Math.random() * 100) + 25,
      streakDays: Math.floor(Math.random() * 30) + 1,
      totalPoints: Math.floor(Math.random() * 1000) + 100,
    };
  };

  // Fonction pour vérifier l'accès Premium
  const canAccessLingala = user?.isPremium || false;

  // Valeurs du contexte
  const contextValue = {
    user,
    isAuthenticated,
    userPreferences,
    login,
    register,
    logout,
    updateLanguagePreference,
    updateUserProfile,
    getUserStats,
    canAccessLingala,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
