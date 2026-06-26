import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mushluvv.kushcoacher',
  appName: 'Kush Coacher',
  webDir: 'out',
  server: {
    url: 'https://www.kushcoacher.com',
    cleartext: false,
  },
};

export default config;
