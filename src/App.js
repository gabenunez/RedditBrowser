import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import SubredditList from './containers/subreddit_list';

class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col sm="4">
            <h3 className='text-center'>Selected Post</h3>
          </Col>
          <Col sm="4">
            <h3 className='text-center'>Subreddit Posts</h3>
          </Col>

          <SubredditList />
        </Row>
      </Container>
    );
  }
}

export default App;