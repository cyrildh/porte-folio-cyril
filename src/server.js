// server.js

const AWS = require('aws-sdk');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Configurer AWS SDK
AWS.config.update({ region: 'eu-west-3' }); // Remplacez par votre région AWS, par exemple 'us-east-1'

const secretsManager = new AWS.SecretsManager();

const app = express();
const port = process.env.PORT || 3002;


// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8081', // Remplacez par l'URL de votre frontend
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Fonction pour récupérer les secrets
const getSecrets = async () => {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: 'my-app-secrets' }).promise();
    if ('SecretString' in data) {
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
