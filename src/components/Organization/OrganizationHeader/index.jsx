import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { FollowersWrapper } from '../../Followers';
import OrganizationFollowButton from '../OrganizationFollowButton';
import { userIsAdmin } from '../../../utils/organization';
import urls from '../../../utils/urls';
import styles from '../../EntryHeader/styles.css';
import subHeaderStyles from '../../EntrySubHeader/styles.css';
import ButtonEdit from '../../ButtonEdit';
import Avatar from '../../EntryHeader/Avatar';
import { formatRate } from '../../../utils/rate';
import Menu from '../../EntryHeader/Menu';
import { getUserName } from '../../../utils/user';
import EntrySubHeader from '../../EntrySubHeader';
import { sanitizeText } from '../../../utils/text';
import * as selectors from '../../../store/selectors';

const OrganizationHeader = (props) => {
  const organization = useSelector(selectors.selectOrgById(props.organizationId));
  const owner = useSelector(selectors.selectOwner);

  if (!organization) {
    return null;
  }

  return (
    // TOOD: Add component EntrySubHeader/Wrapper
    <div className={subHeaderStyles.wrapper}>
      {organization.user &&
        <EntrySubHeader
          userUrl={urls.getUserUrl(organization.user.id)}
          userName={getUserName(organization.user)}
          userAvatarUrl={urls.getFileUrl(organization.user.avatarFilename)}
          userId={+organization.user.id}
          userRate={organization.user.scaledImportance}
          showFollow={!userIsAdmin(owner, organization)}
        />
      }


      <div className={`${styles.entryHead} ${styles.organization}`}>
        <div className={styles.cover}>
          <img src="https://cdn-images-1.medium.com/max/2600/1*Udttv_M-zfA2gmDrCLkMpA.jpeg" alt="" />
        </div>

        {userIsAdmin(owner, organization) &&
          <div className={styles.edit}>
            <ButtonEdit strech url={urls.getOrganizationEditUrl(organization.id)} />
          </div>
        }

        <Menu />

        <div className={styles.main}>
          <div className={styles.avatar}>
            <Avatar
              organization
              src={urls.getFileUrl(organization.avatarFilename)}
            />
          </div>

          <div className={styles.info}>
            <div className={styles.accountName}>/{organization.nickname}</div>
            <div
              className={styles.userName}
              dangerouslySetInnerHTML={{ __html: sanitizeText(organization.title) }}
            />
          </div>

          <div className={styles.rate}>{formatRate(organization.currentRate)}°</div>
        </div>

        <div className={styles.side}>
          <div className={styles.followButton}>
            <OrganizationFollowButton organizationId={+organization.id} />
          </div>

          <div className={styles.usersLists}>
            <FollowersWrapper
              title="Members"
              count={props.followedByCount}
              usersIds={props.followedByUserIds}
              popupUsersIds={props.followedByPopupUserIds}
              metadata={props.followedByPopupMetadata}
              onChangePage={props.followedByOnChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

OrganizationHeader.propTypes = {
  organizationId: PropTypes.number.isRequired,
  followedByCount: PropTypes.number,
  followedByUserIds: PropTypes.arrayOf(PropTypes.number),
  followedByPopupUserIds: PropTypes.arrayOf(PropTypes.number),
  followedByPopupMetadata: PropTypes.objectOf(PropTypes.any),
  followedByOnChangePage: PropTypes.func.isRequired,
};

OrganizationHeader.defaultProps = {
  followedByCount: 0,
  followedByUserIds: [],
  followedByPopupUserIds: [],
  followedByPopupMetadata: undefined,
};

export default OrganizationHeader;
