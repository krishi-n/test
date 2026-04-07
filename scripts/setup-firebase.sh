#!/bin/bash
# Firebase Setup Helper Script for bundle-marketplace
# This script helps deploy Firebase rules and indexes after manual project setup

echo "=== Firebase Setup Helper for bundle-marketplace ==="
echo ""

# Check if firebase CLI is available
if ! command -v npx &> /dev/null; then
    echo "Error: npx not found. Please install Node.js."
    exit 1
fi

# Check if user is logged in
echo "Checking Firebase authentication..."
npx firebase projects:list &> /dev/null
if [ $? -ne 0 ]; then
    echo ""
    echo "You need to log in to Firebase first."
    echo "Run: npx firebase login"
    exit 1
fi

# Get project ID from .firebaserc or prompt
PROJECT_ID=$(grep -o '"default": "[^"]*"' .firebaserc | cut -d'"' -f4)

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "bundle-marketplace" ]; then
    echo ""
    echo "Please enter your Firebase project ID:"
    read PROJECT_ID
    
    # Update .firebaserc
    echo "{
  \"projects\": {
    \"default\": \"$PROJECT_ID\"
  }
}" > .firebaserc
fi

echo ""
echo "Using project: $PROJECT_ID"
echo ""

# Deploy Firestore rules
echo "Deploying Firestore security rules..."
npx firebase deploy --only firestore:rules

# Deploy Storage rules
echo ""
echo "Deploying Storage security rules..."
npx firebase deploy --only storage:rules

# Deploy Firestore indexes
echo ""
echo "Deploying Firestore indexes..."
echo "Note: Index creation may take a few minutes..."
npx firebase deploy --only firestore:indexes

echo ""
echo "=== Firebase setup complete! ==="
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Firebase config values"
echo "2. Add your service account key to .env.local"
echo "3. Proceed to Phase 2: Next.js Scaffolding"
