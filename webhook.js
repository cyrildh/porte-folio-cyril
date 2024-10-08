const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = 3000;
const SECRET = 'MY_SECRET_TOKEN'; // Même secret que dans GitHub

app.use(express.json());

app.post('/deploy', (req, res) => {
  const payload = req.body;

  // Vérifier le secret
  if (req.headers['x-hub-signature-256'] !== SECRET) {
    return res.status(403).send('Non autorisé');
  }

  if (payload.ref === 'refs/heads/main') { // Déclenche seulement pour la branche main
    exec('cd /chemin/vers/votre/application && git pull origin main && npm install && npm run build && pm2 restart all', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur lors du déploiement: ${error.message}`);
        return res.status(500).send('Erreur lors du déploiement');
      }
      console.log(`Déploiement réussi : ${stdout}`);
      res.status(200).send('Déploiement réussi');
    });
  } else {
    res.status(200).send('Aucun déploiement nécessaire');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur webhook en écoute sur le port ${PORT}`);
});
