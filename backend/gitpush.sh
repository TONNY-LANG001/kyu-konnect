#!/bin/bash
# Auto commit & push script

MESSAGE=${1:-"update"}   # default commit message if none given

echo "🔄 Adding changes..."
git add .

echo "📝 Committing with message: $MESSAGE"
git commit -m "$MESSAGE"

echo "🚀 Pushing to GitHub..."
git push origin main

