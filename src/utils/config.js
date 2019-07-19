import config from '../../package.json';

export const getBackendConfig = () => (
  process.env.NODE_ENV === 'production' ? config.backend.production : config.backend.staging
);

export const getUosGroupId = () => (
  process.env.NODE_ENV === 'production' ? config.uosGroupId.production : config.uosGroupId.staging
);

export const getEosPostId = () => (
  process.env.NODE_ENV === 'production' ? config.eosPostId.production : config.eosPostId.staging
);

export const getReferralPostId = () => (
  process.env.NODE_ENV === 'production' ? config.referralPostId.production : config.referralPostId.staging
);

export const getGrecaptchaSitekey = () => (
  config.grecaptchaSitekey
);
