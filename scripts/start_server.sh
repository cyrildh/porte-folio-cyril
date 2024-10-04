#!/bin/bash
# Exemple : Démarrer le serveur avec PM2
cd /var/www/html/mon-app
pm2 start server.js
sudo systemctl start nginx
