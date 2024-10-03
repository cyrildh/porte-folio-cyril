// server.js

const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;

// Configurer le client Secrets Manager
const client = new SecretsManagerClient({ region: 'eu-west-3' }); // Votre région AWS

// Fonction pour récupérer les secrets
const getSecrets = async () => {
  try {
    const command = new GetSecretValueCommand({ SecretId: 'my-app-secrets' }); // Nom correct du secret
    const data = await client.send(command);
    if (data.SecretString) {
      return JSON.parse(data.SecretString);
    } else {
      const buff = Buffer.from(data.SecretBinary, 'base64');
      return JSON.parse(buff.toString('ascii'));
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des secrets:', err);
    throw err;
  }
};

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://cyril-dohin.fr', // URL de production
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

// Route pour envoyer un email
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Vérifier que tous les champs sont présents
  if (!name || !email || !message) {
    return res.status(400).send('Tous les champs sont requis');
  }

  try {
    const secrets = await getSecrets();

    // Configurer le transporteur Nodemailer avec Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: secrets.EMAIL_USER, // Utiliser les secrets récupérés
        pass: secrets.EMAIL_PASS, // Utiliser les secrets récupérés
      },
    });

    // Configurer le contenu de l'email
    const mailOptions = {
      from: secrets.EMAIL_USER, // Adresse authentifiée
      to: secrets.EMAIL_USER,   // Vous-même
      subject: `Site portfolio ! Message de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email, // Permet de répondre directement à l'utilisateur
    };

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
