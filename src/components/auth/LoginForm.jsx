import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./AuthForms.css";

const LoginForm = ({ onClose, onSwitchToRegister }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const success = await login(formData.email, formData.password);

      if (success) {
        onClose();
      } else {
        setErrors({ general: "Email ou mot de passe incorrect" });
      }
    } catch (error) {
      setErrors({ general: "Erreur de connexion. Veuillez réessayer." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "demo@anglais-congo.com",
      password: "demo123",
    });
  };

  return (
    <div className="auth-form login-form">
      <div className="auth-form-header">
        <h2>🔐 Connexion</h2>
        <p>Accédez à votre compte AnglaisCongo</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form-body">
        {errors.general && (
          <div className="error-message general-error">{errors.general}</div>
        )}

        <div className="form-group">
          <label htmlFor="email">📧 Adresse email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="votre@email.com"
            className={errors.email ? "error" : ""}
            disabled={isLoading}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">🔒 Mot de passe</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Votre mot de passe"
              className={errors.password ? "error" : ""}
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Cacher le mot de passe" : "Voir le mot de passe"
              }
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="auth-submit-btn" disabled={isLoading}>
          {isLoading ? "Connexion..." : "🚀 Se connecter"}
        </button>

        <button
          type="button"
          className="demo-btn"
          onClick={handleDemoLogin}
          disabled={isLoading}
        >
          🎯 Essai avec compte démo
        </button>
      </form>

      <div className="auth-form-footer">
        <p>
          Pas encore de compte ?{" "}
          <button
            type="button"
            className="switch-btn"
            onClick={onSwitchToRegister}
          >
            Créer un compte
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
