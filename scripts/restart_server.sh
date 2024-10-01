#!/bin/bash

# Naviguer vers le répertoire de l'application
cd /src/

# Installer les dépendances (si nécessaire)
npm install

# Construire l'application
npm run build

# Redémarrer le processus PM2
pm2 restart server.js

# (Optionnel) Vérifier l'état de PM2
pm2 status
