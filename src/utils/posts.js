export const UPVOTE_STATUS = 'upvote';
export const DOWNVOTE_STATUS = 'downvote';
export const NOVOTE_STATUS = 'no_vote';

export const POST_TYPE_MEDIA_ID = 1;
export const POST_TYPE_OFFER_ID = 2;
export const POST_TYPE_DIRECT_ID = 10;
export const POST_TYPE_REPOST_ID = 11;

export const POSTS_CATREGORIES_HOT_ID = 1;
export const POSTS_CATREGORIES_TRENDING_ID = 2;
export const POSTS_CATREGORIES_FRESH_ID = 3;
export const POSTS_CATREGORIES_TOP_ID = 4;

export const getPostUrl = (postId) => {
  if (!postId) {
    return null;
  }

  return `/posts/${postId}`;
};

export const getPostEditUrl = (postId) => {
  if (!postId) {
    return null;
  }

  return `/posts/${postId}/edit`;
};

export const getPostTypeById = (postTypeId) => {
  switch (postTypeId) {
    case POST_TYPE_DIRECT_ID:
      return 'post';
    case POST_TYPE_OFFER_ID:
      return 'offer';
    case POST_TYPE_MEDIA_ID:
      return 'story';
    case POST_TYPE_REPOST_ID:
      return 'repost';
    default:
      return null;
  }
};

export const postIsEditable = (createdAt) => {
  if (!createdAt) {
    return false;
  }

  return (new Date()).getTime() - (new Date(createdAt)).getTime() < 600000;
};
