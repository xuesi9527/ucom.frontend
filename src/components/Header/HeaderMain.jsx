import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { selectUser } from '../../store/selectors';

const HeaderMain = ({ location }) => (
  <div className="header__main">
    <nav className="menu menu_responsive menu_header">
      <div className="menu__item menu__item_only_desktop">
        <Link to="/posts/new/1" className="menu__link-button">
          <strong>Add publication</strong>
        </Link>
      </div>

      <div className="menu__item only-desktop menu__item_only_phone ">
        <NavLink
          to="/posts/new/1"
          className="menu__link menu__link_upper"
          activeClassName="menu__link_active"
          isActive={() => location.pathname === '/posts/new/1'}
        >
          Add&nbsp;publication
        </NavLink>
      </div>

      <div className="menu__item only-desktop">
        <NavLink
          to="/users"
          className="menu__link menu__link_upper"
          activeClassName="menu__link_active"
          isActive={() => location.pathname === '/users'}
        >
          People
        </NavLink>
      </div>

      <div className="menu__item only-desktop">
        <NavLink
          to="/communities"
          className="menu__link menu__link_upper"
          activeClassName="menu__link_active"
          isActive={() => location.pathname === '/communities'}
        >
          Communities
        </NavLink>
      </div>

      <div className="menu__item only-desktop">
        <NavLink
          to="/publications/media"
          className="menu__link menu__link_upper"
          activeClassName="menu__link_active"
          isActive={() => location.pathname.indexOf('/publications') === 0}
        >
          Publications
        </NavLink>
      </div>
    </nav>
  </div>
);

export default withRouter(connect(state => ({
  menuPopupVisibility: state.menuPopup.menuPopupVisibility,
  user: selectUser(state),
}))(HeaderMain));