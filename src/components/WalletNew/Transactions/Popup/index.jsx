import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import Popup, { Content } from '../../../Popup';
import { PanelWrapper } from '../../../Panel';
import UserPick from '../../../UserPick';

const TransactionPopup = ({
  onClickClose, date, type, icon, title, amount, details, avatarSrc,
}) => (
  <Popup onClickClose={onClickClose}>
    <Content onClickClose={onClickClose} fixWidth={false}>
      <div className={styles.content}>
        {(date || type) &&
          <div className={styles.header}>
            {date && <span className={styles.date}>{date}</span>}
            {type && <span className={styles.type}>{type}</span>}
          </div>
        }
        {avatarSrc ? (
          <div className={styles.userPic}>
            <UserPick src={avatarSrc} size={80} />
          </div>
        ) : (
          <div className={styles.icon}>{icon}</div>
        )}
        {title && <div className={styles.title}>{title}</div>}
        {amount && <div className={styles.amount}>{amount}</div>}
        {details &&
          <div className={styles.details}>
            <PanelWrapper title="Detailed info">
              <pre className={styles.json}>{details}</pre>
            </PanelWrapper>
          </div>
        }
      </div>
    </Content>
  </Popup>
);

TransactionPopup.propTypes = {
  onClickClose: PropTypes.func,
  date: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
  amount: PropTypes.string,
  details: PropTypes.string,
  avatarSrc: PropTypes.string,
};

TransactionPopup.defaultProps = {
  onClickClose: undefined,
  date: undefined,
  type: undefined,
  icon: undefined,
  title: undefined,
  amount: undefined,
  details: undefined,
  avatarSrc: undefined,
};

export default TransactionPopup;