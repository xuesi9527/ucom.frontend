import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import React, { useEffect } from 'react';
import * as authActions from '../../../actions/auth';
import { hideNotificationTooltip } from '../../../actions/siteNotifications';
import styles from './styles.css';

const Page = ({ location, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.hidePopup());
    dispatch(hideNotificationTooltip());
  }, [location.pathname]);

  return (
    <div className={styles.page}>
      {children}
    </div>
  );
};

export default withRouter(Page);
