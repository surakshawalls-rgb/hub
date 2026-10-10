# Suraksha Hub

A standalone Angular dashboard that brings Suraksha Group's application directory into one responsive parent app. The dashboard has no parent-app authentication and opens destinations externally so their existing browser behavior, sign-in and downloads remain under each destination's control.

## Start locally

```powershell
npm install
npm start
```

## Application directory

Add future destinations in `src/app/core/application-directory.ts`. Each record declares its URL, category, description, icon mark, display order, status, business (where applicable), and opening mode. Destinations must use HTTPS; the platform validates URLs before opening them. Do not add placeholders with invented URLs.

## PWA and production build

```powershell
npm run build:web
```

The production build includes the Angular service worker and PWA manifest. Service-worker registration is disabled in development and inside Capacitor.

## Android

Android uses Capacitor Browser for external destinations and Capacitor App for system back-button behavior. Returning from an Android Custom Tab reveals the existing hub state; back closes an open menu, returns to Home from another dashboard section, and exits the app from Home.

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
