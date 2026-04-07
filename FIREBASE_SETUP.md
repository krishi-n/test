# Firebase Setup Instructions for bundle-marketplace

## Phase 1: Firebase Setup

Since Firebase project creation requires browser authentication, please follow these steps manually:

### Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Enter project name: `bundle-marketplace` (or your preferred name)
4. Accept the Firebase terms
5. Configure Google Analytics (optional, but recommended)
6. Click "Create project"

### Step 2: Enable Firestore Database

1. In the Firebase Console, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select **"Start in test mode"** (we'll update rules after deployment)
4. Choose your region (recommend `us-central1` for general use)
5. Click "Enable"

### Step 3: Enable Firebase Storage

1. Click "Storage" in the left sidebar
2. Click "Get started"
3. Select **"Start in test mode"**
4. Choose the same region as Firestore
5. Click "Done"

### Step 4: Enable Authentication

1. Click "Authentication" in the left sidebar
2. Click "Get started"
3. Click "Google" under "Sign-in providers"
4. Toggle the "Enable" switch
5. Enter your public-facing project name
6. Select a support email
7. Click "Save"

### Step 5: Get Firebase Config Values

1. Click the gear icon ⚙️ next to "Project Overview" → "Project settings"
2. In the "General" tab, scroll to "Your apps" section
3. Click the web icon (</>) to create a new web app
4. Enter app nickname: `bundle-marketplace-web`
5. Click "Register app"
6. Copy the Firebase config object values into `.env.local`:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",           → NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "...",          → NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "...",           → NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "...",       → NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "...",   → NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "..."                → NEXT_PUBLIC_FIREBASE_APP_ID
};
```

### Step 6: Download Service Account Key

1. In Project Settings, go to the "Service accounts" tab
2. Click "Generate new private key"
3. Click "Generate key" and save the JSON file
4. Move the file to this project directory as `service-account.json`
5. Extract the values into `.env.local`:
   - `project_id` → FIREBASE_ADMIN_PROJECT_ID
   - `private_key` → FIREBASE_ADMIN_PRIVATE_KEY (keep the \n characters)
   - `client_email` → FIREBASE_ADMIN_CLIENT_EMAIL

### Step 7: Deploy Security Rules

After setting up Firebase CLI authentication (run `npx firebase login`), deploy the rules:

```bash
npx firebase deploy --only firestore:rules --only storage:rules
```

Or manually copy the contents of:
- `firestore.rules` → Firestore Database > Rules
- `storage.rules` → Storage > Rules

### Step 8: Create Firestore Indexes

Deploy indexes using the CLI:

```bash
npx firebase deploy --only firestore:indexes
```

Or manually create them in Firestore Database > Indexes:

1. **Index 1:**
   - Collection: `bundles`
   - Fields: `status` (Ascending), `installCount` (Descending)

2. **Index 2:**
   - Collection: `bundles`
   - Fields: `status` (Ascending), `categories` (Array), `createdAt` (Descending)

3. **Index 3:**
   - Collection: `bundles`
   - Fields: `tags` (Array), `installCount` (Descending)

## Verification Checklist

- [ ] Firebase project created
- [ ] Firestore Database enabled (test mode)
- [ ] Firebase Storage enabled (test mode)
- [ ] Authentication enabled (Google provider)
- [ ] Firebase config values copied to `.env.local`
- [ ] Service account key downloaded and values copied to `.env.local`
- [ ] Firestore security rules deployed
- [ ] Storage security rules deployed
- [ ] Firestore indexes created

## Next Steps

Once Firebase setup is complete, proceed to **Phase 2: Next.js Scaffolding**
