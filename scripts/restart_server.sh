#!/bin/bash

echo "Début du script de redémarrage."

# Naviguer vers le répertoire de l'application
cd /var/www/html/mon-app || { echo "Erreur: Impossible de naviguer vers /var/www/html/mon-app"; exit 1; }

# Installer les dépendances
echo "Installation des dépendances avec npm..."
npm install || { echo "Erreur: npm install a échoué"; exit 1; }

# Construire l'application
echo "Construction de l'application avec npm run build..."
npm run build || { echo "Erreur: npm run build a échoué"; exit 1; }

# Redémarrer l'application avec PM2
echo "Redémarrage de l'application avec PM2..."
pm2 restart src/server.js || { echo "Erreur: pm2 restart a échoué"; exit 1; }

echo "Fin du script de redémarrage."
