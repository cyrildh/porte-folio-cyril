#!/bin/bash

echo "Début du nettoyage."

# Supprimer le fichier package-lock.json s'il existe
if [ -f /var/www/html/mon-app/package-lock.json ]; then
    echo "Suppression de package-lock.json"
    rm /var/www/html/mon-app/package-lock.json
fi

echo "Nettoyage terminé."
