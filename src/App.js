import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import SubredditList from './containers/subreddit_list';
import SubredditPosts from './containers/subreddit_posts';

class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col sm="4">
            <h3 className='text-center'>Selected Post</h3>
          </Col>
          <SubredditPosts />
          <SubredditList />
        </Row>
      </Container>
    );
  }
}

export default App;