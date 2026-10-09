import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.suraksha.hub',
  appName: 'Suraksha Hub',
  webDir: 'dist/suraksha-hub/browser',
  backgroundColor: '#f7f8f5',
  plugins: {
    Browser: {
      presentationStyle: 'fullscreen'
    }
  }
};

export default config;
