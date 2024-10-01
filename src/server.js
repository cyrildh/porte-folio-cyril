const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route pour envoyer un email
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Configurer le transporteur Nodemailer avec Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cyril.dohin@gmail.com',
      pass: 'gimz jets iiup oxvy', 
    },
  });

  // Configurer le contenu de l'email
  const mailOptions = {
    from: email,
    to: 'cyril.dohin@gmail.com',
    subject: `Site portfolio ! Message de ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
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
