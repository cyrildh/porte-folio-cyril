const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const nodemailer = require('nodemailer');

// Configurer le client Secrets Manager
const client = new SecretsManagerClient({ region: 'eu-west-3' }); // Votre région AWS

// Fonction pour récupérer les secrets
const getSecrets = async () => {
  try {
    const command = new GetSecretValueCommand({ SecretId: 'my-app-secrets' }); // Nom correct du secret
    const data = await client.send(command);
    
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

// Handler Lambda
exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Méthode non autorisée' }),
      };
    }

    const body = JSON.parse(event.body);
    const { name, email, message } = body;

    // Vérifier que tous les champs sont présents
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Tous les champs sont requis' }),
      };
    }

    // Récupérer les secrets
    const secrets = await getSecrets();

    // Configurer le transporteur Nodemailer avec Gmail
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

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Email envoyé avec succès' }),
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer plus tard.' }),
    };
  }
};
