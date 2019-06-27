import { Route, Switch } from 'react-router';
import { arrayMove } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import OrganizationHeader from '../../components/Organization/OrganizationHeader';
import { getOrganization, addOrganizations } from '../../actions/organizations';
import { selectOwner, selectOrgById } from '../../store/selectors';
import LayoutBase from '../../components/Layout/LayoutBase';
import urls from '../../utils/urls';
import Feed from '../../components/Feed/FeedUser';
import { ORGANIZATION_FEED_ID } from '../../utils/feed';
import EntrySocialNetworks from '../../components/EntrySocialNetworks';
import EntryLocation from '../../components/EntryLocation';
import EntryCreatedAt from '../../components/EntryCreatedAt';
import EntryContacts from '../../components/EntryContacts';
import EntryAbout from '../../components/EntryAbout';
import Discussions from '../../components/Discussions';
import { getUserName } from '../../utils/user';
import { validateDiscationPostUrl, userIsTeam } from '../../utils/organization';
import { setDiscussions } from '../../actions/organization';
import PostPopup from './Post';
import ProfilePopup from './Profile';
import withLoader from '../../utils/withLoader';
import { EntryListSectionOrgSourcesWrapper, EntryListSectionOrgAdminsWrapper } from '../../components/EntryListSection';
import * as orgPageActions from '../../actions/orgPage';
import { addErrorNotification } from '../../actions/notifications';

const OrganizationPage = (props) => {
  const organizationId = +props.match.params.id;
  const organization = useSelector(selectOrgById(organizationId));
  const owner = useSelector(selectOwner);
  const state = useSelector(state => state.orgPage);
  const dispatch = useDispatch();

  const getFollowedByPopup = async (page) => {
    try {
      await withLoader(dispatch(orgPageActions.getFollowedByPopup(organizationId, page)));
    } catch (err) {
      console.error(err);
      dispatch(addErrorNotification(err.message));
    }
  };

  useEffect(() => {
    withLoader(dispatch(getOrganization(organizationId)));
    withLoader(dispatch(orgPageActions.getPageData(organizationId)));

    return () => {
      dispatch(orgPageActions.reset());
    };
  }, [organizationId]);

  return (
    <LayoutBase gray>
      <Switch>
        <Route path="/communities/:organizationId/profile" component={ProfilePopup} />
        <Route path="/communities/:organizationId/:postId" component={PostPopup} />
      </Switch>

      <div className="layout layout_profile">
        <div className="layout__header">
          <OrganizationHeader
            organizationId={organizationId}
            followedByCount={state.followedBy.metadata.totalAmount}
            followedByUserIds={state.followedBy.ids}
            followedByPopupUserIds={state.followedByPopup.ids}
            followedByPopupMetadata={state.followedByPopup.metadata}
            followedByOnChangePage={getFollowedByPopup}
          />
        </div>

        <div className="layout__sidebar">
          <EntryListSectionOrgAdminsWrapper
            orgId={organizationId}
            limit={3}
          />

          <EntryListSectionOrgSourcesWrapper
            orgId={organizationId}
            limit={3}
          />

          {organization &&
            <EntryContacts
              phone={organization.phoneNumber}
              email={organization.email}
            />
          }
          {organization &&
            <EntrySocialNetworks
              urls={(organization.socialNetworks || []).filter(item => item.sourceUrl && item.sourceUrl.length > 0).map(i => i.sourceUrl)}
            />
          }
          {organization &&
            <EntryLocation
              city={organization.city}
              country={organization.country}
            />
          }
          {organization &&
            <EntryCreatedAt date={organization.createdAt} />
          }
        </div>
        <div className="layout__main">
          {organization &&
            <EntryAbout text={organization.about} />
          }

          {organization && organization.discussions &&
            <Discussions
              editable={userIsTeam(owner, organization)}
              placeholder={`Link to ${organization.title} Article`}
              validatePostUrlFn={link => validateDiscationPostUrl(link, organizationId)}
              newDiscussionUrl={urls.getNewOrganizationDiscussionUrl(organizationId)}
              onSubmit={async (postId) => {
                await withLoader(dispatch(setDiscussions({
                  organizationId,
                  discussions: [{ id: postId }].concat(organization.discussions.map(i => ({ id: i.id }))),
                })));
                await withLoader(dispatch(getOrganization(organizationId)));
              }}
              onSortEnd={async (e) => {
                const discussions = arrayMove(organization.discussions, e.oldIndex, e.newIndex);
                dispatch(addOrganizations([{
                  id: organizationId,
                  discussions,
                }]));
                await withLoader(dispatch(setDiscussions({
                  organizationId,
                  discussions: discussions.map(i => ({ id: i.id })),
                })));
              }}
              items={organization.discussions.map(item => ({
                id: item.id,
                url: urls.getPostUrl(item),
                title: item.title,
                author: getUserName(item.user),
                authorUrl: urls.getUserUrl(item.user.id),
                commentCount: item.commentsCount,
                onClickRemove: async (id) => {
                  await withLoader(dispatch(setDiscussions({
                    organizationId,
                    discussions: organization.discussions.filter(i => +i.id !== +id).map(i => ({ id: i.id })),
                  })));
                  await withLoader(dispatch(getOrganization(organizationId)));
                },
              }))}
            />
          }

          <Feed organizationId={organizationId} feedTypeId={ORGANIZATION_FEED_ID} />
        </div>
        <div className="layout__footer">
          <Footer />
        </div>
      </div>
    </LayoutBase>
  );
};

OrganizationPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string,
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default OrganizationPage;
