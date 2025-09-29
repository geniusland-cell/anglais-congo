import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Parcours from "./components/Parcours";
import Profils from "./components/Profils";
import Exercices from "./components/Exercices";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Hero />
        <Parcours />
        <Profils />
        <Exercices />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
