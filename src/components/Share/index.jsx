import PropTypes from 'prop-types';
import Tippy from '@tippy.js/react';
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import IconFacebook from '../Icons/Socials/Share/Facebook';
import IconTwitter from '../Icons/Socials/Share/Twitter';
import IconTelegram from '../Icons/Socials/Share/Telegram';
import IconCopyLink from '../Icons/CopyLink';
import IconRepost from '../Icons/Repost';
import { copyToClipboard } from '../../utils/text';
import { COPY_TO_CLIPBOARD_SUCCESS_MESSAGE } from '../../utils/constants';
import withLoader from '../../utils/withLoader';
import { addSuccessNotification, addErrorNotificationFromResponse } from '../../actions/notifications';
import { addRepost } from '../../actions/posts';
import styles from './styles.css';

const Share = ({
  children, link, directUrl, postId, repostEnable, socialEnable,
}) => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const tippyInstance = useRef();

  useEffect(() => {
    if (directUrl) {
      setUrl(directUrl);
    } else if (link) {
      setUrl(`${window.location.origin}${link}`);
    }
  }, [link, directUrl]);

  return (
    <Tippy
      onCreate={(instance) => {
        tippyInstance.current = instance;
      }}
      arrow
      interactive
      theme="dropdown"
      placement="bottom-center"
      trigger="click"
      content={(
        <div className={styles.share}>
          {postId && repostEnable &&
            <Fragment>
              <div
                role="presentation"
                className={`${styles.title} ${styles.action}`}
                onClick={async () => {
                  try {
                    await withLoader(dispatch(addRepost(postId)));
                    if (tippyInstance.current) {
                      tippyInstance.current.hide();
                    }
                    dispatch(addSuccessNotification('Repost is successful'));
                  } catch (err) {
                    dispatch(addErrorNotificationFromResponse(err));
                  }
                }}
              >
                <IconRepost />
                Repost to my profile
              </div>

              <hr className={styles.line} />
            </Fragment>
          }

          {socialEnable &&
            <Fragment>
              <div className={styles.title}>Share to</div>

              <div className={styles.icons}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.icon}
                  href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                >
                  <IconFacebook />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.icon}
                  href={`https://twitter.com/intent/tweet?url=${url}`}
                >
                  <IconTwitter />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.icon}
                  href={`https://telegram.me/share/url?url=${url}`}
                >
                  <IconTelegram />
                </a>
              </div>

              <hr className={styles.line} />
            </Fragment>
          }

          <div className={styles.title}>Copy link</div>

          <div className={styles.copy}>
            <span className={styles.text}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="link red"
                href={url}
              >
                {url}
              </a>
            </span>
            <span
              role="presentation"
              className={styles.icon}
              onClick={() => {
                if (tippyInstance.current) {
                  tippyInstance.current.hide();
                }
                copyToClipboard(url);
                dispatch(addSuccessNotification(COPY_TO_CLIPBOARD_SUCCESS_MESSAGE));
              }}
            >
              <IconCopyLink />
            </span>
          </div>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
};

Share.propTypes = {
  link: PropTypes.string,
  directUrl: PropTypes.string,
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  repostEnable: PropTypes.bool,
  socialEnable: PropTypes.bool,
};

Share.defaultProps = {
  link: undefined,
  directUrl: undefined,
  postId: undefined,
  repostEnable: false,
  socialEnable: false,
};

export default Share;