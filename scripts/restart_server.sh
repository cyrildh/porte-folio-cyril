#!/bin/bash

echo "Début du script de redémarrage."

# Naviguer vers le répertoire de l'application
cd /var/www/html/mon-app || { echo "Erreur: Impossible de naviguer vers /var/www/html/mon-app"; exit 1; }
# Construire l'application
echo "Construction de l'application avec npm run build..."
npm run build || { echo "Erreur: npm run build a échoué"; exit 1; }
npm run deploy || { echo "Erreur: npm run deploy a échoué"; exit 1; }

echo "Fin du script de redémarrage."
