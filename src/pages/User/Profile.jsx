import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import Popup, { Content } from '../../components/Popup';
import { getUserById } from '../../store/users';
import urls from '../../utils/urls';
import Profile from '../../components/Profile/User';

const ProfilePopup = ({ history, user }) => (
  <Popup
    id="profile-popup"
    paddingBottom="70vh"
    onClickClose={() => history.push(urls.getUserUrl(user.id))}
  >
    <Content
      fixWidth
      onClickClose={() => history.push(urls.getUserUrl(user.id))}
    >
      <Profile
        userId={user.id}
        onSuccess={() => history.push(urls.getUserUrl(user.id))}
      />
    </Content>
  </Popup>
);

ProfilePopup.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect((state, props) => ({
  user: getUserById(state.users, props.match.params.userId),
}))(ProfilePopup);