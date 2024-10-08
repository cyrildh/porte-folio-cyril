require('dotenv').config();
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

// Route pour envoyer un email
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Vérifier que tous les champs sont présents
  if (!name || !email || !message) {
    return res.status(400).send('Tous les champs sont requis');
  }

  // Configurer le transporteur Nodemailer avec Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // debug: true, // Décommentez pour le débogage
  });

  // Configurer le contenu de l'email
  const mailOptions = {
    from: process.env.EMAIL_USER, // Adresse authentifiée
    to: process.env.EMAIL_USER,   // Vous-même
    subject: `Site portfolio ! Message de ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    replyTo: email, // Permet de répondre directement à l'utilisateur
  };

  try {
    // Envoyer l'email
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).send('Erreur lors de l\'envoi de l\'email');
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
