import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { memo } from 'react';
import classNames from 'classnames';
import styles from './styles.css';
import UserPick from '../UserPick';
import { UserFollowButton, OrgFollowButton } from '../FollowButton';
import { formatScaledImportance, formatRate } from '../../utils/rate';

const EntrySubHeader = props => (
  <div
    className={classNames(
      `${styles.subHeader}`,
      { [styles.subHeaderSquare]: props.organization },
    )}
  >
    <div className={styles.userPick}>
      <UserPick
        organization={props.organization}
        shadow
        stretch
        url={props.userUrl}
        alt={props.userName}
        src={props.userAvatarUrl}
      />
    </div>
    <div className={styles.name}>
      <Link className="link red-hover" to={props.userUrl}>{props.userName}</Link>
    </div>
    <div className={styles.rate}>
      {props.organization ? formatRate(props.userRate, true) : formatScaledImportance(props.userRate)}
    </div>

    {props.showFollow &&
      <div className={styles.followLink}>
        {props.organization ? (
          <OrgFollowButton asLink orgId={+props.userId} />
        ) : (
          <UserFollowButton asLink userId={props.userId} />
        )}
      </div>
    }
  </div>
);

EntrySubHeader.propTypes = {
  userUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userAvatarUrl: PropTypes.string,
  userId: PropTypes.number.isRequired,
  userRate: PropTypes.number,
  showFollow: PropTypes.bool,
  organization: PropTypes.bool,
};

EntrySubHeader.defaultProps = {
  userRate: 0,
  showFollow: false,
  organization: false,
  userAvatarUrl: undefined,
};

export * from './wrappers';
export default memo(EntrySubHeader);
