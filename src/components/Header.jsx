import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthForms from "./auth/AuthForms";
import PremiumUpgradeModal from "./PremiumUpgradeModal";
import { User, LogOut, Crown, Menu, X } from "lucide-react";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, user, logout, hasPremiumAccess } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleAuthClick = () => {
    setShowAuthModal(true);
    setShowMobileMenu(false);
  };

  const handlePremiumClick = () => {
    setShowPremiumModal(true);
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  const handleProfileClick = () => {
    setShowAuthModal(true);
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  const getUserTypeIcon = () => {
    if (!user) return "👤";
    switch (user.userType) {
      case "famille":
        return "👨‍👩‍👧‍👦";
      case "business":
        return "💼";
      default:
        return "🎓";
    }
  };

  const getStatusBadge = () => {
    if (hasPremiumAccess) {
      return <span className="status-badge premium">🌟 Premium</span>;
    }
    return <span className="status-badge free">🆓 Gratuit</span>;
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <div className="header-logo">
            <h1>🇨🇩 AnglaisCongo</h1>
            <span className="header-tagline">Apprenez l'anglais au Congo</span>
          </div>

          {/* Navigation desktop */}
          <nav className="header-nav desktop-nav">
            <a href="#accueil" className="nav-link">
              Accueil
            </a>
            <a href="#profils" className="nav-link">
              Profils
            </a>
            <a href="#parcours" className="nav-link">
              Parcours
            </a>
            <a href="#exercices" className="nav-link">
              Exercices
            </a>
          </nav>

          {/* Actions utilisateur desktop */}
          <div className="header-actions desktop-actions">
            {isAuthenticated ? (
              <div className="user-section">
                {!hasPremiumAccess && (
                  <button className="premium-btn" onClick={handlePremiumClick}>
                    <Crown size={18} />
                    Premium
                  </button>
                )}

                <div className="user-menu-container">
                  <button
                    className="user-menu-trigger"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <div className="user-avatar">{getUserTypeIcon()}</div>
                    <div className="user-info">
                      <span className="user-name">{user?.name}</span>
                      {getStatusBadge()}
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="user-dropdown">
                      <div className="dropdown-header">
                        <div className="dropdown-avatar">
                          {getUserTypeIcon()}
                        </div>
                        <div className="dropdown-info">
                          <strong>{user?.name}</strong>
                          <span>{user?.email}</span>
                          {getStatusBadge()}
                        </div>
                      </div>

                      <div className="dropdown-divider"></div>

                      <button
                        className="dropdown-item"
                        onClick={handleProfileClick}
                      >
                        <User size={16} />
                        Mon Profil
                      </button>

                      {!hasPremiumAccess && (
                        <button
                          className="dropdown-item premium-item"
                          onClick={handlePremiumClick}
                        >
                          <Crown size={16} />
                          Passer au Premium
                        </button>
                      )}

                      <div className="dropdown-divider"></div>

                      <button
                        className="dropdown-item logout-item"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} />
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <button
                  className="auth-btn login-btn"
                  onClick={handleAuthClick}
                >
                  Se connecter
                </button>
                <button
                  className="auth-btn register-btn"
                  onClick={handleAuthClick}
                >
                  S'inscrire
                </button>
              </div>
            )}
          </div>

          {/* Menu mobile toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        {showMobileMenu && (
          <div className="mobile-menu">
            <nav className="mobile-nav">
              <a
                href="#accueil"
                className="mobile-nav-link"
                onClick={() => setShowMobileMenu(false)}
              >
                🏠 Accueil
              </a>
              <a
                href="#profils"
                className="mobile-nav-link"
                onClick={() => setShowMobileMenu(false)}
              >
                👥 Profils
              </a>
              <a
                href="#parcours"
                className="mobile-nav-link"
                onClick={() => setShowMobileMenu(false)}
              >
                🎯 Parcours
              </a>
              <a
                href="#exercices"
                className="mobile-nav-link"
                onClick={() => setShowMobileMenu(false)}
              >
                📝 Exercices
              </a>
            </nav>

            <div className="mobile-actions">
              {isAuthenticated ? (
                <div className="mobile-user-section">
                  <div className="mobile-user-info">
                    <div className="mobile-user-avatar">
                      {getUserTypeIcon()}
                    </div>
                    <div className="mobile-user-details">
                      <strong>{user?.name}</strong>
                      <span>{user?.email}</span>
                      {getStatusBadge()}
                    </div>
                  </div>

                  <div className="mobile-user-actions">
                    <button
                      className="mobile-action-btn"
                      onClick={handleProfileClick}
                    >
                      <User size={18} />
                      Mon Profil
                    </button>

                    {!hasPremiumAccess && (
                      <button
                        className="mobile-action-btn premium"
                        onClick={handlePremiumClick}
                      >
                        <Crown size={18} />
                        Passer au Premium
                      </button>
                    )}

                    <button
                      className="mobile-action-btn logout"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                      Déconnexion
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mobile-auth-buttons">
                  <button
                    className="mobile-auth-btn login"
                    onClick={handleAuthClick}
                  >
                    Se connecter
                  </button>
                  <button
                    className="mobile-auth-btn register"
                    onClick={handleAuthClick}
                  >
                    S'inscrire
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      {showAuthModal && (
        <AuthForms
          onClose={() => setShowAuthModal(false)}
          initialMode={isAuthenticated ? "profile" : "login"}
        />
      )}

      {showPremiumModal && (
        <PremiumUpgradeModal onClose={() => setShowPremiumModal(false)} />
      )}

      {/* Overlay pour fermer les menus */}
      {(showUserMenu || showMobileMenu) && (
        <div
          className="menu-overlay"
          onClick={() => {
            setShowUserMenu(false);
            setShowMobileMenu(false);
          }}
        />
      )}
    </>
  );
};

export default Header;
