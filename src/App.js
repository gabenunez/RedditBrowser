import React from 'react';
import './App.css';
import { Container, Row, Col, ListGroup} from 'reactstrap';

import Header from './containers/header';
import SubredditList from './containers/subreddit_list';
import SubredditPosts from './containers/subreddit_posts';
import SelectedPost from './containers/selected_post';

const App = () => {
  return (
    <Container>
      <Header />
      
      <Row>
        {/* Selected Post Details */}
        <Col sm="5">
          <h3 className='text-center'>Selected Post</h3>
          <SelectedPost />
        </Col>

        {/* List of Subreddit Posts */}
        <Col sm="4">
          <h3 className='text-center'>Subreddit Posts</h3>
          <ListGroup>
            <SubredditPosts />
          </ListGroup>
        </Col>
        
        {/* List of available subreddits */}
        <Col sm="3">
          <h3 className='text-center'>Subreddits</h3>
          <ListGroup>
            <SubredditList />
          </ListGroup>
        </Col>

      </Row>
    </Container>
  );
}

export default App;