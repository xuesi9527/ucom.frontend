import classNames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import PostFeedFooter from '../Post/PostFeedFooter';
import UserPick from '../../UserPick';

const Autoupdate = ({
  label, commentsCount, postId, content, commentsContainerId, userName, userUrl, userAvatarSrc, createdAt, headerColor, showFooter, flat,
}) => (
  <div
    className={classNames({
      [styles.autoupdate]: true,
      [styles.flat]: flat,
    })}
  >
    <div
      className={styles.userHeader}
      style={{ color: headerColor }}
    >
      <UserPick src={userAvatarSrc} url={userUrl} size={24} />
      <span className={styles.text}>
        <Link to={userUrl} className="link red-hover">{userName}</Link>&nbsp;made an update {moment(createdAt).fromNow()}
      </span>
    </div>
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div className={styles.content}>{content}</div>
      {showFooter &&
        <div className={styles.footer}>
          <PostFeedFooter
            postId={postId}
            commentsCount={commentsCount}
            commentsContainerId={commentsContainerId}
          />
        </div>
      }
    </div>
  </div>
);

Autoupdate.propTypes = {
  label: PropTypes.string,
  content: PropTypes.node.isRequired,
  commentsCount: PropTypes.number,
  postId: PropTypes.number.isRequired,
  commentsContainerId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  userUrl: PropTypes.string.isRequired,
  userAvatarSrc: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  headerColor: PropTypes.string,
  showFooter: PropTypes.bool,
  flat: PropTypes.bool,
};

Autoupdate.defaultProps = {
  label: undefined,
  commentsCount: 0,
  userAvatarSrc: undefined,
  headerColor: 'rgba(0,0,0,0.58)',
  showFooter: true,
  flat: false,
};

export * from './wrappers';
export * from './Content';
export default Autoupdate;
