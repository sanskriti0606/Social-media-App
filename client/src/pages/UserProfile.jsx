import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../context/auth';
import { Segment, Grid, Image, Header, Tab, Icon, Loader } from 'semantic-ui-react';
import UserDetails from '../components/UserDetails';

import { GET_USER_QUERY } from '../util/graphql';

const UserProfile = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);

  const { loadingUser, data: { getUser: newUser } = {} } = useQuery(GET_USER_QUERY, {
    variables: {
      userId
    }
  });

  // Profile header layout for logged-in user and the user being viewed
  const renderProfileHeader = (userProfile) => (
    <Segment padded="very" style={{ backgroundColor: '#fff' }}>
      <Grid columns={2} stackable>
        <Grid.Row>
          <Grid.Column width={5} style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              src={userProfile.profileImage || '/default-avatar.png'}
              size="small"
              circular
              style={{ border: '4px solid #ddd' }}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <Header as="h2" style={{ marginBottom: '10px' }}>
              {userProfile.username}
            </Header>
            <p style={{ marginBottom: '10px', fontWeight: '500' }}>
              {userProfile.bio || 'This user has no bio.'}
            </p>
            <Grid columns={3} style={{ paddingTop: '10px' }}>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <p style={{ fontWeight: 'bold' }}>{userProfile.postsCount || 0}</p>
                  <p>Posts</p>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <p style={{ fontWeight: 'bold' }}>{userProfile.followersCount || 0}</p>
                  <p>Followers</p>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <p style={{ fontWeight: 'bold' }}>{userProfile.followingCount || 0}</p>
                  <p>Following</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );

  // Loading state
  if (loadingUser) {
    return <Loader active inline="centered" size="large" style={{ color: '#0095F6' }}>Loading...</Loader>;
  }

  // Default to logged-in user profile if no other user is found
  const profile = newUser || user;

  if (!profile) {
    return null;
  }

  // If the logged-in user is viewing their own profile
  if (user != null && user.id === userId) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#fafafa' }}>
        {renderProfileHeader(user)}
        <UserDetails user={user} auth={user} />
      </div>
    );
  }

  // Profile for another user
  return (
    <div style={{ padding: '20px', backgroundColor: '#fafafa' }}>
      {renderProfileHeader(profile)}
      <UserDetails user={newUser} />
    </div>
  );
};

export default UserProfile;
