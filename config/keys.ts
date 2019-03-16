import dev from './dev';
import prod from './prod';

export interface IKeys {
  googleClientID: string;
  googleClientSecret: string;
  mongoURI: string;
  cookieKey: string;
  stripePublishableKey: string;
  stripeSecretKey: string;
  sendGridKey: string;
  redirectDomain: string;
}

export default (process.env.NODE_ENV === 'production' ? prod : dev);
