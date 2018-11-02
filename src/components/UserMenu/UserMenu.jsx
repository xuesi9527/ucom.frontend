import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { selectUser } from '../../store/selectors';
import { removeUser } from '../../actions';
import { showMenuPopup, hideMenuPopup } from '../../actions/menuPopup';
import { getFileUrl } from '../../utils/upload';
import { getOrganizationUrl } from '../../utils/organization';
import Popup from '../Popup';
import Header from '../Header/Header';
import UserCard from '../UserCard';
import LogoutIcon from '../Icons/Logout';
import MenuWallet from '../Wallet/MenuWallet';
import { removeBrainkey } from '../../utils/brainkey';
import { removeToken } from '../../utils/token';

const UserMenu = (props) => {
  if (!props.user) {
    return null;
  }
  const logout = () => {
    removeToken();
    removeBrainkey();
    props.removeUser();
    window.location.reload();
    props.hideMenuPopup();
  };
  return (
    <Fragment>
      {props.menuPopupVisibility &&
        <Popup>
          <div className="user-menu">
            <div className="user-menu__header">
              <Header />
            </div>

            <div className="user-menu__content">
              <div className="content">
                <div className="content__inner">
                  <div className="user-menu__section">
                    <div className="menu menu_wrap">
                      <div className="menu__item only-phone">
                        <NavLink
                          to="/posts/new/1"
                          className="menu__link menu__link_upper"
                          activeClassName="menu__link_active"
                          isActive={() => props.location.pathname === '/posts/new/1'}
                        >
                          Add&nbsp;publication
                        </NavLink>
                      </div>

                      <div className="menu__item only-phone">
                        <NavLink
                          to="/users"
                          className="menu__link menu__link_upper"
                          activeClassName="menu__link_active"
                          isActive={() => props.location.pathname === '/users'}
                        >
                          People
                        </NavLink>
                      </div>

                      <div className="menu__item only-phone">
                        <NavLink
                          to="/communities"
                          className="menu__link menu__link_upper"
                          activeClassName="menu__link_active"
                          isActive={() => props.location.pathname === '/communities'}
                        >
                          Communities
                        </NavLink>
                      </div>

                      <div className="menu__item only-phone">
                        <NavLink
                          to="/publications/media"
                          className="menu__link menu__link_upper"
                          activeClassName="menu__link_active"
                          isActive={() => props.location.pathname.indexOf('/publications') === 0}
                        >
                          Publications
                        </NavLink>
                      </div>

                      <div className="menu__item">
                        <NavLink
                          to={`/user/${props.user.id}`}
                          className="menu__link menu__link_upper"
                          activeClassName="menu__link_active"
                          isActive={() => props.location.pathname === `/user/${props.user.id}`}
                        >
                          My profile
                        </NavLink>
                      </div>

                      <div className="menu__item">
                        <NavLink
                          to="/profile/general-info"
                          className="menu__link menu__link_upper"
                          activeClassName="menu__link_active"
                          isActive={() => props.location.pathname === '/profile/general-info'}
                        >
                          Settings
                        </NavLink>
                      </div>

                      <div className="menu__item">
                        <span className="menu__link menu__link_upper" role="presentation" onClick={logout}>
                          <span className="inline inline_small">
                            <span className="inline__item"><LogoutIcon /></span>
                            <span className="inline__item">Log out</span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {props.user.id && <MenuWallet />}
                  {props.user.organizations && props.user.organizations.length > 0 &&
                    <div className="user-menu__section">
                      <div className="user-menu__title">Communities</div>
                      <div className="user-menu__communities">
                        <div className="user-cards-grid">
                          {props.user.organizations.map(item => (
                            <div className="user-cards-grid__item" key={item.id}>
                              <UserCard
                                squareAvatar
                                roundedAvatar
                                size="small"
                                rate={item.currentRate}
                                userName={item.title}
                                accountName={item.nickname}
                                avatarUrl={getFileUrl(item.avatarFilename)}
                                profileLink={getOrganizationUrl(item.id)}
                              />
                            </div>
                          ))}
                          <div className="user-cards-grid__item">
                            <Link to="/communities/new" className="button-create-new">
                              <span className="button-create-new__icon">+</span>
                              <span className="button-create-new__title">Create new</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </Popup>
      }
    </Fragment>
  );
};

UserMenu.propTypes = {
  menuPopupVisibility: PropTypes.bool,
};

export default withRouter(connect(
  state => ({
    menuPopupVisibility: state.menuPopup.menuPopupVisibility,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    showMenuPopup,
    hideMenuPopup,
    removeUser,
  }, dispatch),
)(UserMenu));