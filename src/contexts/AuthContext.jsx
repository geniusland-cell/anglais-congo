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

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("anglaisCongo_token");
      if (token) {
        // Pour la phase test, on simule un utilisateur
        // Plus tard, on fera une vraie vérification API
        const simulatedUser = {
          id: 1,
          email: "test@example.com",
          subscription_type: "gratuit",
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

  // Connexion (simulée pour les tests)
  const login = async (email, password) => {
    try {
      // Simulation d'un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Pour les tests, on accepte n'importe quel email/mot de passe
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        subscription_type: "gratuit",
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
        subscription_type: "gratuit",
        created_at: new Date().toISOString(),
      };

      localStorage.setItem("anglaisCongo_token", "test-token-" + userData.id);
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: "Erreur d'inscription" };
    }
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("anglaisCongo_token");
    setUser(null);
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
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    userType: user?.subscription_type || "gratuit",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
