import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import Avatar from './Avatar';
import Rate from './Rate';

const PostCard = (props) => {
  const PostLinkTag = props.url ? Link : 'span';
  const UserLinkTag = props.userUrl ? Link : 'span';

  return (
    <div className="post-card">
      <div className="post-card__inner">
        <div
          classNames={classNames(
            'post-card__cover',
            { 'post-card__cover_blank': !props.coverUrl },
          )}
        >
          <img className="post-card__img" src={props.coverUrl} alt="cover" />
        </div>

        <div className="post-card__side">
          <div className="post-card__rate">
            <Rate value={props.rate} />
          </div>
        </div>

        <div className="post-card__main">
          <div className="post-card__tags">
            <span className="tags">
              <span className="tags__item tags__item_icon">#</span>
              <span className="tags__item">story</span>
            </span>
          </div>

          <div className="post-card__title">
            <h1 className="title title_light">
              <PostLinkTag to={props.url}>
                {props.title ? (
                  <Fragment>{props.title}</Fragment>
                ) : (
                  <span className="balnk">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, modi?</span>
                )}
              </PostLinkTag>
            </h1>
          </div>
        </div>

        <div className="post-card__footer">
          <div className="post-card__authors">
            <div className="avatars-list">
              <div className="avatars-list__item">
                <UserLinkTag to={props.userUrl}>
                  <Avatar square src={props.userImageUrl} />
                </UserLinkTag>
              </div>
            </div>
          </div>

          {/* <div className="post-card__users">
            <div className="inline">
              <div className="inline__item">
                <div className="rate">
                  <div className="rate__value">354</div>
                  <div className="rate__label">Comments</div>
                </div>
              </div>
              <div className="inline__item">
                <div className="rate">
                  <div className="rate__value">8 923</div>
                  <div className="rate__label">Joined</div>
                </div>
              </div>
              <div className="inline__item post-card__joined">
                <div className="avatars-list avatars-list_shifted">
                  <div className="avatars-list__item">
                    <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
                  </div>
                  <div className="avatars-list__item">
                    <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
                  </div>
                  <div className="avatars-list__item">
                    <Avatar src="https://cdn-images-1.medium.com/fit/c/300/300/1*28Gx-SixWGfev_WLLuCfhg.jpeg" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  url: PropTypes.string,
  userUrl: PropTypes.string,
  coverUrl: PropTypes.string,
  rate: PropTypes.number,
  title: PropTypes.string,
  userImageUrl: PropTypes.string,
};

export default PostCard;
