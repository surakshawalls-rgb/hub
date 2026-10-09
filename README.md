# Suraksha Hub

A standalone Angular dashboard that brings Suraksha Group's application directory into one responsive parent app. Selecting an application opens it inside the hub; use **Open in browser** when a destination requires external browser behavior, sign-in, or downloads.

## Start locally

```powershell
npm install
npm start
```

## Application directory

Add future destinations in `src/app/core/application-directory.ts`. Each record declares its URL, category, description, icon mark, display order, status, business (where applicable), and opening mode. Destinations must use HTTPS; the platform validates URLs before displaying them. Do not add placeholders with invented URLs.

## PWA and production build

```powershell
npm run build:web
```

The production build includes the Angular service worker and PWA manifest. Service-worker registration is disabled in development and inside Capacitor.

## Android

Android uses the in-app destination view and Capacitor Browser for the **Open in browser** action. Capacitor App handles system back-button behavior; back closes an open menu, returns to Home from another dashboard section, and exits the app from Home.

```powershell
npm install
npm run build
npm run android:add
npm run cap:sync
npm run android:open
```

Building/running Android also requires the Android Studio SDK and a configured Java/Gradle environment.

## Tests

```powershell
npm test
```
