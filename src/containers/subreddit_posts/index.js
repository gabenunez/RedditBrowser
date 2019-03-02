import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, ListGroup, ListGroupItem } from 'reactstrap';

class SubRedditPosts extends Component {
  render() {
    return (
      <Col sm="4">
        <h3 className='text-center'>Subreddit Posts</h3>
        <ListGroup>
            <ListGroupItem>Please select a subreddit.</ListGroupItem>
        </ListGroup>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {
    subredditList: state.subredditList
  };
}

export default connect(mapStateToProps)(SubRedditPosts);