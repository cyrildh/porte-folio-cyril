const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { google } = require('googleapis');

const app = express();
const port = 3002;

// Configurer le client Secrets Manager
const client = new SecretsManagerClient({ region: 'eu-west-3' }); // Votre région AWS

// Variable pour stocker les secrets en cache
let cachedSecrets = null;

// Fonction pour récupérer les secrets
const getSecrets = async () => {
  if (cachedSecrets) {
    return cachedSecrets;
  }
  try {
    const command = new GetSecretValueCommand({ SecretId: 'my-app-secrets' }); // Nom correct du secret
    const data = await client.send(command);
    if (data.SecretString) {
      cachedSecrets = JSON.parse(data.SecretString);
    } else if (data.SecretBinary) {
      const buff = Buffer.from(data.SecretBinary, 'base64');
      cachedSecrets = JSON.parse(buff.toString('ascii'));
    } else {
      throw new Error('Aucun secret disponible dans la réponse');
    }
    return cachedSecrets;
  } catch (err) {
    console.error('Erreur lors de la récupération des secrets:', err.message);
    throw new Error('Impossible de récupérer les secrets, vérifiez la configuration de Secrets Manager.');
  }
};

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['https://cyril-dohin.fr', 'https://subdomain.cyril-dohin.fr'], // Restreindre l'origine aux domaines spécifiques
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Limiteur de taux pour éviter les abus
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre de 15 minutes
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
});

// Appliquer le limiteur de taux à la route /send-email
app.post('/send-email', limiter, async (req, res) => {
  const { name, email, message } = req.body;

  // Vérifier que tous les champs sont présents
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  let secrets;
  try {
    secrets = await getSecrets();
  } catch (err) {
    return res.status(500).json({ error: 'Erreur lors de la récupération des secrets. Veuillez réessayer plus tard.' });
  }

  try {
    // Configurer OAuth2 pour Nodemailer
    const oAuth2Client = new google.auth.OAuth2(
      secrets.CLIENT_ID,
      secrets.CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );
    oAuth2Client.setCredentials({ refresh_token: secrets.REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();

    // Configurer le transporteur Nodemailer avec OAuth2
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: secrets.EMAIL_USER, // Utiliser les secrets récupérés
        pass: secrets.EMAIL_PASS, // Utiliser les secrets récupérés
        accessToken: accessToken.token,
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
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de lenvoi de lemail:', error.message);
    res.status(500).json({ error: 'Erreur lors de lenvoi de lemail. Veuillez réessayer plus tard.' });
  }
});

// Gestion des erreurs globales
app.use((err, req, res) => {
  console.error('Erreur serveur:', err.message);
  res.status(500).json({ error: 'Une erreur interne est survenue. Veuillez réessayer plus tard.' });
});

// Endpoint de vérification de l'état du serveur
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Le serveur fonctionne correctement' });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});