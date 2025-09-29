import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./AuthForms.css";

const LoginForm = ({ onSwitchToRegister, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.success) {
      onClose?.(); // Fermer la modale si réussite
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <h2>Connexion</h2>
        <p className="auth-subtitle">Accédez à votre compte</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="auth-switch">
          <span>Pas de compte ? </span>
          <button
            type="button"
            className="auth-switch-btn"
            onClick={onSwitchToRegister}
          >
            Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
