import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { getPostById } from '../../../store/posts';
import { selectUser } from '../../../store/selectors/user';
import { createComment } from '../../../actions/comments';
import { getFileUrl } from '../../../utils/upload';
import { getUserName, getUserUrl } from '../../../utils/user';
import { getUserById } from '../../../store/users';
import { getPostUrl, getPostTypeById } from '../../../utils/posts';
import PostFeedHeader from './PostFeedHeader';
import PostFeedFooter from './PostFeedFooter';
import PostCard from '../../PostMedia/PostCard';

class Media extends PureComponent {
  render() {
    const post = getPostById(this.props.posts, this.props.id);
    if (!post) {
      return null;
    }

    const user = getUserById(this.props.users, post.userId);
    if (!user) {
      return null;
    }

    return (
      <div className="post" id={`post-${post.id}`}>
        <PostFeedHeader
          postTypeId={post.postTypeId}
          createdAt={moment(post.createdAt).fromNow()}
          postId={post.id}
          userName={getUserName(user)}
          accountName={user.accountName}
          profileLink={getUserUrl(user.id)}
          avatarUrl={getFileUrl(user.avatarFilename)}
        />

        <PostCard
          onFeed
          coverUrl={getFileUrl(post.mainImageFilename)}
          rate={post.currentRate}
          title={post.title || post.leadingText}
          url={getPostUrl(post.id)}
          userUrl={getUserUrl(post.user && post.user.id)}
          userImageUrl={getFileUrl(post.user && post.user.avatarFilename)}
          userName={getUserName(post.user)}
          accountName={post.user && post.user.accountName}
          tags={post.postTypeId && [getPostTypeById(post.postTypeId)]}
          commentsCount={post.postTypeId && post.commentsCount}
          sharesCount={post.postTypeId && post.sharesCount}
        />

        <PostFeedFooter
          commentsCount={post.commentsCount}
          post={post}
          postTypeId={post.postTypeId}
          el={this.el}
          commentsIsVisible={this.props.commentsIsVisible}
          toggleComments={this.props.toggleComments}
          sharePopup={this.props.sharePopup}
          toggleShare={this.props.toggleShare}
          timestamp={this.props.timestamp}
        />
      </div>
    );
  }
}

Media.propTypes = {
  id: PropTypes.number,
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(
  state => ({
    posts: state.posts,
    users: state.users,
    comments: state.comments,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    createComment,
  }, dispatch),
)(Media);
