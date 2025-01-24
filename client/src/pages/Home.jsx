import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition, Loader } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard/';
import PostForm from '../components/PostForm/';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);

  const COMPUTER_COLUMN = 5; // Show more posts per row on larger screens
  const TABLET_COLUMN = 8; // Adjust for tablets

  return (
    <div style={{ padding: '20px', backgroundColor: '#fafafa' }}>
      {/* Add some padding around the grid */}
      <Grid doubling stackable style={{ marginTop: '10px' }}>
        {/* Post form for logged-in users */}
        {user && (
          <Grid.Row>
            <Grid.Column width={16}>
              <PostForm />
            </Grid.Column>
          </Grid.Row>
        )}

        {/* Title */}
        <Grid.Row>
          <Grid.Column width={16}>
            <h1
              style={{
                textAlign: 'center',
                margin: '20px 0',
                fontSize: '2.2rem',
                fontWeight: '600',
                color: '#333',
                letterSpacing: '1px',
              }}
            >
              News Feed
            </h1>
          </Grid.Column>
        </Grid.Row>

        {/* Posts */}
        {loading ? (
          <Grid.Row>
            <Grid.Column width={16}>
              <Loader active inline="centered" size="large" style={{ marginTop: '50px', color: '#0095F6' }}>
                Loading posts...
              </Loader>
            </Grid.Column>
          </Grid.Row>
        ) : (
          <Grid.Row>
            <Transition.Group duration={400}>
              {posts &&
                posts.map((post) => (
                  <Grid.Column
                    tablet={TABLET_COLUMN}
                    computer={COMPUTER_COLUMN}
                    key={post.id}
                    style={{
                      marginBottom: '20px',
                      padding: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          </Grid.Row>
        )}
      </Grid>
    </div>
  );
}

export default Home;
