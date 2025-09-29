import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./RegisterForm.css";

const RegisterForm = ({ onSwitchToLogin, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneMtn: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit faire au moins 6 caractères");
      setLoading(false);
      return;
    }

    const result = await register(
      formData.email,
      formData.password,
      formData.phoneMtn
    );

    if (result.success) {
      onClose?.();
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="register-form-container">
      <div className="register-form">
        <h2>Créer un compte</h2>
        <p className="register-subtitle">
          Rejoignez la communauté AnglaisCongo
        </p>

        {error && <div className="register-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneMtn">MTN Money (optionnel)</label>
            <input
              type="tel"
              id="phoneMtn"
              name="phoneMtn"
              value={formData.phoneMtn}
              onChange={handleChange}
              placeholder="06X XX XX XX"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Au moins 6 caractères"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Retapez votre mot de passe"
              required
            />
          </div>

          <button
            type="submit"
            className="register-submit-btn"
            disabled={loading}
          >
            {loading ? "Création..." : "Créer mon compte"}
          </button>
        </form>

        <div className="register-switch">
          <span>Déjà un compte ? </span>
          <button
            type="button"
            className="register-switch-btn"
            onClick={onSwitchToLogin}
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
