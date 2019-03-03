import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
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
          <Col sm="4">
            <h3 className='text-center'>Subreddit Posts</h3>
            <ListGroup>
            {this.props.selectedSubreddit ? 
              <SubredditPosts /> : <ListGroupItem>Please select a subreddit.</ListGroupItem>
            }
            </ListGroup>
          </Col>
          <SubredditList />
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedSubreddit: state.selectedSubreddit,
    subredditPosts: state.subredditPosts
  };
}

export default connect(mapStateToProps)(App);