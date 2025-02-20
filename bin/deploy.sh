#!/bin/bash
set -e  # Exit on error

# Check if we are on the main branch
if [[ "$(git branch --show-current)" != "main" ]]; then
  echo "Error: Not on main branch. Please switch to main before deploying."
  exit 1
fi

# Stash any uncommitted changes
if git diff-index --quiet HEAD --; then
  echo "No changes to stash."
else
  echo "Stashing uncommitted changes..."
  git stash push -u -m "Stashing changes before deploy"
fi

# Deploy to production
echo "Switching to production branch..."
git switch production
echo "Resetting to main branch..."
git reset --hard origin/main
echo "Force pushing to production..."
git push origin +production

# Switch back to main
echo "Switching back to main branch..."
git switch main

# Unstash changes
if git stash list | grep -q "Stashing changes before deploy"; then
  echo "Unstashing changes..."
  git stash pop
else
  echo "No stashed changes to apply."
fi

echo "Deploy complete."
