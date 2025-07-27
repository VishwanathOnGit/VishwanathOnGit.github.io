#!/bin/bash

# Simple deployment script for GitHub Pages
echo "🚀 Deploying to GitHub Pages..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Please run 'git init' first."
    exit 1
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit with timestamp
echo "💾 Committing changes..."
git commit -m "Deploy portfolio - $(date)"

# Push to main branch
echo "📤 Pushing to GitHub..."
git push origin main

echo "✅ Deployment complete!"
echo "🌐 Your portfolio should be available at: https://yourusername.github.io/portfolio"
echo ""
echo "Note: It may take a few minutes for GitHub Pages to update."
