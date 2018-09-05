import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import Button from './Button';
import Rate from './Rate';

const renderProfilesRow = ({
  id, userName, accountName, avatarUrl, rate, profileLink,
}) => (
  <div className="profiles-list__row" key={id}>
    <div className="profiles-list__user">
      <UserCard
        userName={userName}
        accountName={accountName}
        avatarUrl={avatarUrl}
        profileLink={profileLink}
        className="user-card_text_left"
      />
    </div>
    <div className="profiles-list__info">
      <Rate value={rate} className="rate_profile rate_right" />

      <div className="profiles-list__button">
        <Button
          isStretched
          withCheckedIcon={false}
          text="Follow"
          size="small"
          theme="transparent"
        />
      </div>
    </div>
  </div>
);

const ProfilesList = props => (
  <div className="profiles-list">
    <div className="profiles-list__header">
      <h3>Followers</h3>
    </div>
    {props.users.map(renderProfilesRow)}
  </div>
);

renderProfilesRow.propTypes = {
  id: PropTypes.number,
  userName: PropTypes.string,
  accountName: PropTypes.string,
  avatarUrl: PropTypes.string,
  rate: PropTypes.string,
  profileLink: PropTypes.string,
};

ProfilesList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

export default ProfilesList;