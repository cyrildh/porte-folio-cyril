#!/bin/bash

# Naviguer vers le répertoire de l'application
cd /var/www/html/mon-app

# Installer les dépendances
npm install

# Construire l'application
npm run build

# Redémarrer l'application avec PM2
pm2 restart mon-app || pm2 start /var/www/html/mon-app/server.js --name mon-app

# Vérifier le statut de PM2
pm2 status
