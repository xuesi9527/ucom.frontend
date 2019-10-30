import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import Button from '../Button/index';
import Share from '../Share';
import urls from '../../utils/urls';
import { getReferralPostId } from '../../utils/config';
import { selectOwner } from '../../store/selectors';
import styles from './styles.css';

const ReferralBanner = () => {
  const { t } = useTranslation();
  const referralPostLink = urls.getPostUrl({
    id: getReferralPostId(),
  });

  const owner = useSelector(selectOwner);

  return (
    <div className={styles.referralBanner}>
      <div className={styles.inner}>
        <h3 className={styles.title}>{t('Get a reward for each person you invite')}</h3>
        <div className={styles.text}>{t('Provide a referral link to your friend and gain importance from your referrals, registered on the platform. You get 10% the importance they acquire.')}</div>
        <div className={styles.actions}>
          {owner && owner.affiliates && owner.affiliates.referralRedirectUrl &&
            <Share directUrl={owner.affiliates.referralRedirectUrl}>
              <Button red>{t('Share Referral Link')}</Button>
            </Share>
          }
          <Link className="link red" to={referralPostLink}>{t('Learn More')}</Link>
        </div>
      </div>
    </div>
  );
};

export default ReferralBanner;
