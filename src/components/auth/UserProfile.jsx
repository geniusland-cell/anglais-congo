import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./UserProfile.css";

const UserProfile = ({ onClose }) => {
  const { user, logout, updateUserProfile, hasPremiumAccess, userType } =
    useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    prenom: user?.prenom || "",
    nom: user?.nom || "",
    email: user?.email || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const success = await updateUserProfile({
        prenom: formData.prenom,
        nom: formData.nom,
        name: `${formData.prenom} ${formData.nom}`,
      });

      if (success) {
        setMessage("Profil mis à jour avec succès !");
        setIsEditing(false);
      } else {
        setMessage("Erreur lors de la mise à jour du profil");
      }
    } catch (error) {
      setMessage("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      prenom: user?.prenom || "",
      nom: user?.nom || "",
      email: user?.email || "",
    });
    setIsEditing(false);
    setMessage("");
  };

  const getUserTypeIcon = () => {
    switch (userType) {
      case "famille":
        return "👨‍👩‍👧‍👦";
      case "etudiant":
        return "🎓";
      case "business":
        return "💼";
      default:
        return "👤";
    }
  };

  const getStatusBadge = () => {
    if (hasPremiumAccess) {
      return (
        <span className={`status-badge premium ${userType}`}>
          🌟 Premium {userType}
        </span>
      );
    }
    return <span className="status-badge free">🆓 Gratuit</span>;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile-modal">
      <div className="user-profile">
        <div className="user-profile-header">
          <button
            className="profile-close-btn"
            onClick={onClose}
            aria-label="Fermer"
          >
            ✕
          </button>
          <h2>👤 Mon Profil</h2>
        </div>

        <div className="user-profile-content">
          {message && (
            <div
              className={`message ${
                message.includes("succès") ? "success-message" : "error-message"
              }`}
            >
              {message}
            </div>
          )}

          <div className="user-status-section">
            <div className="user-avatar">{getUserTypeIcon()}</div>
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              {getStatusBadge()}
            </div>
          </div>

          <div className="profile-info">
            {isEditing ? (
              <form onSubmit={handleSave} className="profile-edit-form">
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="prenom">Prénom</label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="nom">Nom</label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                    style={{ opacity: 0.6, cursor: "not-allowed" }}
                  />
                  <small>L'email ne peut pas être modifié</small>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="save-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sauvegarde..." : "💾 Sauvegarder"}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    ❌ Annuler
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="info-item">
                  <strong>Prénom:</strong>
                  <span>{user.prenom || "Non renseigné"}</span>
                </div>
                <div className="info-item">
                  <strong>Nom:</strong>
                  <span>{user.nom || "Non renseigné"}</span>
                </div>
                <div className="info-item">
                  <strong>Email:</strong>
                  <span>{user.email}</span>
                </div>
                <div className="info-item">
                  <strong>Type de compte:</strong>
                  <span>{userType}</span>
                </div>
                <div className="info-item">
                  <strong>Statut:</strong>
                  <span>{hasPremiumAccess ? "Premium" : "Gratuit"}</span>
                </div>
                <div className="info-item">
                  <strong>Membre depuis:</strong>
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </>
            )}
          </div>

          {!isEditing && (
            <div className="profile-actions">
              <button
                className="profile-action-btn edit-btn"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Modifier le profil
              </button>
              {!hasPremiumAccess && (
                <button className="profile-action-btn upgrade-btn">
                  🚀 Passer au Premium
                </button>
              )}
              <button className="profile-action-btn settings-btn">
                ⚙️ Paramètres
              </button>
              <button
                className="profile-action-btn logout-btn"
                onClick={logout}
              >
                👋 Déconnexion
              </button>
            </div>
          )}

          <div className="user-stats">
            <h4>📊 Vos statistiques</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">12</span>
                <span className="stat-label">Leçons</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">45</span>
                <span className="stat-label">Exercices</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">7</span>
                <span className="stat-label">Jours</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">320</span>
                <span className="stat-label">Points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
