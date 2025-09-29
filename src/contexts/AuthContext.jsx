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
        // Vérifier avec l'API si le token est toujours valide
        const response = await fetch("/.netlify/functions/auth-verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem("anglaisCongo_token");
        }
      }
    } catch (error) {
      console.error("Erreur vérification auth:", error);
    } finally {
      setLoading(false);
    }
  };

  // Connexion
  const login = async (email, password) => {
    try {
      const response = await fetch("/.netlify/functions/auth-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("anglaisCongo_token", data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        const error = await response.json();
        return { success: false, error: error.message };
      }
    } catch (error) {
      return { success: false, error: "Erreur de connexion" };
    }
  };

  // Inscription
  const register = async (email, password, phoneMtn = null) => {
    try {
      const response = await fetch("/.netlify/functions/auth-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, phoneMtn }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("anglaisCongo_token", data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        const error = await response.json();
        return { success: false, error: error.message };
      }
    } catch (error) {
      return { success: false, error: "Erreur d'inscription" };
    }
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("anglaisCongo_token");
    setUser(null);
  };

  // Mettre à jour le profil
  const updateProfile = async (updates) => {
    try {
      const token = localStorage.getItem("anglaisCongo_token");
      const response = await fetch("/.netlify/functions/auth-update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        return { success: true, user: updatedUser };
      } else {
        const error = await response.json();
        return { success: false, error: error.message };
      }
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
