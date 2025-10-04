import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./AuthForms.css";

const RegisterForm = ({ onClose, onSwitchToLogin }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "etudiant",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "Le prénom doit contenir au moins 2 caractères";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Le nom doit contenir au moins 2 caractères";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmez votre mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms =
        "Vous devez accepter les conditions d'utilisation";
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
      const success = await register({
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
      });

      if (success) {
        onClose();
      } else {
        setErrors({ general: "Erreur lors de la création du compte" });
      }
    } catch (error) {
      setErrors({ general: "Erreur de connexion. Veuillez réessayer." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form register-form">
      <div className="auth-form-header">
        <h2>🎓 Créer un compte</h2>
        <p>Rejoignez AnglaisCongo gratuitement</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form-body">
        {errors.general && (
          <div className="error-message general-error">{errors.general}</div>
        )}

        {/* Nom et Prénom sur la même ligne */}
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="firstName">👤 Prénom</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Votre prénom"
              className={errors.firstName ? "error" : ""}
              disabled={isLoading}
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group half-width">
            <label htmlFor="lastName">👤 Nom de famille</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Votre nom"
              className={errors.lastName ? "error" : ""}
              disabled={isLoading}
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>
        </div>

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
          <label htmlFor="userType">🎯 Type de profil</label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="etudiant">🎓 Étudiant</option>
            <option value="famille">👨‍👩‍👧‍👦 Famille</option>
            <option value="business">💼 Professionnel</option>
          </select>
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
              placeholder="Au moins 6 caractères"
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

        <div className="form-group">
          <label htmlFor="confirmPassword">🔐 Confirmer le mot de passe</label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Répétez votre mot de passe"
              className={errors.confirmPassword ? "error" : ""}
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword
                  ? "Cacher le mot de passe"
                  : "Voir le mot de passe"
              }
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              disabled={isLoading}
            />
            <span className="checkmark"></span>
            J'accepte les conditions d'utilisation et la politique de
            confidentialité d'AnglaisCongo
          </label>
          {errors.agreeToTerms && (
            <span className="error-message">{errors.agreeToTerms}</span>
          )}
        </div>

        <button type="submit" className="auth-submit-btn" disabled={isLoading}>
          {isLoading ? "Création en cours..." : "🚀 Créer mon compte"}
        </button>
      </form>

      <div className="auth-form-footer">
        <p>
          Déjà un compte ?{" "}
          <button
            type="button"
            className="switch-btn"
            onClick={onSwitchToLogin}
          >
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
