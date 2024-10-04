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

// Route pour envoyer un email
app.post('/send-email', async (req, res) => {
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
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de lenvoi de lemail:', error.message);
    res.status(500).json({ error: 'Erreur lors de lenvoi de lemail. Veuillez réessayer plus tard.' });
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