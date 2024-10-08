// server.js

require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(express.json());

const corsOptions = {
  origin: 'https://cyril-dohin.fr', // Domaine autorisé
  optionsSuccessStatus: 200 // Pour supporter les navigateurs plus anciens
};

app.use(cors(corsOptions));

// Fonction pour créer le transporteur Nodemailer
const createTransporter = async () => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Votre adresse e-mail Gmail
      pass: process.env.EMAIL_PASS, // Mot de passe d'application ou mot de passe Gmail
    },
  });

  // Vérifiez la connexion au serveur SMTP
  await transporter.verify();
  console.log('Connexion au serveur SMTP réussie');
  return transporter;
};

// Route pour envoyer un email
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Vérifier que tous les champs sont présents
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    const transporter = await createTransporter();

    // Configurer le contenu de l'email
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Adresse de l'expéditeur
      to: process.env.EMAIL_USER, // Vous-même
      subject: `Site portfolio ! Message de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email, // Permet de répondre directement à l'utilisateur
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error.message);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
