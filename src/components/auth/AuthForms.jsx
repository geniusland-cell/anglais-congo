import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import UserProfile from "./UserProfile";
import "./AuthForms.css";

const AuthForms = ({ onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);
  const { isAuthenticated, user } = useAuth();

  // Si l'utilisateur est déjà connecté et qu'on ouvre en mode login/register, basculer vers le profil
  React.useEffect(() => {
    if (isAuthenticated && (mode === "login" || mode === "register")) {
      setMode("profile");
    }
  }, [isAuthenticated, mode]);

  const handleClose = () => {
    onClose();
  };

  const renderContent = () => {
    switch (mode) {
      case "register":
        return (
          <RegisterForm
            onClose={handleClose}
            onSwitchToLogin={() => setMode("login")}
          />
        );
      case "profile":
        return (
          <UserProfile
            onClose={handleClose}
            onSwitchToLogin={() => setMode("login")}
          />
        );
      default:
        return (
          <LoginForm
            onClose={handleClose}
            onSwitchToRegister={() => setMode("register")}
          />
        );
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={handleClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AuthForms;
