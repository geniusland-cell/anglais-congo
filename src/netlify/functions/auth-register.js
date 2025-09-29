const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bcrypt = require("bcryptjs");

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { email, password, phoneMtn } = JSON.parse(event.body);

    // Validation basique
    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Email et mot de passe requis" }),
      };
    }

    // Chemin vers la base de données
    const dbPath = path.join(
      __dirname,
      "..",
      "..",
      "database",
      "anglais-congo.sqlite"
    );
    const db = new sqlite3.Database(dbPath);

    return new Promise((resolve) => {
      // Vérifier si l'email existe déjà
      db.get(
        "SELECT id FROM users WHERE email = ?",
        [email],
        async (err, row) => {
          if (err) {
            db.close();
            resolve({
              statusCode: 500,
              body: JSON.stringify({ message: "Erreur base de données" }),
            });
            return;
          }

          if (row) {
            db.close();
            resolve({
              statusCode: 400,
              body: JSON.stringify({ message: "Cet email est déjà utilisé" }),
            });
            return;
          }

          // Hasher le mot de passe
          const hashedPassword = await bcrypt.hash(password, 10);

          // Créer l'utilisateur
          db.run(
            `INSERT INTO users (email, password, phone_mtn, subscription_type, created_at) 
           VALUES (?, ?, ?, 'gratuit', datetime('now'))`,
            [email, hashedPassword, phoneMtn],
            function (insertErr) {
              if (insertErr) {
                db.close();
                resolve({
                  statusCode: 500,
                  body: JSON.stringify({
                    message: "Erreur création utilisateur",
                  }),
                });
                return;
              }

              // Retourner les données utilisateur (sans le password)
              const user = {
                id: this.lastID,
                email,
                phoneMtn,
                subscription_type: "gratuit",
                created_at: new Date().toISOString(),
              };

              db.close();
              resolve({
                statusCode: 201,
                body: JSON.stringify({
                  message: "Compte créé avec succès",
                  user,
                  token: "simulated-token-" + this.lastID, // À remplacer par JWT réel
                }),
              });
            }
          );
        }
      );
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erreur serveur" }),
    };
  }
};
