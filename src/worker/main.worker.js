import { SocialKeyApi } from 'ucom-libs-wallet';
import ecc from 'eosjs-ecc';
import registerPromiseWorker from 'promise-worker/register';
import { getActivePrivateKey, getSocialPrivateKeyByActiveKey, getPublicKeyByPrivateKey } from '../utils/keys';
import {
  WORKER_GET_ACTIVE_KEY_BY_BRAINKEY,
  WORKER_GET_SOCIAL_KEY_BY_ACTIVE_KEY,
  WORKER_GET_PUBLIC_KEY_BY_PRIVATE_KEY,
  WORKER_BIND_SOCIAL_KEY_WITH_SOCIAL_PERMISSIONS,
  WORKER_ADD_SOCIAL_PERMISSIONS_TO_EMISSION_AND_PROFILE,
  WORKER_ECC_SIGN,
} from '../utils/constants';

registerPromiseWorker((action) => {
  switch (action.type) {
    case WORKER_GET_ACTIVE_KEY_BY_BRAINKEY: {
      return getActivePrivateKey(action.brainkey);
    }

    case WORKER_GET_SOCIAL_KEY_BY_ACTIVE_KEY: {
      return getSocialPrivateKeyByActiveKey(action.activeKey);
    }

    case WORKER_GET_PUBLIC_KEY_BY_PRIVATE_KEY: {
      return getPublicKeyByPrivateKey(action.privateKey);
    }

    case WORKER_ECC_SIGN: {
      return ecc.sign(action.str, action.privateKey);
    }

    case WORKER_BIND_SOCIAL_KEY_WITH_SOCIAL_PERMISSIONS: {
      return SocialKeyApi.bindSocialKeyWithSocialPermissions(action.accountName, action.activeKey, action.socialPublicKey);
    }

    case WORKER_ADD_SOCIAL_PERMISSIONS_TO_EMISSION_AND_PROFILE: {
      return SocialKeyApi.addSocialPermissionsToEmissionAndProfile(action.accountName, action.activeKey);
    }

    default:
      return null;
  }
});
