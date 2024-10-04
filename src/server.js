const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3002;

// Configurer le client Secrets Manager
const client = new SecretsManagerClient({ region: 'eu-west-3' }); // Votre région AWS

const getSecrets = async () => {
  try {
    console.log("Trying to get secrets...");
    console.log("Client:", client);
    const command = new GetSecretValueCommand({ SecretId: 'my-app-secrets' }); // Nom correct du secret
    const data = await client.send(command);
    console.log("Secrets received from AWS Secrets Manager:", data);
    
    if (data.SecretString) {
      return JSON.parse(data.SecretString);
    } else if (data.SecretBinary) {
      const buff = Buffer.from(data.SecretBinary, 'base64');
      return JSON.parse(buff.toString('ascii'));
    } else {
      throw new Error('Aucun secret disponible dans la réponse');
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des secrets:', err);
    throw new Error('Impossible de récupérer les secrets, vérifiez la configuration de Secrets Manager.');
  }
};


// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // Autoriser temporairement toutes les origines pour le test
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.post('/send-email', async (req, res) => {
  console.log('Requête POST reçue sur /send-email');

  const { name, email, message } = req.body;
  console.log('Données du corps de la requête:', req.body);

  // Vérifier que tous les champs sont présents
  if (!name || !email || !message) {
    console.error('Tous les champs ne sont pas présents.');
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  let secrets;
  try {
    console.log('Récupération des secrets en cours...');
    secrets = await getSecrets();
    console.log('Secrets récupérés avec succès.');
  } catch (err) {
    console.error('Erreur lors de la récupération des secrets:', err.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération des secrets. Veuillez réessayer plus tard.' });
  }

  try {
    // Configurer le transporteur Nodemailer avec Gmail
    console.log('Configuration du transporteur Nodemailer...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: secrets.EMAIL_USER,
        pass: secrets.EMAIL_PASS,
      },
    });

    // Configurer le contenu de l'email
    const mailOptions = {
      from: secrets.EMAIL_USER,
      to: secrets.EMAIL_USER,
      subject: `Site portfolio ! Message de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    };

    console.log('Envoi de l\'email en cours...');
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès.');
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error.message);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer plus tard.' });
  }
});


app.get('/test-secrets', async (req, res) => {
  try {
    const secrets = await getSecrets();
    res.status(200).json({ secrets });
  } catch (err) {
    console.error('Erreur lors de la récupération des secrets:', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des secrets.' });
  }
});


// Gestion des erreurs globales
app.use((err, req, res) => {
  console.error('Erreur serveur:', err.stack);
  if (res && typeof res.status === 'function') {
    res.status(500).json({ error: 'Une erreur interne est survenue. Veuillez réessayer plus tard.', details: err.message });
  } else {
    console.error("Impossible d'envoyer une réponse HTTP: res est incorrect.");
  }
});


app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});